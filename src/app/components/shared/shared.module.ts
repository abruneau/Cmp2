import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TypeaheadModule, PopoverModule, ModalModule } from 'ngx-bootstrap';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

import { NgPipesModule } from 'ngx-pipes';

import { DirectivesModule } from './../../directives/directives.module'
import { PipesModule } from './../../pipes/pipes.module';
import { EditorComponent } from './editor/editor.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TodolistComponent } from './todolist/todolist.component';
import { WeatherComponent } from './weather/weather.component';
import { HeaderComponent } from './header/header.component';
import { SmartTableComponent } from './smart-table/smart-table.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule,
    DirectivesModule,
    PipesModule,
  ],
  declarations: [
    EditorComponent,
    NavigationComponent,
    TodolistComponent,
    WeatherComponent,
    HeaderComponent,
    SmartTableComponent,
  ],
  exports: [
    EditorComponent,
    NavigationComponent,
    TodolistComponent,
    WeatherComponent,
    HeaderComponent,
    SmartTableComponent,
  ]
})
export class SharedModule { }
