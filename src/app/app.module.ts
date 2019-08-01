import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HighlightJsModule } from 'ngx-highlight-js';

import { AppComponent } from './app.component';
import { NgxHighlightWordsModule } from '../../projects/ngx-highlight-words/src/lib/ngx-highlight-words.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HighlightJsModule,
    NgxHighlightWordsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
