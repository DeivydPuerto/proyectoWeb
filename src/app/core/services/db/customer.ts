import { Customer } from "src/app/model/customer";
import { accessInit } from "./access";
import { stateInit } from "./state";

export var customerInit: Customer[] = [{
  id: 1,
  Access: accessInit[1],
  State: stateInit[0],
  phone: 3001111111,
}]
