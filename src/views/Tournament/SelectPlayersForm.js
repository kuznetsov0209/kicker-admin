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

class SelectPlayersForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      value: "",
      IsLoading: false,
      defaultData: [],
      showData: []
    };
  }

  componentDidMount() {
    this.loadUsers();
  }

  async loadUsers() {
    try {
      this.setState({ isLoading: true });
      await store.getUsers();

      const players = store.users;

      const disabledPlayers = this.props.disabledPlayer;

      const filteredPlayers = players.filter(function(player) {
        return (
          disabledPlayers.filter(function(disabledPlayer) {
            return player.id === disabledPlayer.id;
          }).length == 0
        );
      });

      filteredPlayers.sort(function(a, b) {
        if (a.name.toLowerCase().localeCompare(b.name.toLowerCase()) < 0) {
          return -1;
        } else return 1;
      });
      this.setState({
        defaultData: filteredPlayers,
        showData: filteredPlayers
      });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  searchPlayer = event => {
    this.setState({ value: event.target.value }, () => {
      this.filterPlayer();
    });
  };

  filterPlayer = () => {
    const players = this.state.showData;

    if (this.state.value != "") {
      const result = players.filter(item => {
        if (item.name.toLowerCase().includes(this.state.value.toLowerCase())) {
          return item;
        }
      });
      this.setState({ showData: result });
    } else this.setState({ showData: this.state.defaultData });
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
            size="small"
            style={{ margin: "16px 16px" }}
            variant="contained"
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
            onChange={this.searchPlayer}
            placeholder="Search"
            value={value}
          />
        </Paper>
        <List>
          {this.state.showData.map(player => (
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

export default SelectPlayersForm;
