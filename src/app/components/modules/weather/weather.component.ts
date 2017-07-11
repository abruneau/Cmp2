import { Component, AfterViewInit } from '@angular/core';

import 'simpleweather';
import * as whereAmI from '@rainder/where-am-i'

declare var $: any;

@Component({
	selector: 'app-weather',
	templateUrl: './weather.component.html',
	styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements AfterViewInit {

	search: string = "Paris, Fr"
	weather = {}

	constructor() { }

	ngAfterViewInit() {

		this.loadWeather(this.search)
	}

	// public getLocationAndWeather() {
	// 	whereAmI.getLocation().then((location) => {
	// 		console.log(location)
	// 		this.loadWeather(location.point.latitude + ',' + location.point.longitude);
	// 	}).catch((e) => {
	// 		console.error(e)
	// 	});
	// }

	public loadWeather(location, woeid?) {
		let self = this
		$.simpleWeather({
			location: location,
			woeid: woeid,
			unit: 'c',
			success: function(weather) {
				self.weather = weather;
			},
			error: function(error) {
				$("#weather").html('<p>' + error + '</p>');
			}
		});
	}

}
