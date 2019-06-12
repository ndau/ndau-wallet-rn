import AccountAPI from '../api/AccountAPI'
import DateHelper from './DateHelper'
import DataFormatHelper from './DataFormatHelper'
import AppConstants from '../AppConstants'
import { SetValidationTransaction } from '../transactions/SetValidationTransaction'
import { DelegateTransaction } from '../transactions/DelegateTransaction'
import { Transaction } from '../transactions/Transaction'
import LogStore from '../stores/LogStore'
import NodeAddressHelper from './NodeAddressHelper'
import AppConfig from '../AppConfig'
import ValidationKeyMaster from '../helpers/ValidationKeyMaster'
import APIAddressHelper from './APIAddressHelper'
import moment from 'moment'

const populateWalletWithAddressData = async wallet => {
  _repairWalletObject(wallet)

  const addressDataFromAPI = await AccountAPI.getAddressData(
    Object.keys(wallet.accounts)
  )
  const eaiRateData = await AccountAPI.getEaiRate(addressDataFromAPI)
  const addressData = addressDataFromAPI || {}

  const eaiRateMap = new Map()
  eaiRateData.forEach(account => {
    eaiRateMap.set(account.address, account.eairate)
  })

  const addressNicknameMap = new Map()
  const addressDataKeys = Object.keys(addressData)
  const walletAccountKeys = Object.keys(wallet.accounts)
  // create a map to create the nickname fields appropriately
  // when iterating the address data we can check it to see
  // if a setValidation transaction must be done
  for (const accountKey of addressDataKeys) {
    // this is the addressData item that came from API
    const addressDataItem = addressData[accountKey]
    // this is the account that is already present
    const account = wallet.accounts[accountKey]
    if (account) {
      // If we have not added it to the account already, add it
      addressDataItem.nickname = account.addressData.nickname
      // same with walletId, not there in the account, add it
      addressDataItem.walletId = account.addressData.walletId
    }

    addressDataItem.eaiValueForDisplay = eaiRateMap.get(accountKey)
    addressNicknameMap.set(accountKey, addressDataItem.nickname)
    for (const walletAccountKey of walletAccountKeys) {
      const walletAccount = wallet.accounts[walletAccountKey]
      if (walletAccountKey === accountKey) {
        walletAccount.addressData = addressDataItem
        await addPrivateValidationKeyIfNotPresent(wallet, walletAccount)

        await sendSetValidationTransactionIfNeeded(wallet, walletAccount)

        await sendDelegateTransactionIfNeeded(wallet, walletAccount)

        break
      }
    }
  }

  // now iterate using the map to populate the rewardsTargetNickname
  // and incomingRewardsFromNickname
  let count = 1
  for (const walletAccountKey of walletAccountKeys) {
    const account = wallet.accounts[walletAccountKey]
    if (account.addressData.rewardsTarget) {
      account.addressData.rewardsTargetNickname = addressNicknameMap.get(
        account.addressData.rewardsTarget
      )
    }

    if (account.addressData.incomingRewardsFrom) {
      for (const incomingReward of account.addressData.incomingRewardsFrom) {
        account.addressData.incomingRewardsFromNickname =
          addressNicknameMap.get(incomingReward) + ' '
      }
    }

    _nicknameAccount(account)

    // Same explanation as nickname for walletId
    if (!account.addressData.walletId) {
      account.addressData.walletId = wallet.walletId
    }

    count++
  }

  return addressDataKeys.length > 0
}

const _nicknameAccount = account => {
  const accountNickname = `Account ${account.address.slice(
    account.address.length - 4,
    account.address.length
  )}`
  if (!account.addressData.nickname) {
    account.addressData.nickname = accountNickname
  }

  // replace the older string if present. This is done
  // every time because I don't see the harm. However,
  // if the last 4 of an address is all numerics and
  // first part is Account we will replace...but so be it.
  account.addressData.nickname = account.addressData.nickname.replace(
    /Account \d+\b/,
    accountNickname
  )
}

/**
 * This method will repair the wallet in terms of missing data
 *
 * @param {Wallet} wallet
 */
const _repairWalletObject = wallet => {
  // Add wallet name
  if (!wallet.walletName && wallet.walletId) {
    wallet.walletName = wallet.walletId
  }
}

const sendSetValidationTransactionIfNeeded = async (wallet, account) => {
  try {
    if (
      account.addressData.balance > 0 &&
      !account.addressData.validationKeys
    ) {
      LogStore.log(
        `Sending SetValidation transaction for ${account.addressData.nickname}`
      )
      Object.assign(SetValidationTransaction.prototype, Transaction)
      const setValidationTransaction = new SetValidationTransaction(
        wallet,
        account
      )
      await setValidationTransaction.createSignPrevalidateSubmit()
    }
  } catch (error) {
    if (account.addressData.balance) {
      LogStore.log(
        `Issue encountered performing SetValidation: ${JSON.stringify(error)}`
      )
    }
  }
}

const sendDelegateTransactionIfNeeded = async (wallet, account) => {
  try {
    if (
      !account.addressData.delegationNode &&
      (account.addressData.validationKeys &&
        account.addressData.validationKeys.length > 0)
    ) {
      LogStore.log(
        `Sending Delegate transaction for ${account.addressData.nickname}`
      )
      Object.assign(DelegateTransaction.prototype, Transaction)
      const delegateTransaction = new DelegateTransaction(
        wallet,
        account,
        NodeAddressHelper.getNodeAddress()
      )
      await delegateTransaction.createSignPrevalidateSubmit()
    }
  } catch (error) {
    LogStore.log(
      `Issue encountered perfroming Delegate: ${JSON.stringify(error)}`
    )
  }
}

const addPrivateValidationKeyIfNotPresent = async (wallet, account) => {
  if (
    account.addressData.validationKeys &&
    account.addressData.validationKeys.length === 2 &&
    account.addressData.validationScript ===
      AppConfig.GENESIS_USER_VALIDATION_SCRIPT
  ) {
    // Only create the key if we haven't already created it. If we have,
    // then the SetValidation did go through yet...so try it again
    if (
      !account.validationKeys ||
      (account.validationKeys && account.validationKeys.length === 0)
    ) {
      await ValidationKeyMaster.addValidationKey(wallet, account)
    }

    Object.assign(SetValidationTransaction.prototype, Transaction)
    const setValidationTransaction = new SetValidationTransaction(
      wallet,
      account,
      APIAddressHelper.RECOVERY
    )
    await setValidationTransaction.createSignPrevalidateSubmit()
  } else {
    await ValidationKeyMaster.recoveryValidationKey(
      wallet,
      account,
      account.addressData.validationKeys
    )
  }
}

const getEaiValueForDisplay = account => {
  return account && account.eaiValueForDisplay
    ? Math.round(
      (account.eaiValueForDisplay / AppConstants.RATE_DENOMINATOR) * 100
    )
    : 0
}

const receivingEAIFrom = account => {
  return account && account.incomingRewardsFromNickname
    ? account.incomingRewardsFromNickname
    : null
}

const sendingEAITo = account => {
  return account && account.rewardsTargetNickname
    ? account.rewardsTargetNickname
    : null
}

const accountNickname = account => {
  return account ? account.nickname : ''
}

const accountLockedUntil = (account, iso) => {
  if (!account) return null

  const unlocksOn = account.lock ? account.lock.unlocksOn : null
  if (unlocksOn) {
    if (iso) {
      // The blockchain returns us a ISO formatted date with
      // timezone information, so we can pass it along
      return account.lock.unlocksOn
    } else {
      return DateHelper.getDate(account.lock.unlocksOn)
    }
  }

  return null
}

const isAccountLocked = account => {
  if (!account) return null
  if (!account.lock) return false

  const lockedUntil = accountLockedUntil(account, true)

  return (
    account.lock &&
    (account.lock.unlocksOn === null ||
      moment(lockedUntil).isAfter(moment.utc().format()))
  )
}

const accountNoticePeriod = account => {
  if (!account) return null

  const noticePeriod = account.lock ? account.lock.noticePeriod : null
  if (noticePeriod) {
    const duration = DateHelper.parseDurationToMicroseconds(noticePeriod)
    return DateHelper.getDaysFromMicroseconds(duration)
  }

  return null
}

const remainingBalanceNdau = (account, amount, addCommas = true, precision) => {
  const napuAmount = DataFormatHelper.getNapuFromNdau(amount)
  const napuAccountBalance = account.balance

  if (napuAmount > napuAccountBalance) return '0'

  return DataFormatHelper.getNdauFromNapu(
    napuAccountBalance - napuAmount,
    precision,
    addCommas
  )
}

const accountNdauAmount = (account, addCommas = true, precision) => {
  return account && account.balance
    ? DataFormatHelper.getNdauFromNapu(account.balance, precision, addCommas)
    : 0
}

const weightedAverageAgeInDays = account => {
  return account ? DateHelper.getDaysFromISODate(account.weightedAverageAge) : 0
}

const spendableNapu = (addressData, addCommas = true, precision) => {
  const totalNdau = accountNdauAmount(addressData, addCommas, precision)
  let totalNapu = DataFormatHelper.getNapuFromNdau(totalNdau)
  const holds = addressData.holds

  if (!holds) return totalNapu

  for (const hold of holds) {
    totalNapu -= hold.qty
  }

  return totalNapu
}

const spendableNdau = (addressData, addCommas = true, precision) => {
  return DataFormatHelper.getNdauFromNapu(
    spendableNapu(addressData, addCommas, precision),
    precision
  )
}

const lockBonusEAI = weightedAverageAgeInDays => {
  if (!weightedAverageAgeInDays) return 0

  if (weightedAverageAgeInDays >= DateHelper.getDaysFromISODate('3y')) {
    return 5
  } else if (weightedAverageAgeInDays >= DateHelper.getDaysFromISODate('2y')) {
    return 4
  } else if (weightedAverageAgeInDays >= DateHelper.getDaysFromISODate('1y')) {
    return 3
  } else if (
    weightedAverageAgeInDays >= DateHelper.getDaysFromISODate('180d')
  ) {
    return 2
  } else if (weightedAverageAgeInDays >= DateHelper.getDaysFromISODate('90d')) {
    return 1
  }

  return 0
}

const accountTotalNapuAmount = accounts => {
  let totalNapu = 0
  Object.keys(accounts).forEach(accountKey => {
    if (
      accounts[accountKey].addressData &&
      accounts[accountKey].addressData.balance
    ) {
      totalNapu += accounts[accountKey].addressData.balance
    }
  })
  return totalNapu
}

const accountTotalNdauAmount = (accounts, withCommas = true) => {
  let totalNdau = 0

  if (!accounts) return totalNdau

  let totalNapu = accountTotalNapuAmount(accounts)

  return withCommas
    ? DataFormatHelper.getNdauFromNapu(
      totalNapu,
      AppConfig.NDAU_DETAIL_PRECISION,
      true
    )
    : DataFormatHelper.getNdauFromNapu(totalNapu)
}

const totalSpendableNdau = (accounts, totalNdau, withCommas = true) => {
  if (!accounts) return totalNdau

  let totalNapu = DataFormatHelper.getNapuFromNdau(totalNdau)

  Object.keys(accounts).forEach(accountKey => {
    if (isAccountLocked(accounts[accountKey].addressData)) {
      // subtract locked account value
      totalNapu -= accounts[accountKey].addressData.balance
    } else if (accounts[accountKey].addressData.holds) {
      // subtract holds if there are any and the account is unlocked
      const holds = accounts[accountKey].addressData.holds
      for (const hold of holds) {
        totalNapu -= hold.qty
      }
    }
  })

  return withCommas
    ? DataFormatHelper.getNdauFromNapu(
      totalNapu,
      AppConfig.NDAU_SUMMARY_PRECISION,
      true
    )
    : DataFormatHelper.getNdauFromNapu(totalNapu)
}

const getTotalNdauForSend = (
  amount,
  transactionFee,
  sibFee,
  addCommas = true
) => {
  const amountNapu = DataFormatHelper.getNapuFromNdau(amount)
  const transactionFeeNapu = DataFormatHelper.getNapuFromNdau(transactionFee)
  const sibFeeNapu = DataFormatHelper.getNapuFromNdau(sibFee)
  const totalNapu = amountNapu + transactionFeeNapu + sibFeeNapu
  return DataFormatHelper.getNdauFromNapu(
    totalNapu,
    AppConfig.NDAU_DETAIL_PRECISION,
    addCommas
  )
}

const currentPrice = (marketPrice, totalNdau) => {
  LogStore.log(`marketPrice is ${marketPrice} totalNdau is ${totalNdau}`)

  // why not use .toLocaleString you ask...here is why:
  // https://github.com/facebook/react-native/issues/15717
  const currentPrice = marketPrice
    ? '$' +
      DataFormatHelper.formatUSDollarValue(
        parseFloat(totalNdau * marketPrice),
        2
      )
    : '$0.00'
  LogStore.log(`currentPrice: ${currentPrice}`)

  return currentPrice
}

export default {
  populateWalletWithAddressData,
  accountLockedUntil,
  accountNdauAmount,
  accountTotalNdauAmount,
  currentPrice,
  accountNoticePeriod,
  accountNickname,
  receivingEAIFrom,
  sendingEAITo,
  eaiValueForDisplay: getEaiValueForDisplay,
  sendDelegateTransactionIfNeeded,
  addPrivateValidationKeyIfNotPresent,
  weightedAverageAgeInDays,
  lockBonusEAI,
  spendableNdau,
  spendableNapu,
  totalSpendableNdau,
  getTotalNdauForSend,
  remainingBalanceNdau,
  isAccountLocked,

  _nicknameAccount
}
