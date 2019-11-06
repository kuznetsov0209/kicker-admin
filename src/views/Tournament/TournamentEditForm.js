import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
import { Grid } from "@material-ui/core";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";
import TournamentForm from "../../components/TournamentForm";
import ConfirmationDialog from "../../components/ConfirmationDialog";

@withRouter
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
      isDeleteModalOpen: false
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

  tryToEdit = async () => {
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
    } finally {
      this.setState({ isLoading: false });
      handleClose();
    }
  };

  removeTournament = async id => {
    const { handleClose } = this.props;
    try {
      await store.removeTournament(id);
      handleClose();
    } finally {
      this.closeDeleteModal();
    }
  };

  openDeleteModal = () => {
    this.setState({ isDeleteModalOpen: true });
  };

  closeDeleteModal = () => {
    this.setState({ isDeleteModalOpen: false });
  };

  handleSwitch = e => {
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

  closeExitDialog = () => {
    this.setState({ isExitDialogOpen: false });
  };

  handleFormChanges = state => {
    this.setState(state);
  };

  render() {
    const { classes, handleClose, open } = this.props;
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
            handleChanges={this.handleFormChanges}
          />
          <FormControlLabel
            control={<Switch onChange={this.handleSwitch} color="primary" />}
            label="FORCE FINISH"
            labelPlacement="start"
          />
        </DialogContent>
        <DialogActions>
          <Button
            onClick={this.openDeleteModal}
            variant="outlined"
            color="secondary"
            startIcon={<DeleteIcon />}
          >
            Remove tournament
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.tryToEdit}
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
          handleClose={this.closeExitDialog}
          title="Close popup"
          contentText="Are you sure you want to close the popup? All changes will be lost."
        />
        <ConfirmationDialog
          open={this.state.isDeleteModalOpen}
          handleConfirm={() => this.removeTournament(this.tournamentId)}
          handleClose={this.closeDeleteModal}
          title="Remove tournament"
          contentText="Are you sure you want to remove the tournament?"
        />
      </Dialog>
    );
  }
}

export default TournamentEditForm;
