const HARDENED_CHILD_BIP_44 = 44
const ACCOUNT_CREATION_KEY_CHILD = 100
const VALIDATION_KEY = 2000
const NDAU_CONSTANT = 20036 // which is 0x4e44 in hex, which are the two letters ND in ASCII
const DERIVED_ROOT_YES = 'yes'
const DERIVED_ROOT_NO = 'no'
const DERIVED_ROOT_UNKNOWN = 'unknown'
const TESTNET_ADDRESS = 'tn'
const MAINNET_ADDRESS = 'nd'
const APP_LANGUAGE = 'en'

const NORMAL_MODE = 'normal'
const PASSWORD_RESET_MODE = 'password-reset'
const GENESIS_MODE = 'genesis'
const NEW_PASSWORD_MODE = 'new-password'

const TEMP_ID = 'temp-id'

const NDAU_EPOCH = '2000-01-01T00:00:00Z'
const QUANTA_PER_UNIT = 100000000
const RATE_DENOMINATOR = QUANTA_PER_UNIT * 10000

const KYC_ACCEPTED = 'ACCEPT'
const KYC_MANUAL_REVIEW = 'MANUAL_REVIEW'
const KYC_DENY = 'DENY'

const TOS_SETUP = 'termsOfServiceSetup'
const TOS_BUY = 'termsOfServiceBuyMode'

const NUMBER_PICKER_COLOR = '#A9A9A9'
const TEXT_COLOR = '#FFFFFF'
const SQUARE_BUTTON_COLOR = '#4e957a'
const PROGRESS_BAR_COLOR = '#4e957a'
const ICON_BUTTON_COLOR = '#4B9176'

const TRANSACTION_TYPES = {
  1: 'Transfer',
  2: 'ChangeValidation',
  3: 'ReleaseFromEndowment',
  4: 'ChangeSettlementPeriod',
  5: 'Delegate',
  6: 'CreditEAI',
  7: 'Lock',
  8: 'Notify',
  9: 'SetRewardsDestination',
  10: 'ClaimAccount',
  11: 'Stake',
  12: 'RegisterNode',
  13: 'NominateNodeReward',
  14: 'ClaimNodeReward',
  15: 'TransferAndLock',
  16: 'CommandValidatorChange',
  17: 'SidechainTx',
  18: 'UnregisterNode',
  19: 'Unstake',
  20: 'Issue'
}

export default {
  HARDENED_CHILD_BIP_44,
  ACCOUNT_CREATION_KEY_CHILD,
  VALIDATION_KEY,
  NDAU_CONSTANT,
  DERIVED_ROOT_NO,
  DERIVED_ROOT_UNKNOWN,
  DERIVED_ROOT_YES,
  TESTNET_ADDRESS,
  MAINNET_ADDRESS,
  APP_LANGUAGE,
  NORMAL_MODE,
  PASSWORD_RESET_MODE,
  GENESIS_MODE,
  NEW_PASSWORD_MODE,
  TEMP_ID,
  NDAU_EPOCH,
  QUANTA_PER_UNIT,
  RATE_DENOMINATOR,
  KYC_ACCEPTED,
  KYC_MANUAL_REVIEW,
  KYC_DENY,
  TOS_BUY,
  TOS_SETUP,
  NUMBER_PICKER_COLOR,
  TEXT_COLOR,
  SQUARE_BUTTON_COLOR,
  PROGRESS_BAR_COLOR,
  ICON_BUTTON_COLOR,
  TRANSACTION_TYPES
}
