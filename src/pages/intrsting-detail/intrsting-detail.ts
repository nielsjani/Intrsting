import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {IntrstingService} from "../../app/service/intrsting.service";
import {Intrsting} from "../../app/class/intrsting.class";

@Component({
  selector: 'page-intrsting-detail',
  templateUrl: 'intrsting-detail.html'
})
export class IntrstingDetailPage {
  private intrsthing: Intrsting;

  constructor(public navCtrl: NavController, public navParams: NavParams, private intrstingService: IntrstingService) {}

  ionViewDidLoad() {
    this.intrstingService.getIntrsthing(this.navParams.data)
      .subscribe(fetchedIntrsthing => this.intrsthing = fetchedIntrsthing.json());
  }

  getTitle() {
    return this.intrsthing ?  `Detail of '${this.intrsthing.name}'` : "Fetching data...";
  }

}
