import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/Rx'

import * as jsforce from 'jsforce';

import {SharedDataService } from './shared-data.service';


@Injectable()
export class SalesforceService {

  private connection;
  private connectedSource = new BehaviorSubject<boolean>(false);
  public connected: Observable<boolean> = this.connectedSource.asObservable()
  public loginUrl = new BehaviorSubject<string>('');
  private fullName: String

  constructor(private _sharedData: SharedDataService) {
    this.init()
  }

  public init() {
    this._sharedData.settings.subscribe((set) => {
      if (set && this.settingsAreComplit(set.sf)) {
        const sf = set.sf
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
    })

    this._sharedData.identity.subscribe((id) => {
      if (id) {
        this.fullName = id.display_name
      }
    })
  }

  private settingsAreComplit(sf): Boolean {
    if (sf && sf.loginUrl && sf.email && sf.password && sf.token) {
      return true;
    } else {
      return false;
    }
  }

  dashboard(): Promise<any> {
    return this.connection.query('SELECT ForecastCategoryName, sum(Amount) amount FROM Opportunity WHERE CloseDate = THIS_FISCAL_YEAR AND ForecastCategoryName != \'Omitted\' AND Id in (SELECT OpportunityId FROM OpportunityTeamMember WHERE Name = \'' + this.fullName + '\') GROUP BY ForecastCategoryName');
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
