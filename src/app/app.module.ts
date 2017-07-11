import 'zone.js';
import 'reflect-metadata';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { APP_BASE_HREF } from '@angular/common';

import { TabsModule, TypeaheadModule } from 'ngx-bootstrap';
import { Ng2DeviceDetectorModule } from 'ng2-device-detector';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavigationComponent } from './components/modules/navigation/navigation.component';
import { ProfileComponent } from './components/profile/profile.component';
import { WeatherComponent } from './components/modules/weather/weather.component';

import { AppRoutingModule } from './app-routing.module';
import { AccountsModule } from './components/accounts/accounts.module';

import { ModelsModule } from './models/models.module';

import { ElectronService } from './providers/electron.service';
import { SalesforceService } from './providers/salesforce.service';
import { ThemeSpinnerService } from './providers/theme-spinner.service';
import { JxaService } from './providers/jxa.service';
import { FsService } from './providers/fs.service';
import { EvernoteService } from './providers/evernote.service';


import { MeganumberPipe } from './pipes/meganumber.pipe';
import { TodolistComponent } from './components/modules/todolist/todolist.component';
import { OpenExternalDirective } from './providers/open-external.directive';
// import { EditorComponent } from './components/modules/editor/editor.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		NavigationComponent,
		MeganumberPipe,
		ProfileComponent,
		WeatherComponent,
		TodolistComponent,
		OpenExternalDirective,
		// EditorComponent,
	],
	imports: [
		BrowserModule,
		FormsModule,
		HttpModule,
		AppRoutingModule,
		AccountsModule,
		ModelsModule,
		TabsModule.forRoot(),
		TypeaheadModule.forRoot(),
		Ng2DeviceDetectorModule.forRoot()
	],
	providers: [
		ElectronService,
		SalesforceService,
		ThemeSpinnerService,
		JxaService,
		FsService,
		EvernoteService,
		{ provide: APP_BASE_HREF, useValue: './' }
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
