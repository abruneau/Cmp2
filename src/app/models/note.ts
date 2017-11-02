import { Database } from './database'

export class Note {
  protected static database = new Database('notes').database

  _id: string;
  AccountId: string;
  title: string;
  markdown: string;
  createdAt: Date;
  updatedAt: Date;

  static getAll(AccountId?): Promise<Note[]> {

    const query = AccountId ? { 'AccountId': AccountId } : {}

    return Note.database.findAsync(query).then((notes) => {
      if (notes.length) {
        return notes.map((t) => {
          return new Note(t)
        })
      } else {
        return []
      }
    })
  }

  static getList(AccountId?): Promise<any[]> {
    const query = AccountId ? { 'AccountId': AccountId } : {}

    return Note.database.findAsync({}, { title: 1, createdAt: 1, updatedAt: 1 })
  }

  static get(id): Promise<Note> {
    return Note.database.findOneAsync({ _id: id }).then((note) => {
      return new Note(note);
    })
  }

  constructor(object?) {
    if (object) {
      this._id = object._id;
      this.AccountId = object.AccountId;
      this.title = object.title;
      this.markdown = object.markdown;
      this.createdAt = object.createdAt;
      this.updatedAt = object.updatedAt;
    }
  }

  save(): Promise<any> {
    const note = new Note({
      _id: this._id,
      AccountId: this.AccountId,
      title: this.title,
      markdown: this.markdown,
      updatedAt: new Date()
    })

    if (this._id) {
      return Note.database.updateAsync({
        _id: this._id
      }, note, {});
    } else {
      note.createdAt = note.updatedAt
      return Note.database.insertAsync(note).then(function(newDoc) {
        note._id = newDoc._id;
        return note;
      });
    }
  }

  updateMd(md: string): Promise<any> {
    this.markdown = md;
    this.updatedAt = new Date()

    return Note.database.updateAsync({
      _id: this._id
    }, this, {});
  }

  delete(): Promise<any> {
    return Note.database.removeAsync({
      _id: this._id
    }, {});
  }
}
