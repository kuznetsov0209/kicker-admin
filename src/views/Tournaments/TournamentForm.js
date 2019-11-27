import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

class TournamentForm extends Component {
  handleTitleChange = e => {
    this.props.onChange({ title: e.target.value });
  };

  handleStartDateChange = startDate => {
    if (startDate > this.props.endDate) {
      this.props.onChange({ endDate: startDate });
    }
    this.props.onChange({ startDate });
  };

  handleEndDateChange = endDate => {
    if (this.props.startDate <= endDate) {
      this.props.onChange({ endDate });
    } else {
      this.props.onChange({ endDate: this.props.startDate });
    }
  };

  render() {
    return (
      <form id={this.props.id}>
        <TextField
          value={this.props.title}
          onChange={this.handleTitleChange}
          fullWidth
          required
          autoFocus
          label="Title"
        />
        <Grid container spacing={2}>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              value={this.props.startDate}
              onChange={this.handleStartDateChange}
              required
              label="Start date"
            />
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              value={this.props.endDate}
              onChange={this.handleEndDateChange}
              required
              label="End Date"
            />
          </Grid>
        </Grid>
      </form>
    );
  }
}

export default TournamentForm;
