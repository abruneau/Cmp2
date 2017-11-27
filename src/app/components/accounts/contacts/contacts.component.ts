import { Component, Input, OnInit } from '@angular/core';

import { SalesforceService } from '../../../providers';
import { Contact } from '../../../models'

@Component({
  selector: 'app-accounts-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.scss']
})
export class AccountsContactsComponent implements OnInit {

  accountId: string
  contacts: Contact[] = []
  refreshing = false
  search = ''
  sfLoginUrl: string

  @Input()
  set account(account) {
    this.accountId = account.Id
    this.loadContacts()
  }

  constructor(private _sf: SalesforceService) {
    _sf.loginUrl.subscribe((url) => {
      this.sfLoginUrl = url;
    })
  }

  ngOnInit() {
  }

  private loadContacts() {
    Contact.getAll(this.accountId).then((contacts) => {
      this.contacts = contacts
    })
  }

  updateContacts() {
    const self = this;
    this.refreshing = true
    this._sf.getContacts(this.accountId)
      .then((res) => {
        console.log(res)
        if (res) {
          this.contacts = []
          res.records.map((record) => {
            const contact = new Contact(record)
            contact.save()
            this.contacts.push(contact)
          })
        }
      })
      .then(() => {
        this.refreshing = false
      })
  }

}
