import AppConstants from '../AppConstants'

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
  return (
    '/' +
    AppConstants.HARDENED_CHILD_BIP_44 +
    "'" +
    '/' +
    AppConstants.NDAU_CONSTANT +
    "'" +
    '/' +
    AppConstants.VALIDATION_KEY
  )
}

export default {
  accountCreationKeyPath,
  validationKeyPath
}
