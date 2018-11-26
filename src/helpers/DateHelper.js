import moment from 'moment'
import AppConstants from '../AppConstants'

const DATE_FORMAT = 'MM/DD/YYYY'

const getTodaysDate = () => {
  return moment().format(DATE_FORMAT)
}

const getDateFromMilliseconds = date => {
  return moment()
    .millisecond(date / 1000)
    .subtract(AppConstants.NDAU_YEARS_ADDED_TO_EPOCH, 'y')
    .format(DATE_FORMAT)
}

const getDaysFromMicroseconds = microseconds => {
  return Math.round(moment.duration(microseconds * 0.001, 'ms').asDays())
}

export default {
  getTodaysDate,
  getDateFromMilliseconds,
  getDaysFromMicroseconds
}
