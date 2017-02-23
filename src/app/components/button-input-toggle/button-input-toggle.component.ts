import {Input, Component, Output, EventEmitter} from "@angular/core";

@Component({
  selector: 'button-input-toggle',
  templateUrl: './button-input-toggle.component.html'
})
export class ButtonInputToggleComponent {

  @Input()
  toggleButtonText: string;
  @Input()
  closeListener: string;
  @Input()
  buttonFull: string;
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

  isButtonFull() {
    if(!this.buttonFull){
      return true;
    }
    return this.buttonFull.toLowerCase() !== "false";
  }

}
