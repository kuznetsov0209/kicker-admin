import React from "react";
import { Button, Dialog, DialogContent } from "@material-ui/core";
import DialogTitleWithBtn from "./DialogTitleWithBtn";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContentText from "@material-ui/core/DialogContentText";

const DialogConfirmAction = ({ ...props }) => {
  const {
    open,
    onClose,
    classNameDialogTitle,
    titleText,
    cancelIconTitleOnClick,
    contentText,
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
      className={classNameDialogTitle}
        titleText={titleText}
        onClose={cancelIconTitleOnClick}
      />
      <DialogContent>
        <DialogContentText>{contentText}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={btnConfirmOnClick} color="primary">
          {btnConfirmText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DialogConfirmAction;
