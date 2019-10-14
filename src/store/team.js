import { types } from "mobx-state-tree";
import User from "./user";

const Team = types.model({
  id: types.number,
  name: types.string,
  player1: User,
  player2: User
});

export default Team;
