import { Injectable } from '@angular/core';

import * as MarkdownIt from 'markdown-it';
import * as markdownItCheckbox from 'markdown-it-checkbox';
import * as markdownItEmoji from 'markdown-it-emoji';
import * as markdownItHighlightjs from 'markdown-it-highlightjs';
import * as markdownItContents from 'markdown-it-contents';

@Injectable()
export class MarkdownService {
  private markdownIt

  constructor() {
    this.markdownIt = MarkdownIt().use(markdownItCheckbox)
      .use(markdownItEmoji)
      .use(markdownItHighlightjs)
      .use(markdownItContents, {
        className: 'table-of-contents'
      })
  }

  toHtml(md: string): string {
    return this.markdownIt.render(md)
  }

}
