import { TestBed, async, tick, fakeAsync, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from '../../../app.component';
import { ValueContainerComponent } from '../../../components/value-container/value-container.component';
import { ValueViewerComponent } from '../../../components/value-container/value-viewer/value-viewer.component';
import { CounterReducer, State } from '../../../store/reducers/value-page.reducers';
import { EffectsModule } from '@ngrx/effects';
import { CounterEffects } from '../../../store/effects/value-page.effects';
import { StoreModule, Store, select } from '@ngrx/store';
import { change, reset } from '../../../store/actions/value-page.actions';

describe('ValueContainerComponent', () => {
  let component: ValueViewerComponent;
  let fixture: ComponentFixture<ValueViewerComponent>;
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
    fixture = TestBed.createComponent(ValueViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should output value', () => {
    const el = fixture.nativeElement.querySelector('div');

    component.value = -5;
    fixture.detectChanges();
    expect(el.textContent).toContain(-5);
  });

  it('should highlight red', () => {
    const el = fixture.nativeElement.querySelector('div');

    component.value = -10;
    fixture.detectChanges();

    expect(el.getAttribute('class')).toContain('low');
  });

  it('should highlight blue', () => {
    const el = fixture.nativeElement.querySelector('div');

    component.value = 5;
    fixture.detectChanges();

    expect(el.getAttribute('class')).toContain('high');
  });


});
