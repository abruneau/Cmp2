import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

import { Setting } from '../../models';
import { Identity } from '../../models';
import { SalesforceService, SharedDataService } from '../../providers';

declare const $: any;

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

  @ViewChild('staticTabs') staticTabs: TabsetComponent;

  public settings = new Setting();
  public identity: Identity;
  public connected = false;

  constructor(private _sharedData: SharedDataService,
    private _sf: SalesforceService,
  ) {

    _sharedData.settings.subscribe((set) => {
      this.settings = set
    })

    _sf.connected.subscribe((connected: boolean) => {
      this.connected = connected;
    })

    _sharedData.identity.subscribe((id) => {
      this.identity = id
    })
  }

  ngOnInit() {
  }

  ngAfterViewInit() {
    $('.nav-tabs').addClass('nav-tabs-v5');
    $('.tab-content').addClass('tab-content-v5');
  }

  public update() {
    this.settings.update().then(() => {
      return this._sharedData.settingsChanges()
    })
  }

  public updateIdentity() {
    this._sf.getIdentity().then((res) => {
      this.identity = res
      return this.identity.update()
    }).then(() => {
      this._sharedData.identityChanges()
    })
  }

}
