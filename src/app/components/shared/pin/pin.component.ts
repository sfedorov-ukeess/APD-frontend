import {AfterViewInit, Component, ElementRef, Input, ViewChild} from '@angular/core';

@Component({
  selector: 'app-pin',
  templateUrl: './pin.component.html',
  styleUrls: ['./pin.component.scss']
})
export class PinComponent implements AfterViewInit{
  @Input("onSubmit") onSubmit: any;
  @ViewChild('input1', {read:ElementRef}) input1: any;
  @ViewChild('form') formRef: any = null;
  @ViewChild('form', { read: ElementRef }) formElement: any = null;
  p1= "";
  p2= "";
  p3= "";
  p4= "";

  ngAfterViewInit() {
    this.input1.nativeElement.focus();
  }

  refocus(forward: boolean) {
    const inputs: Array<any> = Array.from(this.formElement.nativeElement.querySelectorAll("input"));
    const index: number = inputs.indexOf(document.activeElement);
    if (forward) {
      if (index > -1 && index < 3) {
        inputs[index + 1].focus();
      }
      if (this.formRef.valid) {
        this.onSubmit?.(this.p1 + this.p2 + this.p3 + this.p4);
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
          this.onSubmit?.(this.p1 + this.p2 + this.p3 + this.p4);
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
