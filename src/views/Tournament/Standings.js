import React, { Component } from "react";
import {
  Button,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import { observer } from "mobx-react";
import { observable } from "mobx";
import UserAvatar from "../../components/UserAvatar";

@observer
class Standings extends Component {
  @observable sortingProperty = "wins";

  renderColumnButton({ property, text }) {
    return (
      <Button
        color={this.sortingProperty === property ? "primary" : "default"}
        onClick={() => (this.sortingProperty = property)}
      >
        {text}
      </Button>
    );
  }

  renderColumnValue({ property, text }) {
    return (
      <Typography
        style={{
          fontSize: this.sortingProperty === property && 18
        }}
      >
        {text}
      </Typography>
    );
  }

  render() {
    const { tournament } = this.props;

    return (
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>#</TableCell>
              <TableCell />
              <TableCell style={{ width: "300px" }}>TeamName</TableCell>
              <TableCell align="center">
                {this.renderColumnButton({ property: "games", text: "Games" })}
              </TableCell>
              <TableCell align="center">
                {this.renderColumnButton({ property: "wins", text: "Wins" })}
              </TableCell>
              <TableCell align="center">
                {this.renderColumnButton({
                  property: "defeats",
                  text: "Defeats"
                })}
              </TableCell>
              <TableCell align="center">
                {this.renderColumnButton({
                  property: "goalsScored",
                  text: "Goals Scored"
                })}
              </TableCell>
              <TableCell align="center">
                {this.renderColumnButton({
                  property: "goalsMissed",
                  text: "Goals Missed"
                })}
              </TableCell>
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {tournament.stats
              .sort((a, b) => b[this.sortingProperty] - a[this.sortingProperty])
              .map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <UserAvatar size={40} user={item.team.player1} />
                      <UserAvatar size={40} user={item.team.player2} />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center"
                      }}
                    >
                      <Typography style={{ fontWeight: 600 }}>
                        {item.team.name}
                      </Typography>
                    </div>
                  </TableCell>
                  <TableCell align="center">
                    {this.renderColumnValue({
                      property: "games",
                      text: item.games
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {this.renderColumnValue({
                      property: "wins",
                      text: item.wins
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {this.renderColumnValue({
                      property: "defeats",
                      text: item.defeats
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {this.renderColumnValue({
                      property: "goalsScored",
                      text: item.goalsScored
                    })}
                  </TableCell>
                  <TableCell align="center">
                    {this.renderColumnValue({
                      property: "goalsMissed",
                      text: item.goalsMissed
                    })}
                  </TableCell>
                  <TableCell>
                    <IconButton aria-label="delete" color="secondary">
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </Paper>
    );
  }
}

export default Standings;
