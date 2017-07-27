import 'zone.js/dist/zone-mix';
import 'reflect-metadata';
import 'polyfills';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { TabsModule, TypeaheadModule, ModalModule } from 'ngx-bootstrap';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { TemplatesComponent} from './components/templates/templates.component';

import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './components/shared/shared.module';
import { AccountsModule } from './components/accounts/accounts.module';

import { ModelsModule } from './models/models.module';

import { SalesforceService } from './providers/salesforce.service';
import { ThemeSpinnerService } from './providers/theme-spinner.service';
import { JxaService } from './providers/jxa.service';
import { FsService } from './providers/fs.service';
import { EvernoteService } from './providers/evernote.service';
import { MarkdownService } from './providers/markdown.service';

import { PipesModule } from './pipes/pipes.module';
import { OpenExternalDirective } from './providers/open-external.directive';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProfileComponent,
    TemplatesComponent,
    OpenExternalDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRoutingModule,
    SharedModule,
    PipesModule,
    AccountsModule,
    ModelsModule,
    TabsModule.forRoot(),
    TypeaheadModule.forRoot(),
    ModalModule,
    Ng2DeviceDetectorModule.forRoot()
  ],
  providers: [
    SalesforceService,
    ThemeSpinnerService,
    JxaService,
    FsService,
    EvernoteService,
    MarkdownService,
    { provide: APP_BASE_HREF, useValue: './' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
