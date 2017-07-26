import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AccountService } from './account.service';
import { IdentityService } from './identity.service';
import { SettingsService } from './settings.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    AccountService,
    SettingsService,
    IdentityService,
  ],
  declarations: []
})
export class ModelsModule { }
