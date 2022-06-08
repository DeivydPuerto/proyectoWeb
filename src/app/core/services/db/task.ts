import { Task } from "src/app/model/task";
import { consultantInit } from "./consultant";
import { customerInit } from "./customer";
import { professionInit } from "./profession";
import { stateInit } from "./state";

export var taskInit: Task[] = [{
  id: 1,
  Profession: professionInit[0],
  Consultant: consultantInit[0],
  Customer: customerInit[0],
  name: 'no se',
  description: 'no haga nada entonces',
  State: stateInit[7],
}]