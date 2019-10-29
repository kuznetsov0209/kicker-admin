class GameIsLinkedWithTournamentError extends Error {
    constructor(message) {
      super(message);
      this.name = "GameIsLinkedWithTournamentError";
    }
  }

export default GameIsLinkedWithTournamentError
