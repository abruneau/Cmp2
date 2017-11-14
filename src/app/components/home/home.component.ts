import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as moment from 'moment'

import { SalesforceService, SharedDataService } from '../../providers';
import { WeatherComponent } from '../shared/weather/weather.component';
import { TodolistComponent } from '../shared/todolist/todolist.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public forcast = []
  public forcastLoading = false
  public forcastError: string
  public greeting = 'Good ' + this.getGreetingTime(moment())

  constructor(private _sharedData: SharedDataService, private sf: SalesforceService) {
    sf.connected.subscribe((value: boolean) => {
      if (value) {
        this.forcastLoading = true
        sf.dashboard().then(res => {
          this.forcastError = null
          this.forcast = res.records;
        }).catch((e) => {
          this.forcastError = e
        }).then(() => {
          this.forcastLoading = false
        });
      }
    });

    _sharedData.identity.subscribe((identity) => {
      if (identity) {
        if (identity.display_name) {
          this.greeting = 'Good ' + this.getGreetingTime(moment()) + ', ' + identity.display_name + '.'
        }
      }
    })
  }

  forcastClass(): string {
    return 'col-md-' + (12 / this.forcast.length)
  }

  ngOnInit() {
  }

  private getGreetingTime(m) {
    let g = null; // return g

    if (!m || !m.isValid()) { return; } // if we can't find a valid or filled moment, we return.

    const split_afternoon = 12 // 24hr time to split the afternoon
    const split_evening = 17 // 24hr time to split the evening
    const currentHour = parseFloat(m.format('HH'));

    if (currentHour >= split_afternoon && currentHour <= split_evening) {
      g = 'afternoon';
    } else if (currentHour >= split_evening) {
      g = 'evening';
    } else {
      g = 'morning';
    }

    return g;
  }

}
