import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx'
import { remote } from 'electron';
import * as path from 'path';
import { environment } from 'environments';
import * as Database from '../models'
import * as Promise from 'bluebird';
import * as Datastore from 'nedb';

Promise.promisifyAll(Datastore.prototype);

import { FsService } from './fs.service'
import { SharedDataService } from './shared-data.service'
import { SalesforceService } from './salesforce.service'

@Injectable()
export class DatabaseMigrationService {

  public message = new BehaviorSubject<string>(null)
  private settings: Database.Setting
  private identity: Database.Identity

  constructor(private _fs: FsService, private _sharedData: SharedDataService, private _sf: SalesforceService) {
    _sharedData.settings.subscribe((set) => {
      this.settings = set
    })
    _sharedData.identity.subscribe((id) => {
      this.identity = id
    })
  }

  migrationNeeded(): boolean {
    const oldDb = path.join(remote.app.getPath('userData'), 'cmp.db')
    let newDb: string
    if (environment.production) {
      newDb = path.join(remote.app.getPath('userData'), 'database')
    } else {
      newDb = path.join(remote.app.getPath('userData'), 'dev', 'database')
    }
    return this._fs.exists(oldDb) && !this._fs.exists(newDb)
  }

  private importSettings(oldDb: Datastore): Promise<any> {
    this.message.next('Importing settings')
    const self = this
    return oldDb.findOneAsync({ setting: 'sf' })
      .then((oldSet) => {
        function updateSetting() {
          if (self.settings) {
            if (!self.settings.sf || (self.settings.sf && !self.settings.sf.loginUrl)) {
              self.settings.sf = {
                loginUrl: oldSet.loginUrl,
                email: oldSet.email,
                password: oldSet.password,
                token: oldSet.token
              }
            }
            clearInterval(inter)
            return self.settings.update().then(() => {
              self._sharedData.settingsChanges()
              return null
            })
          }
        }
        const inter = setInterval(updateSetting, 500)
      })
  }

  private importIdentity(oldDb: Datastore): Promise<any> {
    this.message.next('Importing Identity')
    const self = this
    return oldDb.findOneAsync({ setting: 'identity' })
      .then((oldId) => {
        function updateIdentity() {
          if (self.identity) {
            self.identity.addr_city = oldId.addr_city
            self.identity.addr_street = oldId.addr_street
            self.identity.addr_zip = oldId.addr_zip
            self.identity.display_name = oldId.display_name
            self.identity.email = oldId.email
            clearInterval(inter)
            return self.identity.update().then(() => {
              self._sharedData.identityChanges()
              return null
            })
          }
        }
        const inter = setInterval(updateIdentity, 500)
      })
  }

  private importTodos(oldDb: Datastore): Promise<any> {
    this.message.next('Importing Todos')
    return oldDb.findAsync({
      'attributes.type': 'Todo'
    }).then((todos) => {
      return Promise.all(todos.map((t) => {
        delete t._id
        const todo = new Database.Todo(t)
        return todo.save()
      }))
    })
  }

  private importTemplates(oldDb: Datastore): Promise<any> {
    this.message.next('Importing Templates')
    return oldDb.findAsync({
      'attributes.type': 'mdTemplate'
    }).then((templates) => {
      return Promise.all(templates.map((t) => {
        delete t._id
        const template = new Database.Template(t)
        template.save()
      }))
    })
  }

  private importAccounts(oldDb: Datastore): Promise<any> {
    this.message.next('Importing Accounts')
    return oldDb.findAsync({
      'attributes.type': 'Account'
    }).then((accounts) => {
      return Promise.all(accounts.map((a) => {
        delete a._id
        const account = new Database.Account(a)
        return oldDb.findOneAsync({
          accountId: account.Id
        }).then((doc) => {
          if (doc) {
            account.Stared = doc.stared
            account.path = doc.path
          }
          return account.save()
        })
      })).then(() => {
        this._sharedData.accountsChanges()
        return null
      })
    })
  }

  importReports(oldDb: Datastore): Promise<any> {
    this.message.next('Importing Reports')
    return oldDb.findAsync({ 'attributes.type': 'report' })
      .then((reports) => {
        const dashboard = new Database.Dashboard({ title: 'New Dashboard' })
        dashboard.main = reports.map((r) => {
          return new Database.Report({
            title: r.title,
            query: r.query,
            columns: r.columns.map((c) => { return { key: c, value: c } })
          })
        })
        return dashboard.save().then(() => {
          this._sharedData.dashboardChanges()
          return null
        })
      })
  }

  migrate(): Promise<any> {
    const oldDb = new Datastore({
      filename: path.join(remote.app.getPath('userData'), 'cmp.db'),
      autoload: true
    });
    return this.importSettings(oldDb).then(() => {
      return this.importIdentity(oldDb)
    }).then(() => {
      return this.importTodos(oldDb)
    }).then(() => {
      return this.importTemplates(oldDb)
    }).then(() => {
      return this.importAccounts(oldDb)
    }).then(() => {
      return this.importReports(oldDb)
    }).then(() => {
      this._fs.mv(path.join(remote.app.getPath('userData'), 'cmp.db'), path.join(remote.app.getPath('userData'), 'old_cmp.db'))
    }).catch((e) => {
      console.log(e)
    })
  }

}
