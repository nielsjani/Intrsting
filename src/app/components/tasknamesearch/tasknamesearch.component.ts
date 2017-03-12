import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";

@Component({
  selector: 'tasknamesearch-component',
  templateUrl: './tasknamesearch.component.html'
})
export class TasknameSearchComponent {
  filteredNames: string[] = [];
  allNames: string[] = [];
  private selected: string ="";

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
    this.allNames = this.navParams.data;
  }

  ngOnInit() {
  }

  getTasknames(event) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.selected = val;
      this.filteredNames =  this.allNames.filter(name => name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
    } else {
      this.filteredNames = [];
    }
  }

  selectTaskname(selectedName: string) {
    this.selected  = selectedName;
  }

  back(){
    this.viewCtrl.dismiss();
  }

  ok() {
    this.viewCtrl.dismiss(this.selected);
  }
}
