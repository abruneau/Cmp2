import { Component, OnInit, Input } from '@angular/core';

import { shell } from 'electron'

import { SalesforceService } from '../../../providers';
import { Opportunity } from '../../../models'

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
  sfLoginUrl = ''
  showClosedOpport = false
  search = ''
  sortType = 'Name'
  sortReverse = true

  constructor(private _sf: SalesforceService) {
    _sf.loginUrl.subscribe((url) => {
      this.sfLoginUrl = url;
    })
  }

  ngOnInit() {
  }

  private loadOppies() {
    Opportunity.getAll(this.account.Id).then((oppies) => {
      this.oppies = oppies
    })
  }


  updateOpportunities() {
    const self = this;
    this._sf.getOpportunities(this.account.Id).then((res) => {
      if (res) {
        self.oppies = []
        res.records.map((record) => {
          const oppy = new Opportunity(record)
          oppy.save()
          self.oppies.push(oppy)
        })
      }
    })
  }

  openSfOpport(Id) {
    shell.openExternal(this.sfLoginUrl + '/' + Id)
  }

  sort(): string {
    let str = this.sortType
    if (!this.sortReverse) {
      str = '-' + this.sortType
    }
    return str
  }

}
