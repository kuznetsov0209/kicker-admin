import { types, flow } from "mobx-state-tree";
import api from "../api";
import GamePlayer from "./gamePlayer";
import UserStat from "./userStat";

const User = types
  .model({
    id: types.number,
    name: types.string,
    email: types.maybeNull(types.string),
    photoUrl: types.maybeNull(types.string),
    GamePlayer: types.maybe(GamePlayer),
    stats: types.maybe(UserStat)
  })
  .actions(self => {
    return {
      loadStats: flow(function*() {
        const { usersStats } = yield api.get(`/api/stats?userId=${self.id}`);
        self.stats = usersStats[0];
      })
    };
  });

export default User;
