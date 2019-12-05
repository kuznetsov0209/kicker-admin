import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import InfiniteScroll from "react-infinite-scroller";

class DataTable extends Component {
  render() {
    const { data, columns, loadMore, hasMore } = this.props;

    return (
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((column, i) => (
              <TableCell key={i}>{column.title}</TableCell>
            ))}
          </TableRow>
        </TableHead>

        <InfiniteScroll
          element={TableBody}
          loadMore={loadMore}
          initialLoad={false}
          hasMore={hasMore}
          pageStart={0}
        >
          {data.map((row, i) => (
            <TableRow key={i}>
              {columns.map((column, k) => (
                <TableCell key={k}>
                  {column.render ? column.render(row) : row[column.field]}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </InfiniteScroll>
      </Table>
    );
  }
}

export default DataTable;
