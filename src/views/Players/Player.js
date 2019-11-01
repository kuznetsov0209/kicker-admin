import React from "react";
import { withStyles } from "@material-ui/core/styles";
import {
  Avatar,
  Button,
  Dialog,
  TextField,
  DialogContent,
  Typography
} from "@material-ui/core";
import DialogTitle from "@material-ui/core/DialogTitle";
import photoPlaceholder from "../../resources/Players/user-placeholder.jpg";
import DialogActions from "@material-ui/core/DialogActions";
import CancelIcon from "@material-ui/icons/Cancel";
import ConfirmationDialog from "../../components/ConfirmationDialog";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import styles from "./Player.style";

const ACCEPTABLE_FILE_TYPES = ["image/png", "image/jpg", "image/jpeg"];
const MAX_FILE_SIZE = 3145728;

@withStyles(styles)
class Player extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      name: "",
      srcPhoto: photoPlaceholder,
      playerIsOpen: true,
      closePopupIsOpen: false,
      makePlayerInactiveDialogIsOpen: false,
      fileSizeIsError: false,
      fileTypeIsError: false,
      sucessSnackbarIsOpen: false,
      playerInfoIncoming: {}
    };
  }

  componentDidMount = () => {
    const playerInfo = this.props.player;
    this.setState({
      email: playerInfo.email ? playerInfo.email : "",
      name: playerInfo.name ? playerInfo.name : "",
      srcPhoto: playerInfo.photoUrl ? playerInfo.photoUrl : photoPlaceholder,
      playerInfoIncoming: playerInfo
    });
  };

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  onClosePlayerDialog = () => {
    if (this.checkPlayerDataIsChanged()) {
      this.openClosePopup();
    } else {
      this.closePlayerDialog();
    }
  };

  closePlayerDialog = () => {
    this.setState({ closePopupIsOpen: false, playerIsOpen: false });
    this.props.handleClosePlayer();
  };

  openClosePopup = () => {
    this.setState({ closePopupIsOpen: true });
  };

  closeClosePopup = () => {
    this.setState({ closePopupIsOpen: false });
  };

  openPlayerInactiveDialog = e => {
    this.setState({ makePlayerInactiveDialogIsOpen: true });
  };

  closePlayerInactiveDialog = () => {
    this.setState({ makePlayerInactiveDialogIsOpen: false });
  };

  makePlayerInactive = () => {
    this.closePlayerInactiveDialog();
    this.setState({ sucessSnackbarIsOpen: true });
    //TODO: send request to server to make this player inactive
  };

  saveChanges = () => {
    //TODO send request to server to update the data
    this.setState({ sucessSnackbarIsOpen: true });
  };

  closeSnackbar = () => {
    this.setState({ sucessSnackbarIsOpen: false, playerIsOpen: false });
    this.props.handleClosePlayer();
  };

  fileValidation = e => {
    const file = e.target.files;
    if (file.length !== 0) {
      if (
        ACCEPTABLE_FILE_TYPES.includes(file[0].type) &&
        file[0].size <= MAX_FILE_SIZE
      ) {
        this.setState({ fileSizeIsError: false, fileTypeIsError: false });
        //TODO: send request to server to update the user's avatar
      } else if (
        ACCEPTABLE_FILE_TYPES.includes(file[0].type) === false &&
        file[0].size <= MAX_FILE_SIZE
      ) {
        this.setState({ fileTypeIsError: true, fileSizeIsError: false });
      } else if (
        ACCEPTABLE_FILE_TYPES.includes(file[0].type) === true &&
        file[0].size > MAX_FILE_SIZE
      ) {
        this.setState({ fileSizeIsError: true, fileTypeIsError: false });
      } else {
        this.setState({ fileSizeIsError: true, fileTypeIsError: true });
      }
    }
  };

  checkPlayerDataIsChanged = () => {
    if (
      this.state.playerInfoIncoming.email === this.state.email &&
      this.state.playerInfoIncoming.name === this.state.name &&
      this.state.playerInfoIncoming.srcPhoto === this.state.photoUrl
    ) {
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { classes } = this.props;
    return (
      <Dialog
        open={this.state.playerIsOpen}
        onClose={this.onClosePlayerDialog}
        className={classes.player}
        fullWidth={true}
        maxWidth="xs"
      >
        <DialogTitle>Edit player information</DialogTitle>
        <DialogContent className={classes.player__content}>
          <Avatar
            className={classes.player__avatar}
            src={this.state.srcPhoto}
          />
          <input
            accept="image/jpg,image/png"
            id="text-button-file"
            type="file"
            hidden
            onChange={this.fileValidation}
          />
          <label htmlFor="text-button-file">
            <Button component="span" className={classes.player__uploadButton}>
              Upload photo
            </Button>
          </label>
          {this.state.fileSizeIsError ? (
            <Typography variant="subtitle2" gutterBottom color="secondary">
              File size exceeds 3 Mb.
            </Typography>
          ) : null}
          {this.state.fileTypeIsError ? (
            <Typography variant="subtitle2" gutterBottom color="secondary">
              You can upload only .png or .jpg file.
            </Typography>
          ) : null}
          <TextField
            className={classes.player__input}
            label="Player name"
            value={this.state.name}
            margin="normal"
            onChange={this.handleChangeName}
          />
          <TextField
            className={classes.player__input}
            color="secondary"
            label="E-mail"
            value={this.state.email}
            margin="normal"
            onChange={this.handleChangeEmail}
            type="email"
          />
        </DialogContent>
        <DialogActions className={classes.player__buttonContainer}>
          <Button
            variant="outlined"
            color="secondary"
            startIcon={<CancelIcon />}
            onClick={this.openPlayerInactiveDialog}
          >
            Make player inactive
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={this.saveChanges}
          >
            Save
          </Button>
        </DialogActions>
        {this.state.closePopupIsOpen ? (
          <ConfirmationDialog
            open={this.state.closePopupIsOpen}
            handleClose={this.closeClosePopup}
            title="Close popup"
            contentText="Are you sure you want to close the popup? All changes will be lost."
            handleConfirm={this.closePlayerDialog}
          />
        ) : null}
        {this.state.makePlayerInactiveDialogIsOpen ? (
          <ConfirmationDialog
            open={this.state.makePlayerInactiveDialogIsOpen}
            handleClose={this.closePlayerInactiveDialog}
            title="Make player inactive"
            contentText={`Are you sure you want to make player ${this.state.name} inactive?`}
            handleConfirm={this.makePlayerInactive}
          />
        ) : null}
        {this.state.sucessSnackbarIsOpen ? (
          <Snackbar
            open={this.state.sucessSnackbarIsOpen}
            //autoHideDuration={10000}
            onClose={this.closeSnackbar}
            ContentProps={{
              className: classes.player__snackbarContent
            }}
            message={<span>Player information was successfully updated</span>}
            action={[
              <IconButton
                key="close"
                color="inherit"
                onClick={this.closeSnackbar}
              >
                <CloseIcon />
              </IconButton>
            ]}
          />
        ) : null}
      </Dialog>
    );
  }
}

export default Player;
