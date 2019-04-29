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
      maxNumberToRender: 20000, // 0 or undefined == unlimited
      maxNumberToPersist: 1000 // 0 or undefined == unlimited
    })
    .then(() => {
      // When the deviceLog has been initialized we can clear it if we want to:
      // deviceLog.clear();
    })

  // The device-log contains a timer for measuring performance:
  // deviceLog.startTimer('start-up')
}

const scrubData = (...data) => {
  if (!data) return data
  let stringData = data.map((e)=>{
    const t = typeof e
    if (t === "string" || t === "number") {
      return e.toString()
    } else {
      return JSON.stringify(e)
    }
  }).join(',')

  // pull out ALL private keys
  try {
    scrubbedData = stringData.replace(/"npvt[^"]+"/g, '')
  } catch (error) {
    scrubbedData = stringData.replace(/"npvt[^"]+"/g, '')
  }

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
  const returnLoggingData = {}
  return new Promise(resolve => {
    const logEntries = logData || device
    console.log(`logEntries ${logEntries}`)
    for (const entry of logEntries) {
      returnLoggingData[entry.timeStamp] = entry.message
    }
    console.log(`HERE IS DATA: ${JSON.stringify(returnLoggingData)}`)
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
