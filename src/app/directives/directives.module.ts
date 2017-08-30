import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenExternalDirective } from './open-external.directive'
import { LeftMenuDirective } from './left-menu.directive';
import { TreeToggleDirective } from './tree-toggle.directive';
import { SubTreeToggleDirective } from './sub-tree-toggle.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenExternalDirective,
    LeftMenuDirective,
    TreeToggleDirective,
    SubTreeToggleDirective
  ],
  exports: [
    OpenExternalDirective,
    LeftMenuDirective,
    TreeToggleDirective,
    SubTreeToggleDirective
  ]
})
export class DirectivesModule { }
