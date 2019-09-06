import { Injectable } from '@angular/core';
import { mergeMap } from 'rxjs/operators';
import { Actions, createEffect, ofType } from '@ngrx/effects';

import { increase, decrease, change } from '../actions/value-page.actions';


@Injectable()
export class CounterEffects {

  constructor(private actions$: Actions) { }

  changeCounter$ = createEffect(() => this.actions$.pipe(
    ofType(change),
    mergeMap(() => [increase(), decrease(), decrease()])
  ));
}
