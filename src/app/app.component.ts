import {Component, ViewEncapsulation} from '@angular/core';
import {clean} from 'diacritic';

@Component({
  selector: 'app-root',
  templateUrl: `./app.component.html`,
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  removeDiacritics(text: string): string {
    return clean(text);
  }

  findChunksAtBeginningOfWords({textToHighlight, searchWords}) {
    const chunks = [];
    const textLow = textToHighlight.toLowerCase();
    // Match at the beginning of each new word
    // New word start after whitespace or - (hyphen)
    const sep = /[-\s]+/;

    // Match at the beginning of each new word
    // New word start after whitespace or - (hyphen)
    const singleTextWords = textLow.split(sep);

    // It could be possible that there are multiple spaces between words
    // Hence we store the index (position) of each single word with textToHighlight
    let fromIndex = 0;
    const singleTextWordsWithPos = singleTextWords.map(s => {
      const indexInWord = textLow.indexOf(s, fromIndex);
      fromIndex = indexInWord;
      return {
        word: s,
        index: indexInWord
      };
    });

    // Add chunks for every searchWord
    searchWords.forEach(sw => {
      const swLow = sw.toLowerCase();
      // Do it for every single text word
      singleTextWordsWithPos.forEach(s => {
        if (s.word.startsWith(swLow)) {
          const start = s.index;
          const end = s.index + swLow.length;
          chunks.push({
            start,
            end
          });
        }
      });

      // The complete word including whitespace should also be handled, e.g.
      // searchWord='Angela Mer' should be highlighted in 'Angela Merkel'
      if (textLow.startsWith(swLow)) {
        const start = 0;
        const end = swLow.length;
        chunks.push({
          start,
          end
        });
      }
    });

    return chunks;
  }
}
