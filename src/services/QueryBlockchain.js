import BackgroundFetch from 'react-native-background-fetch'
import NotificationService from './NotificationService'
import AccountAPI from '../api/AccountAPI'
import FlashNotification from '../components/FlashNotification'
import AppConfig from '../AppConfig'

const notificationService = new NotificationService()

const initialize = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: AppConfig.BACKGROUND_TASK_INTERVAL, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false, // <-- Android-only,
      startOnBoot: true // <-- Android-only
    },
    () => {
      if (AccountAPI.isAddressDataNew()) {
        notificationService.localNotification(
          'Blockchain Update',
          'You have new data on the blockchain'
        )
      }
      BackgroundFetch.finish(BackgroundFetch.FETCH_RESULT_NEW_DATA)
    },
    error => {
      FlashNotification.showError(
        'Issue encountered starting QueryBlockchain background fetch'
      )
    }
  )

  BackgroundFetch.status(status => {
    switch (status) {
      case BackgroundFetch.STATUS_RESTRICTED:
        FlashNotification.showError('BackgroundFetch restricted')
        break
      case BackgroundFetch.STATUS_DENIED:
        FlashNotification.showError('BackgroundFetch restricted')
        break
      case BackgroundFetch.STATUS_AVAILABLE:
        FlashNotification.showInformation('BackgroundFetch restricted')
        break
    }
  })
}

export default {
  initialize
}
