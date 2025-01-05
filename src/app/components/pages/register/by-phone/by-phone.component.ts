import {Component, OnChanges, OnDestroy, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalSignalService} from "../../../../services/globalSignalService/global-signal-service.service";
import {ParamNames} from "../../../../interfaces/interfaces";

@Component({
  selector: 'app-by-phone',
  templateUrl: './by-phone.component.html',
  styleUrls: ['./by-phone.component.scss']
})
export class ByPhoneComponent implements OnDestroy {
  @ViewChild('form') formRef: any = null;
  name= "";
  surname= "";
  email= "";
  phone= "+380";
  password= "";
  passwordConfirm= "";
  errorMessage = "";
  valueSubscription: any = null;

  constructor(
    private router: Router,
    private GSS: GlobalSignalService
  ) {
  }

  isValid (model: any) {
    return model.invalid && (model.dirty || model.touched);
  }
  onSubmit(form: any) {
    if(form.valid) {
      if (this.password !== this.passwordConfirm) {
        this.errorMessage = "Паролі не співпадають.";
        return;
      }
      this.GSS.set(ParamNames.userData, {
        name: this.name,
        surname: this.surname,
        email: this.email,
        phone: this.phone,
        shortPhone: this.GSS.getShortPhone(this.phone),
        password: this.password
      });
      this.router.navigate(["register/data-verify"])
    }
  }
  ngOnDestroy() {
    this.valueSubscription?.unsubscribe();
  }

  onPhoneInput(evt: any) {
    this.phone = evt.target.value = "+380" + evt.target.value.slice(4, 17).replace(/[^\-\d]/, "");
  }

  onFocus() {
    this.errorMessage = "";
  }

}
