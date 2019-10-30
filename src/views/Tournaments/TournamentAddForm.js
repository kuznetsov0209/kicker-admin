import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { store } from "../../store/tournamentStore";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from "@material-ui/core";
import { start } from "pretty-error";

@withRouter
class TournamentAddForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      startDate: new Date(),
      endDate: new Date()
    };
  }

  handleCreate = () => {
    const { title, startDate, endDate } = this.state;
    const { handleClose } = this.props;
    store.addTournament({ title, startDate, endDate });
    handleClose();
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
          <TextField
            value={this.state.title}
            onChange={this.handleTitleChange}
            required
            autoFocus
            label="Title"
          />
          <KeyboardDatePicker
            value={this.state.startDate}
            onChange={this.setStartDate}
            required
            label="Start date"
          />
          <KeyboardDatePicker
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
          <Button onClick={this.handleCreate} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TournamentAddForm;
