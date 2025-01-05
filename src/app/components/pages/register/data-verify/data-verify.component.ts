import {Component, OnInit, ViewChild} from '@angular/core';
import {GlobalSignalService} from "../../../../services/globalSignalService/global-signal-service.service";
import {Router} from "@angular/router";
import {APIService} from "../../../../services/APIservice/api.service";
// @ts-ignore
import HTMLElement from "$GLOBAL$";
import {ParamNames} from "../../../../interfaces/interfaces";

@Component({
  selector: 'app-data-verify',
  templateUrl: './data-verify.component.html',
  styleUrls: ['./data-verify.component.scss']
})
export class DataVerifyComponent implements OnInit {
  @ViewChild('form') formRef: any = null;
  protected c1 = "";
  protected c2 = "";
  protected c3 = "";
  protected c4 = "";
  protected prompt: string = ""
  protected stage = "phone";

  constructor(
    private GSS: GlobalSignalService,
    private API: APIService,
    private router: Router
    ) {
  }

  ngOnInit() {
    const userData = this.GSS.get(ParamNames.userData);

    if (userData.email && userData.phone) {
      this.prompt = "Ми відправили Вам код підтвердження на номер телефону " + userData.phone.substring(0, 5) + "****" + userData.phone.substring(11, 15) + ". Введіть його нижче.";
      this.requestPhoneCode();
    } else {
      this.router.navigate(["register/phone"]);
    }
  }

  requestCode() {
    this.stage === "phone" ?
      this.requestPhoneCode() :
      this.API.getValidationEmail()
        .subscribe(res => res);
  }

  requestPhoneCode() {
    this.GSS.set(ParamNames.userData, {confirmationId: ""});
    this.API.getConfirmationId()
      .subscribe((confirmationId: object) => {
        this.GSS.set(ParamNames.userData, confirmationId);
      });
  }

  onInput(evt: any) {
    if (evt.target.value) {
      const next: Element | null | undefined = document.activeElement?.nextElementSibling;
      if (next?.tagName.toLowerCase() === "input") {
        (next as HTMLElement)?.focus?.();
      } else {
        setTimeout(() => {
          (document.querySelector("[type=submit]") as HTMLElement)?.focus();
        }, 20);
      }
    }
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.stage === "phone") {
        this.GSS.set(ParamNames.userData, {
          code: this.c1.toString().concat(this.c2, this.c3, this.c4)
        });
        this.API.validatePhoneCode()
          .subscribe(result => {
            const userData = this.GSS.get(ParamNames.userData);
            this.stage = "email";
            this.c1 = this.c2 = this.c3 = this.c4 = "";
            this.prompt = "Ми відправили Вам код підтвердження на e-mail " + userData.email.substring(0, 3) + "****" + userData.email.substring(userData.email.length - 3) + ". Введіть його нижче.";
            this.API.getValidationEmail()
              .subscribe(res => res);
          });
      } else {
        this.API.validateEmailCode(this.c1.toString().concat(this.c2, this.c3, this.c4))
          .subscribe(result => {
            this.router.navigate(["register/pin-creation"]);
          });
      }
    }
  }

}
