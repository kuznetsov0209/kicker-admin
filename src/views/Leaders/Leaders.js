import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  FormControl,
  FormControlLabel,
  Switch,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import UserAvatar from "../../components/UserAvatar";
import WeekPicker from "../../components/WeekPicker";
import { store } from "../../store";
import LeadersBar from "./LeadersBar";

const OF_ALL_TIME = 1;
const OF_THE_WEEK = 0;

const Leaders = observer(
  class extends Component {
    constructor(props) {
      super(props);
      this.state = {
        currentTab: OF_THE_WEEK,
        position: false,
        isLoading: true
      };
    }

    async loadStatsIfNeeded(filter) {
      this.setState({ isLoading: true });
      try {
        await store.loadStats(filter);
      } finally {
        this.setState({ isLoading: false });
      }
    }

    componentDidMount() {
      this.loadStatsIfNeeded(store.gamesWeekFilter);
    }

    updateLeadersList = date => {
      store.applyGamesWeekFilter(date);
      this.loadStatsIfNeeded(store.gamesWeekFilter);
    };

    onSwitchTab = value => {
      this.setState({ currentTab: value });
      value === OF_ALL_TIME
        ? this.loadStatsIfNeeded()
        : this.loadStatsIfNeeded(store.gamesWeekFilter);
    };

    onSwitchPosition = e => {
      this.setState({ position: e.target.checked });
    };

    @observable sortingProperty = "rating";

    renderStats(stats) {
      return (
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell />
              <TableCell style={{ width: "100%" }} />
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "games" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "games";
                  }}
                >
                  Games
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "wins" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "wins";
                  }}
                >
                  Wins
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "defeats" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "defeats";
                  }}
                >
                  Defeats
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "goals" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "goals";
                  }}
                >
                  Goals
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "goalsPerMatch"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "goalsPerMatch";
                  }}
                >
                  <nobr>Goals per match</nobr>
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "keep" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "keep";
                  }}
                >
                  Keep
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "keepPerMatch"
                      ? "primary"
                      : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "keepPerMatch";
                  }}
                >
                  <nobr>Keep per match</nobr>
                </Button>
              </TableCell>
              <TableCell numeric="true">
                <Button
                  color={
                    this.sortingProperty === "rating" ? "primary" : "default"
                  }
                  onClick={() => {
                    this.sortingProperty = "rating";
                  }}
                >
                  Rating
                </Button>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {stats
              .filter(user => !!user.games)
              .sort((a, b) => b[this.sortingProperty] - a[this.sortingProperty])
              .map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <UserAvatar user={user} />
                  </TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "games" && 18
                    }}
                  >
                    {user.games}
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "wins" && 18
                    }}
                  >
                    {user.wins} ({user.winsPercent}%)
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "defeats" && 18
                    }}
                  >
                    {user.defeats} ({user.defeatsPercent}%)
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "goals" && 18
                    }}
                  >
                    {user.goals}
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "goalsPerMatch" && 18
                    }}
                  >
                    {user.goalsPerMatch}
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "keep" && 18
                    }}
                  >
                    {user.keep}
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "keepPerMatch" && 18
                    }}
                  >
                    {user.keepPerMatch}
                  </TableCell>
                  <TableCell
                    numeric="true"
                    style={{
                      fontSize: this.sortingProperty === "rating" && 18
                    }}
                  >
                    {user.rating || 0}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      );
    }

    renderStatsByPosition() {
      return (
        <React.Fragment>
          <div style={{ padding: "20px 0" }}>
            <Typography
              variant="title"
              style={{ paddingBottom: "20px", textAlign: "center" }}
            >
              Forwards
            </Typography>
            {this.renderStats(store.usersStats.forwards)}
          </div>
          <div style={{ padding: "20px 0" }}>
            <Typography
              variant="title"
              style={{ paddingBottom: "20px", textAlign: "center" }}
            >
              Defenders
            </Typography>
            {this.renderStats(store.usersStats.defenders)}
          </div>
        </React.Fragment>
      );
    }

    render() {
      if (this.state.isLoading) {
        return <CircularProgress style={{ margin: "15px auto" }} />;
      }
      return (
        <React.Fragment>
          <LeadersBar
            onChange={this.onSwitchTab}
            value={this.state.currentTab}
          />
          {this.state.currentTab === OF_THE_WEEK && (
            <WeekPicker
              value={store.gamesWeekFilter}
              onChange={this.updateLeadersList}
            />
          )}
          {!store.usersStats.all.length &&
          this.state.currentTab === OF_THE_WEEK ? (
            <Typography
              variant="subtitle1"
              style={{ marginTop: "15px", textAlign: "center" }}
            >
              There were no games on this week yet
            </Typography>
          ) : (
            <div style={{ overflowX: "auto" }}>
              <FormControl style={{ padding: "10px 20px" }}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={this.state.position}
                      onChange={this.onSwitchPosition}
                      color="primary"
                    />
                  }
                  label="by position"
                />
              </FormControl>
              {this.state.position
                ? this.renderStatsByPosition()
                : this.renderStats(store.usersStats.all)}
            </div>
          )}
        </React.Fragment>
      );
    }
  }
);

export default Leaders;
