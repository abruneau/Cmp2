import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SalesforceService } from '../../../providers/salesforce.service';
import { AccountService } from '../../../models/account.service';

@Component({
	selector: 'app-accounts-search',
	templateUrl: './search.component.html',
	styleUrls: ['./search.component.scss']
})
export class AccountsSearchComponent implements OnInit {

	search = '';
	searching = false;
	options = [];
	message = "";

	constructor(private _sf: SalesforceService, private _Account: AccountService, private router: Router) {

	}

	ngOnInit() {
	}

	searchAccount(search) {
		this.searching = true;
		this._sf.findAccountByName(search).then((res) => {
			this.options = res.records;
			if (res.records.length > 0) {
				this.message = res.records.length + " results found for: “" + search + "”";
			} else {
				this.message = "No result found for: “" + search + "”";
			}
			this.searching = false;
		})
	}

	loadAccount(id) {
		this._sf.getAccount(id).then((res) => {
			if (res) {
				let account = this._Account.create(res.records[0]);
				account.save().then(() => {
					const route = '/account/' + account.Id;
					this.router.navigate([route]);
				})
			}
		})
	}
}
