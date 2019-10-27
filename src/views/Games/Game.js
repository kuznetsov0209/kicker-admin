import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { ListItem, Typography, IconButton, Badge } from "@material-ui/core";
import { Cancel } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import UserAvatar from "../../components/UserAvatar";
import DeleteModal from "./DeleteModal";
import ErrorAlert from "./ErrorAlert";
import { store } from "../../store";
import styles from "./Game.style";

@withRouter
class Game extends Component {
  constructor() {
    super();
    this.state = {
      deleteModalIsOpen: false,
      alertIsOpen: false,
      isRemoving: false
    };
  }

  tryToRemoveGame = async id => {
    this.setState({ isRemoving: true });
    const tournamentGame = await store.deleteGame(id);
    if (tournamentGame) {
      this.setState({ isRemoving: false });
      this.closeDeleteModal();
      this.openAlert();
    } else {
      this.setState({ isRemoving: false });
      this.closeDeleteModal();
      this.props.loadGames(store.gamesWeekFilter);
    }
  };

  openDeleteModal = () => {
    this.setState({ deleteModalIsOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({ deleteModalIsOpen: false });
    this.setState({ isRemoving: false });
  };

  openAlert = () => {
    this.setState({ alertIsOpen: true });
  }

  closeAlert = () => {
    this.setState({ alertIsOpen: false });
  }

  render() {
    const { game, classes } = this.props;

    const redUsers = game.redUsers
      .map(user => user.name)
      .join(", ");
    const blueUsers = game.blueUsers
      .map(user => user.name)
      .join(", ");

    return (
      <ListItem classes={{ root: classes.listItem }}>
        <div className={classes.listItem__container}>
          <div className={classes.listItem__dateContainer}>
            <Typography
              variant="caption"
              color="textSecondary"
              classes={{ root: classes.listItem__date }}
              noWrap={true}
            >
              {dateFormat(new Date(game.createdAt), "ddd, hh:MM")}
            </Typography>
            <Typography
              variant="caption"
              color="textSecondary"
              classes={{ root: classes.listItem__date }}
              noWrap={true}
            >
              {dateFormat(new Date(game.createdAt), "mmm dS, yyyy ")}
            </Typography>
          </div>

          <div className={classes.listItem__teamsContainer}>
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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

              <Typography classes={{ root: classes.listItem__userNames }}>
                {redUsers}
              </Typography>
            </div>

            <Typography
              variant="h6"
              classes={{ root: classes.listItem__score }}
            >
              {game.score}
            </Typography>
            <div className={classes.listItem__content_blue}>
              <Typography classes={{ root: classes.listItem__userNames }}>
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
                    anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
          </div>
        </div>
        <IconButton
          classes={{ root: classes.listItem__deleteButton }}
          onClick={() => {
            this.openDeleteModal();
          }}
        >
          <Cancel />
        </IconButton>
        <DeleteModal
          open={this.state.deleteModalIsOpen}
          close={this.closeDeleteModal}
          confirm={() => this.tryToRemoveGame(game.id)}
          inProgress={this.state.isRemoving}
          names={`${redUsers} - ${blueUsers}`}
          date={dateFormat(
            new Date(game.createdAt),
            "ddd, hh:MM, mmm dS, yyyy "
          )}
        />
        <ErrorAlert open={this.state.alertIsOpen} close={this.closeAlert} />
      </ListItem>
    );
  }
}

export default withStyles(styles)(Game);
