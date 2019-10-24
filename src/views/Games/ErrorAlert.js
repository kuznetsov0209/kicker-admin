import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { Typography, Modal, Button } from "@material-ui/core";

class ErrorAlert extends React.Component {
  render() {
    const { classes, open, close } = this.props;

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
            Game is a part of a tournament
          </Typography>
          <Typography variant="subtitle1" id="simple-modal-description">
          You can’t remove the game because it is a part of tournament.
          </Typography>
          <div className={classes.buttonsContainer}>
            <Button
              classes={{ root: classes.button }}
              variant={"contained"}
              color={"primary"}
              onClick={close}
            >
              ОК
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

export default withStyles(styles)(ErrorAlert);
