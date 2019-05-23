import { PermissionsAndroid, Platform } from 'react-native'
import LogStore from '../stores/LogStore'
import rnfs from 'react-native-fs'

const Mailer = require('NativeModules').RNMail

const sendSupportEmail = async (hardware, os, version) => {
  const data = LogStore.getLoggingData()
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
            title: 'Permissions Grant',
            message: 'Granting permissions to write to external storage',
            buttonNegative: 'Cancel',
            buttonPositive: 'OK'
          }
        )
        hasPermission = granted !== PermissionsAndroid.RESULTS.GRANTED
      }
      if (!hasPermission) {
        LogStore.log('Issue attempting to grand external write access')
      }
    } catch (error) {
      LogStore.log(error)
    }
  } else if (Platform.OS === 'ios') {
    path = `${rnfs.DocumentDirectoryPath}/ndau-wallet.json`
  }

  try {
    LogStore.log('Attemping to write ndau-wallet.log...')
    await rnfs.writeFile(path, JSON.stringify(data), 'utf8')
  } catch (error) {
    LogStore.log(error)
  }

  LogStore.log(`Sending email with ${path} as attachment...`)
  Mailer.mail(
    {
      subject: `Wallet App Support - ${version} - ${os} - ${hardware}`,
      recipients: ['support@oneiro.freshdesk.com'],
      body:
        'Describe the problem or issue you are having.<br><br><br><br>The attached data does NOT contain any private keys and contains NO secret information (e.g., your wallet password or recovery phrase). This data contains basic state information about your wallet and accounts, and is automatically included in your support email to help us debug any issues you might be having with your wallet app.',
      isHTML: true,
      attachment: {
        path,
        type: 'json'
      }
    },
    async error => {
      if (error) {
        LogStore.log(error)
      }

      // remove the file
      try {
        LogStore.log('Attemping to remove ndau-wallet.log...')
        await rnfs.unlink(path)
      } catch (error) {
        LogStore.log(error)
      }
    }
  )
}

export default {
  sendSupportEmail
}
