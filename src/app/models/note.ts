import { FsService } from '../providers/fs.service';

import { EvernoteService } from '../providers/evernote.service';

export class Note {
  protected static _evernote = new EvernoteService()


  title: string
  creationDate: string
  path: string
  noteLink: string
  notebook: string

  private _fs: FsService

  static getAll(account): Promise<Array<Note>> {
    return Note._evernote.getAllNotes(account.Name).then((results) => {
      return results.map((note) => new Note(note))
    })
  }

  static create(notebook: string, title: string, md: string): Promise<Note> {
    return Note._evernote.createNote(notebook, title, md).then((note) => {
      return new Note(note)
    })
  }

  constructor(object?) {
    if (object) {
      this.title = object.title;
      this.creationDate = object.creationDate;
      this.path = object.path;
      this.noteLink = object.noteLink;
      this.notebook = object.notebook;
    }

  }

  getHtml(): Promise<string> {
    return Note._evernote.getHtml(this)
  }

  getMarkdown(): Promise<string> {
    return Note._evernote.getMarkdown(this)
  }

  updateMd(md: string) {
    Note._evernote.updateHtmlFromMd(this, md)
  }

  delete() {
    Note._evernote.deleteNote(this)
  }




  // static syncNotes(account) {
  //
  // }
  //
  // static getAll(account, _fs) {
  //   const list = _fs.ls(account.path + '/.notes')
  //     .filter((f) => { return f.directory === false && f.type === '.md'; })
  //     .map((f) => { return Note.fromFile(f, account.Name, _fs) })
  // }
  //
  //
  // private static fromFile(file, notebook, _fs): Note {
  //   return new Note({
  //     title: _fs.fileName(file.path).replace('.md', ''),
  //     creationDate: _fs.creationDate(file.path),
  //     notebook: notebook,
  //     path: file.path,
  //   })
  // }

}
