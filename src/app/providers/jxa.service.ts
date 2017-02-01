import { Injectable } from '@angular/core';

// import { Application } from 'jxa';

declare const Application: any;

@Injectable()
export class JxaService {

  constructor() { }

  createNotebook(name: string) {
    const Evernote = Application('Evernote');
    const notebook = Evernote.notebooks.whose({
      name: name.replace(/'/g, '\\\'')
    });
    if (!notebook().length) {
      Evernote.createNotebook(name.replace(/'/g, '\\\''));
    }
  }

  getNoteList = (notebook) => {
    const Evernote = Application('Evernote');
    const matches = Evernote.findNotes('notebook:"Servier"');
    return matches.map((m) => {
      return {
        noteLink: m.noteLink(),
        title: m.title(),
        creationDate: m.creationDate().toString(),
        notebook: m.notebook().name()
      }
    })
  }

  private findNote(note) {
    const Evernote = Application('Evernote');
    let matche;
    if (note.noteLink) {
      matche = Evernote.findNote(note.noteLink);
    } else {
      let queryString = '';
      if (note.title) {
        queryString += 'intitle:"' + note.title + '"';
      }
      if (note.notebook) {
        queryString += ' notebook:"' + note.notebook + '"';
      }
      const matches = Evernote.findNotes(queryString.replace(/'/g, '\\\''));
      if (matches) {
        matche = matches[0];
      } else {
        return null;
      }
    }
  }

  getHtml(note): string {
    const matche = this.findNote(note);
    if (matche) {
      return matche.htmlContent();
    } else {
      return 'Note not find';
    }

  }

}
