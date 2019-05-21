import AsyncStorage from '@react-native-community/async-storage'
import deviceLog from 'react-native-device-log'

const initialize = () => {
  // Call init and set a custom adapter that implements the interface of
  // AsyncStorage: getItem, removeItem, setItem.
  // By default the log uses a in-memory object, in this example we
  // explicitly set the log to use the persistent AsyncStorage instead:
  deviceLog
    .init(AsyncStorage, {
      logToConsole: __DEV__, // Send logs to console as well as device-log
      logRNErrors: true, // Will pick up RN-errors and send them to the device log
      maxNumberToRender: 0, // 0 or undefined == unlimited
      maxNumberToPersist: 500 // 0 or undefined == unlimited
    })
    .then(() => {
      // Clean the log upon initialization for
      deviceLog.clear()
    })

  // The device-log contains a timer for measuring performance:
  // deviceLog.startTimer('start-up')
}

const scrubData = (...data) => {
  if (!data) return data
  let stringData = data
    .map(e => {
      const t = typeof e
      if (t === 'string' || t === 'number') {
        return e.toString()
      } else {
        return JSON.stringify(e)
      }
    })
    .join(',')
  // pull out ALL private keys
  let scrubbedData = stringData.replace(/"npvt[^"]+"/g, '"a"')
  return scrubbedData
}

const debug = (...messages) => {
  return deviceLog.log(scrubData(...messages))
}

const error = (...messages) => {
  return deviceLog.error(scrubData(...messages))
}

const getLoggingData = async logData => {
  const device = await deviceLog.store.getRows()
  const returnLoggingData = []
  return new Promise(resolve => {
    const logEntries = logData || device
    for (const entry of logEntries) {
      returnLoggingData.push({ [entry.timeStamp]: entry.message })
    }
    resolve(returnLoggingData)
  })
}

export default {
  initialize,
  debug,
  error,
  scrubData,
  getLoggingData
}
