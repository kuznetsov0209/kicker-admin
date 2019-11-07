import React, { Component } from "react";

class DataTable extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { data, columns } = this.props;

    return (
      <>
        {columns.map(column => (
          <span>{column}</span>
        ))}
        <hr />
        {data.map((item, i) => {
          // TODO: Object.keys(item) by default
          return (
            <div key={i}>
              {columns.map(column => (
                <span>{item[column]}</span>
              ))}
            </div>
          );
        })}
      </>
    );
  }
}

export default DataTable;
