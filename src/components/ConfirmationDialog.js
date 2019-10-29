import React from "react";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ConfirmationDialog extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoading: false
    };
  }

  handleConfirm = async () => {
    const { handleConfirm } = this.props;
    try {
      this.setState({ isLoading: true });
      await handleConfirm();
    } finally {
      this.setState({ isLoading: false });
    }
  };
  render() {
    const { open, handleClose, title, contentText } = this.props;

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <DialogContentText>{contentText}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant={"outlined"} onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant={"contained"}
            color={"primary"}
            onClick={this.handleConfirm}
          >
            {this.state.isLoading ? (
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

export default ConfirmationDialog;
