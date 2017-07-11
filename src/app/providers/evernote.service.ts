import { Injectable } from '@angular/core';

import { JxaService } from './jxa.service';
import * as ajs from 'apple-java-script';
import { Note } from '../models/note';
import * as EvernoteHelper from 'evernote-helper';

@Injectable()
export class EvernoteService {

	constructor(private jxa: JxaService) { }

	getAllNotes(notebook: string): Array<Note> {
		return ajs(notebook, this.jxa.getNoteList)
			.map((note) => { new Note(note) });
	}

	createNotebook(name: string) {
		return ajs(name, this.jxa.createNotebook)
	}

	getHtml(note: Note): string {
		return ajs(note, this.jxa.getHtml)
	}

	getMarkdown(note: Note): string {
		return EvernoteHelper.toMarkdown(this.getHtml(note))
	}

}
