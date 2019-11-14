import React, { Component } from "react";
import { observer } from "mobx-react";
import { store } from "../../store/userStore";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import EditIcon from "@material-ui/icons/Edit";
import PlayerDialog from "./PlayerDialog";
import DataTable from "./../../components/DataTable";

@observer
class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      isPlayerDialogVisible: false,
      player: null,
      page: 0
    };
  }

  async loadUsersIfNeeded() {
    try {
      this.setState({ isLoading: true });
      await store.getUsers(this.state.page);
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

  loadMore = () => {
    this.setState(
      prevState => ({
        page: prevState.page + 1
      }),
      () => store.getUsers(this.state.page)
    );
  };

  render() {
    const { users, usersHasMore } = store;

    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <>
        <DataTable
          data={users}
          loadMore={this.loadMore}
          hasMore={usersHasMore}
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
