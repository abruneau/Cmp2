import { Injectable } from '@angular/core';

import * as ipcPromise from 'ipc-promise';
import * as EvernoteHelper from 'evernote-helper';
import { MarkdownService } from '../providers/markdown.service';

@Injectable()
export class EvernoteService {
  private _md = new MarkdownService();

  constructor() { }

  getAllNotes(notebook: string): Promise<Array<any>> {
    return ipcPromise.send('jxa-evernote-getNoteList', { notebook: notebook })
  }

  createNotebook(name: string) {
    return ipcPromise.send('jxa-evernote-createNotebook', { title: name })
  }

  getHtml(note): Promise<string> {
    return ipcPromise.send('jxa-evernote-getHtml', { note: note })
  }

  getMarkdown(note): Promise<string> {
    return this.getHtml(note).then((html) => {
      return EvernoteHelper.toMarkdown(html)
    })
  }

  updateHtmlFromMd(note, md) {
    const newHtml = EvernoteHelper.prepareHtml(this._md.toHtml(md))
    ipcPromise.send('jxa-evernote-updateHtml', { note: note, newHtml: newHtml })
  }

  createNote(notebook, title, md): Promise<any> {
    const html = EvernoteHelper.prepareHtml(this._md.toHtml(md))
    return ipcPromise.send('jxa-evernote-createNoteWithHtml', { title, notebook, html })
  }

  deleteNote(note) {
    return ipcPromise.send('jxa-evernote-deleteNote', { note: note })
  }

}
