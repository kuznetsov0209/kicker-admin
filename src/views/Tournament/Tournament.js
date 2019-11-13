import React from "react";
import { CircularProgress, Button } from "@material-ui/core";
import { observer } from "mobx-react";
import { observable } from "mobx";
import { withRouter } from "react-router-dom";
import { store } from "../../store/tournamentStore";
import Standings from "./Standings";
import Games from "./Games";
import AddTeamDialog from "./AddTeamDialog";

@withRouter
@observer
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isNewTeamDialogOpen: false
    };
  }

  componentDidMount() {
    this.loadTournament();
  }

  @observable tournament = null;

  get tournamentId() {
    return this.props.match.params.id;
  }

  toggleNewTeamDialog = () => {
    this.setState(state => ({
      isNewTeamDialogOpen: !state.isNewTeamDialogOpen
    }));
  };

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
    const { isLoading, isNewTeamDialogOpen } = this.state;

    if (isLoading) {
      return <CircularProgress />;
    }

    return (
      <>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.toggleNewTeamDialog}
        >
          ADD NEW TEAM
        </Button>

        <Standings tournament={this.tournament} />
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

        <AddTeamDialog
          tournamentId={this.tournamentId}
          open={isNewTeamDialogOpen}
          onClose={this.toggleNewTeamDialog}
        />
      </>
    );
  }
}

export default Tournament;
