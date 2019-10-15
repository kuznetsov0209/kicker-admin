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
import ListIcon from "@material-ui/icons/List";
import StarIcon from "@material-ui/icons/Star";
import EventIcon from "@material-ui/icons/Event";
import GroupIcon from '@material-ui/icons/Group';

import UserAvatar from "../components/UserAvatar";
import { store } from "../store";
import { API_HOST } from "../api";

const styles = theme => ({
  root: {
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper
  },
  flexContainer: {
    justifyContent: "center"
  },
  tabs: {
    flexGrow: 1
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
        <AppBar position="static" color="default">
          <Toolbar>
            <Tabs
              value={value}
              onChange={this.handleChange}
              scrollable
              scrollButtons="on"
              indicatorColor="primary"
              textColor="primary"
              classes={{
                flexContainer: classes.flexContainer,
                root: classes.tabs
              }}
            >
              <Tab label="GAMES" icon={<ListIcon />} value="/games" />
              <Tab label="PLAYERS" icon={<GroupIcon />} value="/players" />
              <Tab label="LEADERS" icon={<StarIcon />} value="/leaders" />
              <Tab
                label="TOURNAMENTS"
                icon={<EventIcon />}
                value="/tournaments"
              />
            </Tabs>
            {this.profile ? (
              <UserAvatar user={this.profile} size={32} />
            ) : (
              <Button href={`${API_HOST}/auth/google`}>Login</Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonForce);
