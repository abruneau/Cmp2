import { Component, OnInit } from '@angular/core';

import { SalesforceService } from '../../providers';
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

  constructor(private sf: SalesforceService) {
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
  }

  forcastClass(): string {
    return 'col-md-' + (12 / this.forcast.length)
  }

  ngOnInit() {
  }

}
