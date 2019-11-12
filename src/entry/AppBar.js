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
      value: this.props.location.pathname
    };
  }

  @computed
  get profile() {
    return store.authStore.profile;
  }

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.history.push(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <AppBar position="fixed">
          <Toolbar>
            <Logo className={classes.logo} />
            <Tabs
              value={value}
              onChange={this.handleChange}
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
                  href={`${API_HOST}/auth/google`}
                >
                  Login
                </Button>
              )}
            </div>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonForce);
