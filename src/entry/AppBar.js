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

// import EmojiEventsRoundedIcon from "@material-ui/icons/EmojiEventsRounded";
import RestoreIcon from "@material-ui/icons/Restore";
import PeopleIcon from "@material-ui/icons/People";

import logoImage from "./image/mercury-development.svg";
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
    flexGrow: 1,
    color: "rgb(166,166,166)",
    "&:hover": {
      color: "rgb(67,144,218)"
    }
  },
  appBar: {
    backgroundColor: "rgb(50,50,50)"
  },
  typography: {
    backgroundImage: "url(" + logoImage + ")",
    backgroundRepeat: "no-repeat",
    width: "220px",
    height: "52px"
  },
  button: {
    backgroundColor: "rgb(71,154,234)",
    padding: "0 30px"
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
        <AppBar position="static" className={classes.appBar} type="dark">
          <Toolbar>
            <Typography className={classes.typography}></Typography>
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
              <Tab label="GAMES" icon={<RestoreIcon />} value="/games" />
              <Tab label="PLAYERS" icon={<PeopleIcon />} value="/leaders" />
              <Tab
                label="TOURNAMENTS"
                // icon={<EmojiEventsRoundedIcon />}
                value="/tournaments"
              />
            </Tabs>
            {this.profile ? (
              <UserAvatar user={this.profile} size={32} />
            ) : (
              <Button
                size="medium"
                color="primary"
                className={classes.button}
                variant="contained"
                href={`${API_HOST}/auth/google`}
              >
                Login
              </Button>
            )}
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(ScrollableTabsButtonForce);
