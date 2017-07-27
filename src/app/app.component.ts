import { Component, AfterViewInit } from '@angular/core';
import { ThemeSpinnerService } from './providers/theme-spinner.service'

// import $ from 'jquery';
import * as bootstrap from 'bootstrap';

import { NavigationComponent } from './components/shared/navigation/navigation.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {
  constructor(private _spinner: ThemeSpinnerService, ) { }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    this._spinner.hide();
  }

}
