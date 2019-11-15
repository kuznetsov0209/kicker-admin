import React, { Component } from "react";
import { store } from "../../store/tournamentStore";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import DeleteIcon from "@material-ui/icons/Delete";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import Grid from "@material-ui/core/Grid";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TournamentForm from "../Tournaments/TournamentForm";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import ErrorDialog from "../../components/ErrorDialog";

class TournamentEditForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      isForceFinished: false,

      isLoading: false,
      isExitDialogOpen: false,
      isDeleteModalOpen: false,

      isAlertOpen: false,
      allertMessage: ""
    };

    this.firstState = {};
  }

  componentDidMount() {
    this.loadTournament();
  }

  get tournamentId() {
    return this.props.match.params.id; //при использовании заменить на this.props.id
  }

  loadTournament = async () => {
    const { title, startDate, endDate } = await store.getTournament(
      this.tournamentId
    );
    this.setState({
      id: this.tournamentId,
      title: title,
      startDate: startDate,
      endDate: endDate
    });
    this.firstState = this.state;
  };

  tryToEditTournament = async () => {
    const { id, title, startDate, endDate, isForceFinished } = this.state;
    const { handleClose } = this.props;
    try {
      this.setState({ isLoading: true });
      await store.editTournament({
        id,
        title,
        startDate,
        endDate,
        isForceFinished
      });
    } catch (error) {
      this.setState({
        alertMessage: `${error.name} ${error.message}`,
        isAlertOpen: true
      });
    } finally {
      this.setState({ isLoading: false });
      handleClose();
    }
  };

  tryToRemoveTournament = async id => {
    const { handleClose } = this.props;
    try {
      await store.removeTournament(id);
      handleClose();
    } catch(error) {
      this.setState({
        alertMessage: `${error.name} ${error.message}`,
        isAlertOpen: true
      });
    }finally {
      this.handleRemovingModalClose();
    }
  };

  handleRemovingModalOpen = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  handleRemovingModalClose = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  handleForceFinish = e => {
    this.setState({ isForceFinished: e.target.checked });
  };

  tryToClose = () => {
    const { handleClose } = this.props;
    const firstState = this.firstState;
    let actualState = this.state;

    if (
      firstState.title != actualState.title ||
      firstState.startDate != actualState.startDate ||
      firstState.endDate != actualState.endDate ||
      firstState.isForceFinished != actualState.isForceFinished
    ) {
      this.setState({ isExitDialogOpen: true });
    } else {
      handleClose();
    }
  };

  handleExitDialogClose = () => {
    this.setState({ isExitDialogOpen: false });
  };

  onFormChange = state => {
    this.setState(state);
  };

  handleAlertClose = () => {
    this.setState({ isAlertOpen: false });
  };

  render() {
    const { handleClose, open } = this.props;
    return (
      <Dialog
        open={
          //раскомментировать при использовании
          // open

          //удалить при использовании
          true
        }
        onClose={handleClose}
      >
        <Grid container justify={"space-between"}>
          <DialogTitle>Edit Tournament</DialogTitle>
          <IconButton onClick={this.tryToClose}>
            <CloseIcon />
          </IconButton>
        </Grid>

        <DialogContent>
          <TournamentForm
            title={this.state.title}
            startDate={this.state.startDate}
            endDate={this.state.endDate}
            onChange={this.onFormChange}
            id="EditForm"
          />
          <FormControlLabel
            control={<Switch onChange={this.handleForceFinish} color="primary" />}
            label="FORCE FINISH"
            labelPlacement="start"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.handleRemovingModalOpen}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
            form="EditForm"
          >
            Remove tournament
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.tryToEditTournament}
            form="EditForm"
          >
            {this.state.isLoading ? (
              <CircularProgress color={"secondary"} size={20} />
            ) : (
              "Save"
            )}
          </Button>
        </DialogActions>
        <ConfirmationDialog
          open={this.state.isExitDialogOpen}
          handleConfirm={handleClose}
          handleClose={this.handleExitDialogClose}
          title="Close popup"
          contentText="Are you sure you want to close the popup? All changes will be lost."
        />
        <ConfirmationDialog
          open={this.state.isDeleteModalOpen}
          handleConfirm={() => this.tryToRemoveTournament(this.tournamentId)}
          handleClose={this.handleRemovingModalClose}
          title="Remove tournament"
          contentText="Are you sure you want to remove the tournament?"
        />
        <ErrorDialog
          open={this.state.isAlertOpen}
          handleClose={this.handleAlertClose}
          title={"Ошибка"}
          contentText={this.state.alertMessage}
        />
      </Dialog>
    );
  }
}

export default TournamentEditForm;
