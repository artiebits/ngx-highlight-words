import {Component} from '@angular/core';
import {async, TestBed} from '@angular/core/testing';

import {NgxHighlightWordsDirective} from './ngx-highlight-words.directive';
import {By} from '@angular/platform-browser';

@Component({
  template: `
      <p ngxHighlightWords [searchWords]="['highlight']">
          This <i>is</i> some text to highlight.
      </p>

      <p ngxHighlightWords [searchWords]="['highlight']" highlightClassName="MyHighlightClass">
          This is some text to highlight.
      </p>

      <p ngxHighlightWords [searchWords]="['the']" [caseSensitive]="true">
          The Federation's gone; the Borg is everywhere!
      </p>

      <p ngxHighlightWords [searchWords]="['^the']" [autoEscape]="false">
          The Federation's gone; the Borg is everywhere!
      </p>
  `
})
class TestComponent {
}

describe('NgxHighlightWordsDirective', () => {
  let fixture;
  let highlightedElements;

  beforeEach(async(() => {
    fixture = TestBed.configureTestingModule({
      declarations: [NgxHighlightWordsDirective, TestComponent]
    }).createComponent(TestComponent);

    fixture.detectChanges();

    highlightedElements = fixture.debugElement.queryAll(
      By.directive(NgxHighlightWordsDirective)
    );
  }));

  it('should have three highlighted elements', () => {
    expect(highlightedElements.length).toBe(4);
  });

  it('highlights words within a text', () => {
    const htmlSnippet = highlightedElements[0].nativeElement.innerHTML;
    expect(htmlSnippet).toBe('This <i>is</i> some text to <span class="highlight">highlight</span>.');
  });

  it('applies CSS class name to highlighted text', () => {
    const htmlSnippet = highlightedElements[1].nativeElement.innerHTML;
    expect(htmlSnippet).toBe('This is some text to <span class="MyHighlightClass">highlight</span>.');
  });

  it('should be case sensitive', () => {
    const htmlSnippet = highlightedElements[2].nativeElement.innerHTML;
    expect(htmlSnippet).toBe('The Federation\'s gone; <span class="highlight">the</span> Borg is everywhere!');
  });

  it('should not escape regex in search words', () => {
    const htmlSnippet = highlightedElements[3].nativeElement.innerHTML;
    expect(htmlSnippet).toBe('<span class="highlight">The</span> Federation\'s gone; the Borg is everywhere!');
  });
});
