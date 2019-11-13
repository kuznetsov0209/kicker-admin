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
import { store as tournamentsStore } from "../../store/tournamentStore";
import { store as usersStore } from "../../store/userStore";

const DEFAULT_STATE = {
  isLoading: false,
  isOpenPlayerList1: false,
  isOpenPlayerList2: false,
  selectedPlayer1: "",
  selectedPlayer2: "",
  teamName: "",
  availableUsers: []
};

class AddTeamDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = DEFAULT_STATE;
  }

  async loadUsers() {
    const { tournamentId } = this.props;
    try {
      this.setState({ isLoading: true });
      await usersStore.getUsers();
      this.tournament = await tournamentsStore.getTournament(tournamentId);
      await this.tournament.loadStats();

      const existedPlayersIds = this.tournament.usersStats.all.map(
        item => item.id
      );
      const availableUsers = usersStore.users.filter(
        user => !existedPlayersIds.includes(user.id)
      );

      this.setState({ availableUsers });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.loadUsers();
    }
  }

  handleTeamNameChange = event => {
    this.setState({ teamName: event.target.value });
  };

  togglePlayerList1 = () => {
    this.setState({ isOpenPlayerList1: !this.state.isOpenPlayerList1 });
  };

  togglePlayerList2 = () => {
    this.setState({ isOpenPlayerList2: !this.state.isOpenPlayerList2 });
  };

  selectAndClosePlayerList1 = player => {
    this.setState(
      state => ({
        selectedPlayer1: player,
        availableUsers: state.availableUsers.filter(
          user => user.id !== player.id
        )
      }),
      this.togglePlayerList1
    );
  };

  selectAndClosePlayerList2 = player => {
    this.setState(
      state => ({
        selectedPlayer2: player,
        availableUsers: state.availableUsers.filter(
          user => user.id !== player.id
        )
      }),
      this.togglePlayerList2
    );
  };

  cleanAddTeamForm = () => {
    this.setState(DEFAULT_STATE);
    this.props.onClose();
  };

  createNewTeam = () => {
    const team = {
      name: this.state.teamName,
      player1: this.state.selectedPlayer1.id,
      player2: this.state.selectedPlayer2.id,
      tournament: this.props.tournamentId
    };
    console.log(team);
    this.cleanAddTeamForm();
  };

  render() {
    const {
      isLoading,
      isOpenPlayerList1,
      isOpenPlayerList2,
      selectedPlayer1,
      selectedPlayer2,
      teamName,
      availableUsers
    } = this.state;

    const { open, onClose } = this.props;

    const isDisabledSaveButton =
      !teamName || !selectedPlayer1 || !selectedPlayer2;

    return (
      <>
        <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
          <DialogTitle>
            Create new team
            {isLoading && <CircularProgress color={"secondary"} size={20} />}
          </DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              label="Team name"
              fullWidth
              onChange={this.handleTeamNameChange}
              value={teamName}
            />
            <List>
              <ListItem button onClick={this.togglePlayerList1} disableGutters>
                <ListItemAvatar>
                  <Avatar src={selectedPlayer1.photoUrl}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={selectedPlayer1.name || "Игрок 1"} />
              </ListItem>
              <ListItem button onClick={this.togglePlayerList2} disableGutters>
                <ListItemAvatar>
                  <Avatar src={selectedPlayer2.photoUrl}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={selectedPlayer2.name || "Игрок 2"} />
              </ListItem>
            </List>
          </DialogContent>
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
              disabled={isDisabledSaveButton}
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>

        <SelectPlayerDialog
          open={isOpenPlayerList1}
          users={availableUsers}
          onClose={this.togglePlayerList1}
          onSelect={this.selectAndClosePlayerList1}
        />
        <SelectPlayerDialog
          open={isOpenPlayerList2}
          users={availableUsers}
          onClose={this.togglePlayerList2}
          onSelect={this.selectAndClosePlayerList2}
        />
      </>
    );
  }
}

export default AddTeamDialog;
