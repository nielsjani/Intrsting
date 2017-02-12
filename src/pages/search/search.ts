import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {AddNewPage} from "../add-new/add-new";
import {IntrstingService} from "../../app/service/intrsting.service";
import {IntrstingDetailPage} from "../intrsting-detail/intrsting-detail";
import {FormBuilder, FormControl} from "@angular/forms";
import {IntrstingtypesMapper} from "../../app/class/intrstingtypes-mapper.class";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  results: any[] = [];
  searchForm;
  editingName: boolean = false;
  searchedAtLeastOnce: boolean = false;

  constructor(private navCtrl: NavController, private navParams: NavParams, private intrstingService: IntrstingService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
        name: new FormControl(""),
        type: new FormControl(""),
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  private mapToIntrsthings(rawIntrsthingCollection: any): any[] {
    let mappedResults = [];
    for (let intrsthingId in rawIntrsthingCollection) {
      if (rawIntrsthingCollection.hasOwnProperty(intrsthingId)) {
        let intrsthing = rawIntrsthingCollection[intrsthingId];
        intrsthing.id = intrsthingId;
        mappedResults.push(intrsthing);
      }
    }
    return mappedResults;
  }

  goToAddNewPage() {
    this.navCtrl.push(AddNewPage);
  }

  goToDetailPage(id) {
    this.navCtrl.push(IntrstingDetailPage, id);
  }

  descriptionCutOff(description: string) {
    if (description.length > 50) {
      return description.substr(0, 50) + "...";
    }
    return description;
  }

  mapTypeToIcon(type: string) {
    return new IntrstingtypesMapper().toIcon(type);
  }

  clearName() {
    this.searchForm.controls["name"].reset();
  }

  toggleNameEdit() {
    this.editingName = !this.editingName;
  }

  getNameButtonText() {
    let nameValue = this.searchForm.controls["name"].value;
    return nameValue ? "With name: " + nameValue : "Whose name contains...";
  }

  submitSearchForm() {
    this.intrstingService.search()
      .subscribe(response => {
        let objectWithKeys = response.json();
        this.results = this.mapAndFilter(objectWithKeys);
        this.searchedAtLeastOnce = true;
      });
  }

  private mapAndFilter(objectWithKeys: any) {
    return this.mapToIntrsthings(objectWithKeys)
      .filter(item => {
        let nameFilter = this.searchForm.controls["name"].value;
        return !this.isFilteringOn(nameFilter) ? true : item.name.toLowerCase().indexOf(nameFilter.toLowerCase()) !== -1;
      })
      .filter(item => {
        let typeFilter = this.searchForm.controls["type"].value;
        return !this.isFilteringOn(typeFilter) ? true : item.type.toLowerCase() === typeFilter.toLowerCase();
      });
  }

  private isFilteringOn(value: string): boolean {
    return value !== undefined && value !== null && value.trim() !== "";
  }

}
