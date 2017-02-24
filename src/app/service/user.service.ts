import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../class/user.class";
import {IntrstingService} from "./intrsting.service";
import {Storage} from '@ionic/storage';
import {Events} from "ionic-angular";

@Injectable()
export class UserService {

  private schemaName: string = "users";

  constructor(private http: Http, private storage: Storage, private events: Events) {
  }

  createUser(user: User): Observable<string> {
    user.password = btoa(user.password);
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(user))
      .map(createdId => createdId.json().name);
  }

  isLoggedIn(): Promise<boolean> {
    return this.storage.get("loggedInUser").then(value => value ? true : false);
  }

  logOut() {
    this.storage.remove("loggedInUser").then(() => this.events.publish('user:loggedout'));
  }

  logIn(username: string) {
    this.storage.set("loggedInUser", username).then(() => this.events.publish('user:loggedin'));
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

  getUserById(id: string): Observable<User> {
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}/${id}.json`)
      .map(response => response.json());
  }

  isUsernameAvailable(usernameToCreate: string): Observable<boolean> {
    return this.getAllUsers()
      .map(users => this.mapToUsers(users.json()).some(user => user.username === usernameToCreate))
      .map(bool => !bool);
  }

  getLoggedInUser(): Promise<string> {
    return this.storage.get("loggedInUser");
  }
}
