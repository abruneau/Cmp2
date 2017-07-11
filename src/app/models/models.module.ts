import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from './account.service';
import { IdentityService } from './identity.service';
import { OpportunityService } from './opportunity.service';
import { SettingsService } from './settings.service';
import { TodosService } from './todo.service';

@NgModule({
	imports: [
		CommonModule
	],
	providers: [
		AccountService,
		SettingsService,
		IdentityService,
		TodosService,
		OpportunityService,
	],
	declarations: []
})
export class ModelsModule { }
