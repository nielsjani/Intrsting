import {Directive} from "@angular/core";
import {NG_VALIDATORS, AbstractControl} from "@angular/forms";

@Directive({
  selector: '[wholePositiveNumber][ngModel]', // ? Is this an AND relation?
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: wholePositiveNumber,
      multi: true // http://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html
    }
  ]
})
export class WholePositiveNumberValidator {

  constructor() {
  }

}

export function wholePositiveNumber(c:AbstractControl) {
  let valAsInt = parseInt(c.value);
  if (!(!isNaN(valAsInt) && c.value % 1 === 0 && c.value > 0)) {
    return {
      wholePositiveNumber: {
        valid: false
      }
    }
  }
  return null;
}
