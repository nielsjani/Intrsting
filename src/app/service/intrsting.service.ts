import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Intrsting} from "../class/intrsting.class";
import {Observable} from "rxjs";

@Injectable()
export class IntrstingService {

  public static baseUrl: string = "https://intrsting-b7c91.firebaseio.com";
  private schemaName = "intrsthings";

  constructor(private http: Http) {
  }

  addIntrsthing(intrsting: Intrsting): Observable<Response> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(intrsting));
  }

  getIntrsthing(id: string): Observable<Response>{
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}/${id}.json`);
  }

  search(): Observable<Response> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`);
  }

  updateTags(intrsthing: Intrsting, tagToAdd: string): Observable<Intrsting> {
    if(!intrsthing.tags){
      intrsthing.tags = [tagToAdd];
    } else {
      intrsthing.tags.push(tagToAdd);
    }
    return this.http.put(`${IntrstingService.baseUrl}/${this.schemaName}/${intrsthing.id}/tags.json`, JSON.stringify(intrsthing.tags))
      .map(response => response.json());
  }
}
