import { types } from "mobx-state-tree";

const GamePlayer = types.model({
  team: types.number,
  position: types.maybe(types.number)
});

export default GamePlayer;
