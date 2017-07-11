import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { TabsetComponent } from 'ngx-bootstrap';

import { Setting, SettingsService } from '../../models/settings.service';
import { IdentityService } from '../../models/identity.service';
import { SalesforceService } from '../../providers/salesforce.service';

declare var $: any;

@Component({
	selector: 'app-profile',
	templateUrl: './profile.component.html',
	styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, AfterViewInit {

	@ViewChild('staticTabs') staticTabs: TabsetComponent;

	public settings = new Setting();
	public identity = {};
	public connected = false;

	constructor(private _settings: SettingsService, private _sf: SalesforceService, private _identity: IdentityService) {
		this.settings = _settings.settings;

		_settings.ready.subscribe((ready: boolean) => {
			if (ready) {
				this.settings = _settings.settings;
			}
		});

		_sf.connected.subscribe((connected: boolean) => {
			this.connected = connected;
		})

		_identity.ready.subscribe((ready: boolean) => {
			if (ready) {
				this.identity = _identity.identity;
			}
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
			this._sf.init();
		});
	}

	public updateIdentity() {
		this._identity.update().then(() => {
			this.identity = this._identity.identity;
		})
	}

}
