import {Directive} from "@angular/core";
import {NG_VALIDATORS, AbstractControl} from "@angular/forms";

@Directive({
  selector: '[notEmpty][ngModel]', // ? Is this an AND relation?
  providers: [
    {
      provide: NG_VALIDATORS,
      useValue: notEmpty,
      multi: true // http://blog.thoughtram.io/angular2/2015/11/23/multi-providers-in-angular-2.html
    }
  ]
})
export class NotEmptyValidator {

  constructor() {
  }

}

export function notEmpty(c:AbstractControl) {
  if (!c.value || c.value.trim() === "") {
    return {
      notEmpty: {
        valid: false
      }
    }
  }
  return null;
}
