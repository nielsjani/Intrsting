import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {Observable} from "rxjs";
import {Tag} from "../class/tag.class";
import "rxjs/Rx";
import {IntrstingService} from "./intrsting.service";

@Injectable()
export class TagService {

  private schemaName: string = "tags";

  constructor(private http: Http) {
  }

  createTag(tag: Tag): Observable<Tag> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(tag))
      .map(response => response.json().name);
  }

  getTagsFor(intrstingId: string): Observable<Tag[]> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`)
      .map(response => {
        let tagsWithId = response.json();
        return this.mapAndFilter(tagsWithId, intrstingId);
      })
  }

  private mapAndFilter(objectWithKeys: any, intrsthingIdToFilter: string): Tag[] {
    return this.mapToTags(objectWithKeys)
      .filter(item => {
        return item.intrsthingId === intrsthingIdToFilter;
      });
  }


  private mapToTags(rawTagCollection: any): Tag[] {
    let mappedResults: Tag[] = [];
    for (let tagId in rawTagCollection) {
      if (rawTagCollection.hasOwnProperty(tagId)) {
        let tag: Tag = rawTagCollection[tagId];
        tag.id = tagId;
        mappedResults.push(tag);
      }
    }
    return mappedResults;
  }
}
