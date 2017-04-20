import { Component, OnInit } from '@angular/core';
import { ipcRenderer } from 'electron';
import * as childProcess from 'child_process';

import { SalesforceService } from './services/salesforce.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = `App works !`;

  constructor(private _salesforce: SalesforceService) {
    _salesforce.connected.subscribe((value: boolean) => {
      if (value) {
        _salesforce.dashboard().then(res => {
          console.log(res);
        });
      }
    });

  }



  ngOnInit() {
  }
}
