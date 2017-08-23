import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap';
import { ModalModule } from 'ngx-bootstrap';
import { NgPipesModule } from 'ngx-pipes';

import { SharedModule } from '../shared/shared.module';
import { PipesModule } from '../../pipes/pipes.module';
import { DirectivesModule } from '../../directives/directives.module'

import { AccountsComponent } from './accounts.component';
import { AccountComponent } from './account/account.component';
import { AccountsSearchComponent } from './search/search.component';
import { AccountsSettingsComponent } from './settings/settings.component';
import { AccountsFilesComponent } from './files/files.component';
import { AccountsNotesComponent } from './notes/notes.component';

import { AccountsOpportunitiesComponent } from './opportunities/opportunities.component';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    SharedModule,
    PipesModule,
    DirectivesModule,
    NgPipesModule,
    TabsModule.forRoot(),
    ModalModule.forRoot(),
  ],
  declarations: [
    AccountsComponent,
    AccountComponent,
    AccountsSearchComponent,
    AccountsSettingsComponent,
    AccountsFilesComponent,
    AccountsNotesComponent,
    AccountsOpportunitiesComponent,
  ]
})
export class AccountsModule { }
