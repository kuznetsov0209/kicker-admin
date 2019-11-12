import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../../store/tournamentStore";
import TournamentForm from "./TournamentForm";
import ErrorDialog from "../../components/ErrorDialog"

class TournamentAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      isLoading: false,
      isAlertOpen: false,
      alertMessage: ""
    };
  }

  handleCreate = async () => {
    const { title, startDate, endDate } = this.state;
    const { handleClose } = this.props;
    try {
      this.setState({ isLoading: true });
      await store.addTournament({ title, startDate, endDate });
      handleClose();
    } catch (error) {
      this.setState({
        alertMessage: `${error.name} ${error.message}`,
        isAlertOpen: true
      });
    } finally {
      this.setState({ isLoading: false });
    }
  };

  handleAlertClose = () => {
    this.setState({ isAlertOpen: false });
  };

  handleFormChanges = state => {
    this.setState(state);
  };

  render() {
    const { handleClose, open } = this.props;
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Create Tournament</DialogTitle>
        <DialogContent>
          <TournamentForm
            title={this.state.title}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            handleChanges={this.handleFormChanges}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.handleCreate}
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
          title={"Ошибка при создании турнира"}
          contentText={this.state.alertMessage}
        />
      </Dialog>
    );
  }
}

export default TournamentAddForm;
