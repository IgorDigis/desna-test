import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-value-viewer',
  templateUrl: 'value-viewer.component.html',
  styleUrls: [ './value-viewer.component.css' ]
})

export class ValueViewerComponent implements OnInit {

  @Input() value: number;

  constructor() { }

  ngOnInit() { }

}
