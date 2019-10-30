import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import DialogTitleWithBtn from "./DialogTitleWithBtn";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const DialogApplyChangesDecision = ({ ...props }) => {
  const {
    open,
    onClose,
    titleText,
    classNameDialogTitle,
    contentText,
    btnCancelText,
    btnCancelOnClick,
    btnConfirmText,
    btnConfirmOnClick
  } = { ...props };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={true}
      disableEscapeKeyDown={true}
    >
      <DialogTitleWithBtn
        titleText={titleText}
        className={classNameDialogTitle}
      />
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={btnCancelOnClick} variant="outlined" color="primary">
          {btnCancelText}
        </Button>
        <Button
          onClick={btnConfirmOnClick}
          color="primary"
          variant="contained"
          autoFocus
        >
          {btnConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogApplyChangesDecision;
