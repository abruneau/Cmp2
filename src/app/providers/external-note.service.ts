import { Injectable } from '@angular/core';

import * as Evernote from 'jxa-evernote'
import * as EvernoteHelper from 'evernote-helper';

import { MarkdownService, SharedDataService } from './';
import { Note } from '../models'


@Injectable()
export class ExternalNoteService {
  useEvernote = false

  constructor(private _md: MarkdownService, private _sharedData: SharedDataService) {
    _sharedData.settings.subscribe((set) => {
      this.useEvernote = set.useEvernote
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

    return Promise.all(p)
  }

  public update(note: Note, notebook: string): Promise<any> {
    const p: Array<Promise<any>> = []
    const html = EvernoteHelper.prepareHtml(this._md.toHtml(note.markdown))
    if (this.useEvernote) {
      const evernote = Ever.updateNoteHtml(note, notebook, html)
      p.push(evernote)
    }

    return Promise.all(p)
  }

  public delete(note: Note, notebook: string): Promise<any> {
    const p: Array<Promise<any>> = []
    if (this.useEvernote) {
      const evernote = Ever.deleteNote(note, notebook)
      p.push(evernote)
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
