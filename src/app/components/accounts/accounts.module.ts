import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TabsModule } from 'ngx-bootstrap';

import { AccountsComponent } from './accounts.component';
import { AccountsSearchComponent } from './search/search.component';
import { AccountsSettingsComponent } from './settings/settings.component';
import { AccountsFilesComponent } from './files/files.component';
import { AccountsNotesComponent } from './notes/notes.component';

import { EditorComponent } from '../modules/editor/editor.component';
import { AccountsOpportunitiesComponent } from './opportunities/opportunities.component';

@NgModule({
	imports: [
		CommonModule,
		FormsModule,
		TabsModule.forRoot()
	],
	declarations: [
		AccountsComponent,
		AccountsSearchComponent,
		AccountsSettingsComponent,
		AccountsFilesComponent,
		AccountsNotesComponent,
		EditorComponent,
		AccountsOpportunitiesComponent
	]
})
export class AccountsModule { }
