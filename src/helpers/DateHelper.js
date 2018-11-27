import moment from 'moment'
import AppConstants from '../AppConstants'

const DATE_FORMAT = 'MM/DD/YYYY'

const getTodaysDate = () => {
  return moment().format(DATE_FORMAT)
}

const getDateFromMilliseconds = date => {
  const walletDate = new Date(date)
  const millisecondsWallet = walletDate.getTime() / 1000
  const ndauEpoch = new Date(AppConstants.NDAU_EPOCH)
  const millisecondsNdau = ndauEpoch.getTime()
  const correctDate = new Date(millisecondsWallet + millisecondsNdau)
  return moment(correctDate).format(DATE_FORMAT)
}

const getDaysFromMicroseconds = microseconds => {
  return Math.round(moment.duration(microseconds * 0.001, 'ms').asDays())
}

export default {
  getTodaysDate,
  getDateFromMilliseconds,
  getDaysFromMicroseconds
}
