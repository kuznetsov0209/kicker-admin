import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class DeleteModal extends React.Component {
  render() {
    const { open, handleClose, confirm, inProgress, names, date } = this.props;

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Remove game</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to remove the game?
          </DialogContentText>
          <DialogContentText>{names}</DialogContentText>
          <DialogContentText>{date}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancel
          </Button>
          <Button variant={"contained"} color={"primary"} onClick={confirm}>
            {inProgress ? (
              <CircularProgress color={"secondary"} size={20} />
            ) : (
              "Confirm"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default DeleteModal;
