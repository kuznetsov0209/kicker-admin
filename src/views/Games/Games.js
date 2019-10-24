import React, { Component } from "react";
import { observer } from "mobx-react";
import { List, CircularProgress, Typography } from "@material-ui/core";
import { store } from "../../store";
import WeekPicker from "../../components/WeekPicker";
import Game from "./Game";

@observer
class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
    this.loadGamesIfNeeded = this.loadGamesIfNeeded.bind(this);
  }

  async loadGamesIfNeeded(filter) {
    this.setState({ isLoading: true });
    try {
      await store.loadGames(filter);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadGamesIfNeeded(store.gamesWeekFilter);
  }

  updateGamesList = date => {
    store.applyGamesWeekFilter(date);
    this.loadGamesIfNeeded(store.gamesWeekFilter);
  };

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }
    return (
      <React.Fragment>
        <div
          style={{
            minWidth: "90%",
            maxWidth: 1400,
            margin: "0 auto"
          }}
        >
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateGamesList}
          />
          {store.games.length ? (
            <List style={{ minWidth: "100%" }}>
              {store.games.map(game => (
                <Game
                  key={game.id}
                  game={game}
                  loadGames={this.loadGamesIfNeeded}
                />
              ))}
            </List>
          ) : (
            <Typography
              variant="subtitle1"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              There were no games on this week yet
            </Typography>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default Games;
