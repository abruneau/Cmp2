import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/Rx'

import { Account, Dashboard, Identity, Setting } from '../models'

@Injectable()
export class SharedDataService {

  public AccountList = new BehaviorSubject([]);
  public DashboardList = new BehaviorSubject([])
  public identity = new BehaviorSubject<Identity>(null)
  public settings = new BehaviorSubject<Setting>(null)

  constructor() {
    this.accountsChanges()
    this.dashboardChanges()
    this.identityChanges()
    this.settingsChanges()
  }

  accountsChanges(): void {
    Account.getList().then((accounts) => {
      this.AccountList.next(accounts);
    })
  }

  dashboardChanges(): void {
    Dashboard.getList().then((dash) => {
      this.DashboardList.next(dash)
    })
  }

  settingsChanges(): void {
    Setting.get().then((set) => {
      this.settings.next(set)
    })
  }

  identityChanges(): void {
    Identity.get().then((id) => {
      this.identity.next(id)
    })
  }

}
