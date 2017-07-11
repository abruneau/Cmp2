import { Injectable } from '@angular/core';

import * as fs from 'fs';
import * as path from 'path';
import { exec } from 'child_process';
import { Ng2DeviceService } from 'ng2-device-detector';

class File {
    name: string;
	path: string;
	directory: Boolean;
	type: string;

	constructor(object) {
		this.name = object.name;
		this.path = object.path;
		this.directory = object.directory;
		this.type = object.type;
	}
}

class Breadcrum {
	index: number;
	path: string;
	name: string;

	constructor(object) {
		this.index = object.index;
		this.path = object.path;
		this.name = object.name;
	}
}

@Injectable()
export class FsService {

	constructor(private deviceService: Ng2DeviceService) { }

	private nativePath(p: string, name: string): string {
		return fs.realpathSync(p + '/' + name);
	}

	private getCommandLine(): string {
		switch (this.deviceService.getDeviceInfo().os) {
			case 'mac':
				return 'open';
			case 'windows':
				return 'start "" ';
			default:
				return 'xdg-open';
		}
	}

	fileName(p: string): string {
		return path.basename(p);
	}

	fileParent(p: string): string {
		return fs.realpathSync(p + '/..');
	}

	open(p: string) {
		const cmd = this.getCommandLine() + ' "' + p + '"';
		exec(cmd);
	}

	ls(p: string): Array<File> {
		let output: Array<File> = [];

		// Check if it is a file or a folder
		if (fs.lstatSync(p).isFile()) {

			// Open the file with difault system application
			this.open(p);
		} else {

			// Get the list of files and folders
			const tree = fs.readdirSync(p);

			tree.forEach((entry) => {

				if (entry.substring(0, 1) !== ".") {
					// Add list
					let file = new File({
						name: entry,
						path: this.nativePath(p, entry),
						directory: false
					});
					if (fs.lstatSync(this.nativePath(p, entry)).isDirectory()) {
						file.directory = true;
					} else {
						file.type = path.extname(entry);
					}

					output.push(file);
				}

			});

		}
		return output;
	}

	mkdir(name: string, p: string) {
		fs.accessSync(p, fs.constants.R_OK | fs.constants.W_OK);
		fs.mkdirSync(path + "/" + name);
	}

	exists(p: string): Boolean {
		try {
			fs.accessSync(p);
			return true;
		} catch (e) {
			return false;
		}
	}

	creationDate(p: string): Date {
		return fs.statSync(p).birthtime;
	}

	breadcrum(p: string, root: string) {
		let out: Array<Breadcrum> = [];
		if (p.indexOf(root) === 0) {
			out.push(new Breadcrum({
				index: 0,
				path: root,
				name: root
			}));

			let b = root;
			const o = p.replace(root, '');
			const list = o.split("/");

			for (let i = 0; i < list.length; i++) {
				if (i > 0) {
					b = b + "/" + list[i];
					out.push(new Breadcrum({
						index: i,
						name: list[i],
						path: b
					}))
				}
			}
		}

		return out;
	}
}
