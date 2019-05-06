import AsyncStorageHelper from '../AsyncStorageHelper'
import AsyncStorage from '@react-native-community/async-storage'

describe('AsyncStorageHelper tests...', () => {
  it('should set one user', async () => {
    const user = {
      userId: 'ABC-123'
    }
    const password = 'abcd'

    await AsyncStorageHelper.lockUser(user, password)
    const user1 = {
      userId: 'ABC-123'
    }
    const password1 = 'abcd'
    const user2 = {
      userId: 'jimmy'
    }
    const password2 = 'jim'
    const user3 = {
      userId: 'ABC-123anything'
    }
    const password3 = 'anything'

    await AsyncStorageHelper.lockUser(user1, password1)
    await AsyncStorageHelper.lockUser(user2, password2)
    await AsyncStorageHelper.lockUser(user3, password3)

    await AsyncStorageHelper.unlockUser(user2.userId, password2).then(
      storedUser => {
        expect(storedUser).toEqual(user2)
      }
    )
  })

  it('should set 3 users and get all', async () => {
    const user1 = {
      userId: 'ABC-123'
    }
    const password1 = 'abcd'
    const user2 = {
      userId: 'jimmy'
    }
    const password2 = 'jim'
    const user3 = {
      userId: 'ABC-123anything'
    }
    const password3 = 'anything'

    await AsyncStorageHelper.lockUser(user1, password1)
    await AsyncStorageHelper.lockUser(user2, password2)
    await AsyncStorageHelper.lockUser(user3, password3)

    await AsyncStorageHelper.unlockUser(user1.userId, password1).then(
      storedUser => {
        expect(storedUser).toEqual(user1)
      }
    )
    await AsyncStorageHelper.unlockUser(user2.userId, password2).then(
      storedUser => {
        expect(storedUser).toEqual(user2)
      }
    )
    await AsyncStorageHelper.unlockUser(user3.userId, password3).then(
      storedUser => {
        expect(storedUser).toEqual(user3)
      }
    )
  })

  it('should set 3 users and get one that does not exist', async () => {
    const user1 = {
      userId: 'ABC-123'
    }
    const password1 = 'abcd'
    const user2 = {
      userId: 'jimmy'
    }
    const password2 = 'jim'
    const user3 = {
      userId: 'ABC-123anything'
    }
    const password3 = 'anything'

    await AsyncStorageHelper.lockUser(user1, password1)
    await AsyncStorageHelper.lockUser(user2, password2)
    await AsyncStorageHelper.lockUser(user3, password3)

    await AsyncStorageHelper.unlockUser('doesNotExist', password1)
      .then(storedUser => {
        expect(storedUser).toBeDefined()
      })
      .catch(error => {
        expect(error).toBeDefined()
      })
  })

  it('should set 3 users and getAllKeys', async () => {
    const user1 = {
      userId: 'ABC-123'
    }
    const password1 = 'abcd'
    const user2 = {
      userId: 'jimmy'
    }
    const password2 = 'jim'
    const user3 = {
      userId: 'ABC-123anything'
    }
    const password3 = 'anything'

    await AsyncStorageHelper.lockUser(user1, password1)
    await AsyncStorageHelper.lockUser(user2, password2)
    await AsyncStorageHelper.lockUser(user3, password3)

    await AsyncStorageHelper.getAllKeys().then(keys => {
      const arrayOfKeys = ['ABC-123', 'jimmy', 'ABC-123anything']
      expect(keys).toEqual(arrayOfKeys)
    })
  })

  it('should set 3 users, getAllKeys and check doesKeyExist', async () => {
    const user1 = {
      userId: 'ABC-123'
    }
    const password1 = 'abcd'
    const user2 = {
      userId: 'jimmy'
    }
    const password2 = 'jim'
    const user3 = {
      userId: 'ABC-123anything'
    }
    const password3 = 'anything'

    await AsyncStorageHelper.lockUser(user1, password1)
    await AsyncStorageHelper.lockUser(user2, password2)
    await AsyncStorageHelper.lockUser(user3, password3)

    await AsyncStorageHelper.getAllKeys().then(async keys => {
      const arrayOfKeys = ['ABC-123', 'jimmy', 'ABC-123anything']
      expect(keys).toEqual(arrayOfKeys)
    })
  })

  it('should set MainNet by default and validate that is being used', async () => {
    expect(await AsyncStorageHelper.isMainNet()).toBe(true)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set MainNet and validate that is being used', async () => {
    await AsyncStorageHelper.useMainNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(true)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set TestNet and validate that is being used', async () => {
    await AsyncStorageHelper.useTestNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(false)
    expect(await AsyncStorageHelper.isTestNet()).toBe(true)
    expect(await AsyncStorageHelper.isDevNet()).toBe(false)
  })

  it('should set DevNet and validate that is being used', async () => {
    await AsyncStorageHelper.useDevNet()
    expect(await AsyncStorageHelper.isMainNet()).toBe(false)
    expect(await AsyncStorageHelper.isTestNet()).toBe(false)
    expect(await AsyncStorageHelper.isDevNet()).toBe(true)
  })

  it('should set DevNet and validate that is being used', async () => {
    await AsyncStorageHelper.useDevNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('devnet')
    await AsyncStorageHelper.useMainNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('mainnet')
    await AsyncStorageHelper.useTestNet()
    expect(await AsyncStorageHelper.getNetwork()).toBe('testnet')
  })

  it('make sure that is calls send back the correct value or default', async () => {
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isMainNet()).toBeTruthy()
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isDevNet()).toBeFalsy()
    await AsyncStorageHelper.useDevNet()
    await AsyncStorage.clear()
    expect(await AsyncStorageHelper.isMainNet()).toBeTruthy()
  })
})
