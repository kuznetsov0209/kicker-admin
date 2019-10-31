import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from "@material-ui/core/CircularProgress";
import { withStyles } from "@material-ui/core/styles";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { store } from "../../store/tournamentStore";

const styles = {
  picker: {
    margin: "10px 10px 10px 0"
  }
};

@withStyles(styles)
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

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  setStartDate = startDate => {
    if (startDate > this.state.endDate) {
      this.setState({ endDate: startDate });
    }
    this.setState({ startDate });
  };

  setEndDate = endDate => {
    if (this.state.startDate <= endDate) {
      this.setState({ endDate });
    } else {
      this.setState({ endDate: this.state.startDate });
    }
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
        <DialogTitle>Create Tournament</DialogTitle>
        <DialogContent>
          <TextField
            value={this.state.title}
            onChange={this.handleTitleChange}
            fullWidth={true}
            required
            autoFocus
            label="Title"
          />
          <KeyboardDatePicker
            classes={{ root: classes.picker }}
            value={this.state.startDate}
            onChange={this.setStartDate}
            required
            label="Start date"
          />
          <KeyboardDatePicker
            classes={{ root: classes.picker }}
            value={this.state.endDate}
            onChange={this.setEndDate}
            required
            label="End Date"
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
