import { Component, AfterViewInit } from '@angular/core';
import { ThemeSpinnerService } from './providers';
import { DatabaseMigrationService } from './providers'

// import $ from 'jquery';
import * as bootstrap from 'bootstrap';

import { NavigationComponent } from './components/shared/navigation/navigation.component'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements AfterViewInit {

  constructor(private _spinner: ThemeSpinnerService, private _dbMigrate: DatabaseMigrationService) {
    if (_dbMigrate.migrationNeeded()) {
      const self = this
      _dbMigrate.migrate()
    }
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    this._spinner.hide();
  }

}
