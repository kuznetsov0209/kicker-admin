import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Modal, Button, CircularProgress } from "@material-ui/core";

class DeleteModal extends React.Component {
  render() {
    const {
      classes,
      open,
      close,
      confirm,
      inProgress,
      names,
      date
    } = this.props;

    return (
      <Modal
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
        open={open}
        onClose={close}
      >
        <div className={classes.paper}>
          <Typography
            variant="h6"
            id="modal-title"
            classes={{ root: classes.title }}
          >
            Remove game
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
            Are you sure you want to remove the game?
          </Typography>
          <Typography variant="subtitle1">{names}</Typography>
          <Typography variant="subtitle1">{date}</Typography>
          <div className={classes.buttonsContainer}>
            <Button
              classes={{ root: classes.button }}
              variant={"outlined"}
              onClick={close}
            >
              Cancel
            </Button>
            <Button
              classes={{ root: classes.button }}
              variant={"contained"}
              color={"primary"}
              onClick={confirm}
            >
              {inProgress ? (
                <CircularProgress color={"secondary"} size={20} />
              ) : (
                "Confirm"
              )}
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
}

const styles = theme => ({
  paper: {
    margin: "200px auto",
    width: theme.spacing(50),
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(4),
    borderRadius: 10
  },
  title: {
    marginBottom: 20
  },
  button: {
    borderRadius: 0,
    marginLeft: 10
  },
  buttonsContainer: {
    marginTop: 20,
    width: "100%",
    display: "flex",
    justifyContent: "flex-end"
  }
});

export default withStyles(styles)(DeleteModal);
