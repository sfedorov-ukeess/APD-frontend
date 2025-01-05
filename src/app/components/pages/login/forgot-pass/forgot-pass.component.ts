import {Component, ElementRef, ViewChild} from '@angular/core';
import {APIService} from "../../../../services/APIservice/api.service";

@Component({
  selector: 'app-forgot-pass',
  templateUrl: './forgot-pass.component.html',
  styleUrls: ['./forgot-pass.component.scss']
})
export class ForgotPassComponent {
  @ViewChild('input1', {read:ElementRef}) input1: any;
  @ViewChild('form') formRef: any = null;
  @ViewChild('form', { read: ElementRef }) formElement: any = null;

  login: any = "";
  type: any = "";
  phase: number = 0;

  p1= "";
  p2= "";
  p3= "";
  p4= "";

  constructor(
    private API: APIService
  ) {
  }

  checkType(): boolean {
    const text = this.login.replace(/^\+?380/, "");
    switch (true) {
      case ((/^\d{9,}$/).test(text)): {
        this.type = "SMS";
        return false;
      }
      case ((/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/).test(text)): {
        this.type = "EMAIL";
        return false;
      }
      default: {
        this.type = "";
        return true;
      }
    }
  }
  onSubmit(form: any) {
    if (!this.type) {
      return;
    }
    this.API.sendRecoveryCode(this.login, this.type)
      .subscribe(res => {
        this.phase = 1;
        setTimeout((_: any): void => {
          this.input1.nativeElement.focus();
        },10);
      });
  }

  submitPin(pin: string) {

  }

  refocus(forward: boolean) {
    const inputs: Array<any> = Array.from(this.formElement.nativeElement.querySelectorAll("input"));
    const index: number = inputs.indexOf(document.activeElement);
    if (forward) {
      if (index > -1 && index < 3) {
        inputs[index + 1].focus();
      }
      if (this.formRef.valid) {
        this.submitPin(this.p1 + this.p2 + this.p3 + this.p4);
      }
    } else {
      if (index > 0 && index < 4) {
        inputs[index - 1].focus();
      }
    }
  }

  onKeyup(evt: any, form: any) {
    switch (evt.keyCode) {
      case 13: {
        this.formRef.form.markAllAsTouched();
        if (this.formRef.form.valid) {
          this.submitPin(this.p1 + this.p2 + this.p3 + this.p4);
        }
        break;
      }
      case 8: {
        this.refocus(false);
        break;
      }
      case 9: {
        break;
      }
      case 16: {
        break;
      }
      default: {
        this.refocus(true);
      }
    }
  }

}
