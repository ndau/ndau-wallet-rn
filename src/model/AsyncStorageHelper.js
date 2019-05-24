import AsyncStorage from '@react-native-community/async-storage'
import ServiceDiscovery from '../api/ServiceDiscovery'
import SettingsStore from '../stores/SettingsStore'

const STORAGE_KEY_PREFIX = '@NdauAsyncStorage:'
const CURRENT_USER_KEY = '@CurrentUserKey'

const APPLICATION_PASSWORD = '@ApplicationPassword'
const APPLICATION_NETWORK = '@ApplicationNetwork'
const DEBUG_ROWS = 'debug-rows'

const LAST_ACCOUNT_DATA = '@LastAccountData'

const TEST_NET = 'testnet'
const MAIN_NET = 'mainnet'
const DEV_NET = 'devnet'

/**
 * Cache the last call to address data so we can check to see if we
 * have gotten anything new
 *
 * @param {string} lastAccountData
 */
const setLastAccountData = async lastAccountData => {
  await AsyncStorage.setItem(LAST_ACCOUNT_DATA, JSON.stringify(lastAccountData))
}

/**
 * Get the cached last account data out of AsyncStorage
 */
const getLastAccountData = async () => {
  const lastAccountData = await AsyncStorage.getItem(LAST_ACCOUNT_DATA)
  return JSON.parse(lastAccountData)
}

/**
 * Application will be using mainnet
 */
const useMainNet = async () => {
  ServiceDiscovery.invalidateCache()
  SettingsStore.setApplicationNetwork(MAIN_NET)
  await AsyncStorage.setItem(APPLICATION_NETWORK, MAIN_NET)
}

/**
 * Application will be using testnet
 */
const useTestNet = async () => {
  ServiceDiscovery.invalidateCache()
  SettingsStore.setApplicationNetwork(TEST_NET)
  await AsyncStorage.setItem(APPLICATION_NETWORK, TEST_NET)
}

/**
 * Application will be using devnet
 */
const useDevNet = async () => {
  ServiceDiscovery.invalidateCache()
  SettingsStore.setApplicationNetwork(DEV_NET)
  await AsyncStorage.setItem(APPLICATION_NETWORK, DEV_NET)
}

const _ifNetworkNotSetDefaultIt = async () => {
  let network = await AsyncStorage.getItem(APPLICATION_NETWORK)
  if (!network) {
    await useMainNet()
    network = await AsyncStorage.getItem(APPLICATION_NETWORK)
  }

  // This is to change the 1.8.1 version of ndau wallet to the newest format
  if (network === 'MainNet') {
    await useMainNet()
  }

  // make sure too that we have the SettingsStore populated with the
  // correct value
  SettingsStore.setApplicationNetwork(network)
}

/**
 * Is the application using mainnet
 */
const isMainNet = async () => {
  await _ifNetworkNotSetDefaultIt()

  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork && applicationNetwork.toLowerCase() === MAIN_NET
}

/**
 * Is the application using testnet
 */
const isTestNet = async () => {
  await _ifNetworkNotSetDefaultIt()

  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork && applicationNetwork.toLowerCase() === TEST_NET
}

/**
 * Is the application using devnet
 */
const isDevNet = async () => {
  await _ifNetworkNotSetDefaultIt()

  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork && applicationNetwork.toLowerCase() === DEV_NET
}

/**
 * Send back the network being used
 */
const getNetwork = async () => {
  await _ifNetworkNotSetDefaultIt()

  const applicationNetwork = await AsyncStorage.getItem(APPLICATION_NETWORK)
  return applicationNetwork
}

/**
 * This function is deprecated. It is only kept around for the 1.8 release. After that
 * we can look at phasing this out.
 * @deprecated as of 1.8
 */
const getAllKeys = async () => {
  try {
    const keys = await AsyncStorage.getAllKeys()
    const newKeys = keys
      .map(key => {
        return key.replace(STORAGE_KEY_PREFIX, '')
      })
      .filter(
        key =>
          key !== CURRENT_USER_KEY &&
          key !== APPLICATION_NETWORK &&
          key !== APPLICATION_PASSWORD &&
          key !== DEBUG_ROWS &&
          key !== LAST_ACCOUNT_DATA
      )
    return newKeys
  } catch (error) {
    return []
  }
}

export default {
  getAllKeys,
  setLastAccountData,
  getLastAccountData,
  useMainNet,
  useTestNet,
  useDevNet,
  isMainNet,
  isTestNet,
  isDevNet,
  getNetwork,
  TEST_NET,
  MAIN_NET,
  DEV_NET
}
