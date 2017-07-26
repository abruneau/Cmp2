import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx'

import { Database } from './database'
import { SalesforceService } from '../providers/salesforce.service';

import { Identity } from './identity'

@Injectable()
export class IdentityService extends Database {

  public identity: Identity
  public ready = new BehaviorSubject<boolean>(false);

  constructor(private _sf: SalesforceService) {
    super('identity');

    this.database.findAsync({}).then((docs) => {
      if (docs.length) {
        this.identity = docs[0];
        this.ready.next(true);
      } else {
        this.init();
      }
    })
  }

  private init(): any {
    const identity = {};
    this.database.insertAsync(identity).then((newDoc) => {
      this.identity = newDoc;
      this.ready.next(true);
    })
  }

  update(): Promise<any> {
    return this._sf.getIdentity().then((res) => {
      this.identity = new Identity(res, this.identity._id);
      return this.database.update({ _id: this.identity._id }, this.identity, {})
    })
  }

}
