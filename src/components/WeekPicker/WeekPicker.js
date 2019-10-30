import React, { PureComponent } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";

import { KeyboardDatePicker } from "@material-ui/pickers";
import { IconButton, withStyles } from "@material-ui/core";
import { ArrowBack, ArrowForward } from "@material-ui/icons";

import {
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  getNextWeek,
  getPrevWeek
} from "./dateFnsWrappers";

class CustomElements extends PureComponent {
  static propTypes = {
    classes: PropTypes.object.isRequired
  };

  state = {
    selectedDate: this.props.value
  };

  handleWeekChange = date => {
    const value = startOfWeek(date);
    this.setState({ selectedDate: value });
    this.props.onChange(value);
  };

  openPrevWeek = () => {
    const { selectedDate } = this.state;
    const date = getPrevWeek(selectedDate);
    this.setState({
      selectedDate: date
    });
    this.handleWeekChange(date);
  };

  openNextWeek = () => {
    const { selectedDate } = this.state;
    const date = getNextWeek(selectedDate);
    this.setState({
      selectedDate: date
    });
    this.handleWeekChange(date);
  };

  formatWeekSelectLabel = date => {
    return `${format(startOfWeek(date), "MMM d")} — ${format(
      endOfWeek(date),
      "MMM d"
    )}`;
  };

  renderWrappedWeekDay = (date, selectedDate, dayInCurrentMonth) => {
    const { classes } = this.props;

    const start = startOfWeek(selectedDate);
    const end = endOfWeek(selectedDate);

    const dayIsBetween = isWithinInterval(date, { start, end });
    const isFirstDay = isSameDay(date, start);
    const isLastDay = isSameDay(date, end);

    const wrapperClassName = classNames({
      [classes.highlight]: dayIsBetween,
      [classes.firstHighlight]: isFirstDay,
      [classes.endHighlight]: isLastDay
    });

    const dayClassName = classNames(classes.day, {
      [classes.nonCurrentMonthDay]: !dayInCurrentMonth,
      [classes.highlightNonCurrentMonthDay]: !dayInCurrentMonth && dayIsBetween
    });
    return (
      <div className={wrapperClassName}>
        <IconButton className={dayClassName}>
          <span> {format(date, "d")} </span>
        </IconButton>
      </div>
    );
  };

  render() {
    const { selectedDate } = this.state;
    const { classes } = this.props;

    return (
      <div className={classes.container}>
        <IconButton onClick={this.openPrevWeek}>
          <ArrowBack />
        </IconButton>
        <KeyboardDatePicker
          label="Choose week"
          value={selectedDate}
          onChange={this.handleWeekChange}
          renderDay={this.renderWrappedWeekDay}
          labelFunc={this.formatWeekSelectLabel}
          showTodayButton
          disableFuture
          todayLabel="current week"
        />
        <IconButton onClick={this.openNextWeek}>
          <ArrowForward />
        </IconButton>
      </div>
    );
  }
}

const styles = theme => ({
  container: {
    margin: "15px 0"
  },
  dayWrapper: {
    position: "relative"
  },
  day: {
    width: 36,
    height: 36,
    fontSize: theme.typography.caption.fontSize,
    margin: "0 2px",
    color: "inherit"
  },
  customDayHighlight: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: "2px",
    right: "2px",
    border: `1px solid ${theme.palette.secondary.main}`,
    borderRadius: "50%"
  },
  nonCurrentMonthDay: {
    color: theme.palette.text.disabled
  },
  highlightNonCurrentMonthDay: {
    color: "#676767"
  },
  highlight: {
    background: theme.palette.primary.main,
    color: theme.palette.common.white
  },
  firstHighlight: {
    extend: "highlight",
    borderTopLeftRadius: "50%",
    borderBottomLeftRadius: "50%"
  },
  endHighlight: {
    extend: "highlight",
    borderTopRightRadius: "50%",
    borderBottomRightRadius: "50%"
  }
});

export default withStyles(styles)(CustomElements);
