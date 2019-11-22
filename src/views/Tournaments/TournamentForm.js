import React, { Component } from "react";
import TextField from "@material-ui/core/TextField";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";

class TournamentForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: props.title ? props.title : "",
      startDate: props.startDate ? props.startDate : "",
      endDate: props.endDate ? props.endDate : ""
    };
  }

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
    this.props.onChange({ title: e.target.value });
  };

  handleStartDateChange = startDate => {
    if (startDate > this.state.endDate) {
      this.setState({ endDate: startDate });
      this.props.onChange({ endDate: startDate });
    } else {
      this.setState({ startDate });
      this.props.onChange({ startDate });
    }
  };

  handleEndDateChange = endDate => {
    if (this.state.startDate <= endDate) {
      this.setState({ endDate });
      this.props.onChange({ endDate });
    } else {
      this.setState({ endDate: this.state.startDate });
      this.props.onChange({ endDate: this.state.startDate });
    }
  };

  render() {
    const { endDate, startDate, title } = this.state;
    return (
      <form id={this.props.id}>
        <TextField
          value={title}
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
              value={startDate}
              onChange={this.handleStartDateChange}
              required
              label="Start date"
            />
          </Grid>
          <Grid item>
            <KeyboardDatePicker
              margin="normal"
              value={endDate}
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
