import React from "react";
import { CircularProgress, Button, Typography } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import EditIcon from "@material-ui/icons/Edit";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import dateFormat from "dateformat";
import { store } from "../../store/tournamentStore";
import Standings from "./Standings";
import Games from "./Games";
import TournamentSelect from "./TournamentSelect";

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

    const startDate = dateFormat(
      new Date(this.tournament.startDate),
      "mmmm dS, yyyy"
    );
    const endDate = dateFormat(
      new Date(this.tournament.endDate),
      "mmmm dS, yyyy"
    );

    return (
      <>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            margin: "40px 0 40px"
          }}
        >
          <div>
            <Typography variant="h4" component="h1">
              {this.tournament.title}
            </Typography>
            <Typography component="p">{`${startDate} - ${endDate} (${this.tournament.status})`}</Typography>
          </div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<EditIcon />}
            >
              Edit Tournament
            </Button>
          </div>
        </div>

        <Button
          style={{ marginTop: "10px", marginBotton: "10px" }}
          color="primary"
          startIcon={<AddCircleOutlineIcon />}
        >
          Add New Team
        </Button>

        <Standings tournament={this.tournament} />

        <div
          style={{
            margin: "60px 0 16px",
            display: "flex",
            alignItems: "center"
          }}
        >
          <Typography component="span">Filter by team</Typography>
          <TournamentSelect tournament={this.tournament} />
        </div>

        <Games tournament={this.tournament} />

        {this.tournament.gamesResults.length === 0 &&
          this.tournament.stats.length !== 0 && (
            <Button
              color="primary"
              variant="text"
              onClick={() => this.tournament.createSchedule()}
            >
              CREATE SCHEDULE
            </Button>
          )}
      </>
    );
  }
}

export default Tournament;
