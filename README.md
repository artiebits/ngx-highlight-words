# ngx-highlight-words

Angular component to highlight words within a text.

## Usage

Just provide it with an array of search terms and a body of text to highlight.

```typescript
<ngx-highlight-words
  [textToHighlight]="'This is some text to highlight.'"
  [searchWords]="['this', 'to']"
  highlightClassName="YourHighlightClass">
</ngx-highlight-words>
```

And the `ngx-highlight-words` will mark all occurrences of search terms within the text:

<img src="https://dl.dropboxusercontent.com/s/0eljrgp0ylu6j93/basic-usage.png" alt="Basic Usage" width="209"/>

## Props

| Property | Type | Required? | Description |
|:---|:---|:---:|:---|
| textToHighlight | String | ✓ | Text to highlight matches in |
| searchWords | Array<String &#124; RegExp> | ✓ | Array of search words. String search terms are automatically cast to RegExps unless `autoEscape` is true. |
| highlightClassName | String or Object |  | CSS class name applied to highlighted text or object mapping search term matches to class names. |
| autoEscape | Boolean |  | Escape characters in `searchWords` which are meaningful in regular expressions; defaults to `true` |
| caseSensitive | Boolean |  | Search should be case sensitive; defaults to `false` |
| findChunks | Function |  | Use a custom function to search for matching chunks. This makes it possible to use arbitrary logic when looking for matches. See the default `findChunks` function in [highlight-words-core](https://github.com/bvaughn/highlight-words-core) for signature. 
| sanitize | Function |  | Process each search word and text to highlight before comparing (eg remove accents); signature `(text: string): string` |

## Examples

#### With regex in `searchWords`

```typescript
<ngx-highlight-words
  [textToHighlight]="'The Federation\'s gone; the Borg is everywhere!'"
  [searchWords]="['^the']"
  [autoEscape]="false">
</ngx-highlight-words>
```

#### Case sensitive

```typescript
<ngx-highlight-words
  [textToHighlight]="'The Federation\'s gone; the Borg is everywhere!'"
  [searchWords]="['the']"
  [caseSensitive]="true">
</ngx-highlight-words>
```

#### Sanitize

```typescript
import { Component } from "@angular/core";
import { clean } from "diacritic";

@Component({
  selector: "app-root",
  template: `
    <ngx-highlight-words
      [textToHighlight]="'Déjà vu'"
      [searchWords]="['deja']"
      [sanitize]="removeDiacritics"
    >
    </ngx-highlight-words>
  `
})
export class AppComponent {
  removeDiacritics(text: string): string {
    return clean(text);
  }
}
```

## Installation

```shell script
yarn add ngx-highlight-words
```

```shell script
npm i --save ngx-highlight-words
```

Import the `NgxHighlightWordsModule` in to your root AppModule.

```typescript
import { NgxHighlightWordsModule } from 'ngx-highlight-words';
@NgModule({
  imports: [ NgxHighlightWordsModule ],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Credits

- [react-highlight-words](https://github.com/bvaughn/react-highlight-words) - React component to highlight words within a larger body of text.
- [highlight-words-core](https://github.com/bvaughn/highlight-words-core) - Utilities to highlight words.

## License

MIT
