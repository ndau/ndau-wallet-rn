import NotificationService from './NotificationService'
import AccountAPI from '../api/AccountAPI'

const performAction = () => {
  const notification = new NotificationService()
  if (AccountAPI.isAddressDataNew()) {
    notification.localNotification(
      'Blockchain Update',
      'You have new data from the blockchain'
    )
  }
}

export default {
  performAction
}
