/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import PushNotificationIOS from '@react-native-community/push-notification-ios'
import PushNotification, { Importance } from 'react-native-push-notification';
import LogStore from '../stores/LogStore'

const CHANNEL_ID = 'default-channel-id'
const CHANNEL_NAME = 'Default channel'

export default class NotificationService {
  
  constructor() {
    this.lastChannelCounter = 0

    this.createDefaultChannels()

    this.configure()

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0)
      }
    })
    
    PushNotification.getChannels(function(channels) {
      LogStore.log(channels)
    })
  }
  
  configure () {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: this.onAction,

      // (required) Called when a remote or local notification is opened or received
      onNotification: this.onNotification,

      // (optional) Called when Action is pressed (Android)
      onAction: this.onAction,

      // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
      onRegistrationError: this.onRegistrationError,

      // ANDROID ONLY: GCM or FCM Sender ID (product_number) (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: 'XXXXXX',

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
       * (optional) default: true
       * - Specified if permissions (ios) and token (android and ios) will requested or not,
       * - if not, you must call PushNotificationsHandler.requestPermissions() later
       */
      requestPermissions: true
    })
  }

  createDefaultChannels() {
    PushNotification.createChannel(
      {
        channelId: CHANNEL_ID, // (required)
        channelName: CHANNEL_NAME, // (required)
        importance: Importance.HIGH // (optional) default: Importance.HIGH. Int value of the Android notification importance
      },
      (created) => LogStore.log(`createChannel ${CHANNEL_ID} returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => LogStore.log('InitialNotification:', notification));
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  localNotification (title, message) {
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: CHANNEL_ID, // (required) channelId, if the channel doesn't exist, notification will not trigger.
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"

      when: Date.now(), // (optional) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.

      /* iOS and Android properties */
      title: title, // (optional)
      message: message // (required)
    })
  }

  scheduleNotification(title, message, date) {
    PushNotification.localNotificationSchedule({
      date: date,
      repeatType: 'minute',
      channelId: CHANNEL_ID,
      title: title,
      message: message
    })
  }

  onNotification(notification) {
    LogStore.log(`NOTIFICATION: ${notification}`)

    // TODO process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  }

  onRegister(token) {
    LogStore.log('NotificationHandler:', token)

    if (typeof this._onRegister === 'function') {
      this._onRegister(token)
    }
  }

  onAction(notification) {
    LogStore.log('Notification action received:');
    LogStore.log(notification.action)
    LogStore.log(notification)

    PushNotification.invokeApp(notification)
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    LogStore.log(err)
  }
}
