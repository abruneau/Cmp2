import { Database } from './database'

export class Template {
  protected static database = new Database('templates').database

  _id: string
  title: string
  md: string
  lastUpdate: any

  static getAll(): Promise<Array<Template>> {
    return Template.database.findAsync({}, {}).then((templates) => {
      if (templates.length) {
        return templates.map((t) => {
          return new Template(t)
        })
      } else {
        return []
      }
    })
  }

  constructor(template?) {
    if (template) {
      this._id = template._id;
      this.title = template.title;
      this.md = template.md;
      this.lastUpdate = template.lastUpdate;
    }
  }

  save(): Promise<any> {
    const self = this
    if (self._id) {
      return Template.database.updateAsync({
        _id: self._id
      }, self, {});
    } else {
      return Template.database.insertAsync(self).then(function(newDoc) {
        self._id = newDoc._id;
        return self;
      });
    }
  }

  delete(): Promise<any> {
    return Template.database.removeAsync({
      _id: this._id
    }, {});
  }
}
