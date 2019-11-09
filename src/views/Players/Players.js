import React, { Component } from "react";
import { store } from "../../store/userStore";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import PlayerDialog from "./PlayerDialog";
import DataTable from "./../../components/DataTable";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPlayerDialogVisible: false,
      player: null
    };
  }

  async loadUsersIfNeeded() {
    try {
      this.setState({ isLoading: true });
      await store.getUsers();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadUsersIfNeeded();
  }

  closePlayerDialog = () => {
    this.setState({ isPlayerDialogVisible: false });
  };

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <>
        <DataTable
          data={store.users}
          columns={[
            {
              title: "User",
              field: "photoUrl",
              render: rowData => (
                <Avatar alt="Player avatar" src={rowData.photoUrl} />
              )
            },
            {
              title: "Name",
              field: "name"
            },
            {
              title: "E-mail",
              field: "email"
            },
            {
              render: rowData => (
                <EditIcon
                  onClick={() =>
                    this.setState({
                      isPlayerDialogVisible: true,
                      player: rowData
                    })
                  }
                />
              )
            }
          ]}
        />
        <PlayerDialog
          open={this.state.isPlayerDialogVisible}
          player={this.state.player}
          onClose={this.closePlayerDialog}
        />
      </>
    );
  }
}

export default Players;
