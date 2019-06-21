import { NativeModules } from 'react-native'
import KeyMaster from './KeyMaster'
import AccountAPI from '../api/AccountAPI'
import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'
import LogStore from '../stores/LogStore'
import AppConfig from '../AppConfig'

/**
 * First we check to see if there are a variable number of accounts existent
 * on the block chain using the root key. This is to support versions <= 1.6 of
 * the ndau wallet. The result of that call is stored in an array and we then
 * see if there are the same variable amount of accounts in the BIP44 address.
 * Once we have these if they both have nothing in them, we can assume the phrase
 * is incorrect. However, if either one of them do...we have a correct phrase and
 * we can then build a user from that information. The user build is passed back.
 *
 * @param  {string} recoveryPhraseString as a string of words, a sentence
 * @param  {string} user there is a possibility the user has already been created
 * @return {User} we either pass back null if nothing is found or a populated
 * user if we find information.
 */
const recoverUser = async (recoveryPhraseString, user) => {
  const recoveryPhraseBytes = await _getRecoveryStringAsBytes(
    recoveryPhraseString
  )

  // if we are recovering and there is no user we must use a
  // temp userId. It will be changed in the SetupWalletName screen
  let wallet
  let userId = AppConstants.TEMP_ID
  if (user) {
    wallet = await KeyMaster.createWallet(recoveryPhraseBytes, null, userId)
    user.wallets[DataFormatHelper.create8CharHash(userId)] = wallet
  } else {
    user = await KeyMaster.createFirstTimeUser(recoveryPhraseBytes, userId)
    wallet = user.wallets[Object.keys(user.wallets)[0]]
  }

  const bip44Accounts = await checkAddresses(recoveryPhraseBytes)
  LogStore.log(`BIP44 accounts found: ${JSON.stringify(bip44Accounts)}`)
  if (bip44Accounts && Object.keys(bip44Accounts).length > 0) {
    for (const accountPath in bip44Accounts) {
      await KeyMaster.createAccountFromPath(
        wallet,
        accountPath,
        bip44Accounts[accountPath]
      )
    }
    LogStore.log(
      `Recovered user containing BIP44 accounts: ${JSON.stringify(user)}`
    )
  }

  const rootAccounts = await checkAddresses(recoveryPhraseBytes, true)
  LogStore.log(`root accounts found: ${JSON.stringify(rootAccounts)}`)
  if (rootAccounts && Object.keys(rootAccounts).length > 0) {
    const rootPrivateKey = await NativeModules.KeyaddrManager.newKey(
      recoveryPhraseBytes
    )
    for (const accountPath in rootAccounts) {
      await KeyMaster.createAccountFromPath(
        wallet,
        accountPath,
        rootAccounts[accountPath],
        rootPrivateKey
      )
    }
    LogStore.log(
      `Recovered user containing root accounts now: ${JSON.stringify(user)}`
    )
  }

  return user
}

const _getRecoveryStringAsBytes = async recoveryPhraseString => {
  return await NativeModules.KeyaddrManager.keyaddrWordsToBytes(
    AppConstants.APP_LANGUAGE,
    recoveryPhraseString
  )
}

const checkAddresses = async (recoveryPhraseBytes, root) => {
  let accountData = {}
  let accountDataFromBlockchain = {}
  let addresses = []
  let startIndex = 1
  let endIndex = AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY

  do {
    accountDataFromBlockchain = {}
    if (root) {
      addresses = await KeyMaster.getRootAddresses(
        recoveryPhraseBytes,
        startIndex,
        endIndex
      )
      LogStore.log(
        `KeyMaster.getRootAddresses found: ${JSON.stringify(addresses)}`
      )
    } else {
      addresses = await KeyMaster.getBIP44Addresses(
        recoveryPhraseBytes,
        startIndex,
        endIndex
      )
      LogStore.log(
        `KeyMaster.getBIP44Addresses found: ${JSON.stringify(addresses)}`
      )
    }

    accountDataFromBlockchain = await AccountAPI.getAddressData(
      Object.keys(addresses)
    )

    const addressKeys = Object.keys(addresses)
    for (const address in accountDataFromBlockchain) {
      const foundElement = addressKeys.find(element => {
        return element === address
      })
      if (foundElement) {
        accountData[addresses[address]] = accountDataFromBlockchain[address]
      }
    }

    // now move ahead in the address indexs to get the next batch
    startIndex += AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
    endIndex += AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
  } while (Object.keys(accountDataFromBlockchain).length > 0)

  return accountData
}

export default {
  recoverUser,
  checkAddresses
}
