import * as EvernoteHelper from 'evernote-helper';
import { Database } from './database'
import * as Evernote from 'jxa-evernote'

export class Note {
  protected static database = new Database('notes').database

  _id: string;
  AccountId: string;
  title: string;
  markdown: string;
  createdAt: Date;
  updatedAt: Date;
  externalInfo: ExternalNoteInfo;

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

    return Note.database.findAsync(query, { title: 1, createdAt: 1, updatedAt: 1 })
  }

  static get(id): Promise<Note> {
    return Note.database.findOneAsync({ _id: id }).then((note) => {
      return new Note(note);
    })
  }

  static importEvernoteNotes(account) {
    return Evernote.Notebook
      .find(account.Name)
      .then((book) => {
        return book.notes()
      })
      .then((notes) => {
        return Promise.all(notes.map((note) => {
          const n = {
            AccountId: account.Id,
            title: note.title,
            markdown: EvernoteHelper.toMarkdown(note.htmlContent),
            createdAt: new Date(note.creationDate),
            updatedAt: new Date(),
            externalInfo: {
              EvernoteNotebook: note.notebook,
              EvernoteNoteLink: note.noteLink,
              EvernoteNoteId: note.id
            }
          }
          if (note.noteLink) {
            return Note.database.updateAsync({ 'externalInfo.EvernoteNoteLink': note.noteLink }, n, { upsert: true })
          } else {
            return Note.database.updateAsync({ 'externalInfo.EvernoteNotebook': note.notebook, title: note.title }, n, { upsert: true })
          }
        }))
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
      this.externalInfo = object.externalInfo as ExternalNoteInfo;
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
      }, {
          $set: {
            AccountId: this.AccountId,
            title: this.title,
            markdown: this.markdown,
            updatedAt: new Date()
          }
        }, {});
    } else {
      note.createdAt = note.updatedAt
      return Note.database.insertAsync(note).then(function(newDoc) {
        note._id = newDoc._id;
        return note;
      });
    }
  }

  updateMd(md: string): Promise<any> {
    return Note.database.updateAsync({
      _id: this._id
    }, { $set: { markdown: md, updatedAt: new Date() } }, {});
  }

  delete(): Promise<any> {
    return Note.database.removeAsync({
      _id: this._id
    }, {});
  }

  setExternalInfo(info): Promise<any> {
    return Note.database.updateAsync({
      _id: this._id
    }, { $set: info }, {});
  }

}

interface ExternalNoteInfo {
  EvernoteNoteLink?: string
  EvernoteNotebook?: string
  EvernoteNoteId?: string
  AppleNoteNotebookId?: string
  AppleNoteId?: string
}
