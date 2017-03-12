import {Task} from "./task.class";

export class TaskGoal {
  id: string; //after persist
  achieved: boolean;
  numberOfPointsToAchieve: number;
  tasks: Task[];
  owner: string;
}
