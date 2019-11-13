import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
import InputAdornment from "@material-ui/core/InputAdornment";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

class SelectPlayerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: "",
      isLoading: false,
      users: props.users
    };
  }

  handleSearchFieldChange = event => {
    const searchValue = event.target.value;
    this.setState({ searchValue });
  };

  render() {
    const { users, open, onClose, onSelect } = this.props;
    const { searchValue, isLoading } = this.state;

    if (isLoading) {
      return <CircularProgress color={"secondary"} size={20} />;
    }

    const searchValueLowerCase = searchValue.toLowerCase();
    const filteredUsers = searchValue
      ? users.filter(user => user.name.toLowerCase().includes(searchValue))
      : users;

    return (
      <Dialog fullWidth open={open} onClose={onClose}>
        <DialogTitle disableTypography>
          <Typography variant="h6" gutterBottom>
            Choose a player
          </Typography>

          <TextField
            margin="normal"
            placeholder="Search"
            onChange={this.handleSearchFieldChange}
            value={searchValue}
            fullWidth
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              )
            }}
          />
        </DialogTitle>
        <DialogContent>
          <List>
            {filteredUsers.map(player => (
              <ListItem
                disableGutters
                button
                onClick={() => onSelect(player)}
                key={player}
              >
                <ListItemAvatar>
                  <Avatar src={player.photoUrl}></Avatar>
                </ListItemAvatar>
                <ListItemText primary={player.name} />
              </ListItem>
            ))}
          </List>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            onClick={onClose}
          >
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

export default SelectPlayerDialog;
