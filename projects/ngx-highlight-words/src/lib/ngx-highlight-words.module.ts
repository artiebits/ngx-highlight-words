import { NgModule } from '@angular/core';
import { NgxHighlightWordsDirective } from './ngx-highlight-words.directive';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [NgxHighlightWordsDirective],
  imports: [
    CommonModule
  ],
  exports: [NgxHighlightWordsDirective]
})
export class NgxHighlightWordsModule {}
