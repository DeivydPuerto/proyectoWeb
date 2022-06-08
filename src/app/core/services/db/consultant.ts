import { Consultant } from "src/app/model/consultant";
import { accessInit } from "./access";
import { professionInit } from "./profession";
import { stateInit } from "./state";

export var consultantInit: Consultant[] = [{
  id: 1,
  Access: accessInit[2],
  Profession: professionInit[0],
  phone: 3001111111,
  experience: 'experiencia en nada',
  State: stateInit[2],
}]