import { Component, AfterViewInit, ViewEncapsulation, EventEmitter, Input, Output } from '@angular/core';

import * as SimpleMDE from 'simplemde';
import { MarkdownService } from '../../../providers/markdown.service';

@Component({
  selector: 'app-editor',
  templateUrl: './editor.component.html',
  styleUrls: ['./editor.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EditorComponent implements AfterViewInit {

  simplemde
  md: string

  @Input()
  set markdown(md) {
    this.md = md
    if (this.simplemde) {
      this.simplemde.value(md)
    }
  }

  @Output()
  update: EventEmitter<string> = new EventEmitter<string>();

  constructor(private _md: MarkdownService) { }

  ngAfterViewInit() {
    const self = this;
    this.simplemde = new SimpleMDE({
      element: document.getElementById('editor'),
      previewRender: function(plainText) {
        return self._md.toHtml(plainText); // Returns HTML from a custom parser
      },
      renderingConfig: {
        singleLineBreaks: false,
        codeSyntaxHighlighting: true,
      },
      spellChecker: false
    });
    this.simplemde.value(this.md)
    this.simplemde.codemirror.on('change', () => {
      this.update.emit(this.simplemde.value())
    });
  }

}
