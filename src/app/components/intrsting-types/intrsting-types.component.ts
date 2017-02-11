import {Input, Component} from "@angular/core";
import {IntrstingtypesMapper} from "../../class/intrstingtypes-mapper.class";

@Component({
  selector: 'intrsting-types',
  templateUrl: './intrsting-types.component.html'
})
export class IntrstingTypesComponent {
  @Input()
  form;
  @Input()
  fcn;

  open: boolean = false;

  openList() {
    this.open = true;
  }

  closeList() {
    this.open = false;
  }

  getChosenType() {
    if(this.form.controls[this.fcn].value) {
      let typeLabel = new IntrstingtypesMapper().toLabel(this.form.controls[this.fcn].value);
      return "Type: " + typeLabel;
    }
    return "Pick a type";
  }

  selectionMade() {
    //Yeah, really...
    return this.form.controls[this.fcn].value !== undefined
      && this.form.controls[this.fcn].value !== null
      && this.form.controls[this.fcn].value.trim() !== "";
  }

  clearSelection() {
    this.form.controls[this.fcn].reset();
    this.closeList();
  }
}
