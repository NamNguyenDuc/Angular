import { DataService } from './../../services/data.service';
import { Component, OnChanges, OnDestroy, AfterViewInit, AfterViewChecked, AfterContentChecked, Input, Output, EventEmitter } from '@angular/core';
@Component({
  selector: 'app-hello',
  template: `
    <h2>{{text}} form hello Component</h2>

    <button (click)="onButtonClicked()">Button in Hello</button>
  `,
  styleUrls: ['./hello.component.css']
})
export class HelloComponent {
  @Input() text: string;
  @Output() buttonClicked: EventEmitter<any> = new EventEmitter<any>();

  constructor (private _dataService: DataService) {

  }

  ngOnInit(){
    this._dataService.setTextFromHello(this.text)
  }

  onButtonClicked() {
    this.text = "Change from hello";
    this.buttonClicked.emit(this.text);
    this._dataService.setTextFromHello(this.text);
  }
}
