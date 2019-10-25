import React, { Component } from "react";
import { observer } from "mobx-react";
import {
  Button,
  Container,
  IconButton,
  Link as StyledLink,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Typography
} from "@material-ui/core";
import { withStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';
import { StyledTableRow, styles } from "./Tournaments.styles";
import { store } from "../../store/tournamentStore";
import dateFormat from "dateformat";
import { withRouter, Link } from "react-router-dom";
import TournamentAddForm from "./TournamentAddForm";

@withRouter
@observer
class Tournaments extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sortingProperty: "startDate",
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

    return store.tournaments.length ? (
      <React.Fragment>
        <Container
          maxWidth="md"
          className={classes.container}
        >
          <Button
            color="primary"
            startIcon={
              <AddCircleOutlineIcon
                color="primary"
              />
            }
            onClick={this.handleOpen}
          >
            Add new tournament
          </Button>
          <div style={{ overflowX: "auto" }}>
            <Table className={classes.table} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <TableCell
                    className={classes.tableHeaderCell}
                  >
                    <Button
                      color={
                        this.state.sortingProperty === "number"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ sortingProperty: "number" });
                      }}
                    >
                      №
                    </Button>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeaderCell}
                  >
                    <Button
                      className={classes.tableHeaderTitle}
                      color={
                        this.state.sortingProperty === "title"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ sortingProperty: "title" });
                      }}
                    >
                      Title
                    </Button>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeaderCell}
                  >
                    <Button
                      className={classes.tableHeaderTitle}
                      color={
                        this.state.sortingProperty === "startDate"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ sortingProperty: "startDate" });
                      }}
                    >
                      Start Date
                    </Button>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeaderCell}
                  >
                    <Button
                      className={classes.tableHeaderTitle}
                      color={
                        this.state.sortingProperty === "finishDate"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ sortingProperty: "finishDate" });
                      }}
                    >
                      Finish Date
                    </Button>
                  </TableCell>
                  <TableCell
                    className={classes.tableHeaderCell}
                  >
                    <Button
                      className={classes.tableHeaderTitle}
                      color={
                        this.state.sortingProperty === "status"
                          ? "primary"
                          : "default"
                      }
                      onClick={() => {
                        this.setState({ sortingProperty: "status" });
                      }}
                    >
                      Status
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {store.tournaments.map((tour, index) => (
                  <StyledTableRow key={index}>
                    <TableCell
                      style={{
                        textAlign: "center",
                        fontWeight: this.state.sortingProperty === "number" && "bold"
                      }}
                    >
                      {++index}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: this.state.sortingProperty === "title" && "bold"
                      }}
                    >
                      <StyledLink
                        color="textPrimary"
                        underline="none"
                        component={Link}
                        to={`/tournaments/${tour.id}`}
                      >
                        {tour.title}
                      </StyledLink>
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: this.state.sortingProperty === "startDate" && "bold"
                      }}
                    >
                      {dateFormat(tour.startDate, "dddd, mmmm dS, yyyy")}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: this.state.sortingProperty === "finishDate" && "bold"
                      }}
                    >
                      {dateFormat(tour.endDate, "dddd, mmmm dS, yyyy")}
                    </TableCell>
                    <TableCell
                      style={{
                        fontWeight: this.state.sortingProperty === "status" && "bold"
                      }}
                    >
                      {tour.status}
                    </TableCell>
                    <TableCell>
                      <IconButton className={classes.button}>
                        <CreateIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton className={classes.button}>
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </TableCell>
                  </StyledTableRow>
                ))}
              </TableBody>
            </Table>
          </div>
          {this.state.open && (
            <TournamentAddForm
              handleClose={this.handleClose}
              open={this.state.open}
            />
          )}
        </Container>
      </React.Fragment>
    ) : (
      <React.Fragment>
        <Container
          maxWidth="md"
          className={classes.container}
        >
          <Button
            color="primary"
            startIcon={
              <AddCircleOutlineIcon
                color="primary"
              />
            }
            onClick={this.handleOpen}
          >
            Add new tournament
          </Button>
          <Typography
            variant="subheading"
            className={classes.message}
          >
            There are no tournaments yet
          </Typography>
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
