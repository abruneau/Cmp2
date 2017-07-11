import { Component, OnInit, Input } from '@angular/core';

import { shell } from 'electron'

import { SalesforceService } from '../../../providers/salesforce.service';
import { OpportunityService, Opportunity } from '../../../models/opportunity.service';

@Component({
	selector: 'app-accounts-opportunities',
	templateUrl: './opportunities.component.html',
	styleUrls: ['./opportunities.component.scss']
})
export class AccountsOpportunitiesComponent implements OnInit {

	account

	@Input()
	set currentAccount(account) {
		this.account = account
		this.loadOppies();
	}

	oppies: Array<Opportunity> = [];
	sfLoginUrl: string = ""
	showClosedOpport: boolean = false

	constructor(private _sf: SalesforceService, private _Opportunity: OpportunityService) {
		_sf.loginUrl.subscribe((url) => {
			this.sfLoginUrl = url;
		})
	}

	ngOnInit() {
	}

	private loadOppies() {
		this._Opportunity.getAll(this.account.Id).then((oppies) => {
			this.oppies = oppies
		})
	}


	updateOpportunities() {
		const self = this;
		this._sf.getOpportunities(this.account.Id).then((res) => {
			if (res) {
				self.oppies = []
				res.records.map((record) => {
					let oppy = this._Opportunity.create(record)
					oppy.save()
					self.oppies.push(oppy)
				})
			}
		})
	}

	openSfOpport(Id) {
		shell.openExternal(this.sfLoginUrl + '/' + Id)
	}

}
