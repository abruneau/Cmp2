import { Database } from './database'

export class Identity {
  protected static database = new Database('identity').database

  _id: string;
  display_name: string;
  addr_street: string;
  addr_zip: string;
  addr_city: string;
  email: string;

  static init(): Promise<any> {
    return Identity.database.insertAsync(new Identity()).then((newDoc) => {
      return new Identity(newDoc)
    })
  }

  static get(): Promise<any> {
    return Identity.database.findAsync({}).then((docs) => {
      if (docs.length) {
        return new Identity(docs[0])
      } else {
        return Identity.init()
      }
    })
  }

  constructor(object?) {
    if (object) {
      this.display_name = object.display_name;
      this.addr_street = object.addr_street;
      this.addr_zip = object.addr_zip;
      this.addr_city = object.addr_city;
      this.email = object.email;
      this._id = object._id;
    }
  }

  update(): Promise<any> {
    return Identity.database.updateAsync({ _id: this._id }, this, {})
  }

}
