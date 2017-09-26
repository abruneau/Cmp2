import { Component, OnInit } from '@angular/core';
import 'rxjs/add/observable/of';
import { Router, NavigationStart } from '@angular/router';

import { TypeaheadMatch } from 'ngx-bootstrap';

import { Identity, Account } from '../../../models';
import { SharedDataService } from '../../../providers';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public identity: Identity = new Identity();
  public accounts: Array<Account> = [];
  public selected = null

  constructor(private _sharedData: SharedDataService, private _router: Router) {
    _sharedData.identity.subscribe((identity) => {
      if (identity) {
        this.identity = identity
      }
    })

    _sharedData.AccountList.subscribe((list) => {
      this.accounts = list;
    })
  }

  ngOnInit() {
  }

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    const route = '/account/' + e.item.Id;
    this._router.navigate([route]);
    this.selected = null;
  }

}
