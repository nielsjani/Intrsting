import {Component} from "@angular/core";
import {NavController, NavParams} from "ionic-angular";
import {AddNewPage} from "../add-new/add-new";
import {IntrstingService} from "../../app/service/intrsting.service";
import {IntrstingDetailPage} from "../intrsting-detail/intrsting-detail";
import {FormBuilder, FormControl} from "@angular/forms";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  results: any[] = [];
  searchForm;

  constructor(private navCtrl: NavController, private navParams: NavParams, private intrstingService: IntrstingService, private formBuilder: FormBuilder) {
    this.searchForm = this.formBuilder.group({
        type: new FormControl("BOOK"),
      }
    );
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  private mapToIntrsthings(rawIntrsthingCollection: any) {
    for (let intrsthingId in rawIntrsthingCollection) {
      if (rawIntrsthingCollection.hasOwnProperty(intrsthingId)) {
        let intrsthing = rawIntrsthingCollection[intrsthingId];
        intrsthing.id = intrsthingId;
        this.results.push(intrsthing);
      }
    }
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
    if (type === "BOOK") {
      return "book";
    }
    if (type === "BLOG") {
      return "chatbubbles";
    }
    if (type === "VIDEO") {
      return "videocam";
    }
    if (type === "PODCAST") {
      return "musical-notes";
    }
    if (type === "ONLINE_COURSE") {
      return "bulb";
    }
    return "qr-scanner";
  }

  submitSearchForm() {
    this.intrstingService.search()
      .subscribe(response => {
        let objectWithKeys = response.json();
        this.mapToIntrsthings(objectWithKeys);
      });
  }

}
