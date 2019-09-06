import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { CounterReducer } from './store/reducers/value-page.reducers';
import { CounterEffects } from './store/effects/value-page.effects';

import { AppComponent } from './app.component';
import { ValueViewerComponent } from './components/value-container/value-viewer/value-viewer.component';
import { ValueContainerComponent } from './components/value-container/value-container.component';


@NgModule({
  declarations: [
    AppComponent,

    ValueViewerComponent,
    ValueContainerComponent

  ],
  imports: [
    BrowserModule,
    StoreModule.forRoot({count: CounterReducer}),
    EffectsModule.forRoot([CounterEffects])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
