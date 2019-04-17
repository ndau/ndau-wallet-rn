import UserStore from '../stores/UserStore'
import MultiSafeHelper from '../helpers/MultiSafeHelper'
import KeyMaster from '../helpers/KeyMaster'

const createAccounts = async (wallet, numberOfAccounts = 1) => {
  const password = await UserStore.getPassword()
  const user = await MultiSafeHelper.getDefaultUser(password)
  const newWallet = await KeyMaster.createNewAccount(wallet, numberOfAccounts)

  KeyMaster.setWalletInUser(user, newWallet)

  await MultiSafeHelper.saveUser(user, password)

  return newWallet
}

export default {
  createAccounts
}
