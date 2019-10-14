import React, { Component } from "react";
import Game from "../../views/Games/Game";
import api from "../../api";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  List
} from "@material-ui/core";
import { observer } from "mobx-react";
import { types, flow } from "mobx-state-tree";
import GameModel from "../../store/game";

const store = types
  .model({
    games: types.optional(types.array(GameModel), [])
  })
  .actions(self => ({
    loadGames: flow(function*({ team1, team2 }) {
      const { games } = yield api.get(
        `/api/tournaments/games?team1Id=${team1.id}&team2Id=${team2.id}`
      );
      self.games = games;
    }),
    linkGame: flow(function*({ gameId, tournamentGameId }) {
      const { games } = yield api.post(`/api/tournaments/games`, {
        gameId,
        tournamentGameId
      });
    })
  }))
  .create();

@observer
class TournamentForm extends Component {
  componentDidMount() {
    const { team1, team2 } = this.props;
    store.loadGames({ team1, team2 });
  }

  handleClick = () => {
    const { handleClose } = this.props;
    handleClose();
  };

  linkGame = gameId => {
    const { tournamentGameId } = this.props;
    store.linkGame({ gameId, tournamentGameId });
  };

  render() {
    const { handleClose } = this.props;
    return (
      <Dialog open={this.props.open} onClose={handleClose}>
        <DialogTitle>Link game</DialogTitle>
        <DialogContent>
          {store.games.length ? (
            <List style={{ width: "100%" }}>
              {store.games.map(game => (
                <React.Fragment>
                  <Game key={game.id} game={game} />
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center"
                    }}
                  >
                    <Button
                      variant="raised"
                      onClick={() => this.linkGame(game.id)}
                    >
                      LINK
                    </Button>
                  </div>
                </React.Fragment>
              ))}
            </List>
          ) : (
            <Typography
              variant="subheading"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              There were no games on this week yet
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TournamentForm;
