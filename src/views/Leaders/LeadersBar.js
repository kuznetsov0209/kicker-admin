import React from "react";
import PropTypes from "prop-types";
import { withStyles, Tabs, Tab, Typography } from "@material-ui/core";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class LeadersTabs extends React.Component {
  state = {
    value: this.props.value
  };

  handleChange = (event, value) => {
    this.setState({ value });
    this.props.onChange(value);
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div>
        <Tabs
          value={value}
          onChange={this.handleChange}
          centered
          classes={{
            flexContainer: classes.flexContainer
          }}
        >
          <Tab label="Of The Week" />
          <Tab label="Of All Time" />
        </Tabs>
      </div>
    );
  }
}

LeadersTabs.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LeadersTabs);
