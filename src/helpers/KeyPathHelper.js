import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'
import LogStore from '../stores/LogStore'
import AppConfig from '../AppConfig'
import KeyMaster from '../helpers/KeyMaster'
import ValidationKeyMaster from '../helpers/ValidationKeyMaster'

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

export default {
  accountCreationKeyPath,
  validationKeyPath,
  getRootAccountValidationKeyPath,
  getAccountValidationKeyPath,
  legacyValidationKeyPath
}
