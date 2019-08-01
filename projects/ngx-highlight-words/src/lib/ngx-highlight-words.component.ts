import { Component, Input } from '@angular/core';
import { findAll } from 'highlight-words-core';

interface Chunk {
  start: number;
  end: number;
  highlight: boolean;
}

@Component({
  selector: 'ngx-highlight-words',
  templateUrl: './ngx-highlight-words.component.html',
  styles: ['.highlight { background-color: yellow }']
})
export class NgxHighlightWordsComponent {
  @Input() textToHighlight: string;
  @Input() searchWords: string[] = [];
  @Input() highlightClassName = 'highlight';
  @Input() autoEscape: boolean;
  @Input() caseSensitive: boolean;
  @Input() findChunks: () => void;
  @Input() sanitize: () => void;

  get chunks(): Chunk[] {
    return findAll({
      textToHighlight: this.textToHighlight,
      searchWords: this.searchWords,
      autoEscape: this.autoEscape,
      caseSensitive: this.caseSensitive,
      findChunks: this.findChunks,
      sanitize: this.sanitize
    });
  }
}
