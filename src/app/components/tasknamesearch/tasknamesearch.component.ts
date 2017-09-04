import {Component} from "@angular/core";
import {ViewController, NavParams} from "ionic-angular";

@Component({
  selector: 'tasknamesearch-component',
  templateUrl: './tasknamesearch.component.html'
})
export class TasknameSearchComponent {
  filteredNames: string[] = [];
  allNames: string[] = [];
  private selected: string[] = [];
  searchText: string = "";

  constructor(public viewCtrl: ViewController, private navParams: NavParams) {
    this.allNames = this.navParams.data;
    this.filteredNames = this.allNames;
  }

  ngOnInit() {
  }

  getTasknames(event) {
    let val = event.target.value;
    if (val && val.trim() != '') {
      this.filteredNames =  this.allNames.filter(name => name.toLowerCase().indexOf(val.toLowerCase()) !== -1);
    } else {
      this.filteredNames = this.allNames;
    }
  }

  selectTaskname(selectedName: string) {
    console.log(this.selected);
    if(this.selected.indexOf(selectedName) === -1){
      this.selected.push(selectedName);
    } else {
      this.selected.splice(this.selected.indexOf(selectedName),1);
    }
  }

  addNew() {
    this.allNames.push(this.searchText);
    this.selected.push(this.searchText);
  }

  back(){
    this.viewCtrl.dismiss();
  }

  ok() {
    this.viewCtrl.dismiss(this.selected);
  }

  getLineColor(name){
    return this.isChecked(name) ? "checked-line" : "";
  }

  isChecked(name){
    return this.selected.indexOf(name) > -1 ? "checked-line" : "";
  }

}
