import { remote } from 'electron';
import * as path from 'path';
import * as Promise from 'bluebird';
import * as Datastore from 'nedb';
import { environment } from 'environments';

Promise.promisifyAll(Datastore.prototype);

export class Database {

  database

  constructor(model: string) {
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
