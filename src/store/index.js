import { types, flow } from "mobx-state-tree";
import api from "../api";
import User from "./user";
import UserStat from "./userStat";
import Game from "./game";
import AuthStore from "./authStore";

const UserStats = types.model({
  all: types.optional(types.array(UserStat), []),
  forwards: types.optional(types.array(UserStat), []),
  defenders: types.optional(types.array(UserStat), [])
});

const Store = types
  .model({
    authStore: AuthStore,
    games: types.optional(types.array(Game), []),
    usersStats: types.optional(UserStats, {}),
    gamesWeekFilter: types.optional(types.Date, new Date())
  })
  .actions(self => {
    return {
      loadGames: flow(function*(date) {
        const { games } = yield api.get(`/api/games?date=${date}`);
        self.games = games;
      }),
      loadStats: flow(function*(date = "") {
        const { usersStats } = yield api.get(`/api/stats?date=${date}`);
        self.usersStats = usersStats;
      }),
      applyGamesWeekFilter(payload) {
        self.gamesWeekFilter = payload;
      }
    };
  })
  .views(self => {
    return {
      getUserById(id) {
        return self.users.find(user => user.id === id);
      }
    };
  });

export const store = Store.create({
  authStore: {}
});
