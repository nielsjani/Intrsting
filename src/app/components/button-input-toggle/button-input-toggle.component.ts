import {Input, Component, SimpleChange, Output, EventEmitter} from "@angular/core";
import {IntrstingtypesMapper} from "../../class/intrstingtypes-mapper.class";

@Component({
  selector: 'button-input-toggle',
  templateUrl: './button-input-toggle.component.html'
})
export class ButtonInputToggleComponent {

  @Input()
  toggleButtonText: string;
  @Input()
  closeListener: string;
  @Output()
  startedEditing= new EventEmitter();

  open: boolean = false;

  ngOnChanges(changes: any) {
    if(changes.closeListener){
      if(changes.closeListener.currentValue === true) {
        this.toggleClosed();
      }
    }
  }

  toggleOpen() {
    this.open = true;
    this.startedEditing.emit();
  }

  toggleClosed() {
    this.open = false;
  }

}
