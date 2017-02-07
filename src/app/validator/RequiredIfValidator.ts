import {Directive} from "@angular/core";
import {NG_VALIDATORS, FormGroup} from "@angular/forms";

@Directive({
  selector: '[requiredIf][ngModel]', // ? Is this an AND relation?
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: requiredIf,
      multi: true // http://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html
    }
  ]
})
export class RequiredIfValidator {

  constructor() {
  }

}

export function requiredIf(requiredIfFunction: (formGroup: FormGroup)=>boolean, fieldUnderValidation: string) {
  return (formGroup: FormGroup) => {
    if (!formGroup.controls[fieldUnderValidation].pristine && requiredIfFunction(formGroup)) {
      formGroup.controls[fieldUnderValidation].setErrors({requiredIf: true});
      return {
        requiredIf: {valid: false}
      }
    }
    if(formGroup.controls[fieldUnderValidation].errors !== null){
      formGroup.controls[fieldUnderValidation].updateValueAndValidity();
    }
    return null;
  }
}
