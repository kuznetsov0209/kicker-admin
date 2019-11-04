import React, { forwardRef, Component } from "react";
import { store } from "../../store/userStore";
import MaterialTable from "material-table";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";
import SearchIcon from "@material-ui/icons/Search";
import EditIcon from "@material-ui/icons/Edit";
import ClearIcon from "@material-ui/icons/Clear";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";

class Players extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true
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

  render() {
    if (this.state.isLoading) {
      return <CircularProgress style={{ margin: "15px auto" }} />;
    }

    return (
      <MaterialTable
        title=""
        icons={{
          Search: forwardRef((props, ref) => (
            <SearchIcon {...props} ref={ref} />
          )),
          ResetSearch: forwardRef((props, ref) => (
            <ClearIcon {...props} ref={ref} />
          )),
          NextPage: forwardRef((props, ref) => (
            <ChevronRightIcon {...props} ref={ref} />
          )),
          PreviousPage: forwardRef((props, ref) => (
            <ChevronLeftIcon {...props} ref={ref} />
          ))
        }}
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
            field: "name",
            defaultSort: "asc"
          },
          {
            title: "E-mail",
            field: "email"
          }
        ]}
        data={store.users}
        options={{
          searchFieldAlignment: "left",
          actionsColumnIndex: -1,
          pageSize: 20,
          pageSizeOptions: [],
          paginationType: "stepped",
          sorting: false
        }}
        actions={[
          {
            icon: () => <EditIcon />,
            tooltip: "Edit User",
            onClick: (event, rowData) => alert("Edit" + rowData.name)
          }
        ]}
      />
    );
  }
}

export default Players;
