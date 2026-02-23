import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss']
})
export class SearchFieldComponent {
  @Input() value: string = "";
  @Output() onSearch: EventEmitter<string> = new EventEmitter<string>();

  protected search: string = "";

  constructor () {
    this.search = this.value;
  }
}
