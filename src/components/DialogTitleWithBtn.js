import React from "react";
import { withStyles } from "@material-ui/core/styles";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import Typography from "@material-ui/core/Typography";

const styles = {
  dialogTitleWithBtn: {
    paddingRight: 12
  },
  dialogtitlewithbtn__title: {
    paddingTop: 10
  }
};

const DialogTitleWithBtn = ({ ...props }) => {
  const { classes, titleText, onClose, className } = { ...props };
  return (
    <MuiDialogTitle disableTypography className={className}>
      <Typography className={classes.dialogtitlewithbtn__title} variant="h6">
        {titleText}
      </Typography>
      {onClose ? (
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
};

export default withStyles(styles)(DialogTitleWithBtn);
