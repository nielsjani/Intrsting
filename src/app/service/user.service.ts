import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../class/user.class";
import {IntrstingService} from "./intrsting.service";
import { Storage } from '@ionic/storage';
import {Events} from "ionic-angular";

@Injectable()
export class UserService {

  // TODO: save loggedIn user in local storage
  // TODO: login / register screen
  // TODO: hash passwords
  private schemaName: string = "users";

  constructor(private http: Http, private storage: Storage, private events: Events) {
  }

  createUser(user: User): Observable<User> {
    user.password = btoa(user.password);
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(user))
      .map(user => user.json());
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get("loggedInUser").then(value => value);
  }

  logOut() {
    //TODO: send event thats caught in app.component so the root page is changed
    this.storage.remove("loggedInUser");
    this.events.publish('user:loggedout');
  }

  logIn(username: string) {
    //TODO: send event thats caught in app.component so the root page is changed
    this.storage.set("loggedInUser", username);
    this.events.publish('user:loggedin');
  }

  doesUserExist(usernameAndPlainStringPassword): Observable<boolean> {
    let username = usernameAndPlainStringPassword.username;
    let encodedPassword = btoa(usernameAndPlainStringPassword.password);
    return this.getAllUsers()
      .map(users => {
        let allUsers: User[] = this.mapToUsers(users.json());
        return allUsers.some(user => user.username === username && user.password === encodedPassword);
      });
  }


  private mapToUsers(rawUserCollection: any): User[] {
    let mappedResults: User[] = [];
    for (let userId in rawUserCollection) {
      if (rawUserCollection.hasOwnProperty(userId)) {
        let user: User = rawUserCollection[userId];
        mappedResults.push(user);
      }
    }
    return mappedResults;
  }

  private getAllUsers(): Observable<Response> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`);
  }
}
