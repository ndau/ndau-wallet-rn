import { AsyncStorage } from 'react-native'
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
      maxNumberToRender: 2000, // 0 or undefined == unlimited
      maxNumberToPersist: 2000 // 0 or undefined == unlimited
    })
    .then(() => {
      // When the deviceLog has been initialized we can clear it if we want to:
      // deviceLog.clear();
    })

  // The device-log contains a timer for measuring performance:
  // deviceLog.startTimer('start-up')
}

const debug = (...args) => {
  deviceLog.debug(...args)
}

const error = (...args) => {
  deviceLog.error(...args)
}

export default {
  initialize,
  debug,
  error
}
