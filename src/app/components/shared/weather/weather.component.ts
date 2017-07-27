import { Component, AfterViewInit } from '@angular/core';

import 'simpleweather';
import * as ipcPromise from 'ipc-promise';

declare const $: any;

@Component({
  selector: 'app-weather',
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements AfterViewInit {

  search = 'Paris, Fr'
  weather = {}

  constructor() { }

  ngAfterViewInit() {

    ipcPromise.send('location', {}).then((location) => {
      this.loadWeather(location.point.latitude + ',' + location.point.longitude);
    }).catch(() => {
      this.loadWeather(this.search)
    })
  }

  public loadWeather(location, woeid?) {
    const self = this
    $.simpleWeather({
      location: location,
      woeid: woeid,
      unit: 'c',
      success: function(weather) {
        self.weather = weather;
        self.search = weather.city + ', ' + weather.region
      },
      error: function(error) {
        $('#weather').html('<p>' + error + '</p>');
      }
    });
  }

}
