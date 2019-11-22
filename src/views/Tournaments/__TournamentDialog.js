import React from "react";
import { withStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from "@material-ui/core/TextField";
// import styles from "./TournamentDialog.style";
import { KeyboardDatePicker } from "@material-ui/pickers";
import Grid from "@material-ui/core/Grid";
import { isThisISOWeek } from "date-fns";

const SUPPORTED_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_FILE_SIZE = 3 * 1024 * 1024;

// @withStyles(styles)
class Tournament extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tournament: props.tournament
    };
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.open && this.props.open) {
      this.setState({ tournament: this.props.tournament });
    }
  }
  handleSubmit = event => {
    event.preventDefault();

    console.log(event.target.title.value);
    console.log(event.target.startDate.value);
    console.log(event.target.endDate.value);
  };

  requestDialogClosing = () => {
    this.setState({ tournament: true, isTournamentDialogVisible: false });
    // this.props.closeTournamentDialog();
  };

  cancelDialogClosing = () => {
    this.setState({ isDialogClosingRequested: false });
  };

  saveChanges = () => {
    // TODO: send request to server to update the data
    this.showMessage("Player information was successfully updated");
    this.closeDialog();
  };

  showMessage = message => {
    this.setState({ message, isMessageVisible: true });
  };

  closeMessage = () => {
    this.setState({ isMessageVisible: false, message: "" });
  };

  render() {
    const { classes, open } = this.props;
    const { startDate, endDate, title } = this.state.tournament;
    return (
      <>
        <Dialog
          open={open}
          onClose={this.requestDialogClosing}
          //   className={classes.player}
          fullWidth={true}
          //   maxWidth="xs"
        >
          <DialogTitle>Edit Tournament</DialogTitle>
          {/* <DialogContent className={classes.player__content}> */}
          <DialogContent>
            <TextField
              value={title}
              fullWidth
              name={"title"}
              required
              autoFocus
              label="Title"
            />
            <Grid container spacing={2}>
              <Grid item>
                <KeyboardDatePicker
                  margin="normal"
                  name={"startDate"}
                  value={startDate}
                  required
                  label="Start date"
                />
              </Grid>
              <Grid item>
                <KeyboardDatePicker
                  margin="normal"
                  value={endDate}
                  required
                  name={"endDate"}
                  label="End Date"
                />
              </Grid>
            </Grid>
          </DialogContent>
        </Dialog>
      </>
    );
  }
}

export default Tournament;
