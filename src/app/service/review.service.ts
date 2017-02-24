import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {Review} from "../class/review.class";
import {IntrstingService} from "./intrsting.service";
import "rxjs/Rx";


@Injectable()
export class ReviewService {

  private schemaName: string = "reviews";

  constructor(private http: Http) {
  }

  postReview(review: Review): Observable<Response> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(review));
  }

  updateReview(existingReview: Review, reviewId: string): Observable<Response> {
    return this.http.patch(`${IntrstingService.baseUrl}/${this.schemaName}/${reviewId}.json`, JSON.stringify(existingReview));
  }

  getReviewsForIntrsthing(intrsthingId: string): Observable<Review[]> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`)
      .map(response => {
        let objectWithKeys = response.json();
        return this.mapAndFilter(objectWithKeys, intrsthingId);
      });
  }

  private mapAndFilter(objectWithKeys: any, intrsthingIdToFilter: string): Review[] {
    return this.mapToReviews(objectWithKeys)
      .filter(item => {
        return item.intristingId === intrsthingIdToFilter;
      });
  }


  private mapToReviews(rawReviewCollection: any): Review[] {
    let mappedResults: Review[] = [];
    for (let reviewId in rawReviewCollection) {
      if (rawReviewCollection.hasOwnProperty(reviewId)) {
        let review: Review = rawReviewCollection[reviewId];
        review.id = reviewId;
        mappedResults.push(review);
      }
    }
    return mappedResults;
  }

}
