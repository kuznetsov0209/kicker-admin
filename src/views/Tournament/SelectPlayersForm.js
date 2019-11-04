import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import Fab from "@material-ui/core/Fab";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";
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
      const sorted = store.users.sort(function(a, b) {
        if (a.name.toLowerCase() > b.name.toLowerCase()) {
          return 1;
        }
        if (a.name.toLowerCase() < b.name.toLowerCase()) {
          return -1;
        }
        return 0;
      });
      this.setState({ defaultData: sorted, showData: sorted });
    } finally {
      this.setState({ isLoading: false });
    }
  }

  searchPlayer = event => {
    this.setState({ value: event.target.value });
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
          <Fab style={{ margin: "8px 16px" }} size="small" onClick={close}>
            <CloseSharpIcon />
          </Fab>
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
