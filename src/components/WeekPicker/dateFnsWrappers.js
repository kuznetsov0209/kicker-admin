import formatClean from "date-fns/format";
import isSameDayClean from "date-fns/isSameDay";
import startOfWeekClean from "date-fns/startOfWeek";
import endOfWeekClean from "date-fns/endOfWeek";
import isWithinIntervalClean from "date-fns/isWithinInterval";
import addWeeks from "date-fns/addWeeks";
import subWeeks from "date-fns/subWeeks";
import localeEn from "date-fns/locale/en-GB";

const FIRST_DAY_OF_WEEK_IS_MONDAY = 1;

const format = (date, formatStr) => {
  return formatClean(date, formatStr, {
    locale: localeEn
  });
};
const isSameDay = (dateLeft, dateRight) => {
  return isSameDayClean(dateLeft, dateRight);
};
const startOfWeek = date => {
  return startOfWeekClean(date, { weekStartsOn: FIRST_DAY_OF_WEEK_IS_MONDAY });
};
const endOfWeek = date => {
  return endOfWeekClean(date, { weekStartsOn: FIRST_DAY_OF_WEEK_IS_MONDAY });
};
const isWithinInterval = (date, interval) => {
  return isWithinIntervalClean(date, interval);
};
const getNextWeek = date => {
  return addWeeks(date, 1);
};
const getPrevWeek = date => {
  return subWeeks(date, 1);
};

export {
  format,
  isSameDay,
  startOfWeek,
  endOfWeek,
  isWithinInterval,
  getNextWeek,
  getPrevWeek
};
