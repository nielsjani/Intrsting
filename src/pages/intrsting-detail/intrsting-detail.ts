import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IntrstingService} from "../../app/service/intrsting.service";
import {Intrsting} from "../../app/class/intrsting.class";
import {IntrstingtypesMapper} from "../../app/class/intrstingtypes-mapper.class";

@Component({
  selector: 'page-intrsting-detail',
  templateUrl: 'intrsting-detail.html'
})
export class IntrstingDetailPage {
  private intrsthing: Intrsting;

  constructor(public navCtrl: NavController, public navParams: NavParams, private intrstingService: IntrstingService) {}

  ionViewDidLoad() {
    this.intrstingService.getIntrsthing(this.navParams.data)
      .subscribe(fetchedIntrsthing => {
        this.intrsthing = fetchedIntrsthing.json();
        this.intrsthing.id = this.navParams.data;
      });
  }

  getTitle() {
    return this.intrsthing ?  `Detail of '${this.intrsthing.name}'` : "Fetching data...";
  }

  mapTypeToIcon(type: string) {
    return new IntrstingtypesMapper().toIcon(type);
  }

}
