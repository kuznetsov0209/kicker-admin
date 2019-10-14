import { types } from "mobx-state-tree";

const UserStat = types
  .model({
    id: types.number,
    name: types.string,
    photoUrl: types.maybeNull(types.string),
    wins: types.number,
    defeats: types.number,
    goals: types.number,
    keep: types.number,
    games: types.number,
    rating: types.maybeNull(types.number)
  })
  .views(self => ({
    get winsPercent() {
      if (self.games > 0) {
        return Math.round(self.wins / self.games * 100);
      }
      return 0;
    },
    get defeatsPercent() {
      if (self.games > 0) {
        return Math.round(self.defeats / self.games * 100);
      }
      return 0;
    },
    get goalsPerMatch() {
      if (self.games > 0) {
        return (self.goals / self.games).toFixed(2);
      }
      return 0;
    },
    get keepPerMatch() {
      if (self.games > 0) {
        return (self.keep / self.games).toFixed(2);
      }
      return 0;
    }
  }));

export default UserStat;
