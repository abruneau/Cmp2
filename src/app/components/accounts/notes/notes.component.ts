import { Component, Input, ViewEncapsulation } from '@angular/core';
import {NgForm} from '@angular/forms';

import * as moment from 'moment';

import { ModalModule } from 'ngx-bootstrap';

import { Note, Template } from '../../../models';
import { EditorComponent } from '../../shared/editor/editor.component'

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

  private saving = false

  @Input()
  set currentAccount(account) {
    this.markdown = ''
    this.account = account;
    this.getAllNotes(account.Name)
  }
  constructor() {
    Template.getAll().then((templates) => {
      this.templates = templates
    })
  }

  mdChange(event) {
    this.newMd = event
    this.changed = true
  }

  getAllNotes(notebook: string) {
    Note.getAll(this.account).then((notes) => {
      this.notes = notes
    })
  }

  formatDate(date: string) {
    return moment(date, 'ddd MMM DD YYYY HH:mm:ss');
  }

  loadNote(note) {
    const self = this
    this.note = note
    note.getMarkdown().then((md) => {
      self.markdown = md
    })
    if (this.autosave && !this.saving) {
      this.save();
    }
  }

  save() {
    this.saving = true;
    const self = this
    const loop = setInterval(function() {
      if (self.changed && self.note) {
        self.note.updateMd(self.newMd)
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
    Note.create(this.account.Name, newNote.Title, md).then((note) => {
      self.notes.push(note);
      self.loadNote(note)
    })
  }

  deleteNote() {
    this.note.delete()
    const index = this.notes.indexOf(this.note)
    this.notes.splice(index, 1)
    this.markdown = ''
    this.note = null
    this.changed = false
  }

}
