import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {UserService} from "../../app/service/user.service";
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {notEmpty} from "../../app/validator/NotEmptyValidator";
import {SearchPage} from "../search/search";

@Component({
  selector: 'page-register-user',
  templateUrl: 'register-user.html'
})
export class RegisterUserPage {
  private createAccountForm: FormGroup;
  private usernameUnavailable = false;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService, private formBuilder: FormBuilder) {
    this.createAccountForm = this.formBuilder.group({
      username: new FormControl("", notEmpty),
      password: new FormControl("", notEmpty)
    });
  }

  submitForm() {
    this.userService.isUsernameAvailable(this.createAccountForm.get("username").value)
      .subscribe(isAvailable => {
        if(!isAvailable){
          this.usernameUnavailable = true;
        } else {
          this.createUser();
        }
      });
  }

  private createUser() {
    this.userService.createUser(this.createAccountForm.value)
      .subscribe(createdId => {
        this.userService.getUserById(createdId)
          .subscribe(userCreated => {
            console.log(userCreated)
            this.userService.logIn(userCreated.username);
          });
      });
  }
}
