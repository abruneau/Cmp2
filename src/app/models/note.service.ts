import { Injectable } from '@angular/core';

import { JxaService } from '../providers/jxa.service';
import { FsService } from '../providers/fs.service';
import * as ajs from 'apple-java-script';

@Injectable()
export class NoteService {

	constructor(private jxa: JxaService, private _fs: FsService) { }

	getAll(account) {
		const eNotes = ajs(account.Name, this.jxa.getNoteList);
	}

}
