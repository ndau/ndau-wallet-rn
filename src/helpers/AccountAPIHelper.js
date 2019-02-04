import AccountAPI from '../api/AccountAPI'
import DateHelper from './DateHelper'
import AppConfig from '../AppConfig'
import OrderAPI from '../api/OrderAPI'
import DataFormatHelper from './DataFormatHelper'
import AppConstants from '../AppConstants'
import { ClaimTransaction } from '../transactions/ClaimTransaction'
import { Transaction } from '../transactions/Transaction'

const populateWalletWithAddressData = async wallet => {
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
  addressDataKeys.forEach(async (accountKey, index) => {
    const account = addressData[accountKey]
    account.nickname = `Account ${index + 1}`
    account.walletId = wallet.walletId
    account.eaiPercentage = eaiRateMap.get(accountKey)
    addressNicknameMap.set(accountKey, account.nickname)

    for (const walletAccountKey of walletAccountKeys) {
      const walletAccount = wallet.accounts[walletAccountKey]
      if (walletAccountKey === accountKey) {
        walletAccount.addressData = account

        await sendClaimTransactionIfNeeded(wallet, walletAccount, account)

        break
      }
    }
  })

  // now iterate using the map to populate the rewardsTargetNickname
  // and incomingRewardsFromNickname
  walletAccountKeys.forEach((walletAccountKey, index) => {
    const account = wallet.accounts[walletAccountKey]
    if (account.addressData.rewardsTarget) {
      account.addressData.rewardsTargetNickname = addressNicknameMap.get(
        account.addressData.rewardsTarget
      )
    }

    if (account.addressData.incomingRewardsFrom) {
      account.addressData.incomingRewardsFromNickname = addressNicknameMap.get(
        account.addressData.incomingRewardsFrom
      )
    }

    if (!account.addressData.nickname) {
      // TODO: This may not work under all circumstances, instead
      // we may need to find out what the last account index is
      account.addressData.nickname = `Account ${index + 1}`
    }
    if (!account.addressData.walletId) {
      account.addressData.walletId = wallet.walletId
    }
  })
}

const sendClaimTransactionIfNeeded = async (wallet, account, addressData) => {
  if (addressData.balance > 0 && !addressData.validationKeys) {
    console.debug(`Sending claim transaction for ${addressData.nickname}`)
    Object.assign(ClaimTransaction.prototype, Transaction)
    const claimTransaction = new ClaimTransaction(wallet, account)
    await claimTransaction.createSignPrevalidateSubmit()
  }
}

const eaiPercentage = account => {
  return account && account.eaiPercentage
    ? account.eaiPercentage / AppConstants.RATE_DENOMINATOR
    : null
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

const accountNdauAmount = account => {
  return account && account.balance
    ? DataFormatHelper.addCommas(
      parseFloat(DataFormatHelper.getNdauFromNapu(account.balance))
    )
    : 0.0
}

const accountTotalNdauAmount = (accounts, localizedText = true) => {
  let total = 0.0

  if (!accounts) return total

  Object.keys(accounts).forEach(accountKey => {
    if (
      accounts[accountKey].addressData &&
      accounts[accountKey].addressData.balance
    ) {
      total += parseFloat(
        DataFormatHelper.getNdauFromNapu(
          accounts[accountKey].addressData.balance
        )
      )
    }
  })
  return localizedText ? DataFormatHelper.addCommas(total) : total
}

const currentPrice = (marketPrice, totalNdau) => {
  console.log(`marketPrice is ${marketPrice} totalNdau is ${totalNdau}`)

  // why not use .toLocaleString you ask...here is why:
  // https://github.com/facebook/react-native/issues/15717
  const currentPrice = marketPrice
    ? '$' + DataFormatHelper.addCommas(parseFloat(totalNdau * marketPrice), 2)
    : '$0.00'
  console.log(`currentPrice: ${currentPrice}`)

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
  eaiPercentage
}
