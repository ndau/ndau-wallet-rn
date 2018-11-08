import NdauNodeAPI from '../api/NdauNodeAPI'
import DateHelper from './DateHelper'
import AppConfig from '../AppConfig'
import OrderNodeAPI from '../api/OrderNodeAPI'

const populateWalletWithAddressData = async wallet => {
  const addressDataFromAPI = await NdauNodeAPI.getAddressData(wallet.addresses)
  const eaiPercentageData = await OrderNodeAPI.getEAIPercentage()
  const marketPriceFromAPI = await NdauNodeAPI.getMarketPrice()
  const addressData = addressDataFromAPI ? addressDataFromAPI.addressData : []

  // TODO: NEED TO ADDRESS THIS~!!!!!
  wallet.marketPrice = marketPriceFromAPI ? marketPriceFromAPI.marketPrice : 0

  const eaiPercentageMap = new Map()
  eaiPercentageData.forEach(account => {
    eaiPercentageMap.set(account.address, account.eaiPercentage)
  })

  const addressNicknameMap = new Map()

  // This is mainly done if there is not data, to name the wallet.accounts
  Object.keys(wallet.accounts).forEach((accountKey, index) => {
    const account = wallet.accounts[accountKey]
    if (!account.addressData) {
      account.addressData = {}
    }
    account.addressData.nickname = `Account ${index + 1}`
  })

  // create a map to create the nickname fields appropriately
  addressData.forEach((account, index) => {
    account.nickname = `Account ${index + 1}`
    account.eaiPercentage = eaiPercentageMap.get(account.address)
    addressNicknameMap.set(account.address, account.nickname)
  })

  // now iterate using the map to populate the rewardsTargetNickname
  // and incomingRewardsFromNickname
  addressData.forEach(account => {
    if (account.rewardsTarget) {
      account.rewardsTargetNickname = addressNicknameMap.get(
        account.rewardsTarget
      )
    }

    if (account.incomingRewardsFrom) {
      account.incomingRewardsFromNickname = addressNicknameMap.get(
        account.incomingRewardsFrom
      )
    }
  })

  // NOW get addressData in it's rightful place
  Object.keys(wallet.accounts).forEach(accountKey => {
    const account = wallet.accounts[accountKey]
    addressData.forEach(dataToPutIntoUser => {
      if (account.address === dataToPutIntoUser.address) {
        account.addressData = dataToPutIntoUser
      }
    })
  })
}

const eaiPercentage = account => {
  return account && account.eaiPercentage ? account.eaiPercentage : null
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
    return DateHelper.getDateFromMilliseconds(account.lock.unlocksOn)
  }

  return null
}

const accountNoticePeriod = account => {
  if (!account) return null

  const noticePeriod = account.lock ? account.lock.noticePeriod : null
  if (noticePeriod) {
    return DateHelper.getDaysFromMicroseconds(noticePeriod)
  }

  return null
}

const accountNotLocked = account => {
  return account && account.lock !== undefined ? !account.lock : false
}

const accountNdauAmount = account => {
  return account && account.balance ? parseFloat(account.balance) : 0.0
}

const accountTotalNdauAmount = (accounts, localizedText = true) => {
  let total = 0.0

  if (!accounts) return total

  Object.keys(accounts).forEach(accountKey => {
    if (
      accounts[accountKey].addressData &&
      accounts[accountKey].addressData.balance
    ) {
      total += parseFloat(accounts[accountKey].addressData.balance)
    }
  })
  return localizedText ? total.toLocaleString(AppConfig.LOCALE) : total
}

const currentPrice = (marketPrice, totalNdau) => {
  console.log(`marketPrice is ${marketPrice} totalNdau is ${totalNdau}`)

  // why not use .toLocaleString you ask...here is why:
  // https://github.com/facebook/react-native/issues/15717
  const currentPrice = marketPrice
    ? '$' +
        parseFloat(totalNdau * marketPrice)
          .toFixed(2)
          .toString()
          .replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    : '$0.00'
  console.log(`currentPrice: ${currentPrice}`)

  return currentPrice
}

const isMainNetAlive = async () => {
  const jsonStatus = await NdauNodeAPI.getNodeStatus()
  if (jsonStatus.node_info.network === 'ndau mainnet') {
    return true
  }

  return false
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
  eaiPercentage,
  isMainNetAlive
}
