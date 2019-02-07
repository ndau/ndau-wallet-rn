import React from 'react'
import { YellowBox, View, NetInfo, PushNotificationIOS } from 'react-native'
import AppNavigation from './navigation/AppNavigation'
import FlashMessage from 'react-native-flash-message'
import OfflineMessage from './components/OfflineMessage'
import PushNotification from 'react-native-push-notification'
import BackgroundTask from 'react-native-background-task'
import queueFactory from 'react-native-queue'
import NotificationService from './services/NotificationService'

BackgroundTask.define(async () => {
  // Init queue
  queue = await queueFactory()

  // Register job worker
  queue.addWorker('check-blockchain', async (id, payload) => {
    console.log(`check-blockchain id ${id} has been added`)
    const notification = new NotificationService()
    notification.localNotif()
  })

  // Start the queue with a lifespan
  // IMPORTANT: OS background tasks are limited to 30 seconds or less.
  // NOTE: Queue lifespan logic will attempt to stop queue processing 500ms less than passed lifespan for a healthy shutdown buffer.
  // IMPORTANT: Queue processing started with a lifespan will ONLY process jobs that have a defined timeout set.
  // Additionally, lifespan processing will only process next job if job.timeout < (remainingLifespan - 500).
  await queue.start(25000) // Run queue for at most 25 seconds.

  // finish() must be called before OS hits timeout.
  BackgroundTask.finish()
})

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   onRegister: function (token) {
//     console.log('TOKEN:', token)
//   },

//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification)

//     // process the notification

//     // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
//     notification.finish(PushNotificationIOS.FetchResult.NoData)
//   },

//   // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
//   senderID: 'YOUR GCM (OR FCM) SENDER ID',

//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true
//   },

//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,

//   /**
//    * (optional) default: true
//    * - Specified if permissions (ios) and token (android and ios) will requested or not,
//    * - if not, you must call PushNotificationsHandler.requestPermissions() later
//    */
//   requestPermissions: true
// })

YellowBox.ignoreWarnings([
  'Warning: isMounted(...) is deprecated',
  'Module RCTImageLoader'
])
YellowBox.ignoreWarnings(['Class RCTCxxModule'])

export default class App extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      queue: null
    }

    queueFactory().then(queue => {
      this.setState({ queue })
    })
  }

  componentDidMount () {
    BackgroundTask.schedule() // Schedule the task to run every ~15 min if app is closed.
  }

  render () {
    setInterval(() => {
      console.log('Creating jobs...')
      const notification = new NotificationService()
      notification.localNotif()
      this.state.queue.createJob(
        'check-blockchain',
        { itest: 'test' }, // Supply the image url we want prefetched in this job to the payload.
        { attempts: 5, timeout: 15000 }, // Retry job on failure up to 5 times. Timeout job in 15 sec (prefetch is probably hanging if it takes that long).
        false // Must pass false as the last param so the queue starts up in the background task instead of immediately.
      )
    }, 5000)

    return (
      <View style={{ flex: 1 }}>
        <AppNavigation />
        <FlashMessage position='top' />
        <OfflineMessage />
      </View>
    )
  }
}
