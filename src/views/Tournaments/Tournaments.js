import React, { Component } from "react";
import { observer } from "mobx-react";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import LinkMui from "@material-ui/core/Link";
import { withStyles } from "@material-ui/core/styles";
import AddCircleOutline from "@material-ui/icons/AddCircleOutline";
import Create from "@material-ui/icons/Create";
import Delete from "@material-ui/icons/Delete";
import MaterialTable from "material-table";
import { styles } from "./Tournaments.styles";
import { store } from "../../store/tournamentStore";
import dateFormat from "dateformat";
import { withRouter, Link } from "react-router-dom";
import TournamentAddForm from "./TournamentAddForm";

@withStyles(styles)
@withRouter
@observer
class Tournaments extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      open: false
    };
  }

  handleClose = () => {
    this.setState({
      open: false
    });
  };

  handleOpen = () => {
    this.setState({
      open: true
    });
  };

  async loadTournamentsIfNeeded() {
    try {
      this.setState({ isLoading: true });
      await store.getTournaments();
    } finally {
      this.setState({ isLoading: false });
    }
  }

  componentDidMount() {
    this.loadTournamentsIfNeeded();
  }

  render() {
    const { classes } = this.props;

    if (this.state.isLoading) {
      return <CircularProgress className={classes.circularProgress} />;
    }

    return (
      <React.Fragment>
        <MaterialTable
          actions={[
            {
              icon: () => {
                return (
                  <Button
                    color="primary"
                    startIcon={<AddCircleOutline color="primary" />}
                  >
                    Add new tournament
                  </Button>
                );
              },
              tooltip: "Add Tournament",
              isFreeAction: true,
              onClick: this.handleOpen
            },
            {
              icon: Create,
              tooltip: "Edit Tournament",
              onClick: () => {}
            },
            {
              icon: Delete,
              tooltip: "Delete Tournament",
              onClick: () => {}
            }
          ]}
          data={store.tournaments.map(tournament => tournament)}
          columns={[
            {
              title: "№",
              field: "number",
              render: rowData => rowData.tableData.id + 1
            },
            {
              title: "Title",
              field: "title",
              render: rowData => (
                <LinkMui
                  component={props => (
                    <Link to={`/tournaments/${rowData.id}`} {...props} />
                  )}
                >
                  {rowData.title}
                </LinkMui>
              )
            },
            {
              title: "Start Date",
              field: "startDate",
              type: "date",
              render: rowData =>
                dateFormat(rowData.startDate, "dddd, mmmm dS, yyyy")
            },
            {
              title: "Finish Date",
              field: "endDate",
              type: "date",
              render: rowData =>
                dateFormat(rowData.endDate, "dddd, mmmm dS, yyyy")
            },
            {
              title: "Status",
              field: "status",
              render: rowData => rowData.status
            }
          ]}
          localization={{
            body: {
              emptyDataSourceMessage: "There are no tournaments yet"
            }
          }}
          options={{
            actionsColumnIndex: -1,
            draggable: false,
            paging: false,
            search: false,
            showTitle: false,
            sorting: false,
            toolbarButtonAlignment: "left"
          }}
        />
        {this.state.open && (
          <TournamentAddForm
            handleClose={this.handleClose}
            open={this.state.open}
          />
        )}
      </React.Fragment>
    );
  }
}

export default Tournaments;
