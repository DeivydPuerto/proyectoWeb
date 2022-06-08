import { Access } from "src/app/model/access";
import { Consultant } from "src/app/model/consultant";
import { Customer } from "src/app/model/customer";
import { Profession } from "src/app/model/profession";
import { State } from "src/app/model/state";
import { Task } from "src/app/model/task";
import { accessInit } from "./access";
import { consultantInit } from "./consultant";
import { customerInit } from "./customer";
import { professionInit } from "./profession";
import { stateInit } from "./state";
import { taskInit } from "./task";

export class DataBase {
  public static profession: Profession[] = professionInit
  public static consultant: Consultant[] = consultantInit
  public static customer: Customer[] = customerInit
  public static access: Access[] = accessInit
  public static state: State[] = stateInit
  public static task: Task[] = taskInit
}