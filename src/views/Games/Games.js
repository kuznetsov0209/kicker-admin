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
        <WeekPicker
          value={store.gamesWeekFilter}
          onChange={this.updateGamesList}
        />
        {store.games.length ? (
          <List style={{ width: "100%" }}>
            {store.games.map(game => <Game key={game.id} game={game} />)}
          </List>
        ) : (
          <Typography
            variant="subheading"
            style={{ marginTop: "15px", textAlign: "center" }}
          >
            There were no games on this week yet
          </Typography>
        )}
      </React.Fragment>
    );
  }
}

export default Games;
