import { Injectable } from '@angular/core';
import { remote } from 'electron';
import * as path from 'path';
import * as Database from '../models'
import * as Promise from 'bluebird';
import * as Datastore from 'nedb';

Promise.promisifyAll(Datastore.prototype);

import { FsService } from './fs.service'

@Injectable()
export class DatabaseMigrationService {

  constructor(private _fs: FsService) { }

  migrationNeeded(): Boolean {
    const oldDb = path.join(remote.app.getPath('userData'), 'cmp.db')
    return this._fs.exists(oldDb)
  }

  private importSettings(oldDb: Datastore): Promise<any> {
    return oldDb.findOneAsync({
      'attributes.type': 'Settings'
    }).then((oldSet) => {
      return Database.Setting.get(), oldSet
    }).then((set: Database.Setting, oldSet) => {
      if (!set.sf.loginUrl) {
        set.sf.loginUrl = oldSet.loginUrl
        set.sf.email = oldSet.email
        set.sf.password = oldSet.password
        set.sf.token = oldSet.token
      }
      console.log('New set')
      console.log(set)
      console.log('Old Set')
      console.log(oldSet)
      // return set.update()
    })
  }

  migrate(): Promise<any> {
    const oldDb = new Datastore({
      filename: path.join(remote.app.getPath('userData'), 'cmp.db'),
      autoload: true
    });

  }

}
