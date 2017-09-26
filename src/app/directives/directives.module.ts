import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenExternalDirective } from './open-external.directive'
import { SIDEBAR_TOGGLE_DIRECTIVES } from './sidebar.directive';
import { AsideToggleDirective } from './aside.directive';
import { NAV_DROPDOWN_DIRECTIVES } from './nav-dropdown.directive';

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenExternalDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES
  ],
  exports: [
    OpenExternalDirective,
    SIDEBAR_TOGGLE_DIRECTIVES,
    AsideToggleDirective,
    NAV_DROPDOWN_DIRECTIVES
  ]
})
export class DirectivesModule { }
