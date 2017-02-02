import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FormBuilder, Validators, FormControl} from "@angular/forms";
import {IntrstingService} from "../../app/service/intrsting.service";
import {IntrstingDetailPage} from "../intrsting-detail/intrsting-detail";

@Component({
  selector: 'page-add-new',
  templateUrl: 'add-new.html'
})
export class AddNewPage {
  private addnewForm;
  nameField: FormControl;

  constructor(private navCtrl: NavController,
              private navParams: NavParams,
              private formBuilder: FormBuilder,
              private intrstingService: IntrstingService) {
    this.nameField = new FormControl('', Validators.required);
    this.addnewForm = this.formBuilder.group({
      type: new FormControl("BOOK"),
      name: this.nameField
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad AddNewPage');
  }

  submitForm() {
    this.intrstingService.addIntrsthing(this.addnewForm.value)
      .subscribe(res => this.navCtrl.push(IntrstingDetailPage, res.json().name));
  }

}
