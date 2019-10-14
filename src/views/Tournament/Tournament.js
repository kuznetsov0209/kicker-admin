import React from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import { store } from "../../store/tournamentStore";
import Standings from "./Standings";
import Games from "./Games";

@withRouter
@observer
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
    };
  }

  componentDidMount() {
    this.loadTournament();
  }

  @observable tournament = null;

  get tournamentId() {
    return this.props.match.params.id;
  }

  async loadTournament() {
    try {
      this.setState({ isLoading: true });
      this.tournament = await store.getTournament(this.tournamentId);
      await Promise.all([
        this.tournament.loadGamesResults(),
        this.tournament.loadStats()
      ]);
    } finally {
      this.setState({ isLoading: false });
    }
  }

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <React.Fragment>
        <Standings tournament={this.tournament} />
        <Games tournament={this.tournament} />

        {this.tournament.gamesResults.length === 0 &&
          this.tournament.stats.length !== 0 && (
            <Button
              color="primary"
              variant="raised"
              onClick={() => this.tournament.createSchedule()}
            >
              CREATE SCHEDULE
            </Button>
          )}
      </React.Fragment>
    );
  }
}

export default Tournament;
