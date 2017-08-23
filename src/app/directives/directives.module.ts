import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OpenExternalDirective } from './open-external.directive'

@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [
    OpenExternalDirective
  ],
  exports: [
    OpenExternalDirective
  ]
})
export class DirectivesModule { }
