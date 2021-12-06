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

export default class NotificationService {
  constructor(onRegister, onNotification) {
    this.lastId = 0;
    this.lastChannelCounter = 0;

    this.createDefaultChannels();

    this.configure();

    // Clear badge number at start
    PushNotification.getApplicationIconBadgeNumber(function (number) {
      if (number > 0) {
        PushNotification.setApplicationIconBadgeNumber(0);
      }
    });
    
    PushNotification.getChannels(function(channels) {
      LogStore.log(channels);
    });
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
        channelId: "default-channel-id", // (required)
        channelName: `Default channel`, // (required)
        channelDescription: "A default channel", // (optional) default: undefined.
        soundName: "default", // (optional) See `soundName` parameter of `localNotification` function
        importance: Importance.HIGH, // (optional) default: Importance.HIGH. Int value of the Android notification importance
        vibrate: true, // (optional) default: true. Creates the default vibration pattern if true.
      },
      (created) => LogStore.log(`createChannel 'default-channel-id' returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
    );
  }

  popInitialNotification() {
    PushNotification.popInitialNotification((notification) => LogStore.log('InitialNotication:', notification));
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }

  localNotification (title, message) {
    this.lastId++;
    PushNotification.localNotification({
      /* Android Only Properties */
      channelId: 'default-channel-id', // (required) channelId, if the channel doesn't exist, notification will not trigger.
      ticker: 'My Notification Ticker', // (optional)
      autoCancel: true, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: "ic_launcher"
      smallIcon: 'ic_notification', // (optional) default: "ic_notification" with fallback for "ic_launcher"
      bigText: 'My big text that will be shown when notification is expanded', // (optional) default: "message" prop
      subText: 'This is a subText', // (optional) default: none
      color: 'red', // (optional) default: system default
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      tag: 'some_tag', // (optional) add tag to message
      group: 'group', // (optional) add group to message
      groupSummary: false, // (optional) set this notification to be the group summary for a group of notifications, default: false
      ongoing: false, // (optional) set whether this is an "ongoing" notification
      actions: ['Yes', 'No'], // (Android only) See the doc for notification actions to know more
      invokeApp: true, // (optional) This enable click on actions to bring back the application to foreground or stay in background, default: true

      when: null, // (optionnal) Add a timestamp pertaining to the notification (usually the time the event occurred). For apps targeting Build.VERSION_CODES.N and above, this time is not shown anymore by default and must be opted into by using `showWhen`, default: null.
      usesChronometer: false, // (optional) Show the `when` field as a stopwatch. Instead of presenting `when` as a timestamp, the notification will show an automatically updating display of the minutes and seconds since when. Useful when showing an elapsed time (like an ongoing phone call), default: false.
      timeoutAfter: null, // (optional) Specifies a duration in milliseconds after which this notification should be canceled, if it is not already canceled, default: null

      /* iOS only properties */
      category: '', // (optional) default: empty string
      subtitle: "My Notification Subtitle", // (optional) smaller title below notification title

      /* iOS and Android properties */
      id: this.lastId, // (optional) Valid unique 32 bit integer specified as string. default: Autogenerated Unique ID
      title: title, // (optional)
      message: message, // (required)
      userInfo: { screen: 'home' }, // (optional) default: {} (using null throws a JSON value '<null>' error)
      playSound: true, // (optional) default: true
      soundName: /*soundName ? soundName :*/ 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      // number: 10 // (optional) Valid 32 bit integer specified as string. default: none (Cannot be zero)
    });
  }

  scheduleNotification(title, message) {
    this.lastId++;
    PushNotification.localNotificationSchedule({
      date: new Date(Date.now() + 3 * 1000), // in 3 secs
      repeatType: 'minute',
      channelId: 'default-channel-id',
      title: title,
      message: message
    });
  }

  onNotification(notification) {
    LogStore.log(`NOTIFICATION: ${notification}`)

    // TODO process the notification

    // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
    notification.finish(PushNotificationIOS.FetchResult.NoData)
  }

  onRegister(token) {
    LogStore.log('NotificationHandler:', token);

    if (typeof this._onRegister === 'function') {
      this._onRegister(token);
    }
  }

  onAction(notification) {
    LogStore.log('Notification action received:');
    LogStore.log(notification.action);
    LogStore.log(notification);

    if(notification.action === 'Yes') {
      PushNotification.invokeApp(notification);
    }
  }

  // (optional) Called when the user fails to register for remote notifications. Typically occurs when APNS is having issues, or the device is a simulator. (iOS)
  onRegistrationError(err) {
    LogStore.log(err);
  }
}
