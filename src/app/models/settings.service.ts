import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx'

import { Setting } from './setting';
export { Setting } from './setting';

@Injectable()
export class SettingsService {

  public settings: Setting
  public ready = new BehaviorSubject(false);

  constructor() {
    Setting.get().then((set) => {
      this.settings = set;
      this.ready.next(true);
    })
  }

}
