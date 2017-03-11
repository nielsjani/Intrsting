import {Component, ViewChild} from "@angular/core";
import {Nav, Platform, Events} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {SearchPage} from "../pages/search/search";
import {UserService} from "./service/user.service";
import {LoginPage} from "../pages/login/login";
import {TodoListPage} from "../pages/todo-list/todo-list";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  private username = "";
  private isLoggedIn: boolean;
  private isUserUnlocked: boolean;

  constructor(public platform: Platform, private userService: UserService, private events: Events) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
      this.checkLoggedIn();
      this.events.subscribe("user:loggedout", () => {
        this.rootPage = LoginPage;
        this.checkLoggedIn();
      });
      this.events.subscribe("user:loggedin", () => {
        this.checkLoggedIn();
      });
      this.events.subscribe("user:unlocked", () => {
        this.setUnlocked();
      });
    });
  }

  private checkLoggedIn() {
    this.userService.isLoggedIn()
      .then(value => {
        this.isLoggedIn = value;
        if (this.isLoggedIn) {
          this.rootPage = SearchPage;
          this.checkUnlockedAndLogIn();
        }
      });
  }

  private checkUnlockedAndLogIn() {
    this.checkUnlocked()
      .then(() => {
        this.userService.getLoggedInUser()
          .then(user => {
            this.username = user;
            this.goHome();
          });
      });
  }

  goHome() {
    this.nav.setRoot(this.rootPage);
  }

  loggedIn(): boolean {
    return this.isLoggedIn;
  }

  logOut() {
    this.userService.logOut();
  }

  checkUnlocked() {
    return this.userService.isUnlocked()
      .then(value => {
        this.isUserUnlocked = value
      });
  }

  setUnlocked() {
    return this.userService.setUnlocked()
      .then(value => {
        this.isUserUnlocked = value
      });
  }

  isUnlocked() {
    return this.isUserUnlocked;
  }

  getUsername() {
    return this.userService.getLoggedInUser();
  }

  goToDo() {
    this.nav.push(TodoListPage);
  }
}
