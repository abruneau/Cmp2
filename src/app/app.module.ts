import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { TabsModule, TypeaheadModule, ModalModule } from 'ngx-bootstrap';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';
import { SortablejsModule } from 'angular-sortablejs'

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TemplatesComponent } from './components/templates/templates.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { AccountsModule } from './components/accounts/accounts.module';
import { ServicesModule } from './providers/services.module';

import { NgPipesModule } from 'ngx-pipes';
import { PipesModule } from './pipes/pipes.module';
import { DashboardsComponent } from './components/dashboards/dashboards.component';
import { DirectivesModule } from './directives/directives.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TemplatesComponent,
    DashboardsComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    PipesModule,
    NgPipesModule,
    AccountsModule,
    ServicesModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule,
    Ng2DeviceDetectorModule.forRoot(),
    DirectivesModule,
    SortablejsModule
  ],
  providers: [
    { provide: APP_BASE_HREF, useValue: './' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
