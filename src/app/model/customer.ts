import { Access } from "./access"
import { State } from "./state"

export interface Customer {
  id: number,
  Access?: Access,
  phone: number,
  State?: State
}
