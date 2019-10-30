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

  handleClick = () => {
    const { title, startDate, endDate } = this.state;
    const { handleClose } = this.props;
    store.addTournament({ title, startDate, endDate });
    handleClose();
  };

  handleChange = e => {};

  render() {
    const { handleClose } = this.props;
    return (
      <Dialog open={
        // this.props.open
        true
        } onClose={handleClose}>
        <DialogTitle>Create Tournament</DialogTitle>
        <DialogContent>
          <TextField
            value={this.state.title}
            onChange={e => this.setState({ title: e.target.value })}
            required
            autoFocus
            label="Title"
          />
          <KeyboardDatePicker
            value={this.state.startDate}
            onChange={startDate => this.setState({ startDate })}
            required
            label="Start date"
          />
          <KeyboardDatePicker
            value={this.state.endDate}
            onChange={endDate => this.setState({ endDate })}
            required
            label="End Date"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={this.handleClick} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default TournamentAddForm;
