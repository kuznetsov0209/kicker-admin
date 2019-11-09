import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={i}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row, i) => {
            return (
              <TableRow key={i}>
                {columns.map((column, k) => (
                  <TableCell key={k}>
                    {column.render ? column.render(row) : row[column.field]}
                  </TableCell>
                ))}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}

export default DataTable;
