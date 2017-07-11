import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/Rx'

import * as jsforce from 'jsforce';

import { SettingsService } from '../models/settings.service'

@Injectable()
export class SalesforceService {

	private connection;
	private connectedSource = new BehaviorSubject<boolean>(false);
	public connected: Observable<boolean> = this.connectedSource.asObservable()
	public loginUrl = new BehaviorSubject<string>("");

	constructor(private _settings: SettingsService) {
		this.init()
	}

	public init() {
		this._settings.ready.subscribe((ready: boolean) => {
			if (ready && this.settingsAreComplit(this._settings.settings.sf)) {
				const sf = this._settings.settings.sf;
				this.loginUrl.next(sf.loginUrl);
				this.connection = new jsforce.Connection({
					loginUrl: sf.loginUrl
				});

				this.connection.login(sf.email, sf.password.concat(sf.token))
					.then((res) => {
						this.connectedSource.next(true);
						return;
					}, (err) => {
						console.error(err);
					});
			}
		});
	}

	private settingsAreComplit(sf): Boolean {
		if (sf && sf.loginUrl && sf.email && sf.password && sf.token) {
			return true;
		} else {
			return false;
		}
	}

	dashboard(): Promise<any> {
		return this.connection.query('SELECT ForecastCategoryName, sum(Amount) amount FROM Opportunity WHERE CloseDate = THIS_FISCAL_YEAR AND ForecastCategoryName != \'Omitted\' AND Id in (SELECT OpportunityId FROM OpportunityTeamMember WHERE Name = \'Antonin Bruneau\') GROUP BY ForecastCategoryName');
	}

	getIdentity(): Promise<any> {
		return this.connection.identity();
	}

	findAccountByName(name: String): Promise<any> {
		return this.connection.query('SELECT Id, Name, Owner.FirstName, Owner.LastName, Description FROM Account WHERE Name LIKE \'%' + name + '%\' LIMIT 10');
	}

	getAccount(id: String): Promise<any> {
		return this.connection.query('SELECT Id, Name, Industry, IsPartner, Type, Full_Address__c, CurrencyIsoCode, AnnualRevenue FROM Account WHERE Id = \'' + id + '\'')
	}

	getOpportunities(AccountId: string): Promise<any> {
		return this.connection.query('SELECT AccountId,AE_Next_Steps__c,Amount,Expansion_Amount__c,First_Year_ACV__c,First_Year_Amount__c,Fiscal,Id,IsClosed,IsDeleted,IsWon,Name,SE_Next_Steps__c,SE_Opportunity_Rating__c,StageName, (SELECT Name, TeamMemberRole FROM OpportunityTeamMembers) FROM Opportunity WHERE AccountId = \'' + AccountId + '\'')
	}

	query(q): Promise<any> {
		return this.connection.query(q);
	}

}
