import {Component, ViewChild} from "@angular/core";
import {Nav, Platform, Events} from "ionic-angular";
import {StatusBar, Splashscreen} from "ionic-native";
import {SearchPage} from "../pages/search/search";
import {UserService} from "./service/user.service";
import {LoginPage} from "../pages/login/login";


@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = LoginPage;

  private username = "";
  private isLoggedIn: boolean;

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
        this.rootPage= LoginPage;
        this.checkLoggedIn();
      });
      this.events.subscribe("user:loggedin", () => {
        this.checkLoggedIn();
      });
    });
  }

  private checkLoggedIn() {
    this.userService.isLoggedIn()
      .then(value => {
        this.isLoggedIn = value;
        if(this.isLoggedIn) {
          this.rootPage= SearchPage;
          this.userService.getLoggedInUser()
            .then(user => {
              this.username = user;
              this.goHome();
            });
        }
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

  getUsername() {
    return this.userService.getLoggedInUser();
  }
}
