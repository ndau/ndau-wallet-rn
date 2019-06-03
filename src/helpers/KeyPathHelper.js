import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'
import LogStore from '../stores/LogStore'
import AppConfig from '../AppConfig'
import KeyMaster from '../helpers/KeyMaster'

const accountCreationKeyPath = () => {
  return (
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.ACCOUNT_CREATION_KEY_CHILD
  )
}

const validationKeyPath = () => {
  return accountCreationKeyPath() + '/' + AppConstants.VALIDATION_KEY
}

const legacyValidationKeyPath = () => {
  return (
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.LEGACY_VALIDATION_KEY
  )
}

const getRootAccountValidationKeyPath = (wallet, account) => {
  const accountPath = wallet.keys[account.ownershipKey].path
  const accountChildIndex = accountPath.substring(
    accountCreationKeyPath().length + 1,
    accountPath.length
  )

  return `${validationKeyPath()}/${accountChildIndex}`
}

const getAccountValidationKeyPath = (wallet, account, index) => {
  const rootAccountValidationPath = getRootAccountValidationKeyPath(
    wallet,
    account
  )
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(wallet, validationKeyPath())
  }
  return `${rootAccountValidationPath}/${index}`
}

/**
 * Given the validation keys passed in, iterate the wallet to recover
 * the private keys if not present. The search firsts looks in the
 * legacy validation location:
 *
 * /44'/20036'/100/x/44'/20036'/2000/y
 *
 * where x is the accounts index and y will be the validation key
 * index.
 *
 * We then search in the proper/current validation location:
 *
 * `/44'/20036'/100/10000/x/y
 *
 * where x is the accounts index and y will be the validation key index
 *
 * @param {Wallet} wallet
 * @param {Account} account
 * @param {Array} validationKeys
 * @returns {Key} key genereated
 */
const recoveryValidationKey = async (wallet, account, validationKeys) => {
  if (
    validationKeys &&
    account.validationKeys &&
    validationKeys.length !== account.validationKeys.length
  ) {
    LogStore.log(
      `Attempting to find the private key for the public validation key we have...`
    )
    for (const validationKey of validationKeys) {
      let startIndex = AppConfig.VALIDATION_KEY_SEARCH_START_INDEX
      let endIndex = AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
      let found = false
      // Use a counter to prevent infinite search
      let counter = 0

      do {
        let validationKeys = await KeyMaster.getValidationKeys(
          wallet,
          account,
          startIndex,
          endIndex
        )
        found = _checkValidationKeys(
          wallet,
          account,
          validationKeys,
          validationKey,
          found
        )

        // NOW check the legacy keys
        validationKeys = await KeyMaster.getValidationKeys(
          wallet,
          account,
          startIndex,
          endIndex,
          true
        )
        found = _checkValidationKeys(
          wallet,
          account,
          validationKeys,
          validationKey,
          found
        )

        startIndex += AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY
        endIndex += AppConfig.NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY

        counter++
      } while (
        !found &&
        // go until we hit the configured max
        counter < AppConfig.VALIDATION_KEY_SEARCH_ITERATION_MAX
      )
    }
  }
}

const _checkValidationKeys = (
  wallet,
  account,
  validationKeys,
  validationKey,
  found
) => {
  const validationPublicKeys = Object.keys(validationKeys)
  for (const validationPublicKey of validationPublicKeys) {
    if (validationKey === validationPublicKey) {
      LogStore.log(
        'Found a match, adding validation keys to the wallet'
      )
      KeyMaster.addThisValidationKey(
        account,
        wallet,
        validationKeys[validationPublicKey].privateKey,
        validationPublicKey,
        validationKeys[validationPublicKey].path
      )
      found = true
      break
    }
  }
  return found
}

export default {
  accountCreationKeyPath,
  validationKeyPath,
  getRootAccountValidationKeyPath,
  getAccountValidationKeyPath,
  legacyValidationKeyPath,
  recoveryValidationKey
}
