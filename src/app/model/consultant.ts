import { Access } from "./access";
import { Profession } from "./profession";
import { State } from "./state";

export interface Consultant {
  id: number,
  Access?: Access,
  Profession?: Profession,
  phone: number,
  experience: string,
  State?: State
}
