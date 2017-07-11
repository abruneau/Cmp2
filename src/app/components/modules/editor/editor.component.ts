import { Component, AfterViewInit, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';

import * as SimpleMDE from 'simplemde';
import * as MarkdownIt from 'markdown-it';
import * as markdownItCheckbox from 'markdown-it-checkbox';
import * as markdownItEmoji from 'markdown-it-emoji';
import * as markdownItHighlightjs from 'markdown-it-highlightjs';
import * as markdownItContents from 'markdown-it-contents';

@Component({
	selector: 'app-editor',
	templateUrl: './editor.component.html',
	styleUrls: ['./editor.component.scss'],
	encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements AfterViewInit {

	simplemde
	markdownIt

	@Input() markdown: string;

	@Output()
	update: EventEmitter<string> = new EventEmitter<string>();

	constructor() {
		this.markdownIt = MarkdownIt().use(markdownItCheckbox)
			.use(markdownItEmoji)
			.use(markdownItHighlightjs)
			.use(markdownItContents, {
				className: 'table-of-contents'
			})
	}

	ngAfterViewInit() {
		const self = this;
		this.simplemde = new SimpleMDE({
			element: document.getElementById("editor"),
			previewRender: function(plainText) {
				return self.markdownIt.render(plainText); // Returns HTML from a custom parser
			},
			renderingConfig: {
				singleLineBreaks: false,
				codeSyntaxHighlighting: true,
			},
			spellChecker: false
		});
		this.simplemde.codemirror.on("change", () => {
			this.update.emit(this.simplemde.value())
		});
	}

}
