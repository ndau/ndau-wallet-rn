import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock'

AsyncStorageMock.getAllKeys = jest.fn(() => {
  console.log(`TEST TEST ${__INTERNAL_MOCK_STORAGE__}`)
  return Object.keys(__INTERNAL_MOCK_STORAGE__)
})

export default AsyncStorageMock
