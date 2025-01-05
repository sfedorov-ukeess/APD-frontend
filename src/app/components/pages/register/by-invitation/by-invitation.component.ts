import {Component, OnDestroy, ViewChild} from '@angular/core';
import {Router} from "@angular/router";
import {GlobalSignalService} from "../../../../services/globalSignalService/global-signal-service.service";
import {ParamNames} from "../../../../interfaces/interfaces";

@Component({
  selector: 'app-by-invitation',
  templateUrl: './by-invitation.component.html',
  styleUrls: ['./by-invitation.component.scss']
})
export class ByInvitationComponent implements OnDestroy {
  @ViewChild('form') formRef: any = null;
  inviteCode= "";
  name= "";
  surname= "";
  email= "";
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
        inviteCode: this.inviteCode,
        email: this.email,
        password: this.password
      });
      this.router.navigate(["register/pin-creation"]);
    }
  }
  ngOnDestroy() {
    this.valueSubscription?.unsubscribe();
  }

  onFocus() {
    this.errorMessage = "";
  }
}
