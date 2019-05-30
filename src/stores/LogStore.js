import AppConfig from '../AppConfig'
import moment from 'moment'
import { PermissionsAndroid, Platform } from 'react-native'
import CircularArray from '../helpers/CircularArray'
import rnfs from 'react-native-fs'

class LogStore {
  constructor () {
    if (!LogStore.instance) {
      this._logData = new CircularArray(AppConfig.MAX_LOG_ENTRIES)
      LogStore.instance = this
    }

    return LogStore.instance
  }

  log (logData) {
    logData = this._scrubData(logData)

    if (__DEV__) console.log(logData)

    this._logData.write({
      timestamp: moment(),
      message: logData
    })
  }

  /**
   * Using the log data, write a file and pass back the
   * path to be used by the caller
   */
  async writeLogFile () {
    let path = `${rnfs.ExternalStorageDirectoryPath}/ndau-wallet.json`

    if (Platform.OS === 'android') {
      try {
        let hasPermission = await PermissionsAndroid.check(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
        )
        if (!hasPermission) {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'Attach debug info',
              message: 'Allow ndau wallet to include debugging information',
              buttonNegative: 'Cancel',
              buttonPositive: 'OK'
            }
          )
          hasPermission = granted !== PermissionsAndroid.RESULTS.GRANTED
        }
        if (!hasPermission) {
          this.log('Issue attempting to grand external write access')
        }
      } catch (error) {
        this.log(error)
      }
    } else if (Platform.OS === 'ios') {
      path = `${rnfs.DocumentDirectoryPath}/ndau-wallet.json`
    }

    try {
      this.log('Attemping to write ndau-wallet.log...')
      await rnfs.writeFile(
        path,
        JSON.stringify(this._getLoggingData().filter(value => value !== null)),
        'utf8'
      )
    } catch (error) {
      this.log(error)
    }

    return path
  }

  async deleteLogFile (path) {
    try {
      this.log('Attemping to remove ndau-wallet.log...')
      await rnfs.unlink(path)
    } catch (error) {
      this.log(error)
    }
  }

  /**
   * This method is used ONLY for testing, which is why it is
   * marked as private
   */
  _getLoggingData () {
    return this._logData.read()
  }

  _scrubData = (...data) => {
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
    let scrubbedData = stringData.replace(/\b"npvt[^"]+"\b/g, '"a"')
    return scrubbedData
  }
}

const instance = new LogStore()
Object.freeze(instance)

export default instance
