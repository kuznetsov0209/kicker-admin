import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ErrorAlert extends React.Component {
  render() {
    const { open, handleClose } = this.props;

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Game is a part of a tournament</DialogTitle>
        <DialogContent>
          <DialogContentText>
            You can’t remove the game because it is a part of tournament.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"contained"} color={"primary"} onClick={handleClose}>
            ОК
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default ErrorAlert;
