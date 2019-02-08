import BackgroundJob from 'react-native-background-job'
import { Platform } from 'react-native'
import AppConfig from '../AppConfig'
import QueryBlockchain from './QueryBlockchain'

const initialize = () => {
  // We run this for both Android and iOS as Android has the
  // added benefit to have notifications show up while you are
  // in the app. However, when te app is down
  setInterval(() => {
    QueryBlockchain.performAction()
  }, AppConfig.BACKGROUND_TASK_INTERVAL)

  // So Android oddly enough does not allow the app to run in the
  // background as iOS does. So we must use a BackgroundJob object
  // which runs a headless job in Android.
  if (Platform.OS === 'android') {
    const backgroundJob = {
      jobKey: 'androidBackgroundJob',
      job: () => {
        QueryBlockchain.performAction()
      }
    }

    BackgroundJob.register(backgroundJob)

    const backgroundSchedule = {
      jobKey: 'androidBackgroundJob',
      period: AppConfig.BACKGROUND_TASK_INTERVAL
    }

    BackgroundJob.schedule(backgroundSchedule)
  }
}

export default {
  initialize
}
