import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Intrsting} from "../class/intrsting.class";
import {Observable} from "rxjs";

@Injectable()
export class IntrstingService {

  private baseUrl: string = "https://intrsting-b7c91.firebaseio.com";

  constructor(private http: Http) {
  }

  addIntrsthing(intrsting: Intrsting): Observable<Response> {
    return this.http.post(`${this.baseUrl}/intrsthings.json`, JSON.stringify(intrsting));
  }

  getIntrsthing(id: string): Observable<Response>{
    return this.http.get(`${this.baseUrl}/intrsthings/${id}.json`)
  }
}
