import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../../store/tournamentStore";
import TournamentForm from "./TournamentForm";
import ErrorDialog from "../../components/ErrorDialog";

class TournamentEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      isAlertOpen: false,
      alertMessage: "",
      tournament: props.tournament
    };
  }
  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.setState({ tournament: this.props.tournament });
    }
  }
  requestDialogClosing = () => {
    this.setState({ tournament: true, isTournamentDialogVisible: false });
  };
  cancelDialogClosing = () => {
    this.setState({ isDialogClosingRequested: false });
  };

  saveChanges = () => {
    // TODO: send request to server to update the data
    this.showMessage("Tournament information was successfully updated");
    this.closeDialog();
  };

  showMessage = message => {
    this.setState({ message, isMessageVisible: true });
  };

  closeMessage = () => {
    this.setState({ isMessageVisible: false, message: "" });
  };
  onFormChange = state => {
    console.log(state);
    this.setState(prevState => ({
      tournament: { ...state.tournament, ...state }
    }));
    console.log(this.state);
  };

  handleAlertClose = () => {
    this.setState({ isAlertOpen: false });
  };
  editTournament = async () => {
    const { startDate, endDate, id, title } = this.state.tournament;
    try {
      await store.editTournament({
        id,
        title,
        startDate,
        endDate,
        isForceFinished: true
      });
    } catch (error) {
      this.setState({
        alertMessage: `${error.name} ${error.message}`,
        isAlertOpen: true
      });
    }
  };

  render() {
    const { onClose, open } = this.props;
    const { startDate, endDate, title, id } = this.state.tournament;

    return (
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Edit Tournament</DialogTitle>
        <DialogContent>
          <TournamentForm
            title={title}
            startDate={startDate}
            endDate={endDate}
            onChange={this.onFormChange}
            id={id}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose} color="primary">
            Cancel
          </Button>

          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.editTournament}
            id="AddForm"
          >
            {this.state.isLoading ? (
              <CircularProgress color={"secondary"} size={20} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
        <ErrorDialog
          open={this.state.isAlertOpen}
          handleClose={this.handleAlertClose}
          title={"Ошибка при редактировании турнира"}
          contentText={this.state.alertMessage}
        />
      </Dialog>
    );
  }
}

export default TournamentEditForm;
