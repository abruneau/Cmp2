import { Injectable } from '@angular/core';

declare var Application: any;

@Injectable()
export class JxaService {

	constructor() { }

	createNotebook(name: string) {
		var Evernote = Application('Evernote');
		var notebook = Evernote.notebooks.whose({
			name: name.replace(/'/g, "\\'")
		});
		if (!notebook().length) {
			Evernote.createNotebook(name.replace(/'/g, "\\'"));
		}
	}

	getNoteList(notebook: string): Array<any> {
		var Evernote = Application('Evernote');
		var matches = Evernote.findNotes('notebook:"' + notebook + '"');
		var result = [];
		for (var i = 0; i < matches.length; i++) {
			var out = {
				noteLink: matches[i].noteLink(),
				title: matches[i].title(),
				creationDate: matches[i].creationDate().toString(),
				notebook: matches[i].notebook().name()
			};
			result.push(out);
		}
		return result;
	}

	private findNote(note) {
		var Evernote = Application('Evernote');
		var matche;
		if (note.noteLink) {
			matche = Evernote.findNote(note.noteLink);
		} else {
			var queryString = "";
			if (note.title) {
				queryString += "intitle:\"" + note.title + "\"";
			}
			if (note.notebook) {
				queryString += " notebook:\"" + note.notebook + "\"";
			}
			var matches = Evernote.findNotes(queryString.replace(/'/g, "\\'"));
			if (matches) {
				matche = matches[0];
			} else {
				return null;
			}
		}
	}

	getHtml(note): string {
		var matche = this.findNote(note);
		if (matche) {
			return matche.htmlContent();
		} else {
			return 'Note not find';
		}

	}

}
