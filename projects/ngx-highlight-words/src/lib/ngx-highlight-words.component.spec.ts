import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { NgxHighlightWordsComponent } from './ngx-highlight-words.component';

describe('NgxHighlightWordsComponent', () => {
  let component: NgxHighlightWordsComponent;
  let fixture: ComponentFixture<NgxHighlightWordsComponent>;
  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [NgxHighlightWordsComponent],
      }).compileComponents();

      fixture = TestBed.createComponent(NgxHighlightWordsComponent);
      component = fixture.componentInstance;

    })
  );

  function setup({
    textToHighlight = '',
    searchWords = [],
    highlightClassName = 'highlight',
    caseSensitive = false,
    autoEscape = true,
  }) {
    const fixture: ComponentFixture<NgxHighlightWordsComponent> =
      TestBed.createComponent(NgxHighlightWordsComponent);
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
    component.textToHighlight = 'This is some text to highlight';
    component.searchWords = ['this', 'to'];
    
    fixture.detectChanges();

    const highlightedElements = fixture.debugElement.nativeElement.querySelectorAll('.highlight');
    expect(highlightedElements[0].textContent).toBe('This');
    expect(highlightedElements[1].textContent).toBe('to');
  });

  it('applies CSS class name to highlighted text', () => {
    component.textToHighlight = 'This is some text to highlight';
    component.searchWords = ['this'];
    component.highlightClassName = 'MyHighlightClass';

    fixture.detectChanges();

    const highlightedElement = fixture.debugElement.nativeElement.querySelector('.MyHighlightClass');
    expect(highlightedElement).toBeTruthy();
  });

  it('should not escape regex in search words', () => {
    component.textToHighlight = "The Federation's gone; the Borg is everywhere!";
    component.searchWords = ['^the'];
    component.autoEscape = false;

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    expect(highlightedElements.length).toBe(1);
    expect(highlightedElements[0].textContent).toBe('The');
  });

  it('should be case sensitive', () => {
    component.textToHighlight = "The Federation's gone; the Borg is everywhere!";
    component.searchWords = ['the'];
    component.caseSensitive = true;

    fixture.detectChanges();

    const compiled = fixture.debugElement.nativeElement;
    const highlightedElements = compiled.querySelectorAll('.highlight');
    expect(highlightedElements.length).toBe(1);
  });
});
