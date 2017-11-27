import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs/Rx'

import * as jsforce from 'jsforce';

import { SharedDataService } from './shared-data.service';


@Injectable()
export class SalesforceService {

  private connection: jsforce.Connection;
  private connectedSource = new BehaviorSubject<boolean>(false);
  public connected: Observable<boolean> = this.connectedSource.asObservable()
  public loginUrl = new BehaviorSubject<string>('');
  private fullName: string
  private connectionError: string = null

  constructor(private _sharedData: SharedDataService) {
    this._sharedData.settings.subscribe((set) => {
      if (set && this.settingsAreComplit(set.sf)) {
        this.connect(set.sf)
      }
    })

    this._sharedData.identity.subscribe((id) => {
      if (id) {
        this.fullName = id.display_name
      }
    })
  }

  private connect(sf): any {
    this.loginUrl.next(sf.loginUrl);
    this.connection = new jsforce.Connection({
      loginUrl: sf.loginUrl
    });

    this.connection.login(sf.email, sf.password.concat(sf.token))
      .then((res) => {
        this.connectedSource.next(true);
        this.connectionError = null
        return null;
      }).catch((err) => {
        this.connectionError = err
        return null;
      })
  }

  private settingsAreComplit(sf): boolean {
    if (sf && sf.loginUrl && sf.email && sf.password && sf.token) {
      return true;
    } else {
      return false;
    }
  }

  dashboard(): Promise<any> {
    return this.query('SELECT ForecastCategoryName, sum(Amount) amount FROM Opportunity WHERE CloseDate = THIS_FISCAL_YEAR AND ForecastCategoryName != \'Omitted\' AND Id in (SELECT OpportunityId FROM OpportunityTeamMember WHERE Name = \'' + this.fullName + '\') GROUP BY ForecastCategoryName');
  }

  getIdentity(): Promise<any> {
    return this.connection.identity();
  }

  findAccountByName(name: string): Promise<any> {
    return this.query('SELECT Id, Name, Owner.FirstName, Owner.LastName, Description FROM Account WHERE Name LIKE \'%' + name + '%\' LIMIT 10');
  }

  getAccount(id: string): Promise<any> {
    return this.query('SELECT Id, Name, Industry, IsPartner, Type, Full_Address__c, CurrencyIsoCode, AnnualRevenue FROM Account WHERE Id = \'' + id + '\'')
  }

  getOpportunities(AccountId: string): Promise<any> {
    return this.query('SELECT AccountId,AE_Next_Steps__c,Amount,Expansion_Amount__c,First_Year_ACV__c,First_Year_Amount__c,Fiscal,Id,IsClosed,IsDeleted,IsWon,Name,SE_Next_Steps__c,SE_Opportunity_Rating__c,StageName, (SELECT Name, TeamMemberRole FROM OpportunityTeamMembers) FROM Opportunity WHERE AccountId = \'' + AccountId + '\'')
  }

  getContacts(AccountId: string): Promise<any> {
    return this.query('SELECT Id, AccountId, Email,FirstName,LastName,MobilePhone,Name,Phone,Title FROM Contact WHERE AccountId = \'' + AccountId + '\'')
  }

  query(q): Promise<any> {
    console.log(q)
    if (this.connectedSource.getValue()) {
      return this.connection.query(q);
    } else {
      return Promise.reject(new Error('Not Connected'))
    }
  }

}
