import { Component, AfterViewInit } from '@angular/core';
import { ElectronService } from './providers/electron.service';
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
  constructor(public electronService: ElectronService, private _spinner: ThemeSpinnerService, ) {

    if (electronService.isElectron()) {
      console.log('Mode electron');
      // Check if electron is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.ipcRenderer);
      // Check if nodeJs childProcess is correctly injected (see externals in webpack.config.js)
      console.log('c', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }

  public ngAfterViewInit(): void {
    // hide spinner once all loaders are completed
    this._spinner.hide();
  }

}
