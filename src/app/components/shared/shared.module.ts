import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { TypeaheadModule, PopoverModule, DatepickerModule } from 'ngx-bootstrap';

import {NgPipesModule} from 'ngx-pipes';

import { EditorComponent } from './editor/editor.component';
import { NavigationComponent } from './navigation/navigation.component';
import { TodolistComponent } from './todolist/todolist.component';
import { WeatherComponent } from './weather/weather.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    NgPipesModule,
    TypeaheadModule.forRoot(),
    PopoverModule.forRoot(),
    DatepickerModule.forRoot(),
  ],
  declarations: [
    EditorComponent,
    NavigationComponent,
    TodolistComponent,
    WeatherComponent,
  ],
  exports: [
    EditorComponent,
    NavigationComponent,
    TodolistComponent,
    WeatherComponent,
  ]
})
export class SharedModule { }
