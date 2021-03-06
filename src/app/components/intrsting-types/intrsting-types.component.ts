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
  @Input()
  buttonFull;

  editingType: boolean = false;

  getChosenType() {
    if(this.form.controls[this.fcn].value) {
      let typeLabel = new IntrstingtypesMapper().toLabel(this.form.controls[this.fcn].value);
      return "With type: " + typeLabel;
    }
    return "Who has type...";
  }

  selectionMade() {
    //Yeah, really...
    return this.form.controls[this.fcn].value !== undefined
      && this.form.controls[this.fcn].value !== null
      && this.form.controls[this.fcn].value.trim() !== "";
  }

  clearSelection() {
    this.form.controls[this.fcn].reset();
    this.editingType = false;
  }

  toggleTypeEdit() {
    this.editingType = !this.editingType;
  }

  isButtonFull() {
    if(!this.buttonFull){
      return "true";
    }
    return this.buttonFull.toLowerCase();
  }
}
