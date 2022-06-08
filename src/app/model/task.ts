import { Consultant } from "./consultant";
import { Customer } from "./customer";
import { Profession } from "./profession";
import { State } from "./state";

export interface Task {
  id: number,
  Profession?: Profession,
  Consultant?: Consultant,
  Customer?: Customer,
  name: string,
  description: string,
  State?: State
}
