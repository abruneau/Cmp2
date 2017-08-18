import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EvernoteService } from './evernote.service'
import { FsService } from './fs.service'
import { JxaService } from './jxa.service'
import { MarkdownService } from './markdown.service'
import { SalesforceService } from './salesforce.service'
import { SharedDataService } from './shared-data.service'
import { ThemeSpinnerService } from './theme-spinner.service'



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    EvernoteService,
    FsService,
    JxaService,
    MarkdownService,
    SalesforceService,
    SharedDataService,
    ThemeSpinnerService,
  ]
})
export class ServicesModule { }
