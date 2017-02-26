import {Component} from '@angular/core';
import {NavController, NavParams} from 'ionic-angular';
import {IntrstingService} from "../../app/service/intrsting.service";
import {Intrsting} from "../../app/class/intrsting.class";
import {IntrstingtypesMapper} from "../../app/class/intrstingtypes-mapper.class";
import {FavoriteService} from "../../app/service/favorite.service";
import {UserService} from "../../app/service/user.service";
import {Favorite} from "../../app/class/favorite.class";

@Component({
  selector: 'page-intrsting-detail',
  templateUrl: 'intrsting-detail.html'
})
export class IntrstingDetailPage {
  private intrsthing: Intrsting;
  private isFavorited: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private intrstingService: IntrstingService,
              private favoriteService: FavoriteService,
              private userService: UserService) {
  }

  ionViewDidLoad() {
    this.intrstingService.getIntrsthing(this.navParams.data)
      .subscribe(fetchedIntrsthing => {
        this.intrsthing = fetchedIntrsthing.json();
        this.intrsthing.id = this.navParams.data;
        this.checkIfFavorited();
      });
  }

  private checkIfFavorited() {
    this.userService.getLoggedInUser()
      .then(username => {
        this.favoriteService.isFavorited(username, this.intrsthing.id)
          .subscribe(isFavorited => this.isFavorited = isFavorited)
      })
  }

  getTitle() {
    return this.intrsthing ? `Detail of '${this.intrsthing.name}'` : "Fetching data...";
  }

  mapTypeToIcon(type: string) {
    return new IntrstingtypesMapper().toIcon(type);
  }

  getFavoriteButtonColor() {
    return this.isFavorited ? "danger" : "black";
  }

  toggleFavorite() {
    this.isFavorited = !this.isFavorited;
    if (this.isFavorited) {
      this.addFavorite();
    } else {
      this.deleteFavorite();
    }
  }

  private deleteFavorite() {
    this.userService.getLoggedInUser()
      .then(username => {
        this.favoriteService.getFavorite(username, this.intrsthing.id)
          .subscribe(favoriteToDelete => this.favoriteService.deleteFavorite(favoriteToDelete)
          //TODO: toaster?
            .subscribe(favorite => favorite))
      });
  }

  private addFavorite() {
    this.userService.getLoggedInUser()
      .then(username => {
        let newFavorite: Favorite = new Favorite();
        newFavorite.intrsthingId = this.intrsthing.id;
        newFavorite.username = username;
        this.favoriteService.postFavorite(newFavorite)
        //TODO: toaster?
          .subscribe(favorite => favorite);
      })
  }

}
