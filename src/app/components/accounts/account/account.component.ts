import { Component, OnInit, Input } from '@angular/core';

import { TodolistComponent } from '../../shared/todolist/todolist.component'
import { Opportunity } from '../../../models';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  account
  forcast: number
  closed: number

  @Input()
  set currentAccount(account) {
    this.account = account
    this.computeInfo()
  }

  constructor() { }

  ngOnInit() {
  }

  computeInfo() {
    Opportunity.getAll(this.account.Id).then((oppies) => {
      this.forcast = oppies.filter((o) => {
        return !o.IsClosed
      }).reduce((sum, o) => {
        return sum + o.Amount
      }, 0)
      this.closed = oppies.filter((o) => {
        return o.IsWon
      }).reduce((sum, o) => {
        return sum + o.Amount
      }, 0)
    })
  }

}
