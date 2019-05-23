import AppConfig from '../AppConfig'
import moment from 'moment'

class LogStore {
  constructor () {
    if (!LogStore.instance) {
      this._logData = []
      LogStore.instance = this
    }

    return LogStore.instance
  }

  log (logData) {
    if (__DEV__) console.log(logData)

    if (this._logData.length === AppConfig.MAX_LOG_ENTRIES) {
      this._logData.pop()
    }

    this._logData.unshift({
      timestamp: moment(),
      message: logData
    })
  }

  getLoggingData () {
    const jsonToReturn = {}
    this._logData.forEach((entry, index) => {
      jsonToReturn[index + '-' + entry.timestamp] = entry.message
    })
    return jsonToReturn
  }
}

const instance = new LogStore()
Object.freeze(instance)

export default instance
