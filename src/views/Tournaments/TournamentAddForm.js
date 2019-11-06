import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { store } from "../../store/tournamentStore";
import TournamentForm from "../../components/TournamentForm"

@withRouter
class TournamentAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: new Date(),
      endDate: new Date(),
      isLoading: false
    };
  }

  handleCreate = async () => {
    const { title, startDate, endDate } = this.state;
    const { handleClose } = this.props;
    try {
      this.setState({ isLoading: true });
      await store.addTournament({ title, startDate, endDate });
    } catch (error) {
      alert(`Ошибка при создании турнира: ${error.name} ${error.message}`);
    } finally {
      this.setState({ isLoading: false });
      handleClose();
    }
  };

  handleFormChanges = state => {
    this.setState(state)
  }

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
      </Dialog>
    );
  }
}

export default TournamentAddForm;
