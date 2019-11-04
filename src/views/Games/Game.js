import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ListItem from "@material-ui/core/ListItem";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { withStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import UserAvatar from "../../components/UserAvatar";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import ErrorDialog from "../../components/ErrorDialog";
import { store } from "../../store";
import GameIsLinkedWithTournamentError from "../../apiErrors";
import styles from "./Game.style";

@withStyles(styles)
class Game extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isAlertOpen: false
    };
  }

  tryToRemoveGame = async id => {
    try {
      await store.deleteGame(id);
    } catch (error) {
      if (error instanceof GameIsLinkedWithTournamentError) {
        this.openAlert();
      } else {
        alert("Произошла ошибка при удалении игры");
      }
    } finally {
      this.closeDeleteModal();
    }
  };

  openDeleteModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({ isModalOpen: false });
  };

  openAlert = () => {
    this.setState({ isAlertOpen: true });
  };

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
  };

  render() {
    const { game, classes } = this.props;

    const redUsers = game.redUsers.map(user => user.name).join(", ");
    const blueUsers = game.blueUsers.map(user => user.name).join(", ");

    return (
      <ListItem>
        <Card className={classes.listItem}>
          <CardContent className={classes.listItem__dateContainer}>
            <Typography variant="caption" color="textSecondary">
              {dateFormat(new Date(game.createdAt), "ddd, hh:MM")}
              <br />
              {dateFormat(new Date(game.createdAt), " mmm dS, yyyy")}
            </Typography>
          </CardContent>

          <CardContent className={classes.listItem__teamsContainer}>
            <div className={classes.listItem__content_red}>
              {game.redUsers.map(user => (
                <Badge
                  key={user.id}
                  overlap={"circle"}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  classes={{
                    badge: classes.listItem__goalCount
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
                    badgeContent={
                      game.getUserOwnGoals(user.id) == 0
                        ? 0
                        : `- ${game.getUserOwnGoals(user.id)}`
                    }
                  >
                    <UserAvatar
                      user={user}
                      style={{ marginLeft: 10 }}
                      size="40px"
                    />
                  </Badge>
                </Badge>
              ))}

              <Typography className={classes.listItem__userNames} noWrap={true}>
                {redUsers}
              </Typography>
            </div>

            <Typography variant="h6" className={classes.listItem__score}>
              {game.score}
            </Typography>
            <div className={classes.listItem__content_blue}>
              <Typography className={classes.listItem__userNames} noWrap={true}>
                {blueUsers}
              </Typography>
              {game.blueUsers.map(user => (
                <Badge
                  key={user.id}
                  overlap={"circle"}
                  anchorOrigin={{ vertical: "top", horizontal: "right" }}
                  classes={{
                    badge: classes.listItem__goalCount,
                    root: classes.listItem__badge
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
                    badgeContent={
                      game.getUserOwnGoals(user.id) == 0
                        ? 0
                        : `- ${game.getUserOwnGoals(user.id)}`
                    }
                  >
                    <UserAvatar user={user} size="40px" />
                  </Badge>
                </Badge>
              ))}
            </div>
          </CardContent>

          <CardActions>
            <Button size="small" color="primary" onClick={this.openDeleteModal}>
              Delete
            </Button>
          </CardActions>
        </Card>

        <ConfirmationDialog
          open={this.state.isModalOpen}
          handleClose={this.closeDeleteModal}
          handleConfirm={() => this.tryToRemoveGame(game.id)}
          contentText={
            <>
              Are you sure you want to remove the game?
              <br />
              {redUsers} - {blueUsers}
              <br />
              {dateFormat(new Date(game.createdAt), "ddd, hh:MM, mmm dS, yyyy ")}
            </>
          }
          title="Remove game"
        />
        <ErrorDialog
          open={this.state.isAlertOpen}
          handleClose={this.closeAlert}
          title="Game is a part of a tournament"
          contentText="You can’t remove the game because it is a part of tournament."
        />
      </ListItem>
    );
  }
}

export default Game;
