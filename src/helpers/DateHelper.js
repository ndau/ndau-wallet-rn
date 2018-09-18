import moment from 'moment';

const DATE_FORMAT = 'MM/DD/YYYY';

const getTodaysDate = () => {
  return moment().format(DATE_FORMAT);
};

const getDateFromMilliseconds = (date) => {
  return moment().millisecond(date).format(DATE_FORMAT);
};

const getDaysFromMicroseconds = (microseconds) => {
  return Math.round(moment.duration(microseconds * 0.001, 'ms').asDays());
};

export default {
  getTodaysDate,
  getDateFromMilliseconds,
  getDaysFromMicroseconds
};
