import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Button,
  Container,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import { grey } from "@material-ui/core/colors";
import { AddCircleOutline, Create, Delete } from "@material-ui/icons";
import MaterialTable from "material-table";
import { styles } from "./Tournaments.styles";
import { store } from "../../store/tournamentStore";
import dateFormat from "dateformat";
import { withRouter, Link } from "react-router-dom";
import TournamentAddForm from "./TournamentAddForm";

@withRouter
@observer
class Tournaments extends Component {
  constructor(props) {
    super(props);
    this.tableConfig = {
      addButton: {
        icon: () => {
          return (
          <Button
            color="primary"
            startIcon={
              <AddCircleOutline
                color="primary"
              />
            }
          >
            Add new tournament
          </Button>
        )},
        tooltip: "Add Tournament",
        isFreeAction: true,
        onClick: this.handleOpen
      },
      columns: [
        { title: "№", field: "number" },
        { title: "Title", field: "title" },
        { title: "Start Date", field: "startDate", type: "date" },
        { title: "Finish Date", field: "endDate", type: "date" },
        { title: "Status", field: "status" },
      ],
      options: {
        actionsColumnIndex: -1,
        draggable: false,
        paging: false,
        search: false,
        showTitle: false,
        sorting: false,
        toolbarButtonAlignment: "left"
      }
    }
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
        <Container
          className={classes.container}
        >
          <div style={{ overflowX: "auto" }}>
            {store.tournaments.length ? (
              <MaterialTable
                actions={[
                  {
                    ...this.tableConfig.addButton
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
                columns={
                  this.tableConfig.columns
                }
                data={
                  store.tournaments.map((tour, index) => (
                    {
                      number: ++index,
                      title: tour.title,
                      startDate: dateFormat(tour.startDate, "dddd, mmmm dS, yyyy"),
                      endDate: dateFormat(tour.endDate, "dddd, mmmm dS, yyyy")
                    }
                  ))
                }
                options={
                  this.tableConfig.options
                }
              />
            ) : (
              <MaterialTable
                actions={[
                  this.tableConfig.addButton
                ]}
                columns={
                  this.tableConfig.columns
                }
                localization={{
                  body: {
                    emptyDataSourceMessage: "There are no tournaments yet"
                  }
                }}
                options={{
                  ...this.tableConfig.options,
                  header: false
                }}
              />
            )}
          </div>
          {this.state.open && (
            <TournamentAddForm
              handleClose={this.handleClose}
              open={this.state.open}
            />
          )}
        </Container>
      </React.Fragment>
    );
  }
}

export default withStyles(styles)(Tournaments);
