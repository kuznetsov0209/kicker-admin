import React from "react";
import Avatar from "@material-ui/core/Avatar";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import ListItemText from "@material-ui/core/ListItemText";
import PersonIcon from "@material-ui/icons/Person";
import Fab from "@material-ui/core/Fab";
import CloseSharpIcon from "@material-ui/icons/CloseSharp";

import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import SearchIcon from "@material-ui/icons/Search";
// import { store } from "../store";

let players = [
  "aaaaaaaaaa",
  "two 2",
  "three 3",
  "nnnner 4",
  "player 5",
  "player 6",
  "player 7",
  "player 8"
].sort();

class SimpleDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allPlayers: players,
      showPlayers: players,
      value: ""
    };
  }

  //   componentDidMount = () => {
  //     this.loadPlayer(this.props.playerId);
  //     console.log(this.state);
  //   };

  //   async loadPlayer(id) {
  //     this.setState({ playerIsLoading: true });
  //     try {
  //       await store.loadUsers();
  //     } finally {
  //       const playerInfo = store.getUserById(id);
  //       if (playerInfo) {
  //         this.setState({
  //           email: playerInfo.email ? playerInfo.email : "",
  //           name: playerInfo.name ? playerInfo.name : "",
  //           srcPhoto: playerInfo.photoUrl
  //             ? playerInfo.photoUrl
  //             : photoPlaceholder,
  //           playerIsLoading: false
  //         });
  //       } else {
  //         this.setState({ playerIsLoading: false });
  //       }
  //     }
  //   }

  handleListItemClick = value => {
    this.props.onClose(value);
  };

  handleSubmit = event => {
    this.setState({ value: event.target.value });
    const players = this.state.allPlayers;

    if (this.state.value != "") {
      const result = players.filter(item => {
        if (item.toLowerCase().includes(this.state.value.toLowerCase())) {
          return item;
        }
      });
      this.setState({ showPlayers: result });
    } else this.setState({ showPlayers: players });
  };

  render() {
    return (
      <Dialog fullWidth disableBackdropClick={true} open={this.props.open}>
        <div style={{ display: "flex" }}>
          <DialogTitle style={{ flex: "1" }}>Choose a player</DialogTitle>
          <Fab
            style={{ margin: "8px 16px" }}
            size="small"
            onClick={this.props.close}
          >
            <CloseSharpIcon />
          </Fab>
        </div>
        <Paper>
          <IconButton aria-label="search">
            <SearchIcon />
          </IconButton>
          <InputBase
            onChange={this.handleSubmit}
            placeholder="Search"
            inputProps={{ "aria-label": "search" }}
            value={this.state.value}
          />
        </Paper>
        <List>
          {this.state.showPlayers.map(player => (
            <ListItem
              button
              onClick={() => this.handleListItemClick(player)}
              key={player}
            >
              <ListItemAvatar>
                <Avatar>
                  <PersonIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={player} />
            </ListItem>
          ))}
        </List>
      </Dialog>
    );
  }
}

export default SimpleDialog;
