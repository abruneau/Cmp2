import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FsService } from './fs.service'
import { JxaService } from './jxa.service'
import { MarkdownService } from './markdown.service'
import { SalesforceService } from './salesforce.service'
import { SharedDataService } from './shared-data.service'
import { ThemeSpinnerService } from './theme-spinner.service'
import { DatabaseMigrationService } from './database-migration.service'



@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    FsService,
    JxaService,
    MarkdownService,
    SalesforceService,
    SharedDataService,
    ThemeSpinnerService,
    DatabaseMigrationService,
  ]
})
export class ServicesModule { }
