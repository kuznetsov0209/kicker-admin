import React, { Component } from "react";
import dateFormat from "dateformat";
import UserAvatar from "../../components/UserAvatar";
import {
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Badge,
  Button
} from "@material-ui/core";
import LinkIcon from "@material-ui/icons/Link";
import LinkOffIcon from "@material-ui/icons/LinkOff";
import { withStyles } from "@material-ui/core/styles";
import styles from "./Game.style";

@withStyles(styles)
class Game extends Component {
  renderUser = (user, game, classes) => {
    return (
      <Badge
        key={user.id}
        overlap={"circle"}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        classes={{
          badge: classes.badge_success
        }}
        badgeContent={game.getUserScore(user.id)}
      >
        <Badge
          color={"error"}
          overlap={"circle"}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "right"
          }}
          classes={{
            badge: classes.badge
          }}
          badgeContent={
            game.getUserOwnGoals(user.id) == 0
              ? 0
              : `-${game.getUserOwnGoals(user.id)}`
          }
        >
          <UserAvatar user={user} style={{ marginLeft: 10 }} size="40px" />
        </Badge>
      </Badge>
    );
  };

  render() {
    const { gameResult, classes } = this.props;
    const { game } = gameResult;
    const teamLeft = gameResult.teamRed || gameResult.team1;
    const teamRight = gameResult.teamBlue || gameResult.team2;

    return (
      <ListItem style={{ width: "50%", padding: "4px" }}>
        <Paper
          style={{
            width: "100%",
            padding: "20px",
            backgroundColor: "#efefef",
            opacity: game ? "1" : ".4"
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Button
              className={classes.link}
              variant="contained"
              size="small"
              color="primary"
            >
              <LinkIcon />
            </Button>
            <Button
              className={classes.link}
              variant="contained"
              size="small"
              color="secondary"
            >
              <LinkOffIcon />
            </Button>
            <ListItemText style={{ margin: "0" }}>
              {game ? (
                <Typography variant="caption" color="textSecondary">
                  {dateFormat(new Date(game.createdAt), "ddd, hh:MM")}
                  <br />
                  {dateFormat(new Date(game.createdAt), " mmm dS, yyyy")}
                </Typography>
              ) : (
                <Typography variant="caption" color="textSecondary">
                  LINK GAME
                </Typography>
              )}
            </ListItemText>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-end"
              }}
            >
              {game ? (
                game.redUsers.map(user => this.renderUser(user, game, classes))
              ) : (
                <>
                  <UserAvatar size={40} user={teamLeft.player1} />
                  <UserAvatar
                    size={40}
                    style={{ marginLeft: 10 }}
                    user={teamLeft.player2}
                  />
                </>
              )}
            </div>
            <ListItemText style={{ padding: "0", textAlign: "center" }}>
              <span className={classes.score}>{game ? game.score : "-:-"}</span>
            </ListItemText>
            <div
              style={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start"
              }}
            >
              {game ? (
                game.blueUsers.map(user => this.renderUser(user, game, classes))
              ) : (
                <>
                  <UserAvatar size={40} user={teamRight.player1} />
                  <UserAvatar
                    size={40}
                    style={{ marginLeft: 10 }}
                    user={teamRight.player2}
                  />
                </>
              )}
            </div>
          </div>
        </Paper>
      </ListItem>
    );
  }
}

export default Game;
