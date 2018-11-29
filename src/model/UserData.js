import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper'
import AsyncStorageHelper from './AsyncStorageHelper'
import MultiSafeHelper from '../helpers/MultiSafeHelper'

const loadData = async user => {
  const walletKeys = Object.keys(user.wallets)
  for (const walletKey of walletKeys) {
    const wallet = user.wallets[walletKey]
    await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)
  }

  // after the data is loaded successfully then save the user
  const password = await AsyncStorageHelper.getApplicationPassword()
  await MultiSafeHelper.saveUser(user, password)
}

export default {
  loadData
}
