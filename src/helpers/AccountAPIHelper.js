import AccountAPI from '../api/AccountAPI'
import DateHelper from './DateHelper'
import DataFormatHelper from './DataFormatHelper'
import AppConstants from '../AppConstants'
import { ClaimTransaction } from '../transactions/ClaimTransaction'
import { DelegateTransaction } from '../transactions/DelegateTransaction'
import { Transaction } from '../transactions/Transaction'
import LoggingService from '../services/LoggingService'
import NodeAddressHelper from './NodeAddressHelper'
import KeyPathHelper from './KeyPathHelper'
import AppConfig from '../AppConfig'

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
  // if a claim transaction must be done
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
        await addPrivateValidationKeyIfNotPresent(
          wallet,
          walletAccount,
          addressDataItem
        )

        await sendClaimTransactionIfNeeded(
          wallet,
          walletAccount,
          addressDataItem
        )
        await sendDelegateTransactionIfNeeded(
          wallet,
          walletAccount,
          addressDataItem
        )

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

    // If we have a new account this will not be set yet, this will not every be reset
    // notice above if we find it in the account we use it.
    if (!account.addressData.nickname) {
      account.addressData.nickname = `Account ${count}`
    }
    // Same explanation as nickname for walletId
    if (!account.addressData.walletId) {
      account.addressData.walletId = wallet.walletId
    }

    count++
  }
}

/**
 * This method will repair the wallet in terms of missing data
 *
 * @param {Wallet} wallet
 */
const _repairWalletObject = wallet => {
  if (!wallet.walletName && wallet.walletId) {
    wallet.walletName = wallet.walletId
  }
}

const sendClaimTransactionIfNeeded = async (wallet, account, addressData) => {
  if (addressData.balance > 0 && !addressData.validationKeys) {
    LoggingService.debug(
      `Sending ClaimAccount transaction for ${addressData.nickname}`
    )
    Object.assign(ClaimTransaction.prototype, Transaction)
    const claimTransaction = new ClaimTransaction(wallet, account)
    await claimTransaction.createSignPrevalidateSubmit()
  }
}

const sendDelegateTransactionIfNeeded = async (
  wallet,
  account,
  addressData
) => {
  if (
    !addressData.delegationNode &&
    (addressData.validationKeys && addressData.validationKeys.length > 0)
  ) {
    LoggingService.debug(
      `Sending Delegate transaction for ${addressData.nickname}`
    )
    Object.assign(DelegateTransaction.prototype, Transaction)
    const delegateTransaction = new DelegateTransaction(
      wallet,
      account,
      NodeAddressHelper.getNodeAddress()
    )
    await delegateTransaction.createSignPrevalidateSubmit()
  }
}

const addPrivateValidationKeyIfNotPresent = async (
  wallet,
  account,
  addressData
) => {
  await KeyPathHelper.recoveryValidationKey(
    wallet,
    account,
    addressData.validationKeys
  )
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

const accountLockedUntil = account => {
  if (!account) return null

  const unlocksOn = account.lock ? account.lock.unlocksOn : null
  if (unlocksOn) {
    return DateHelper.getDate(account.lock.unlocksOn)
  }

  return null
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

const accountNotLocked = account => {
  return account && account.lock !== undefined ? !account.lock : false
}

const accountNdauAmount = (account, addCommas = true) => {
  return account && account.balance
    ? DataFormatHelper.getNdauFromNapu(
      account.balance,
      AppConfig.NDAU_SUMMARY_PRECISION,
      addCommas
    )
    : 0.0
}

const weightedAverageAgeInDays = account => {
  return account ? DateHelper.getDaysFromISODate(account.weightedAverageAge) : 0
}

const spendableNapu = addressData => {
  const totalNdau = accountNdauAmount(addressData)
  let totalNapu = DataFormatHelper.getNapuFromNdau(totalNdau)
  const settlements = addressData.settlements
  if (!settlements) return totalNapu

  for (const settlement of settlements) {
    totalNapu -= settlement.Qty
  }
  return DataFormatHelper.getNdauFromNapu(totalNapu)
}

const spendableNdau = addressData => {
  return DataFormatHelper.getNdauFromNapu(spendableNapu(addressData))
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

const accountTotalNdauAmount = (accounts, withCommas = true) => {
  let total = 0.0

  if (!accounts) return total

  let totalNapu = DataFormatHelper.getNapuFromNdau(total)

  Object.keys(accounts).forEach(accountKey => {
    if (
      accounts[accountKey].addressData &&
      accounts[accountKey].addressData.balance
    ) {
      totalNapu += accounts[accountKey].addressData.balance
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

const totalSpendableNdau = (accounts, totalNdau, withCommas = true) => {
  if (!accounts) return totalNdau

  let totalNapu = DataFormatHelper.getNapuFromNdau(totalNdau)

  Object.keys(accounts).forEach(accountKey => {
    if (accounts[accountKey].addressData.lock) {
      // subtract locked account value
      totalNapu -= accounts[accountKey].addressData.balance
    } else if (accounts[accountKey].addressData.settlements) {
      // subtract settlements if there are any and the account is unlocked
      const settlements = accounts[accountKey].addressData.settlements
      for (const settlement of settlements) {
        totalNapu -= settlement.Qty
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
  addressData,
  transactionFee,
  addCommas = true
) => {
  const amountNapu = DataFormatHelper.getNapuFromNdau(amount)
  const totalNapuForAccount = spendableNapu(addressData)
  const totalNapu = totalNapuForAccount - amountNapu - transactionFee
  return DataFormatHelper.getNdauFromNapu(
    totalNapu,
    AppConfig.NDAU_SUMMARY_PRECISION,
    addCommas
  )
}

const currentPrice = (marketPrice, totalNdau) => {
  LoggingService.debug(
    `marketPrice is ${marketPrice} totalNdau is ${totalNdau}`
  )

  // why not use .toLocaleString you ask...here is why:
  // https://github.com/facebook/react-native/issues/15717
  const currentPrice = marketPrice
    ? '$' +
      DataFormatHelper.formatUSDollarValue(
        parseFloat(totalNdau * marketPrice),
        2
      )
    : '$0.00'
  LoggingService.debug(`currentPrice: ${currentPrice}`)

  return currentPrice
}

export default {
  populateWalletWithAddressData,
  accountLockedUntil,
  accountNdauAmount,
  accountTotalNdauAmount,
  currentPrice,
  accountNoticePeriod,
  accountNotLocked,
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
  getTotalNdauForSend
}
