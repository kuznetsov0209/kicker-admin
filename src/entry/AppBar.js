import React from "react";
import { withRouter } from "react-router-dom";
import { observer } from "mobx-react";
import { computed } from "mobx";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  withStyles,
  Button,
  Toolbar
} from "@material-ui/core";

import Logo from "./Logo";
import EmojiEventsSharpIcon from "@material-ui/icons/EmojiEventsSharp";
import RestoreSharpIcon from "@material-ui/icons/RestoreSharp";
import GroupSharpIcon from "@material-ui/icons/GroupSharp";

import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import { API_HOST } from "../api";
import ErrorDialog from "../components/ErrorDialog";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  tabs: {
    flexGrow: 1
  },
  button: {
    textAlign: "right",
    width: "180px"
  },
  logo: {
    width: "180px"
  }
});

@withRouter
@observer
class ScrollableTabsButtonForce extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAlertOpen: false
    };
    this.authPopup = null;
  }

  @computed
  get profile() {
    return store.authStore.profile;
  }

  onTabChange = (event, value) => {
    this.props.history.push(value);
  };

  openAlert = () => {
    this.setState({ isAlertOpen: true });
  };

  closeAlert = () => {
    this.setState({ isAlertOpen: false });
  };

  handleAuthEvent = event => {
    this.setState({ isAuthPopupOpen: false });

    if (this.authPopup) {
      this.authPopup.close();
    }

    if (event.data.isAuthenticated) {
      store.authStore.loadProfile();
      window.removeEventListener("message", this.handleAuthEvent);
    } else {
      this.openAlert();
    }
  };

  openAuthPopup = () => {
    window.addEventListener("message", this.handleAuthEvent);

    this.setState({ isAuthPopupOpen: true });

    const width = 600;
    const height = 600;
    const left = window.screenLeft + window.innerWidth / 2 - width / 2;
    const top = window.screenTop + window.innerHeight / 2 - height / 2;
    const url = `${API_HOST}/auth/google`;

    this.authPopup = window.open(
      url,
      "",
      `toolbar=no, location=no, directories=no, status=no, menubar=no, 
    scrollbars=no, resizable=no, copyhistory=no, width=${width}, 
    height=${height}, top=${top}, left=${left}`
    );
  };

  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Logo className={classes.logo} />
            <Tabs
              value={this.props.location.pathname}
              onChange={this.onTabChange}
              scrollable="true"
              scrollButtons="on"
              indicatorColor="secondary"
              centered
              classes={{
                root: classes.tabs
              }}
            >
              <Tab label="GAMES" icon={<RestoreSharpIcon />} value="/games" />
              <Tab label="PLAYERS" icon={<GroupSharpIcon />} value="/players" />
              <Tab
                label="TOURNAMENTS"
                icon={<EmojiEventsSharpIcon />}
                value="/tournaments"
              />
            </Tabs>
            <div className={classes.button}>
              {this.profile ? (
                <UserAvatar user={this.profile} size={32} />
              ) : (
                <Button
                  size="medium"
                  color="secondary"
                  variant="contained"
                  onClick={this.openAuthPopup}
                >
                  Login
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
        <ErrorDialog
          open={this.state.isAlertOpen}
          handleClose={this.closeAlert}
          title="Authorisation Error"
          contentText="Authorisation Error. Try logging in again."
        />
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonForce);
