import {Input, Component} from "@angular/core";

@Component({
  selector: 'intrsting-types',
  templateUrl: './intrsting-types.component.html'
})
export class IntrstingTypesComponent {
  @Input()
  form;
  @Input()
  fcn;

//  TODO: find a way to pass in formControlName as a param
}
