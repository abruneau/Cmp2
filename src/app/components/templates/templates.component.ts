import { Component, OnInit } from '@angular/core';

import * as moment from 'moment';

import { EditorComponent } from '../shared/editor/editor.component';
import { Template } from '../../models/template';

@Component({
  selector: 'app-templates',
  templateUrl: './templates.component.html',
  styleUrls: ['./templates.component.scss']
})
export class TemplatesComponent implements OnInit {

  markdown: string
  templates: Array<Template>
  template: Template = null
  newTemplate = ''
  newMd = ''

  changed = false;
  autosave = true;
  lastSaved = moment();

  private saving = false

  constructor() {
    Template.getAll().then((templates) => {
      this.templates = templates
    })
  }

  ngOnInit() {
  }

  save() {
    this.saving = true;
    const self = this
    const loop = setInterval(function() {
      if (self.changed && self.template) {
        self.template.md = self.newMd;
        self.template.lastUpdate = moment();
        self.template.save()
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

  formatDate(date) {
    return moment(date);
  }

  mdChange(event) {
    this.newMd = event
    this.changed = true
  }

  loadTemplate(template) {
    this.template = template
    this.markdown = template.md
    if (this.autosave && !this.saving) {
      this.save();
    }
  }

  changeAutosave() {
    this.autosave = !this.autosave
    if (this.autosave && !this.saving && this.template) {
      this.save();
    }
  }

  createTemplate() {
    let md = '## Table of Content\r\r{!toc}\r\r# Title 1';
    if (this.newMd !== '' && !this.template) {
      md = this.newMd
    }

    const self = this
    new Template({
      md: md,
      title: self.newTemplate,
      lastUpdate: moment()
    }).save().then((template) => {
      self.template = template
      self.templates.push(template)
      self.markdown = template.md
      if (self.autosave && !self.saving) {
        self.save();
      }
    })
    this.newTemplate = ''
  }

  deleteTemplate() {
    this.template.delete()
    const index = this.templates.indexOf(this.template)
    this.templates.splice(index, 1)
    this.markdown = ''
    this.template = null
    this.changed = false
  }
}
