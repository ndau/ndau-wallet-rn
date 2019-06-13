import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'

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
  return accountCreationKeyPath() + '/' + AppConstants.VALIDATION_KEY + "'"
}

const legacyValidationKeyPath2 = () => {
  return accountCreationKeyPath() + '/' + AppConstants.VALIDATION_KEY
}

const legacyValidationKeyPath1 = () => {
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

  return `${validationKeyPath()}/${accountChildIndex}'`
}

const getLegacy2RootAccountValidationKeyPath = (wallet, account) => {
  const accountPath = wallet.keys[account.ownershipKey].path
  const accountChildIndex = accountPath.substring(
    accountCreationKeyPath().length + 1,
    accountPath.length
  )

  return `${legacyValidationKeyPath2()}/${accountChildIndex}`
}

const getLegacy2AccountValidationKeyPath = (wallet, account, index) => {
  const rootAccountValidationPath = getLegacy2RootAccountValidationKeyPath(
    wallet,
    account
  )
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(wallet, validationKeyPath())
  }
  return `${rootAccountValidationPath}/${index}`
}

const getAccountValidationKeyPath = (wallet, account, index) => {
  const rootAccountValidationPath = getRootAccountValidationKeyPath(
    wallet,
    account
  )
  if (!index) {
    index = DataFormatHelper.getNextPathIndex(wallet, rootAccountValidationPath)
  }
  return `${rootAccountValidationPath}/${index}`
}

export default {
  accountCreationKeyPath,
  validationKeyPath,
  getLegacy2RootAccountValidationKeyPath,
  getLegacy2AccountValidationKeyPath,
  legacyValidationKeyPath1,
  legacyValidationKeyPath2,
  getAccountValidationKeyPath,
  getRootAccountValidationKeyPath
}
