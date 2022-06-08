import { State } from "src/app/model/state";

export var stateInit: State[] = [{
  id: 1,
  name: 'active',
  group: 'customer'
}, {
  id: 2,
  name: 'locked',
  group: 'customer'
}, {
  id: 3,
  name: 'active',
  group: 'consultant'
}, {
  id: 4,
  name: 'locked',
  group: 'consultant'
}, {
  id: 5,
  name: 'busy',
  group: 'consultant'
}, {
  id: 6,
  name: 'enable',
  group: 'profession'
}, {
  id: 7,
  name: 'disable',
  group: 'profession'
}, {
  id: 8,
  name: 'pending',
  group: 'task'
}, {
  id: 9,
  name: 'executed',
  group: 'task'
}, {
  id: 10,
  name: 'finished',
  group: 'task'
}
]