import React, { Component } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import ListItem from "@material-ui/core/ListItem";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import { Cancel } from "@material-ui/icons";
import { withStyles } from "@material-ui/core/styles";
import dateFormat from "dateformat";
import UserAvatar from "../../components/UserAvatar";
import DeleteModal from "./DeleteModal";
import ErrorAlert from "./ErrorAlert";
import { store } from "../../store";
import styles from "./Game.style";

@withStyles(styles)
class Game extends Component {
  constructor() {
    super();
    this.state = {
      isModalOpen: false,
      isAlertOpen: false,
      isRemoving: false
    };
  }

  tryToRemoveGame = async id => {
    this.setState({ isRemoving: true });
    const tournamentGame = await store.deleteGame(id);
    if (tournamentGame) {
      this.openAlert();
    }
    this.setState({ isRemoving: false });
    this.closeDeleteModal();
  };

  openDeleteModal = () => {
    this.setState({ isModalOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({ isModalOpen: false });
    this.setState({ isRemoving: false });
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
            <IconButton onClick={this.openDeleteModal}>
              <Cancel />
            </IconButton>
          </CardActions>
        </Card>

        <DeleteModal
          open={this.state.isModalOpen}
          handleClose={this.closeDeleteModal}
          confirm={() => this.tryToRemoveGame(game.id)}
          inProgress={this.state.isRemoving}
          names={`${redUsers} - ${blueUsers}`}
          date={dateFormat(
            new Date(game.createdAt),
            "ddd, hh:MM, mmm dS, yyyy "
          )}
        />
        <ErrorAlert open={this.state.isAlertOpen} handleClose={this.closeAlert} />
      </ListItem>
    );
  }
}

export default Game;
