import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { Router, NavigationStart } from '@angular/router';

import { TypeaheadMatch } from 'ngx-bootstrap';

import 'moment';
import 'bootstrap'
import * as moment from 'moment'
declare const $: any;

import { Identity, Account, Dashboard } from '../../../models';
import { SharedDataService } from '../../../providers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {

  public identity: Identity = new Identity();
  public accounts: Array<Account> = [];
  public dashboards: Array<Dashboard> = []
  public selected: string;
  public search: '';

  clock = Observable
    .interval(1000)
    .map(() => new Date());

  constructor(private _sharedData: SharedDataService, private _router: Router) {
    _sharedData.identity.subscribe((id) => {
      if (id) {
        this.identity = id
      }
    })

    _sharedData.AccountList.subscribe((list) => {
      this.accounts = list;
    })

    _sharedData.DashboardList.subscribe((list) => {
      this.dashboards = list
    })

    _router.events
      .filter((event) => event instanceof NavigationStart)
      .subscribe((val: NavigationStart) => {
        if (val.url === '/blank') {
          this.showAddon()
        } else {
          this.hideAddon()
        }
      })

  }

  createDashboard(f: NgForm) {
    const dash = new Dashboard({
      title: f.value.title
    })
    dash.save().then((d) => {
      this._sharedData.dashboardChanges()
      const route = '/dashboards/' + d._id;
      this._router.navigate([route]);
    })
    f.reset()
  }

  ngAfterViewInit() {
    this.hide();
  }

  private hide = function() {
    $('.tree').hide();
    $('.sub-tree').hide();
  };

  public typeaheadOnSelect(e: TypeaheadMatch): void {
    const route = '/account/' + e.item.Id;
    this._router.navigate([route]);
  }

  private showAddon(): any {
    this._sharedData.showAddon.next(true)
  }

  private hideAddon(): any {
    this._sharedData.showAddon.next(false)
  }

}
