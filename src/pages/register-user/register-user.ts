import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../app/service/user.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {notEmpty} from "../../app/validator/NotEmptyValidator";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html'
})
export class RegisterUserPage {
  private createAccountForm;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private formBuilder: FormBuilder) {
    this.createAccountForm = this.formBuilder.group({
      username: new FormControl("", notEmpty),
      password: new FormControl("", notEmpty)
    });
  }

  submitForm() {
    //TODO: check if username not taken
    this.userService.createUser(this.createAccountForm.value)
      .subscribe(userCreated => {
        this.userService.logIn(userCreated.username);
        this.navCtrl.push(SearchPage);
      });
  }

}
