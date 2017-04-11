import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { routing } from './dashboard.routing';

import { NgaModule } from '../../theme/nga.module';

@NgModule({
  imports: [
    CommonModule,
    NgaModule,
    routing
  ],
  declarations: [DashboardComponent]
})
export class DashboardModule { }
