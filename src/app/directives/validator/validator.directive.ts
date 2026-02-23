import {Directive, Input} from '@angular/core';
import {AbstractControl, NG_VALIDATORS, ValidationErrors, Validator, ValidatorFn} from "@angular/forms";

@Directive({
  selector: '[validator-pattern]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: ValidatorDirective,
      multi: true,
    },
  ],
  standalone: true,
})

export class ValidatorDirective implements Validator {
  @Input('validator-pattern') pattern = '';

  validator(regular: RegExp): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const allowed = regular.test(control.value);
      return allowed ? null : {forbiddenName: {value: control.value}};
    };
  }

  validate(control: AbstractControl): ValidationErrors | null {
    return this.pattern
      ? this.validator(new RegExp(this.pattern, 'i'))(control)
      : null;
  }
}
