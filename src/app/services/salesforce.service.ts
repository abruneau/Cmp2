import { Injectable } from '@angular/core';

import { BehaviorSubject } from 'rxjs/Rx'

import * as jsforce from 'jsforce';

@Injectable()
export class SalesforceService {

  private connection;
  public connected = new BehaviorSubject(false);

  constructor() {
    const url = 'https://cloudera.my.salesforce.com';
    const login = 'abruneau@cloudera.com';
    const password = 'Armstrong1801';
    const token = 'A76GhU1FKA2aPPDApbnLKewtN';

    this.connection = new jsforce.Connection({
      loginUrl: url
    });

    this.connection.login(login, password.concat(token))
      .then((res) => {
        this.connected.next(true);
        console.log('Connected');
        return;
      }, (err) => {
        console.error(err);
      });
  }

  dashboard(): Promise<any> {
    return this.connection.query('SELECT ForecastCategoryName, sum(Amount) amount FROM Opportunity WHERE CloseDate = THIS_FISCAL_YEAR AND ForecastCategoryName != \'Omitted\' AND Id in (SELECT OpportunityId FROM OpportunityTeamMember WHERE Name = \'Antonin Bruneau\') GROUP BY ForecastCategoryName');
  }

}
