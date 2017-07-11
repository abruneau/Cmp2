import { Component, OnInit, Input } from '@angular/core';

import {FsService} from '../../../providers/fs.service';

@Component({
	selector: 'app-accounts-files',
	templateUrl: './files.component.html',
	styleUrls: ['./files.component.scss']
})
export class AccountsFilesComponent implements OnInit {

	private currentPath = ''
	filePath = ''
	fileList = []
	breadcrum = []

	@Input()
	set account(account) {
		this.filePath = account.path;
		this.updateList(this.filePath);
	}

	constructor(private _fs: FsService) { }

	ngOnInit() {
	}

	updateList(path: string) {
		if (path) {
			var list = [];

			// Add Go back link
			if (path !== this.filePath) {
				list.push({
					name: '..',
					directory: true,
					path: this._fs.fileParent(path)
				});
			}

			this.fileList = list.concat(this._fs.ls(path));
			this.breadcrum = this._fs.breadcrum(path, this.filePath);
			this.currentPath = path;
		}
	}

	fileIcon(file): string {

		if (file.directory) {
			return 'fa-folder-o';
		}

		switch (file.type) {
			case '.pdf':
				return 'fa-file-pdf-o';
			case '.docx':
				return 'fa-file-word-o';
			case '.doc':
				return 'fa-file-word-o';
			case '.xlsx':
				return 'fa-file-excel-o';
			case '.xls':
				return 'fa-file-excel-o';
			case '.pptx':
				return 'fa-file-powerpoint-o';
			case '.ppt':
				return 'fa-file-powerpoint-o';
			default:
				return 'fa-file-o';
		}
	}

	openFile(file) {
		if (file.directory) {
			this.updateList(file.path);

		} else {
			this._fs.open(file.path);
		}
	}

	// openApplication(file) {
	// 	this._fs.open(file.path);
	// }

	mkdir(name: string) {
		this._fs.mkdir(name, this.currentPath);
		this.updateList(this.currentPath);
	}

	cd(path: string) {
		this.updateList(path);
	}

}
