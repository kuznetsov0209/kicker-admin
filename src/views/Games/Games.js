import React, { Component } from "react";
import { observer } from "mobx-react";
import { List, CircularProgress, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { store } from "../../store";
import WeekPicker from "../../components/WeekPicker";
import styles from "./Games.style";
import Game from "./Game";

@observer
class Games extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  loadGamesIfNeeded = async filter => {
    this.setState({ isLoading: true });
    try {
      await store.loadGames(filter);
    } finally {
      this.setState({ isLoading: false });
    }
  };

  componentDidMount() {
    this.loadGamesIfNeeded(store.gamesWeekFilter);
  }

  updateGamesList = date => {
    store.applyGamesWeekFilter(date);
    this.loadGamesIfNeeded(store.gamesWeekFilter);
  };

  render() {
    const { classes } = this.props;
    if (this.state.isLoading) {
      return (
        <CircularProgress classes={{ root: classes.games__circularProgress }} />
      );
    }
    return (
      <React.Fragment>
        <div className={classes.games}>
          <WeekPicker
            value={store.gamesWeekFilter}
            onChange={this.updateGamesList}
          />
          {store.games.length ? (
            <List classes={{ root: classes.games__list }}>
              {store.games.map(game => (
                <Game key={game.id} game={game} />
              ))}
            </List>
          ) : (
            <Typography
              variant="subtitle1"
              classes={{ root: classes.game__noGameMessage }}
            >
              There were no games on this week yet
            </Typography>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Games);
