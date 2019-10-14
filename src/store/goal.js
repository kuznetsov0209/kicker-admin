import { types } from "mobx-state-tree";

const Goal = types.model({
  id: types.maybe(types.number),
  ownGoal: types.boolean,
  createdAt: types.string,
  UserId: types.number
});

export default Goal;
