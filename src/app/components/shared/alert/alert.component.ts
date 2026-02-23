import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';
import {GlobalSignalService} from "../../../services/globalSignalService/global-signal-service.service";

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss']
})

export class AlertComponent implements OnChanges {
  @Input() public type: string = "notification";

  protected messageType: any = "";
  protected isShown: boolean = false;
  protected text: string = "";

  constructor(private GSS: GlobalSignalService) {
    GSS.showAlertEvent.subscribe(state => {
      this.isShown = !!state;
      this.messageType = this.convertType(state.type);
      this.text = state.text || "";
    });
  }

  ngOnChanges() {
    this.messageType = this.convertType(this.type);
  }

  convertType(type: string): string|undefined {
    return {
      "notification": "Примітка",
      "error": "Помилка!",
      "success": "Успіх!"
    }[type];
  }

  onClickHandler() {
    this.GSS.showAlertEvent.emit(false);
  }
}
