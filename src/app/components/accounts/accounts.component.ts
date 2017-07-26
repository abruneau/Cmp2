import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import {Params, ActivatedRoute, Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap';

import { shell, remote } from 'electron'
const process = remote.process;

import {AccountService} from '../../models/account.service';
import {SalesforceService} from '../../providers/salesforce.service';

import { AccountComponent } from './account/account.component';
import { AccountsSettingsComponent } from './settings/settings.component';
import { AccountsFilesComponent } from './files/files.component';
import { AccountsNotesComponent } from './notes/notes.component';
import { AccountsOpportunitiesComponent } from './opportunities/opportunities.component';

declare const $: any;

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsComponent implements OnInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  account
  sfLoginUrl = ''
  active = 0;

  constructor(private route: ActivatedRoute,
    private _account: AccountService,
    private _sf: SalesforceService,
    private router: Router) {
    _sf.loginUrl.subscribe((url) => {
      this.sfLoginUrl = url;
    })
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.getAccount(params['id'])
    });
  }

  getAccount(id) {
    this._account.get(id).then((account) => this.account = account)
  }

  openSfAccount() {
    shell.openExternal(this.sfLoginUrl + '/' + this.account.Id)
  }

  removeAccount() {
    this.account.delete().then(() => {
      this._account.notifyChanges();
      this.router.navigate(['/']);
    })
  }

  updateAccountInfo() {
    this._sf.getAccount(this.account.Id).then((res) => {
      if (res) {
        this.account.update(res.records[0]);
        this.account.save();
      }
    })
  }

  changeFavoritStatus() {
    this.account.Stared = !this.account.Stared
    this.account.save()
  }

  selectTab(tab_id: number) {
    this.active = tab_id;
    this.staticTabs.tabs[tab_id].active = true;
  }


}
