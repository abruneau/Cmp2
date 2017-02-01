import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {remote} from 'electron';

@Component({
	selector: 'app-accounts-settings',
	templateUrl: './settings.component.html',
	styleUrls: ['./settings.component.scss']
})
export class AccountsSettingsComponent implements OnInit {

	@Input() account

	@Output()
	update: EventEmitter<string> = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
	}

	selectDirectory() {
		const self = this;
		remote.dialog.showOpenDialog({
			properties: ['openDirectory', 'createDirectory']
		}, function(path) {
			self.account.path = path[0];
			self.account.save()
			self.update.emit(self.account.Id)
		});
	}
}
