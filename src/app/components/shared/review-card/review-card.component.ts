import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GlobalSignalService} from "../../../services/globalSignalService/global-signal-service.service";

@Component({
  selector: 'app-review-card',
  templateUrl: './review-card.component.html',
  styleUrls: ['./review-card.component.scss']
})
export class ReviewCardComponent {
  @Input() data: any;
  @Output() clickHandler: EventEmitter<any> = new EventEmitter<any>();

  constructor(
      protected GSS: GlobalSignalService
  ) {
  }
}
