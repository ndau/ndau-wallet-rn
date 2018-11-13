import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper'

const loadData = async user => {
  const walletKeys = Object.keys(user.wallets)
  for (const walletKey of walletKeys) {
    const wallet = user.wallets[walletKey]
    await NdauNodeAPIHelper.populateWalletWithAddressData(wallet)
  }
}

export default {
  loadData
}
