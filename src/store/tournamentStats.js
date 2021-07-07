// const API_HOST = "https://kicker.mercdev.com";
const API_HOST = "http://localhost:3000";

/* global fetch */

function request(path, config = {}) {
  return fetch(`${API_HOST}${path}`, {
    credentials: "include",
    headers: {
      "Content-Type": "application/json"
    },
    ...config
  }).then(response => response.json());
}

export const fetchTournament = (id = "last") => {
  return request(`/api/tournaments/${id}`).then(data => data.tournament);
};

export const fetchTournamentStats = ({ tournamentId }) => {
  return request(`/api/tournaments/${tournamentId}/stats`);
};

export const GOOGLE_AUTH_URL = `${API_HOST}/auth/google`;
