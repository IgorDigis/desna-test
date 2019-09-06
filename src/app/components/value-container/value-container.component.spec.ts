import { TestBed, async, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../../app.component';
import { ValueContainerComponent } from '../../components/value-container/value-container.component';
import { ValueViewerComponent } from '../../components/value-container/value-viewer/value-viewer.component';
import { CounterReducer, State } from '../../store/reducers/value-page.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from '../../store/effects/value-page.effects';
import { StoreModule, Store, select } from '@ngrx/store';
import { change, reset } from '../../store/actions/value-page.actions';

describe('ValueContainerComponent', () => {
  let component: ValueContainerComponent;
  let fixture: ComponentFixture<ValueContainerComponent>;
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
    fixture = TestBed.createComponent(ValueContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it(`should show numbers`, () => {
    const low = fixture.nativeElement.querySelector('#first');
    const high = fixture.nativeElement.querySelector('#second');

    store.pipe(select('count')).subscribe((val: State) => {
      expect(Number(low.textContent)).toEqual(val.first);
      expect(Number(high.textContent)).toEqual(val.second);
    });
  });


});
