declare const Application: any;

export function createNotebook(name: string) {
  const Evernote = Application('Evernote');
  const notebook = Evernote.notebooks.whose({
    name: name.replace(/'/g, '\\\'')
  });
  if (!notebook().length) {
    Evernote.createNotebook(name.replace(/'/g, '\\\''));
  }
}

export function getNoteList(notebook: string): Array<any> {
  const Evernote = Application('Evernote');
  const matches = Evernote.findNotes('notebook:"' + notebook + '"');
  return matches.map((m) => {
    return {
      noteLink: m.noteLink(),
      title: m.title(),
      creationDate: m.creationDate().toString(),
      notebook: m.notebook().name()
    }
  })
}

export function getHtml(note): string {
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
  if (matche) {
    return matche.htmlContent();
  } else {
    return 'Note not find';
  }

}

export function updateHtml(note, newHtml) {
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
  const html = newHtml.toString().replace(/\r?\n|\r/g, '').replace(/\"/g, '&quot;');
  matche.htmlContent = html;
}

export function createNoteWithHtml(title, notebook, html) {
  const Evernote = Application('Evernote');
  const note = Evernote.createNote({
    withHtml: html.toString().replace(/\r?\n|\r/g, '').replace(/\"/g, '&quot;'),
    title: title,
    notebook: notebook
  });
  return {
    noteLink: note.noteLink(),
    title: note.title(),
    creationDate: note.creationDate().toString(),
    notebook: note.notebook().name()
  };
}

export function deleteNote(note) {
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
  matche.delete();
};
