import { Component, Input, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';

import * as moment from 'moment';

import { ModalModule } from 'ngx-bootstrap';

import { Note, Template } from '../../../models';
import { EditorComponent } from '../../shared/editor/editor.component'
import { SharedDataService } from '../../../providers'

@Component({
  selector: 'app-accounts-notes',
  templateUrl: './notes.component.html',
  styleUrls: ['./notes.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountsNotesComponent {
  account
  notes: Array<Note> = []
  templates: Array<Template> = []
  markdown: string
  note: Note = null
  newMd = ''

  changed = false;
  autosave = true;
  lastSaved = moment();

  evernoteImport = false
  useEvernote = false

  private saving = false

  @Input()
  set currentAccount(account) {
    this.markdown = ''
    this.account = account;
    this.note = null;
    this.getAllNotes(account.Id)
  }
  constructor(private _sharedData: SharedDataService) {
    Template.getAll().then((templates) => {
      this.templates = templates
    })

    _sharedData.settings.subscribe((set) => {
      this.useEvernote = set.useEvernote
    })
  }

  mdChange(event) {
    this.newMd = event
    this.changed = true
  }

  getAllNotes(AccountId: string) {
    Note.getList(AccountId).then((notes) => {
      this.notes = notes
    })
  }

  formatDate(date: string) {
    return moment(date, 'ddd MMM DD YYYY HH:mm:ss');
  }

  loadNote(note) {
    Note.get(note._id).then((n) => {
      this.note = n
      this.markdown = n.markdown
      if (this.autosave && !this.saving) {
        this.save();
      }
    })
  }

  save() {
    this.saving = true;
    const self = this
    const loop = setInterval(function() {
      if (self.changed && self.note) {
        self.note.updateMd(self.newMd, this.useEvernote, self.account.Name)
        self.lastSaved = moment()
        self.changed = false
      }
      if (!self.autosave) {
        self.saving = false;
        clearInterval(loop);
        return;
      }
    }, 2000); // TODO : make interval configurable
  }

  changeAutosave() {
    this.autosave = !this.autosave
    if (this.autosave && !this.saving && this.note) {
      this.save();
    }
  }

  createNote(f: NgForm) {
    const newNote = f.value
    f.reset();
    let md = '## Table of Content\r\r{!toc}\r\r# Title 1';
    if (newNote.md) {
      md = newNote.md
    } else if (this.newMd !== '' && !this.note) {
      md = this.newMd
    }
    const self = this

    const n = new Note({
      AccountId: this.account.Id,
      title: newNote.Title,
      markdown: md
    }).save(this.useEvernote, self.account).then((note) => {
      self.notes.push(note);
      self.loadNote(note)
    })
  }

  importEvernote() {
    this.evernoteImport = true
    Note.importEvernoteNotes(this.account).then(() => {
      return this.getAllNotes(this.account.Id)
    }).then(() => {
      this.evernoteImport = false
    })
  }

  deleteNote() {
    this.note.delete(this.useEvernote)
    const index = this.notes.indexOf(this.note)
    this.notes.splice(index, 1)
    this.markdown = ''
    this.note = null
    this.changed = false
  }

}
