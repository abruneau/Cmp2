import { Database } from './database'

export class Setting {
  protected static database = new Database('settings').database
  _id: string;
  useEvernote = false;
  useAppleNote = false;
  sf: {
    loginUrl: '',
    email: '',
    password: '',
    token: ''
  }

  static get(): Promise<any> {
    return this.database.findAsync({}).then((docs) => {
      if (docs.length) {
        return new Setting(docs[0]);
      } else {
        return new Setting().save()
      }
    })
  }

  constructor(object?) {
    if (object) {
      this._id = object._id
      this.sf = object.sf // TODO : should not be like this
      this.useEvernote = object.useEvernote || false
      this.useAppleNote = object.useAppleNote || false
    }
  }

  protected save(): Promise<any> {
    return Setting.database.insertAsync(this).then((newDoc) => {
      this._id = newDoc._id;
      return this;
    })
  }

  update(): Promise<any> {
    return Setting.database.updateAsync({ _id: this._id }, this, {})
  }
}
