import React, { Component } from "react";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import TableBody from "@material-ui/core/TableBody";
import InfiniteScroll from "react-infinite-scroller";

class DataTable extends Component {
  constructor(props) {
    super(props);

    // Emulation page load
    this.state = {
      allData: props.data,
      currentData: [],
      hasMore: true
    };
  }

  loadMore = page => {
    const { allData, currentData } = this.state;
    const start = (page - 1) * 20;
    const step = 20;
    const pageSlice = allData.slice(start, start + step);

    if (currentData.length >= allData.length) {
      this.setState({ hasMore: false });
    } else {
      this.setState({
        currentData: [...currentData, ...pageSlice]
      });
    }
  };

  render() {
    const { columns } = this.props;
    const { currentData, hasMore } = this.state;

    const infiniteScrollItems = [];

    currentData.map((row, i) => {
      infiniteScrollItems.push(
        <TableRow key={i}>
          {columns.map((column, k) => (
            <TableCell key={k}>
              {column.render ? column.render(row) : row[column.field]}
            </TableCell>
          ))}
        </TableRow>
      );
    });

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
          loadMore={this.loadMore}
          hasMore={hasMore}
          pageStart={0}
        >
          {infiniteScrollItems}
        </InfiniteScroll>
      </Table>
    );
  }
}

export default DataTable;
