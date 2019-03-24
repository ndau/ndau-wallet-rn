import BackgroundFetch from 'react-native-background-fetch'
import NotificationService from './NotificationService'
import AccountAPI from '../api/AccountAPI'
import FlashNotification from '../components/common/FlashNotification'
import AppConfig from '../AppConfig'

const notificationService = new NotificationService()

const initialize = () => {
  BackgroundFetch.configure(
    {
      minimumFetchInterval: AppConfig.BACKGROUND_TASK_INTERVAL, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false, // <-- Android-only,
      startOnBoot: true // <-- Android-only
    },
    async () => {
      try {
        if (await AccountAPI.isAddressDataNew()) {
          notificationService.localNotification(
            'Blockchain Update',
            'You have new data on the blockchain'
          )
        }
      } catch (error) {
        FlashNotification.showError(
          'Issue encountered querying the blockchain in the background'
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
        FlashNotification.showError('BackgroundFetch is restricted')
        break
      case BackgroundFetch.STATUS_DENIED:
        FlashNotification.showError(
          'BackgroundFetch is denied. Settings should be enabled to use BackgroundFetch within native code.'
        )
        break
    }
  })
}

export default {
  initialize
}
