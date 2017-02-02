import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AddNewPage} from "../add-new/add-new";

@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  results: any[] = [];

  constructor(private navCtrl: NavController, private navParams: NavParams) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad SearchPage');
  }

  findIntrsting() {
  //implement me after you've got a db
  }

  goToAddNewPage() {
    this.navCtrl.push(AddNewPage);
  }

}
