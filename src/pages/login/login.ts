import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {UserService} from "../../app/service/user.service";
import {FormBuilder, FormControl} from "@angular/forms";
import {NotEmptyValidator, notEmpty} from "../../app/validator/NotEmptyValidator";
import {RegisterUserPage} from "../register-user/register-user";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  private loginForm;
  private illegalUserPasswordCombination: boolean = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({
      username: new FormControl("", notEmpty),
      password: new FormControl("", notEmpty)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  submitForm() {
    this.userService.doesUserExist(this.loginForm.value)
      .subscribe(doesExist => {
        this.illegalUserPasswordCombination = !doesExist;
        if(doesExist === true){
          this.userService.logIn(this.loginForm.get("username").value);
        }
      });
  }

  goToRegisterPage() {
    this.navCtrl.push(RegisterUserPage);
  }

}
