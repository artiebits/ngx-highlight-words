import {Directive, ElementRef, Input, OnChanges} from '@angular/core';
import {findAll} from 'highlight-words-core';

interface Chunk {
  start: number;
  end: number;
  highlight: boolean;
}

@Directive({
  selector: '[ngxHighlightWords]',
})
export class NgxHighlightWordsDirective implements OnChanges {
  @Input() textToHighlight: string;
  @Input() searchWords: string[] = [];
  @Input() highlightClassName = 'highlight';
  @Input() autoEscape: boolean;
  @Input() caseSensitive: boolean;
  @Input() findChunks: () => void;
  @Input() sanitize: () => void;

  constructor(private el: ElementRef) {
  }

  ngOnChanges() {
    const textToHighlight = this.el.nativeElement.innerHTML.trim();
    const chunks = this.getChunks(textToHighlight);

    const result = chunks.map(({highlight, start, end}) => {
      const text = textToHighlight.substr(start, end - start);
      if (highlight) {
        return `<span class="${this.highlightClassName}">${text}</span>`;
      } else {
        return text;
      }
    });

    this.el.nativeElement.innerHTML = result.join('');
  }

  getChunks(textToHighlight): Chunk[] {
    return findAll({
      textToHighlight,
      searchWords: this.searchWords,
      autoEscape: this.autoEscape,
      caseSensitive: this.caseSensitive,
      findChunks: this.findChunks,
      sanitize: this.sanitize
    });
  }
}
