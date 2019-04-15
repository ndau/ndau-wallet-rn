import AsyncStorageMock from '@react-native-community/async-storage/jest/async-storage-mock'

AsyncStorageMock.getAllKeys = jest.fn(() => {
  return new Promise((resolve, reject) => {
    resolve(Object.keys(AsyncStorageMock.__INTERNAL_MOCK_STORAGE__))
  })
})

export default AsyncStorageMock
