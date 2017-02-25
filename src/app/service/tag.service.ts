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
    return this.getAllTags()
      .map(tags => {
        if (this.isTagUnique(tags, tag)) {
          return this.addTag(tag);
        }
        return Observable.of(tag);
      })
      .flatMap(val => val);
  }

  private isTagUnique(tags, tag: Tag) {
    return tags.map(tagToMap => tagToMap.name).indexOf(tag.name) === -1;
  }

  private addTag(tag: Tag): Observable<Tag> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(tag))
      .map(response => response.json().name);
  }

  getAllTags(): Observable<Tag[]> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`)
      .map(response => response.json())
      .map(tagsWithId => this.mapToTags(tagsWithId));
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
