import {Component} from '@angular/core';
import environment from "../environments/environment";
import {GlobalSignalService} from "./services/globalSignalService/global-signal-service.service";
const styleUrl: string = environment.colorTheme;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: [styleUrl]
})
export class AppComponent {
  title: string = 'APD';
  spinner: boolean = false;
  constructor(
    private GSS: GlobalSignalService
  ) {
    GSS.showSpinnerEvent.subscribe((val: number) => {
      const newSpinner = GSS.get("spinner") + (val ? 1 : -1);
      GSS.set("spinner", newSpinner);
      this.spinner = !!newSpinner;
    })
  }
}
