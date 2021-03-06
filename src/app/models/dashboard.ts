import { SalesforceService } from '../providers';

import { Database } from './database'
import { Report } from './report'

export class Dashboard {
  protected static database = new Database('dashboard').database

  _id: string
  title: string
  top: Array<Report> = []
  right: Array<Report> = []
  main: Array<Report> = []
  todo: boolean
  weather: boolean

  static getList() {
    return Dashboard.database.findAsync({}, { title: 1 })
  }

  static get(id: string): Promise<Dashboard> {
    return Dashboard.database.findOneAsync({ _id: id }).then((dash) => {
      return new Dashboard(dash)
    })
  }

  constructor(object?) {
    if (object) {
      this._id = object._id
      this.title = object.title || 'New Dashboard'
      if (object.top) {
        this.top = object.top.map((r) => new Report(r))
      }
      if (object.main) {
        this.main = object.main.map((r) => new Report(r))
      }
      if (object.right) {
        this.right = object.right.map((r) => new Report(r))
      }
      this.todo = object.todo || false
      this.weather = object.weather || false
    }
  }

  save(): Promise<any> {
    const self = this
    if (self._id) {
      return Dashboard.database.updateAsync({
        _id: self._id
      }, self, {})
    } else {
      return Dashboard.database.insertAsync(self).then(function(newDoc) {
        self._id = newDoc._id;
        return self;
      });
    }
  }

  refresh(sf: SalesforceService): Promise<any> {
    const self = this
    const p: Array<Promise<any>> = []
    if (self.top) {
      p.concat(self.top.map((r) => { return r.refresh(sf) }))
    }
    if (self.main) {
      p.concat(self.main.map((r) => { return r.refresh(sf) }))
    }
    if (self.right) {
      p.concat(self.right.map((r) => { return r.refresh(sf) }))
    }
    return Promise.all(p).then(() => {
      return self.save()
    })
  }

  delete(): Promise<any> {
    return Dashboard.database.removeAsync({
      _id: this._id
    }, {});
  }

}

export enum ReportTypes {
  Top,
  // Right,
  Main,
  Todo,
  // Weather,
}
