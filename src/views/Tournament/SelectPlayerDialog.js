import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
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
import { store } from "../../store/userStore";

class SelectPlayerDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      IsLoading: false,
      users: [],
      filteredUsers: []
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.disabledPlayers !== prevProps.disabledPlayers) {
      this.loadUsers();
    }
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.setState({ isLoading: true });
      await store.getUsers();

      const players = store.users;

      const disabledPlayers = this.props.disabledPlayers;

      const filteredPlayers = players.filter(function(player) {
        return (
          disabledPlayers.find(
            disabledPlayer => player.id === disabledPlayer.id
          ) === undefined
        );
      });

      filteredPlayers.sort(function(a, b) {
        if (a.name.toLowerCase().localeCompare(b.name.toLowerCase()) < 0) {
          return -1;
        } else return 1;
      });
      this.setState({
        users: filteredPlayers,
        filteredUsers: filteredPlayers
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  handleSearchFieldChange = event => {
    this.setState({ value: event.target.value }, () => {
      const players = this.state.filteredUsers;

      if (this.state.value != "") {
        const result = players.filter(item => {
          if (
            item.name.toLowerCase().includes(this.state.value.toLowerCase())
          ) {
            return item;
          }
        });
        this.setState({ filteredUsers: result });
      } else this.setState({ filteredUsers: this.state.users });
    });
  };

  render() {
    const { open, close, select } = this.props;
    const { value } = this.state;
    if (this.state.IsLoading) {
      return <CircularProgress color={"secondary"} size={20} />;
    }
    return (
      <Dialog fullWidth disableBackdropClick={true} open={open}>
        <div style={{ display: "flex" }}>
          <DialogTitle style={{ flex: "1" }}>Choose a player</DialogTitle>
          <Button
            variant="outlined"
            color="primary"
            size="small"
            style={{ margin: "16px 16px" }}
            onClick={close}
          >
            Cancel
          </Button>
        </div>
        <Paper>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            onChange={this.handleSearchFieldChange}
            placeholder="Search"
            value={value}
          />
        </Paper>
        <List>
          {this.state.filteredUsers.map(player => (
            <ListItem button onClick={() => select(player)} key={player}>
              <ListItemAvatar>
                <Avatar src={player.photoUrl}></Avatar>
              </ListItemAvatar>
              <ListItemText primary={player.name} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

export default SelectPlayerDialog;
