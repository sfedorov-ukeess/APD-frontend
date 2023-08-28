import {Component, OnDestroy, ViewChild} from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnDestroy {
  @ViewChild('form') formRef: any = null;
  name= "";
  pass= "";
  errorMessage = "";
  valueSubscription: any = null;
  onSubmit(form: any) {
    if(form.valid) {
      //TODO call service

      // if unsuccessful show error and use next code
      this.valueSubscription = this.formRef.valueChanges.subscribe(() => {
        this.errorMessage = "";
        this.valueSubscription.unsubscribe();
      });
    }
  }
  ngOnDestroy() {
    this.valueSubscription?.unsubscribe();
  }
}
