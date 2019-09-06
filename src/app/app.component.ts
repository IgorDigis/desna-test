import { Component, OnDestroy } from '@angular/core';
import { State } from './store/reducers/value-page.reducers';
import { Store } from '@ngrx/store';
import { Subscription, interval } from 'rxjs';
import { change, reset } from './store/actions/value-page.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  private _isInProgress = false;

  public timerSub: Subscription;

  constructor(private store: Store<State>) { }

  ngOnDestroy() {
    this.timerSub.unsubscribe();
  }

  start() {
    if (this._isInProgress) {
      return;
    }

    this._isInProgress = true;

    this.timerSub = interval(1000).subscribe(() => {
      this.store.dispatch(change());
    });
  }

  stop() {
    this._isInProgress = false;
    this.timerSub.unsubscribe();
  }

  reset() {
    this.stop();
    this.store.dispatch(reset());
  }

}
