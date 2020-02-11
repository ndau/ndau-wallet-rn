/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import { PushNotificationIOS, Platform } from 'react-native'
import PushNotification from 'react-native-push-notification'
import LogStore from '../stores/LogStore'

export default class NotificationService {
  constructor (onRegister, onNotification) {
    this.configure()
  }

  configure () {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister: function (token) {},

      // (required) Called when a remote or local notification is opened or received
      onNotification: function (notification) {
        LogStore.log(`NOTIFICATION: ${notification}`)

        // process the notification

        // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
        notification.finish(PushNotificationIOS.FetchResult.NoData)
      },

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

  localNotification (title, message) {
    if (Platform.OS === 'android') {
      const test = PushNotification.getApplicationIconBadgeNumber(
        badgeCount => {
          if (badgeCount < 1) {
            PushNotification.localNotification({
              message,
              title,
              number: 1
            })
          }
        }
      )
    } else {
      PushNotificationIOS.getApplicationIconBadgeNumber(badgeCount => {
        if (badgeCount < 1) {
          PushNotificationIOS.presentLocalNotification({
            alertBody: message,
            alertTitle: title,
            applicationIconBadgeNumber: 1
          })
        }
      })
    }
  }

  scheduleNotification (title, message) {
    if (Platform.OS === 'android') {
      PushNotification.localNotificationSchedule({
        message,
        title,
        date: new Date(Date.now() + 60 * 1000),
        repeatType: 'minute',
        repeatTime: 60000,
        number: 0
      })
    } else {
      PushNotificationIOS.scheduleLocalNotification({
        alertBody: message,
        alertTitle: title,
        fireDate: new Date(Date.now() + 60 * 1000),
        repeatInterval: 'minute',
        applicationIconBadgeNumber: 0
      })
    }
  }

  setApplicationIconBadgeNumber (number) {
    if (Platform.OS === 'android') {
      PushNotification.setApplicationIconBadgeNumber(number)
    } else {
      PushNotificationIOS.setApplicationIconBadgeNumber(number)
    }
  }
}
