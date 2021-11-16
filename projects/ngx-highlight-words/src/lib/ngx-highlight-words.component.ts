import { Component, Input } from "@angular/core";
import {
  defaultFindChunks,
  defaultSanitize,
  findAll,
} from "./ngx-highlight-words.utils";
import { Chunk } from "./ngx-highlight-words.utils";

@Component({
  selector: "ngx-highlight-words",
  templateUrl: "./ngx-highlight-words.component.html",
})
export class NgxHighlightWordsComponent {
  @Input() textToHighlight = "";
  @Input() searchWords: string[] = [];
  @Input() highlightClassName = "highlight";
  @Input() autoEscape = true;
  @Input() caseSensitive = false;
  @Input() findChunks = defaultFindChunks;
  @Input() sanitize = defaultSanitize;

  get chunks(): Chunk[] {
    return findAll({
      textToHighlight: this.textToHighlight,
      searchWords: this.searchWords,
      autoEscape: this.autoEscape,
      caseSensitive: this.caseSensitive,
      findChunks: this.findChunks,
      sanitize: this.sanitize,
    });
  }
}
