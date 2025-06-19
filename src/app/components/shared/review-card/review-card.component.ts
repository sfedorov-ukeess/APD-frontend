import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {GlobalSignalService} from "../../../services/globalSignalService/global-signal-service.service";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent implements OnChanges{
  @Input() data: any;
  @Input() isChecked = false;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter<any>();
  protected clsName="";
  constructor(
      protected GSS: GlobalSignalService
  ) {
  }
  ngOnChanges(changes: SimpleChanges) {
    this.clsName= this.isChecked? "reviewCard checked": "reviewCard";
  }
}
