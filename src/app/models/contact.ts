import { Database } from './database'

export class Contact {
  protected static database = new Database('contacts').database

  _id: string
  AccountId: string
  Id: string
  Email: string
  FirstName: string
  LastName: string
  MobilePhone: string
  Name: string
  Phone: string
  Title: string

  static getAll(AccountId?: string): Promise<Contact[]> {
    let query;

    if (AccountId) {
      query = { 'AccountId': AccountId };
    } else {
      query = {};
    }

    return Contact.database.findAsync(query).then((contacts) => {
      if (contacts.length) {
        return contacts.map((contact) => {
          return new Contact(contact)
        })
      } else {
        return []
      }
    })
  }

  static get(Id): Promise<Contact> {
    return Contact.database.findOneAsync({ Id: Id }).then((contact) => {
      return new Contact(contact);
    })
  }

  static deleteAll(AccountId): Promise<any> {
    return Contact.database.removeAsync({
      AccountId: AccountId
    }, { multi: true });
  }

  constructor(object?) {
    if (object) {
      this._id = object._id
      this.AccountId = object.AccountId
      this.Id = object.Id
      this.Email = object.Email
      this.FirstName = object.FirstName
      this.LastName = object.LastName
      this.MobilePhone = object.MobilePhone
      this.Name = object.Name
      this.Phone = object.Phone
      this.Title = object.Title
    }

    Contact.database.ensureIndex({
      fieldName: 'AccountId'
    }, function(err) {
      if (err) {
        console.log(err);
      }
    });
  }

  save(): Promise<any> {
    const self = this;
    return Contact.database
      .updateAsync({
        Id: self.Id
      }, self, { upsert: true });
  }

}
