import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeganumberPipe } from './meganumber.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MeganumberPipe,
  ],
  exports: [
    MeganumberPipe,
  ]
})
export class PipesModule { }
