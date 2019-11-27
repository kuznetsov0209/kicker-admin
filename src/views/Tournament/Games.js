import React, { Component } from "react";
import { List, Typography } from "@material-ui/core";
import LinkGameDialog from "./LinkGameDialog";
import Game from "./Game";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Games.style";

function groupBy(arr, prop) {
  return arr.reduce((result, item) => {
    const propValue = item[prop];
    if (!result[propValue]) {
      result[propValue] = [];
    }
    result[propValue].push(item);
    return result;
  }, {});
}

@withStyles(styles)
class Games extends Component {
  state = {
    isLinkDialogVisible: false
  };

  render() {
    const { tournament, classes } = this.props;
    const gamesResultsGrouped = tournament.gamesResults
      ? groupBy(tournament.gamesResults, "tournamentGameId")
      : {};

    return (
      <>
        {Object.keys(gamesResultsGrouped).map(tournamentGameId => {
          const { team1, team2 } = gamesResultsGrouped[tournamentGameId][0];
          return (
            <div style={{ marginTop: 20 }}>
              <Typography align="center" variant="subtitle1">
                {team1.name} — {team2.name}
              </Typography>
              {gamesResultsGrouped[tournamentGameId] && (
                <List className={classes.tournamentList}>
                  {gamesResultsGrouped[tournamentGameId].map(
                    (gameResult, index) => (
                      <Game key={index} gameResult={gameResult} />
                    )
                  )}
                </List>
              )}
              {/* TODO: Нет в новом дизайне */}
              {/* <Button
                  variant="text"
                  color="primary"
                  onClick={() =>
                    this.setState({
                      isLinkDialogVisible: true,
                      team1,
                      team2,
                      tournamentGameId
                    })
                  }
                >
                  Link game
                </Button> */}
            </div>
          );
        })}

        {this.state.isLinkDialogVisible && (
          <LinkGameDialog
            open
            team1={this.state.team1}
            team2={this.state.team2}
            tournamentGameId={this.state.tournamentGameId}
            handleClose={() => this.setState({ isLinkDialogVisible: false })}
          />
        )}
      </>
    );
  }
}

export default Games;
