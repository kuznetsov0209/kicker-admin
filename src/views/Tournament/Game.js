import React, { Component } from "react";
import dateFormat from "dateformat";
import UserAvatar from "../../components/UserAvatar";
import { ListItem, ListItemText } from "@material-ui/core";

class Game extends Component {
  render() {
    const { gameResult } = this.props;
    const { game } = gameResult;
    const teamLeft = gameResult.teamRed || gameResult.team1;
    const teamRight = gameResult.teamBlue || gameResult.team2;

    return (
      <ListItem>
        <div style={{ width: "100%", margin: "15px auto" }}>
          <ListItemText style={{ textAlign: "center" }}>
            {game && (
              <span>
                {dateFormat(
                  new Date(game.createdAt),
                  "dddd, mmmm dS, yyyy, hh:MM"
                )}
              </span>
            )}
          </ListItemText>
          <div style={{ display: "flex" }}>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              <UserAvatar size={40} user={teamLeft.player1} />
              <UserAvatar size={40} user={teamLeft.player2} />
            </div>
            <ListItemText style={{ padding: "0", textAlign: "center" }}>
              <span>{game ? game.score : "-:-"}</span>
            </ListItemText>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              <UserAvatar size={40} user={teamRight.player1} />
              <UserAvatar size={40} user={teamRight.player2} />
            </div>
          </div>
        </div>
      </ListItem>
    );
  }
}

export default Game;
