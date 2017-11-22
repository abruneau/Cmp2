import { Injectable } from '@angular/core';

import * as Evernote from 'jxa-evernote'
import * as AppleNotes from 'apple-notes-jxa'
import * as EvernoteHelper from 'evernote-helper';

import { MarkdownService, SharedDataService } from './';
import { Note } from '../models'


@Injectable()
export class ExternalNoteService {
  useEvernote = false
  useAppleNote = false

  constructor(private _md: MarkdownService, private _sharedData: SharedDataService) {
    _sharedData.settings.subscribe((set) => {
      this.useEvernote = set.useEvernote
      this.useAppleNote = set.useAppleNote
    })
  }

  public create(note: Note, notebook: string): Promise<any> {
    const p: Array<Promise<any>> = []
    const html = EvernoteHelper.prepareHtml(this._md.toHtml(note.markdown))
    if (this.useEvernote) {
      const evernote = Ever.createHtmlNote(note.title, notebook, html).then((eNote: Evernote.Note) => {
        note.setExternalInfo({
          'externalInfo.EvernoteNoteLink': eNote.noteLink,
          'externalInfo.EvernoteNoteId': eNote.id,
          'externalInfo.EvernoteNotebook': eNote.notebook
        })
      })
      p.push(evernote)
    }
    if (this.useAppleNote) {
      const appleNote = Apple.createNote(note.title, notebook, html).then((eNote: AppleNotes.Note) => {
        note.setExternalInfo({
          'externalInfo.AppleNoteId': eNote.id
        })
      })
      p.push(appleNote)
    }

    return Promise.all(p)
  }

  public update(note: Note, notebook: string): Promise<any> {
    const p: Array<Promise<any>> = []
    const html = EvernoteHelper.prepareHtml(this._md.toHtml(note.markdown))
    if (this.useEvernote) {
      const evernote = Ever.updateNoteHtml(note, notebook, html)
      p.push(evernote)
    }
    if (this.useAppleNote) {
      const appleNote = Apple.update(note, notebook, html)
      p.push(appleNote)
    }

    return Promise.all(p)
  }

  public delete(note: Note, notebook: string): Promise<any> {
    const p: Array<Promise<any>> = []
    if (this.useEvernote) {
      const evernote = Ever.deleteNote(note, notebook)
      p.push(evernote)
    }
    if (this.useAppleNote) {
      const appleNote = Apple.delete(note, notebook)
      p.push(appleNote)
    }

    return Promise.all(p)
  }

}

class Ever {
  private static evernoteInfoExists(note: Note): boolean {
    if (note.externalInfo && (note.externalInfo.EvernoteNoteLink ||
      (note.externalInfo.EvernoteNoteId && note.externalInfo.EvernoteNotebook))) {
      return true;
    } else {
      return false;
    }
  }

  public static createHtmlNote(title: string, notebook: string, html: string): Promise<Evernote.Note> {
    return Evernote.Note.create(title, notebook, undefined, html)
  }

  public static deleteNote(note: Note, notebook: string): Promise<any> {
    if (Ever.evernoteInfoExists(note)) {
      return new Evernote.Note({
        noteLink: note.externalInfo.EvernoteNoteLink,
        id: note.externalInfo.EvernoteNoteId,
        notebook: note.externalInfo.EvernoteNotebook
      }).delete()
    } else {
      return Evernote.Note.findByTitle(note.title, notebook).then((eNote: Evernote.Note) => {
        if (eNote.title) {
          return eNote.delete()
        }
        throw new Error('Note not found')
      })
    }
  }

  public static updateNoteHtml(note: Note, notebook: string, html: string): Promise<any> {
    if (Ever.evernoteInfoExists(note)) {
      return new Evernote.Note({
        noteLink: note.externalInfo.EvernoteNoteLink,
        id: note.externalInfo.EvernoteNoteId,
        notebook: note.externalInfo.EvernoteNotebook
      }).updateHtml(html)
    } else {
      return Evernote.Note.findByTitle(note.title, notebook).then((eNote: Evernote.Note) => {
        if (eNote.title) {
          note.setExternalInfo({
            'externalInfo.EvernoteNoteLink': eNote.noteLink,
            'externalInfo.EvernoteNoteId': eNote.id,
            'externalInfo.EvernoteNotebook': eNote.notebook
          })
          return eNote.updateHtml(html);
        } else {
          return Ever.createHtmlNote(note.title, notebook, html).then((eNote2: Evernote.Note) => {
            note.setExternalInfo({
              'externalInfo.EvernoteNoteLink': eNote2.noteLink,
              'externalInfo.EvernoteNoteId': eNote2.id,
              'externalInfo.EvernoteNotebook': eNote2.notebook
            })
          })
        }
      })
    }
  }
}

class Apple {
  private static infoExists(note: Note): boolean {
    if (note.externalInfo && note.externalInfo.AppleNoteId) {
      return true;
    }
    return false
  }

  public static createNote(name: string, notebook: string, body: string): Promise<AppleNotes.Note> {
    return AppleNotes.Folder.find(notebook)
      .then((folder: AppleNotes.Folder[]) => {
        return folder[0]
      })
      .catch((e) => {
        return AppleNotes.Folder.create(notebook)
      }).then((folder: AppleNotes.Folder) => {
        return new AppleNotes.Note({
          body, name
        }).create(folder.id)
      })
  }

  public static update(note: Note, notebook: string, body: string) {
    if (this.infoExists(note)) {
      return new AppleNotes.Note({
        id: note.externalInfo.AppleNoteId,
        name: note.title,
        body
      }).update()
    } else {
      return AppleNotes.Folder.find(notebook)
        .then((folder: AppleNotes.Folder[]) => {
          return folder[0]
        })
        .catch((e) => {
          return AppleNotes.Folder.create(notebook)
        }).then((folder: AppleNotes.Folder) => {
          return folder.findNote(note.title).then((n: AppleNotes.Note) => {
            n.body = body
            return n.update()
          }).catch((e) => {
            return new AppleNotes.Note({
              body,
              name: note.title
            }).create(folder.id)
          }).then((aNote) => {
            return note.setExternalInfo({
              'externalInfo.AppleNoteId': aNote.id
            })
          })
        })
    }
  }

  public static delete(note: Note, notebook: string) {
    if (this.infoExists(note)) {
      return new AppleNotes.Note({
        id: note.externalInfo.AppleNoteId
      }).delete()
    } else {
      return AppleNotes.Folder.find(notebook).then((folder: AppleNotes.Folder[]) => {
        return folder[0].findNote(note.title)
      }).then((n: AppleNotes.Note) => {
        return n.delete()
      })
    }
  }
}
