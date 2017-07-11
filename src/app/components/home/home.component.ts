import { Component, OnInit } from '@angular/core';

import { SalesforceService } from '../../providers/salesforce.service';
import {WeatherComponent} from '../modules/weather/weather.component';
import { TodolistComponent } from '../modules/todolist/todolist.component'

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
	public forcast = []

	constructor(private sf: SalesforceService) {
		sf.connected.subscribe((value: boolean) => {
			if (value) {
				sf.dashboard().then(res => {
					this.forcast = res.records;
				});
			}
		});
	}

	ngOnInit() {
	}

}
