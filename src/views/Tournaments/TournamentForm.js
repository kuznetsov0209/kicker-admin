import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import  Grid  from "@material-ui/core/Grid";

class TournamentForm extends Component {
  constructor(props) {
    super(props);
    this.handleChanges = this.props.handleChanges;
  }

  handleTitleChange = e => {
    this.handleChanges({ title: e.target.value });
  };

  setStartDate = startDate => {
    if (startDate > this.props.endDate) {
      this.handleChanges({ endDate: startDate });
    }
    this.handleChanges({ startDate });
  };

  setEndDate = endDate => {
    if (this.props.startDate <= endDate) {
      this.handleChanges({ endDate });
    } else {
      this.handleChanges({ endDate: this.props.startDate });
    }
  };

  render() {
    return (
      <>
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
              onChange={this.setStartDate}
              required
              label="Start date"
            />
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              value={this.props.endDate}
              onChange={this.setEndDate}
              required
              label="End Date"
            />
          </Grid>
        </Grid>
      </>
    );
  }
}

export default TournamentForm;
