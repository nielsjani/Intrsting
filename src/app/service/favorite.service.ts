import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Review} from "../class/review.class";
import {IntrstingService} from "./intrsting.service";
import "rxjs/Rx";
import {Favorite} from "../class/favorite.class";


@Injectable()
export class FavoriteService {

  private schemaName: string = "favorites";

  constructor(private http: Http) {
  }

  postFavorite(favorite: Favorite): Observable<Response> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(favorite));
  }

  deleteFavorite(favorite: Favorite): Observable<Response> {
    return this.http.delete(`${IntrstingService.baseUrl}/${this.schemaName}/${favorite.id}.json`);
  }

  getFavoritesForUser(username: string): Observable<Favorite[]> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`)
      .map(response => {
        let objectWithKeys = response.json();
        return this.mapAndFilter(objectWithKeys, username);
      });
  }

  isFavorited(username: string, intrsthingId: string): Observable<boolean> {
    return this.getFavoritesForUser(username)
      .map(favorites => favorites.some(favorite => favorite.intrsthingId === intrsthingId))
  }

  getFavorite(username: string, intrsthingId: string): Observable<Favorite> {
    return this.getFavoritesForUser(username)
      .map(favorites => favorites.filter(favorite => favorite.intrsthingId === intrsthingId)[0])
  }

  private mapAndFilter(objectWithKeys: any, usernameIdToFilter: string): Favorite[] {
    return this.mapToFavorites(objectWithKeys)
      .filter(item => {
        return item.username === usernameIdToFilter;
      });
  }


  private mapToFavorites(rawReviewCollection: any): Favorite[] {
    let mappedResults: Favorite[] = [];
    for (let favortieId in rawReviewCollection) {
      if (rawReviewCollection.hasOwnProperty(favortieId)) {
        let favortie: Favorite = rawReviewCollection[favortieId];
        favortie.id = favortieId;
        mappedResults.push(favortie);
      }
    }
    return mappedResults;
  }

}
