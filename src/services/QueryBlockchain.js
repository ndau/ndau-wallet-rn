/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import BackgroundFetch from 'react-native-background-fetch'
import { AppState } from 'react-native'
import NotificationService from './NotificationService'
import AccountAPI from '../api/AccountAPI'
import FlashNotification from '../components/common/FlashNotification'
import AppConfig from '../AppConfig'
import OfflineError from '../errors/OfflineError'
import SettingsStore from '../stores/SettingsStore'

const notificationService = new NotificationService()

const initialize = async () => {
  if (await notificationEnabled()) {
    start()
  } else {
    stop()
  }
}

const notificationEnabled = async () => {
  return await SettingsStore.getNotificationSettings()
}

const isAppActive = () => { 
  return AppState.currentState === 'active'
}

const checkAccountData = async (taskId) => {
  if (await notificationEnabled()) {
    const message = 'You have received ndau'
    try {
      if (await AccountAPI.isAddressDataNew()) {
        if (isAppActive()) {
          FlashNotification.showInformation(message)
        } else {
          notificationService.localNotification('Blockchain Update', message)
        }
      }
    } catch (error) {
      if (isAppActive()) {
        FlashNotification.showError(
          new OfflineError('Issue encountered querying the blockchain in the background')
        )
      }
    }
  }
  BackgroundFetch.finish(taskId)
}

const onTimeout = async (taskId) => {
  if (await notificationEnabled() && isAppActive()) {
    FlashNotification.showError(
      new OfflineError('Issue encountered starting QueryBlockchain background fetch')
    )
  }
  // This task has exceeded its allowed running-time.
  // You must stop what you're doing immediately finish(taskId)
  BackgroundFetch.finish(taskId)
}

const stop = () => {
  BackgroundFetch.stop()
}

const start = async () => {
  const status = await BackgroundFetch.configure(
    {
      minimumFetchInterval: AppConfig.BACKGROUND_TASK_INTERVAL, // <-- minutes (15 is minimum allowed)
      stopOnTerminate: false, // <-- Android-only,
      startOnBoot: true, // <-- Android-only
      requiredNetworkType: BackgroundFetch.NETWORK_TYPE_ANY,
      requiresCharging: false,
      requiresDeviceIdle: false,
      requiresBatteryNotLow: false,
      requiresStorageNotLow: false,
      enableHeadless: true
    },
    checkAccountData,
    onTimeout
  )

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
}

const registerTask = () => {
  BackgroundFetch.registerHeadlessTask(QueryBlockchainHeadlessTask)
}

const QueryBlockchainHeadlessTask = async (event) => {
  const taskId = event.taskId
  const isTimeout = event.timeout
  if (isTimeout) {
    onTimeout(taskId)
  } else {
    checkAccountData(taskId)
  }
}

export default {
  initialize,
  registerTask,
  start,
  stop
}
