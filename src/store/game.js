import { types } from "mobx-state-tree";
import { TEAM_RED, TEAM_BLUE, MAX_GAME_GOALS } from "../constants";
import User from "./user";
import Goal from "./goal";

const Game = types
  .model({
    id: types.maybe(types.number),
    createdAt: types.maybe(types.string),
    Users: types.optional(types.array(User), []),
    Goals: types.optional(types.array(Goal), [])
  })
  .views(self => ({
    getPlayer({ team, position }) {
      return self.Users.find(
        user =>
          user.GamePlayer.team === team && user.GamePlayer.position === position
      );
    },
    getUserScore(userId) {
      return self.Goals.filter(
        goal => goal.UserId === userId && goal.ownGoal === false
      ).length;
    },
    getUserOwnGoals(userId) {
      return self.Goals.filter(
        goal => goal.UserId === userId && goal.ownGoal === true
      ).length;
    },
    get redUsers() {
      return self.Users.filter(user => user.GamePlayer.team === TEAM_RED);
    },
    get redUserIds() {
      return self.redUsers.map(user => user.id);
    },
    get blueUsers() {
      return self.Users.filter(user => user.GamePlayer.team === TEAM_BLUE);
    },
    get blueUserIds() {
      return self.blueUsers.map(user => user.id);
    },
    get redGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId) && !goal.ownGoal
      );
    },
    get redOwnGoals() {
      return self.Goals.filter(
        goal => self.redUserIds.includes(goal.UserId) && goal.ownGoal
      );
    },
    get blueGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId) && !goal.ownGoal
      );
    },
    get blueOwnGoals() {
      return self.Goals.filter(
        goal => self.blueUserIds.includes(goal.UserId) && goal.ownGoal
      );
    },
    get redScore() {
      return self.redGoals.length + self.blueOwnGoals.length;
    },
    get blueScore() {
      return self.blueGoals.length + self.redOwnGoals.length;
    },
    get completed() {
      return (
        self.redScore === MAX_GAME_GOALS || self.blueScore === MAX_GAME_GOALS
      );
    },
    get score() {
      return `${self.redScore}:${self.blueScore}`;
    },
    get winnerTeam() {
      return self.blueScore > self.redScore ? TEAM_BLUE : TEAM_RED;
    },
    get winnerPlayers() {
      return self.winnerTeam === TEAM_BLUE ? self.blueUsers : self.redUsers;
    }
  }))
  .actions(self => ({
    setPlayer({ user, team, position }) {
      self.Users.push({
        ...user,
        GamePlayer: {
          team,
          position
        }
      });
    },
    addGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: false,
        createdAt: new Date().toString()
      });
    },
    addOwnGoal(UserId) {
      self.Goals.push({
        UserId,
        ownGoal: true,
        createdAt: new Date().toString()
      });
    }
  }));

export default Game;
