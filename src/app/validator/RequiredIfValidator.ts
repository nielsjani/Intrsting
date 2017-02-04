import {Directive} from '@angular/core';
import {FormControl, NG_VALIDATORS, FormGroup, AbstractControl} from '@angular/forms';
import {notEmpty} from "./NotEmptyValidator";

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

export function requiredIf(requiredIfFunction: ()=>boolean) {
  return (formGroup: FormGroup) => {
    if (formGroup.controls['type'].value === 'BOOK' && notEmpty(formGroup.controls['author']) !== null) {
      formGroup.controls['author'].setErrors({requiredIf: true});
      return {
        requiredIf: {valid: false}
      }
    }
    if(formGroup.controls['author'].errors !== null){
      formGroup.controls['author'].updateValueAndValidity();
    }
    return null;
  }
}
