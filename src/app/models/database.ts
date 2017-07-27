import { remote } from 'electron';
import * as path from 'path';
import * as Promise from 'bluebird';
import * as Datastore from 'nedb';

const isProd = (process.env.NODE_ENV === 'production');

Promise.promisifyAll(Datastore.prototype);

export class Database {

  database

  constructor(model: String) {
    const db = model + '.db';

    if (isProd) {
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
