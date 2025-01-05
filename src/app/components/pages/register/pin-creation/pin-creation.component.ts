import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalSignalService} from "../../../../services/globalSignalService/global-signal-service.service";
import {Router} from "@angular/router";
import {APIService} from "../../../../services/APIservice/api.service";
import {ParamNames} from "../../../../interfaces/interfaces";

@Component({
  selector: 'app-pin-creation',
  templateUrl: './pin-creation.component.html',
  styleUrls: ['./pin-creation.component.scss']
})
export class PinCreationComponent implements OnInit {
  @ViewChild('form') formRef: any = null;
  pin1 = "";
  pin2= "";
  errorMessage = "";

  constructor(
    private API: APIService,
    private GSS: GlobalSignalService,
    private router: Router
  ) {
    this.navigateToApp = this.navigateToApp.bind(this);
  }

  ngOnInit() {
    const {confirmationId, inviteCode} = this.GSS.get(ParamNames.userData);
   /* if (!(confirmationId || inviteCode)) {
     this.router.navigate(["/"]);
    }*/
  }

  onSubmit(form: any) {
    if(form.valid) {
      if (this.pin1 === this.pin2) {
        this.errorMessage = "PIN 1 і PIN 2 мають бути різними.";
      } else {
        const {confirmationId, inviteCode} = this.GSS.get(ParamNames.userData);
        this.GSS.set(ParamNames.userData, {
          accessCode: this.pin1,
          forceCode: this.pin2
        });
        if (confirmationId) {
          this.API.createUser()
            .subscribe(this.navigateToApp);
        } else {
          this.API.createUserByInvite()
            .subscribe(this.navigateToApp);
        }
      }
    }
  }

  navigateToApp(result: any) {
    this.GSS.set(ParamNames.userData, {
      token: result.token
    });
    this.router.navigate(["main"]);
  }

  onInput(evt: any) {
    this.errorMessage = "";
    const element = evt.target;
    if (element.value.length > 4) {
      element.value = element.value.slice(0, 4);
      // @ts-ignore
      this[element.name] = element.value;
    } else {
      const value = element.value.replace(/\D/gi, "");
      element.value = value;
      // @ts-ignore
      this[element.name] = value;
    }
  }
}
