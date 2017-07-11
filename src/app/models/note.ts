import { FsService } from '../providers/fs.service';

export class Note {
	title: string
	creationDate: string
	path: string
	noteLink: string
	notebook: string

	private _fs: FsService

	constructor(object?) {
		if (object) {
			this.title = object.title;
			this.creationDate = object.creationDate;
			this.path = object.path;
			this.noteLink = object.noteLink;
			this.notebook = object.notebook;
		}

	}

	static syncNotes(account) {
		
	}

	static getAll(account, _fs) {
		const list = _fs.ls(account.path + '/.notes')
			.filter((f) => { return f.directory === false && f.type === '.md'; })
			.map((f) => { return Note.fromFile(f, account.Name, _fs) })
	}


	private static fromFile(file, notebook, _fs): Note {
		return new Note({
			title: _fs.fileName(file.path).replace('.md', ''),
			creationDate: _fs.creationDate(file.path),
			notebook: notebook,
			path: file.path,
		})
	}

}
