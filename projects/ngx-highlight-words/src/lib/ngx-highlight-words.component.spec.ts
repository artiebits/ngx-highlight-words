import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxHighlightWordsComponent } from './ngx-highlight-words.component';

describe('NgxHighlightWordsComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NgxHighlightWordsComponent]
    }).compileComponents();
  }));

  function setup({
    textToHighlight = '',
    searchWords = [],
    highlightClassName = 'highlight',
    caseSensitive = false,
    autoEscape = true
  } = {}) {
    const fixture: ComponentFixture<NgxHighlightWordsComponent> = TestBed.createComponent(
      NgxHighlightWordsComponent
    );
    const component: NgxHighlightWordsComponent = fixture.componentInstance;
    component.textToHighlight = textToHighlight;
    component.searchWords = searchWords;
    component.highlightClassName = highlightClassName;
    component.caseSensitive = caseSensitive;
    component.autoEscape = autoEscape;

    fixture.detectChanges();

    return { component, fixture };
  }

  it('highlights words within a text', () => {
    const textToHighlight = 'This is some text to highlight.';
    const searchWords = ['this', 'to'];
    const { fixture } = setup({
      textToHighlight,
      searchWords
    });

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    expect(highlightedElements[0].textContent).toBe('This');
    expect(highlightedElements[1].textContent).toBe('to');
  });

  it('applies CSS class name to highlighted text', () => {
    const textToHighlight = 'This is some text to highlight.';
    const searchWords = ['this'];
    const highlightClassName = 'MyHighlightClass';
    const { fixture } = setup({
      textToHighlight,
      searchWords,
      highlightClassName
    });

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElement = compiled.querySelector('.MyHighlightClass');
    expect(highlightedElement).toBeTruthy();
  });

  it('should not escape regex in search words', () => {
    const textToHighlight = 'The Federation\'s gone; the Borg is everywhere!';
    const searchWords = ['^the'];
    const autoEscape = false;
    const { fixture } = setup({
      textToHighlight,
      searchWords,
      autoEscape
    });

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    expect(highlightedElements.length).toBe(1);
    expect(highlightedElements[0].textContent).toBe('The');
  });

  it('should be case sensitive', () => {
    const textToHighlight = 'The Federation\'s gone; the Borg is everywhere!';
    const searchWords = ['the'];
    const caseSensitive = true;
    const { fixture } = setup({
      textToHighlight,
      searchWords,
      caseSensitive
    });

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    expect(highlightedElements.length).toBe(1);
  });
});
