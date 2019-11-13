import { types, flow } from "mobx-state-tree";
import api from "../api";
import Team from "./team";
import Game from "./game";
import UserStat from "./userStat";

const TournamentGame = types.model({
  team1: Team,
  team2: Team
});

const UserStats = types.model({
  all: types.optional(types.array(UserStat), []),
  forwards: types.optional(types.array(UserStat), []),
  defenders: types.optional(types.array(UserStat), [])
});

const Tournament = types
  .model({
    id: types.maybe(types.number),
    title: types.string,
    status: types.maybeNull(types.string),
    startDate: types.string,
    endDate: types.string,
    TournamentGames: types.optional(types.array(TournamentGame), []),
    stats: types.optional(
      types.array(
        types.model({
          games: types.number,
          wins: types.number,
          defeats: types.number,
          goalsScored: types.number,
          goalsMissed: types.number,
          team: Team
        })
      ),
      []
    ),
    gamesResults: types.optional(
      types.array(
        types.model({
          tournamentGameId: types.number,
          team1: Team,
          team2: Team,
          game: types.maybe(Game),
          teamRed: types.maybe(Team),
          teamBlue: types.maybe(Team)
        })
      ),
      []
    ),
    usersStats: types.optional(UserStats, {})
  })
  .actions(self => ({
    loadStats: flow(function*() {
      const { stats, usersStats } = yield api.get(
        `/api/tournaments/${self.id}/stats`
      );
      self.stats = stats;
      self.usersStats = usersStats;
    }),
    loadGamesResults: flow(function*() {
      const { gamesResults } = yield api.get(
        `/api/tournaments/${self.id}/games-results`
      );
      self.gamesResults = gamesResults;
    }),
    createSchedule: flow(function*() {
      yield api.post(`/api/tournaments/${self.id}/schedule`);
    })
  }));

export default Tournament;
