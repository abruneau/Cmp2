import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import * as moment from 'moment'

import { SalesforceService, SharedDataService } from '../../providers';
import { WeatherComponent } from '../shared/weather/weather.component';
import { TodolistComponent } from '../shared/todolist/todolist.component'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public greeting = 'Good ' + this.getGreetingTime(moment())
  public clock = Observable
    .interval(1000)
    .map(() => new Date());

  public image_src = ''

  constructor(private _sharedData: SharedDataService, private sf: SalesforceService, private http: Http) {
    _sharedData.identity.subscribe((identity) => {
      if (identity) {
        if (identity.display_name) {
          this.greeting = 'Good ' + this.getGreetingTime(moment()) + ', ' + identity.display_name + '.'
        }
      }
    })
  }


  ngOnInit() {
  }

  ngAfterViewInit() {
    document.querySelector('body').classList.add('sidebar-hidden')
    const url = 'http://unsplash.com/rss';
    const rssToJsonServiceBaseUrl = 'https://rss2json.com/api.json?rss_url='
    this.http.get(rssToJsonServiceBaseUrl + url)
      .subscribe(data => {
        const json = data.json()
        const min = 0;
        const max = json.items.length;
        const random = Math.floor(Math.random() * (max - min)) + min;
        const str = json.items[random].content;
        const regex = /<img.*?src="(.*?)"/;
        this.image_src = regex.exec(str)[1];
      })

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
