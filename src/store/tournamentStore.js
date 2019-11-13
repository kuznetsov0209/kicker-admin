import { types, flow } from "mobx-state-tree";
import api from "../api";
import Tournament from "./tournament";

const TournamentStore = types
  .model({
    tournaments: types.optional(types.array(Tournament), [])
  })
  .actions(self => {
    return {
      getTournaments: flow(function*() {
        const { tournaments } = yield api.get("/api/tournaments");
        self.tournaments = tournaments;
      }),
      addTournament: flow(function*({ title, startDate, endDate }) {
        const { tournament } = yield api.post("/api/tournaments", {
          title,
          startDate,
          endDate
        });
        self.tournaments.unshift(tournament);
      }),
      getTournament: flow(function*(id) {
        const { tournament } = yield api.get(`/api/tournaments/${id}`);
        return Tournament.create(tournament);
      })
    };
  });

export const store = TournamentStore.create({});
