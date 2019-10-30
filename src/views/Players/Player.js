import React from "react";
import { withStyles } from "@material-ui/core/styles";
import { store } from "../../store";
import {
  Avatar,
  Button,
  Dialog,
  TextField,
  DialogContent,
  Typography
} from "@material-ui/core";
import DialogTitleWithBtn from "../../components/DialogTitleWithBtn";
import photoPlaceholder from "../../resources/Players/user-placeholder.jpg";
import DialogActions from "@material-ui/core/DialogActions";
import CancelIcon from "@material-ui/icons/Cancel";
import DialogApplyChangesDecision from "../../components/DialogApplyChangesDecision";
import DialogConfirmAction from "../../components/DialogConfirmAction";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import CircularProgress from "@material-ui/core/CircularProgress";
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
      playerIsLoading: false,
      closePopupIsOpen: false,
      makePlayerInactivePopupIsOpen: false,
      fileSizeIsError: false,
      fileTypeIsError: false,
      sucessSnackbarIsOpen: false
    };
  }

  componentDidMount = () => {
    //TODO download the information
    this.loadPlayer(this.props.playerId);
  };

  async loadPlayer(id) {
    this.setState({ playerIsLoading: true });
    try {
      await store.loadUsers();
    } finally {
      const playerInfo = store.getUserById(id);
      if (playerInfo) {
        this.setState({
          email: playerInfo.email ? playerInfo.email : "",
          name: playerInfo.name ? playerInfo.name : "",
          srcPhoto: playerInfo.photoUrl
            ? playerInfo.photoUrl
            : photoPlaceholder,
          playerIsLoading: false
        });
      } else {
        this.setState({ playerIsLoading: false });
      }
    }
  }

  handleChangeEmail = e => {
    this.setState({ email: e.target.value });
  };

  handleChangeName = e => {
    this.setState({ name: e.target.value });
  };

  closePlayerDialog = () => {
    this.setState({ closePopupIsOpen: false, playerIsOpen: false });
  };

  openClosePopup = () => {
    this.setState({ closePopupIsOpen: true });
  };

  closeClosePopup = () => {
    this.setState({ closePopupIsOpen: false });
  };

  openPlayerInactiveDialog = e => {
    this.setState({ makePlayerInactivePopupIsOpen: true });
  };

  makePlayerInactive = () => {
    this.closePlayerInactiveDialog();
    this.setState({ sucessSnackbarIsOpen: true });
    //TODO: send request to server to make this player inactive
  };

  closePlayerInactiveDialog = () => {
    this.setState({ makePlayerInactivePopupIsOpen: false });
  };

  saveChanges = () => {
    //TODO send request to server to update the data
    this.setState({ sucessSnackbarIsOpen: true });
  };

  closeSnackbar = () => {
    this.setState({ sucessSnackbarIsOpen: false, playerIsOpen: false });
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

  render() {
    const { classes } = this.props;
    if (this.state.playerIsLoading) {
      return <CircularProgress className={classes.player__circularProgress} />;
    }
    return (
      <Dialog
        open={this.state.playerIsOpen}
        onClose={this.closePlayerDialog}
        className={classes.player}
        fullWidth={true}
        maxWidth="xs"
        disableBackdropClick={true}
        disableEscapeKeyDown={true}
      >
        <DialogTitleWithBtn
          className={classes.player__dialogTitle}
          titleText="Edit player information"
          onClose={this.openClosePopup}
        />
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
          <DialogApplyChangesDecision
            open={this.state.closePopupIsOpen}
            onClose={this.closeClosePopup}
            classNameDialogTitle={classes.player__dialogTitle}
            titleText="Close popup"
            contentText="Are you sure you want to close the popup? All changes will be lost."
            btnCancelText="Cancel"
            btnCancelOnClick={this.closeClosePopup}
            btnConfirmText="OK"
            btnConfirmOnClick={this.closePlayerDialog}
          />
        ) : null}
        {this.state.makePlayerInactivePopupIsOpen ? (
          <DialogConfirmAction
            open={this.state.makePlayerInactivePopupIsOpen}
            onClose={this.closePlayerInactiveDialog}
            titleText="Make player inactive"
            classNameDialogTitle={classes.player__dialogTitle}
            cancelIconTitleOnClick={this.closePlayerInactiveDialog}
            contentText={`Are you sure you want to make player ${this.state.name} inactive?`}
            btnConfirmText="Confirm"
            btnConfirmOnClick={this.makePlayerInactive}
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
