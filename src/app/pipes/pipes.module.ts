import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MeganumberPipe } from './meganumber.pipe';
import { EnumPipe } from './enum.pipe';


@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [
    MeganumberPipe,
    EnumPipe,
  ],
  exports: [
    MeganumberPipe,
    EnumPipe,
  ]
})
export class PipesModule { }
