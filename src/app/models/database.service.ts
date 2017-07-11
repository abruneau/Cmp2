import { Injectable } from '@angular/core';

import { environment } from 'environments';

import { remote } from 'electron';
import * as path from 'path';
import * as Promise from 'bluebird';
import * as Datastore from 'nedb';

Promise.promisifyAll(Datastore.prototype);

@Injectable()
export class DatabaseService {

	public database

	constructor(model: String) {
		const db = model + '.db';

		if (environment.production) {
			this.database = new Datastore({
				filename: path.join(remote.app.getPath('userData'), 'database', db),
				autoload: true
			});
		} else {
			this.database = new Datastore({
				filename: path.join(remote.app.getPath('userData'), 'dev', 'database', db),
				autoload: true
			});
		}

	}

}
