import {Component} from "@angular/core";
import {NavController, NavParams, ModalController} from "ionic-angular";
import {FormBuilder, FormGroup, FormControl} from "@angular/forms";
import {notEmpty} from "../../app/validator/NotEmptyValidator";
import {wholePositiveNumber} from "../../app/validator/WholePositiveNumberValidator";
import {TaskService} from "../../app/service/task.service";
import {Task} from "../../app/class/task.class";
import {UserService} from "../../app/service/user.service";
import {TaskGoal} from "../../app/class/taskgoal.class";
import {TasknameSearchComponent} from "../../app/components/tasknamesearch/tasknamesearch.component";

@Component({
  selector: 'page-todo-list',
  templateUrl: 'todo-list.html'
})
export class TodoListPage {

  creatingTask = false;
  addingTaskToExistingList = false;

  private addTaskForm: FormGroup;
  private addTaskToListForm: FormGroup;

  private currentTaskGoal: TaskGoal;
  private userTaskGoals: TaskGoal[] = [];
  private tasksAchieved: Task[] = [];

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private formBuilder: FormBuilder,
              private taskService: TaskService,
              private userService: UserService,
              private modalCtrl: ModalController) {
    this.addTaskForm = this.formBuilder.group({
      taskname: new FormControl('', notEmpty),
      numberOfPointsTarget: new FormControl(10, [notEmpty, wholePositiveNumber])
    });
    this.addTaskToListForm = this.formBuilder.group({
      taskname: new FormControl('', notEmpty),
    });
  }

  ionViewDidLoad() {
    this.userService.getLoggedInUser()
      .then(username =>
        this.taskService.getTaskGoalsForUser(username)
        .subscribe(taskGoalsForUser => {
          this.userTaskGoals = taskGoalsForUser;
          this.findActiveTaskGoal();
        }))
  }

  startCreatingTask() {
    this.creatingTask = true;
  }

  startAddingTaskToList() {
    this.addingTaskToExistingList = true;
  }

  submitForm() {
    this.userService.getLoggedInUser()
      .then(username => {
        let taskGoal = this.mapTaskGoal(username);
        this.taskService.addTaskGoal(taskGoal)
          .subscribe(savedTaskGoalId => {
            this.currentTaskGoal = taskGoal;
            this.currentTaskGoal.id = savedTaskGoalId.json().name;
            this.userTaskGoals.push(this.currentTaskGoal);
            this.creatingTask = false;
          });
      })
  }

  submitAddTaskToListForm() {
    let taskToAdd = this.mapFormToTask(this.addTaskToListForm.controls["taskname"].value);
    this.currentTaskGoal.tasks.push(taskToAdd);
    this.taskService.updateTaskGoal(this.currentTaskGoal)
      .subscribe(updatedTaskGoal => {
        this.currentTaskGoal = updatedTaskGoal;
        this.addingTaskToExistingList = false;
      });
  }

  private mapTaskGoal(username): TaskGoal {
    let task = this.mapFormToTask(this.addTaskForm.controls["taskname"].value);
    let taskGoal: TaskGoal = new TaskGoal();
    taskGoal.tasks = [task];
    taskGoal.owner = username;
    taskGoal.numberOfPointsToAchieve = this.addTaskForm.controls["numberOfPointsTarget"].value;
    return taskGoal;
  }

  private mapFormToTask(taskname: any): Task {
    let task: Task = new Task();
    task.name = taskname;
    task.numberOfTimesCompleted = 0;
    return task;
  }

  private findActiveTaskGoal() {
    this.currentTaskGoal = this.userTaskGoals.filter(taskgoal => !taskgoal.achieved)[0];
  }

  getNumberOfAchievedPointsForCurrentTaskGoal() {
    if(!this.currentTaskGoal || !this.currentTaskGoal.tasks){
      return 0;
    }
    return this.currentTaskGoal.tasks.map(task => task.numberOfTimesCompleted)
      .reduce((element1, element2) => element1+ element2);
  }

  achievedTask(task: Task) {
    if(this.tasksAchieved.indexOf(task) === -1){
      this.tasksAchieved.push(task);
    } else {
     this.tasksAchieved.splice(this.tasksAchieved.indexOf(task), 1);
    }
  }

  confirmTasksDoneSelection() {
    this.currentTaskGoal.tasks.forEach(task => {
      if(this.tasksAchieved.indexOf(task) !== -1){
        task.numberOfTimesCompleted++;
      }
    });
    if(this.getNumberOfAchievedPointsForCurrentTaskGoal() >= this.currentTaskGoal.numberOfPointsToAchieve){
      this.currentTaskGoal.achieved = true;
    }
    this.taskService.updateTaskGoal(this.currentTaskGoal)
      .subscribe(updated => {
        this.currentTaskGoal = updated;
        this.tasksAchieved = [];
      });
  }

  getCompletedTasks() {
    if(!this.currentTaskGoal || !this.currentTaskGoal.tasks){
      return [];
    }
    return this.currentTaskGoal.tasks
      .filter(task => task.numberOfTimesCompleted > 0)
      .sort((t1, t2) => t2.numberOfTimesCompleted-t1.numberOfTimesCompleted)
  }

  openModalIfHasExistingTasks() {
    if(this.userTaskGoals.length === 0){
      return;
    } else {
      let uniqueTaskNames = Array.from(new Set(this.userTaskGoals
        .map(utg => utg.tasks)
        //JS equivalent of flatmap
        .reduce((tasks1, tasks2) => tasks1.concat(tasks2))
        .map(task => task.name)
      ));

      let tasknameModal = this.modalCtrl.create(TasknameSearchComponent, uniqueTaskNames);
      tasknameModal.onDidDismiss(chosenName => {
        this.addTaskForm.controls["taskname"].setValue(chosenName);
      });
      tasknameModal.present();
    }
  }
}
