import {Injectable} from "@angular/core";
import {Http, Response} from "@angular/http";
import {Observable} from "rxjs";
import {IntrstingService} from "./intrsting.service";
import {TaskGoal} from "../class/taskgoal.class";
import "rxjs/Rx";

@Injectable()
export class TaskService {

  private schemaName = "taskGoals";

  constructor(private http: Http) {
  }

  addTaskGoal(taskGoal: TaskGoal): Observable<Response> {
    return this.http.post(`${IntrstingService.baseUrl}/${this.schemaName}.json`, JSON.stringify(taskGoal));
  }

  getTaskGoalsForUser(username: string): Observable<TaskGoal[]>{
    return this.http.get(`${IntrstingService.baseUrl}/${this.schemaName}.json`)
      .map(taskgoals => taskgoals.json())
      .map(taskgoals => this.mapToTaskGoals(taskgoals))
      .map(taskGoals => taskGoals.filter(tg => tg.owner === username));
  }

  updateTaskGoal(taskGoal: TaskGoal) {
    return this.http.patch(`${IntrstingService.baseUrl}/${this.schemaName}/${taskGoal.id}.json`, JSON.stringify(taskGoal))
      .map(taskgoal => taskgoal.json());
  }

  private mapToTaskGoals(rawTaskGoalCollection: any): TaskGoal[] {
    let mappedResults: TaskGoal[] = [];
    for (let taskGoalId in rawTaskGoalCollection) {
      if (rawTaskGoalCollection.hasOwnProperty(taskGoalId)) {
        let taskgoal = this.mapTaskGoal(rawTaskGoalCollection, taskGoalId);
        mappedResults.push(taskgoal);
      }
    }
    return mappedResults;
  }

  private mapTaskGoal(rawTaskGoalCollection: any, taskGoalId): TaskGoal {
    let taskgoal: TaskGoal = rawTaskGoalCollection[taskGoalId];
    taskgoal.id = taskGoalId;
    return taskgoal;
  }
}
