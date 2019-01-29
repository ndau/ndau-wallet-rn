import moment from 'moment'
import AppConstants from '../AppConstants'

const DATE_FORMAT = 'MM/DD/YYYY'

const getTodaysDate = () => {
  return moment().format(DATE_FORMAT)
}

const getMicrosecondsSinceNdauEpoch = () => {
  return moment().diff(AppConstants.NDAU_EPOCH, 'milliseconds') * 1000
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

// useful constants for the parseDuration function
// they're not exported.
const sec = 1000000
const day = 24 * 60 * 60 * sec
// The pat elements are used to build up a pattern string that can parse the duration
// constants. We can't use momentjs because we have fixed definitions of
// month (30 days) and year (365 days) and moment wants them to be flexible
// values based on when you ask the question. So we parse strings that look like
// ISO-8601 strings but give them a fixed interpretation.
// 1m is 1 month, t1m is 1 minute. 1y2m3dt4h5m6s7us covers everything
// see the test file for more examples.
const durations = {
  yr: { pat: '((?<yr>[0-9]+)y)?', dur: 365 * day },
  mon: { pat: '((?<mon>[0-9]+)m)?', dur: 30 * day },
  day: { pat: '((?<day>[0-9]+)d)?', dur: day },
  hr: { pat: '((?<hr>[0-9]+)h)?', dur: 60 * 60 * sec },
  min: { pat: '((?<min>[0-9]+)m)?', dur: 60 * sec },
  sec: { pat: '((?<sec>[0-9]+)s)?', dur: sec },
  usec: { pat: '((?<usec>[0-9]+)us?)?', dur: 1 }
}
// match elements that look like a number followed by some letters
const pat = new RegExp(
  'p?' +
    durations.yr.pat +
    durations.mon.pat +
    durations.day.pat +
    '(t' +
    durations.hr.pat +
    durations.min.pat +
    durations.sec.pat +
    durations.usec.pat +
    ')?'
)

// parses a duration string like 3dt4h and returns a duration in number
// of microseconds.
const parseDurationToMicroseconds = dur => {
  var match = pat.exec(dur.toLowerCase())
  if (!match) {
    return 0
  }
  var t = 0
  for (var k in match.groups) {
    if (match.groups[k]) {
      t = t + parseInt(match.groups[k]) * durations[k].dur
    }
  }
  return t
}

export default {
  getTodaysDate,
  getDateFromMilliseconds,
  getDaysFromMicroseconds,
  getMicrosecondsSinceNdauEpoch,
  parseDurationToMicroseconds
}
