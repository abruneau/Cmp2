import { Component, OnInit, AfterViewInit, Input, ViewEncapsulation } from '@angular/core';

import { NoteService } from '../../../models/note.service';
import { EvernoteService } from '../../../providers/evernote.service';
import { EditorComponent } from '../../modules/editor/editor.component';

@Component({
  selector: 'app-accounts-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsNotesComponent implements OnInit, AfterViewInit {
  account
  notes: Array<any> = []
  markdown: string

  @Input()
  set currentAccount(account) {
    this.account = account;
  }
  constructor(private _evernote: EvernoteService) {
  }

  ngOnInit() {
    this.notes = this._evernote.getAllNotes(this.account.Name)
    console.log(this.notes);
  }

  ngAfterViewInit() {
  }

  mdChange(event) {
    // console.log(event)
  }

}
