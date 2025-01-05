import {Component, OnDestroy, ViewChild} from '@angular/core';
import {APIService} from "../../../../services/APIservice/api.service";
import {GlobalSignalService} from "../../../../services/globalSignalService/global-signal-service.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  @ViewChild("pin") pinRef: any = null;
  @ViewChild('form') formRef: any = null;///TODO - remove creds
  name= "679506795";
  pass= "!1234Qqwer@";
  errorMessage = "";
  valueSubscription: any = null;
  showPinModal: boolean = false;
  tokenData: any = null;

  constructor(
    private API: APIService,
    private router: Router,
    private GSS: GlobalSignalService
    ) {
    this.GSS.set("tokenData", {});
    this.GSS.set("token", "");
  }
  onSubmit(form: any) {
    if(form.valid) {
      this.API.getTokenByCredentials(this.name, this.pass)
        .subscribe(res => {
          this.tokenData = res;
          this.showPinModal = true;
        })
    }
  }

  onPinSubmit(value: any){
    // TODO check pin
    this.GSS.set("token", this.tokenData.token + "." + this.tokenData.hash1);
    this.GSS.set("tokenData", this.tokenData);
     this.showPinModal = false;
    this.GSS.showMenuEvent.emit("groups");
  }

  ngOnDestroy() {
    this.valueSubscription?.unsubscribe();
  }
}
