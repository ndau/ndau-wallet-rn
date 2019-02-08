import NotificationService from './NotificationService'

const performAction = () => {
  const notification = new NotificationService()
  notification.localNotification(
    'Blockchain Update',
    'You have new data from the blockchain'
  )
}

export default {
  performAction
}
