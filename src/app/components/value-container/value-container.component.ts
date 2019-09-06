import { Component, OnInit } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { Observable } from 'rxjs';
import { State } from 'src/app/store/reducers/value-page.reducers';

@Component({
  selector: 'app-value-container',
  templateUrl: 'value-container.component.html',
  styleUrls: [ './value-container.component.css' ]
})

export class ValueContainerComponent implements OnInit {
  count: State;

  constructor(private store: Store<{ count: State }>) { }

  ngOnInit() {
    this.store
      .pipe(select('count'))
      .subscribe(val => {
        this.count = val;
      });
  }

}
