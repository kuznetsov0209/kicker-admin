import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";

class ErrorDialog extends React.Component {
  render() {
    const { open, handleClose, title, contentText } = this.props;

    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          {contentText.map((text, index) => (
            <DialogContentText key={index}>{text}</DialogContentText>
          ))}
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

export default ErrorDialog;
