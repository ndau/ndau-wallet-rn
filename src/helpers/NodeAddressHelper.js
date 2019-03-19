import AppConfig from '../AppConfig'

const getNodeAddress = () => {
  return AppConfig.NODE_ADDRESSES[
    Math.floor(Math.random() * AppConfig.NODE_ADDRESSES.length)
  ]
}

export default {
  getNodeAddress
}
