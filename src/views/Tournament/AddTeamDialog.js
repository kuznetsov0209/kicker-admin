import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import SelectPlayerDialog from "./SelectPlayerDialog";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../../store/tournamentStore";

const DEFAULT_STATE = {
  isLoading: false,
  isOpenDialog: false,
  isOpenPlayerList1: false,
  isOpenPlayerList2: false,
  selectedPlayer1: "",
  selectedPlayer2: "",
  teamName: "",
  disabledPlayers: []
};

class AddTeamDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  async loadTournaments(id) {
    try {
      this.setState({ isLoading: true });
      await store.loadStats(id);
      this.setState({
        disabledPlayers: store.usersStats.all
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount(id = 2) {
    this.loadTournaments(id);
  }

  handleTeamNameFieldChange = event => {
    this.setState({ teamName: event.target.value });
  };

  toggleNewTeamDialog = () => {
    this.setState({ isOpenDialog: !this.state.isOpenDialog });
  };

  togglePlayerList1 = () => {
    this.setState({ isOpenPlayerList1: !this.state.isOpenPlayerList1 });
  };

  togglePlayerList2 = () => {
    this.setState({ isOpenPlayerList2: !this.state.isOpenPlayerList2 });
  };

  selectAndClosePlayerList1 = value => {
    this.setState(
      {
        selectedPlayer1: value,
        disabledPlayers: [...this.state.disabledPlayers, value]
      },
      () => {
        this.togglePlayerList1();
      }
    );
  };

  selectAndClosePlayerList2 = value => {
    this.setState(
      {
        selectedPlayer2: value,
        disabledPlayers: [...this.state.disabledPlayers, value]
      },
      () => {
        this.togglePlayerList2();
      }
    );
  };

  cleanAddTeamForm = () => {
    this.setState(DEFAULT_STATE);
    this.toggleNewTeamDialog();
  };

  createNewTeam = () => {
    const team = {
      name: this.state.teamName,
      player1: this.state.selectedPlayer1.id,
      player2: this.state.selectedPlayer2.id,
      tournament: "2"
    };
    console.log(team);
    this.cleanAddTeamForm();
  };

  render() {
    const {
      isOpenDialog,
      isOpenPlayerList1,
      isOpenPlayerList2,
      selectedPlayer1,
      selectedPlayer2,
      teamName
    } = this.state;
    const isDisabledSaveButton = teamName && selectedPlayer1 && selectedPlayer2;
    if (this.state.isLoading) {
      return <CircularProgress color={"secondary"} size={20} />;
    }
    return (
      <div style={{ textAlign: "center" }}>
        <Button
          variant="outlined"
          color="primary"
          onClick={this.toggleNewTeamDialog}
        >
          ADD NEW TEAM
        </Button>
        <Dialog
          open={isOpenDialog}
          onClose={this.toggleNewTeamDialog}
          fullWidth
        >
          <DialogTitle>Create new team</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Team name"
              fullWidth
              onChange={this.handleTeamNameFieldChange}
              value={teamName}
            />
          </DialogContent>
          <List>
            <ListItem button onClick={this.togglePlayerList1}>
              <ListItemAvatar>
                <Avatar src={selectedPlayer1.photoUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={selectedPlayer1.name || "Игрок 1"} />
            </ListItem>
            <SelectPlayerDialog
              disabledPlayers={this.state.disabledPlayers}
              close={this.togglePlayerList1}
              open={isOpenPlayerList1}
              select={this.selectAndClosePlayerList1}
            />
            <ListItem button onClick={this.togglePlayerList2}>
              <ListItemAvatar>
                <Avatar src={selectedPlayer2.photoUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={selectedPlayer2.name || "Игрок 2"} />
            </ListItem>
            <SelectPlayerDialog
              disabledPlayers={this.state.disabledPlayers}
              close={this.togglePlayerList2}
              open={isOpenPlayerList2}
              select={this.selectAndClosePlayerList2}
            />
          </List>
          <DialogActions>
            <Button
              onClick={this.cleanAddTeamForm}
              variant="outlined"
              color="primary"
            >
              Cancel
            </Button>
            <Button
              onClick={this.createNewTeam}
              variant="contained"
              color="primary"
              disabled={!isDisabledSaveButton}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default AddTeamDialog;
