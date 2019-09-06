import { TestBed, async, tick, fakeAsync } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { ValueContainerComponent } from './components/value-container/value-container.component';
import { ValueViewerComponent } from './components/value-container/value-viewer/value-viewer.component';
import { CounterReducer, State } from './store/reducers/value-page.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from './store/effects/value-page.effects';
import { StoreModule, Store } from '@ngrx/store';
import { change, reset } from './store/actions/value-page.actions';

describe('AppComponent', () => {
  let store: Store<State>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        AppComponent,

        ValueViewerComponent,
        ValueContainerComponent
      ],
      imports: [
        StoreModule.forRoot({ count: CounterReducer }),
        EffectsModule.forRoot([CounterEffects])
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should start counter`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.start();
    tick(1000);
    expect(store.dispatch).toHaveBeenCalledWith(change());

    fixture.detectChanges();
    app.timerSub.unsubscribe();
  }));

  it(`should stop counter`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.start();
    tick(1000);
    app.stop();
    expect(app.timerSub.closed).toBeTruthy();
  }));

  it(`should reset counter`, fakeAsync(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    app.start();
    tick(1000);
    app.reset();
    expect(app.timerSub.closed).toBeTruthy();
    expect(store.dispatch).toHaveBeenCalledWith(reset());

    fixture.detectChanges();
    app.timerSub.unsubscribe();
  }));


});
