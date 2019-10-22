import React, { Component } from "react";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography
} from "@material-ui/core";
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
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>#</TableCell>
            <TableCell style={{ width: "100%" }} />
            <TableCell numeric="true">
              {this.renderColumnButton({ property: "games", text: "Games" })}
            </TableCell>
            <TableCell numeric="true">
              {this.renderColumnButton({ property: "wins", text: "Wins" })}
            </TableCell>
            <TableCell numeric="true">
              {this.renderColumnButton({
                property: "defeats",
                text: "Defeats"
              })}
            </TableCell>
            <TableCell numeric="true">
              {this.renderColumnButton({
                property: "goalsScored",
                text: "Goals Scored"
              })}
            </TableCell>
            <TableCell numeric="true">
              {this.renderColumnButton({
                property: "goalsMissed",
                text: "Goals Missed"
              })}
            </TableCell>
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
                    <Typography style={{ marginLeft: 10 }}>
                      {item.team.name}
                    </Typography>
                  </div>
                </TableCell>
                <TableCell numeric="true">
                  {this.renderColumnValue({
                    property: "games",
                    text: item.games
                  })}
                </TableCell>
                <TableCell numeric="true">
                  {this.renderColumnValue({
                    property: "wins",
                    text: item.wins
                  })}
                </TableCell>
                <TableCell numeric="true">
                  {this.renderColumnValue({
                    property: "defeats",
                    text: item.defeats
                  })}
                </TableCell>
                <TableCell numeric="true">
                  {this.renderColumnValue({
                    property: "goalsScored",
                    text: item.goalsScored
                  })}
                </TableCell>
                <TableCell numeric="true">
                  {this.renderColumnValue({
                    property: "goalsMissed",
                    text: item.goalsMissed
                  })}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    );
  }
}

export default Standings;
