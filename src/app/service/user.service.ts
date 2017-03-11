import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {User} from "../class/user.class";
import {IntrstingService} from "./intrsting.service";
import {Storage} from "@ionic/storage";
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

  isUnlocked() {
    return this.storage.get("isUnlocked").then(value => value && value !== false ? true : false);
  }

  setUnlocked(): Promise<boolean> {
    return this.storage.set("isUnlocked", true)
  }

  logOut() {
    this.storage.clear().then(() => this.events.publish('user:loggedout'));
  }

  logIn(username: string) {
    this.storage.set("loggedInUser", username)
      .then(() => this.setIsUnlocked(username, () => this.events.publish('user:loggedin')));
  }

  private setIsUnlocked(username, callback: ()=>any) {
    this.getUserByUsername(username)
      .subscribe(userToUnlock => {
        this.storage.set("isUnlocked", userToUnlock.unlocked)
          .then(() => callback());
      })
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
        user.id = userId;
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

  unlockTodoPage(): Promise<void> {
    return this.getLoggedInUser()
      .then(usernameFromStorage => {
        return this.getUserByUsername(usernameFromStorage)
          .subscribe(userToUnlock => {
            userToUnlock.unlocked = true;
            return this.http.patch(`${IntrstingService.baseUrl}/${this.schemaName}/${userToUnlock.id}.json`, JSON.stringify(userToUnlock))
              .subscribe(patchedUser => "");
          });
      });
  }

  private getUserByUsername(usernameFromStorage) {
    return this.getAllUsers()
      .map(users => this.mapToUsers(users.json()).filter(user => user.username === usernameFromStorage)[0]);
  }
}
