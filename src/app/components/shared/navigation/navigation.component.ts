import { Component, AfterViewInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/observable/of';
import { Router, NavigationStart } from '@angular/router';

import { TypeaheadMatch } from 'ngx-bootstrap';

import 'moment';
// import 'bootstrap'
import * as moment from 'moment'
declare const $: any;

import { Account, Dashboard } from '../../../models';
import { SharedDataService } from '../../../providers';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.scss']
})
export class NavigationComponent implements AfterViewInit {

  public accounts: Array<Account> = [];
  public dashboards: Array<Dashboard> = []
  public selected: string;
  public search: '';

  clock = Observable
    .interval(1000)
    .map(() => new Date());

  constructor(private _sharedData: SharedDataService, private _router: Router) {

    _sharedData.AccountList.subscribe((list) => {
      this.accounts = list;
    })

    _sharedData.DashboardList.subscribe((list) => {
      this.dashboards = list
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
  }

}
