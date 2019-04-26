import DataFormatHelper from '../DataFormatHelper'
import AppConstants from '../../AppConstants'
import KeyPathHelper from '../KeyPathHelper'
import AppConfig from '../../AppConfig'

test('moveTempUserToWalletName must do the needful', async () => {
  const key = DataFormatHelper.create8CharHash(AppConstants.TEMP_ID)
  const user = {
    userId: AppConstants.TEMP_ID,
    wallets: {
      [key]: {
        walletId: AppConstants.TEMP_ID,
        accountCreationKeyHash: '1e48ba8c',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
            addressData: {
              nickname: 'Account 1'
            },
            ownershipKey: '9d152ff0',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
            addressData: {
              nickname: 'Account 2'
            },
            ownershipKey: '1e12ca49',
            validationKeys: []
          }
        },
        keys: {
          '9d152ff0': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  const userGettingCreated = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        walletName: 'Kris',
        accountCreationKeyHash: '1e48ba8c',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
            addressData: {
              nickname: 'Account 1'
            },
            ownershipKey: '9d152ff0',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
            addressData: {
              nickname: 'Account 2'
            },
            ownershipKey: '1e12ca49',
            validationKeys: []
          }
        },
        keys: {
          '9d152ff0': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  const walletId = 'Kris'
  DataFormatHelper.moveTempUserToWalletName(user, walletId)
  expect(user).toBeDefined()
  expect(user).toEqual(userGettingCreated)
})

test('getNextPathIndex gets me the correct next BIP44 path index', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: KeyPathHelper.accountCreationKeyPath() + '/1',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: KeyPathHelper.accountCreationKeyPath() + '/2',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: KeyPathHelper.accountCreationKeyPath(),
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.accountCreationKeyPath()
  )
  expect(nextPathIndex).toEqual(3)
})

test('getNextPathIndex gets me the correct next root path index', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: '/1',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/4',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: '/',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(wallet, '/')
  expect(nextPathIndex).toEqual(5)
})

test('getNextPathIndex gets me the correct next validation path', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: KeyPathHelper.validationKeyPath() + '/1',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: KeyPathHelper.validationKeyPath() + '/400',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: KeyPathHelper.validationKeyPath() + '/299',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.validationKeyPath()
  )
  expect(nextPathIndex).toEqual(401)
})

test('getNextPathIndex gets me the correct next validation path with others', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: KeyPathHelper.accountCreationKeyPath() + '/3000',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/400',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: KeyPathHelper.validationKeyPath() + '/299',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.validationKeyPath()
  )
  expect(nextPathIndex).toEqual(300)
})

test('getNextPathIndex gets me the correct next account creation path with others', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: KeyPathHelper.accountCreationKeyPath() + '/3000',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/400',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: KeyPathHelper.validationKeyPath() + '/299',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    KeyPathHelper.accountCreationKeyPath()
  )
  expect(nextPathIndex).toEqual(3001)
})

test('getNextPathIndex gets me the correct next root path with others', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_ID,
    accountCreationKeyHash: '1e48ba8c',
    accounts: {
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
        addressData: {
          nickname: 'Account 1'
        },
        ownershipKey: '9d152ff0',
        validationKeys: []
      },
      tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
        address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
        addressData: {
          nickname: 'Account 2'
        },
        ownershipKey: '1e12ca49',
        validationKeys: []
      }
    },
    keys: {
      '9d152ff0': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: KeyPathHelper.accountCreationKeyPath() + '/3000',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/400',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: KeyPathHelper.validationKeyPath() + '/299',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(wallet, '/')
  expect(nextPathIndex).toEqual(401)
})

test('getNdauFromNapu converts napu correctly', async () => {
  const ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 10
  )
  expect(ndau).toEqual('10.000')
})

test('getNdauFromNapu converts napu correctly to 5 digits', async () => {
  const ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 10,
    5
  )
  expect(ndau).toEqual('10.00000')
})

test('getNapuFromNdau converts ndau correctly', async () => {
  const ndau = DataFormatHelper.getNapuFromNdau(10)
  expect(ndau).toEqual(AppConstants.QUANTA_PER_UNIT * 10)
})

test('getObjectWithAllAccounts sends back the correct amount of accounts', async () => {
  const user = {
    userId: 'Kris',
    wallets: {
      '61d9b642': {
        walletId: 'Kris',
        accountCreationKeyHash: '1e48ba8c',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6',
            addressData: {
              nickname: 'Account 1'
            },
            ownershipKey: '9d152ff0',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7',
            addressData: {
              nickname: 'Account 2'
            },
            ownershipKey: '1e12ca49',
            validationKeys: []
          }
        },
        keys: {
          '9d152ff0': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      },
      Jill: {
        walletId: 'Jill',
        accountCreationKeyHash: '1e48ba8c',
        accounts: {
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac8',
            addressData: {
              nickname: 'Account 1'
            },
            ownershipKey: '9d152ff0',
            validationKeys: []
          },
          tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac9: {
            address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac9',
            addressData: {
              nickname: 'Account 2'
            },
            ownershipKey: '1e12ca49',
            validationKeys: []
          }
        },
        keys: {
          '9d152ff0': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: KeyPathHelper.accountCreationKeyPath() + '/1',
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey:
              'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: KeyPathHelper.accountCreationKeyPath() + '/2',
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey:
              'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: KeyPathHelper.accountCreationKeyPath(),
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  const accounts = DataFormatHelper.getObjectWithAllAccounts(user)
  expect(Object.keys(accounts).length).toEqual(4)
})

test('getAccountEaiRateRequest gets the correct request format', async () => {
  const wallet = {
    tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac6: {
      nickname: 'Account 1',
      lastWAAUpdate: 581126400000000,
      weightedAverageAge: 0
    },
    tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyac7: {
      nickname: 'Account 2',
      lastWAAUpdate: null,
      weightedAverageAge: 0
    }
  }

  const request = DataFormatHelper.getAccountEaiRateRequest(wallet)
  expect(request.length).toEqual(2)
  request.forEach(r => {
    expect(r.weightedAverageAge).toBeGreaterThanOrEqual(0)
  })
})

test('convert words from array', async () => {
  const recoveryPhrase = [
    'Wink',
    'fantasy',
    'surface',
    'flame',
    'MAGIC',
    '  video',
    'manage',
    'wing',
    'logic',
    'insane',
    'slaM  ',
    'empower    '
  ]
  const newString = DataFormatHelper.convertRecoveryArrayToString(
    recoveryPhrase
  )
  expect(newString).toBe(
    'wink fantasy surface flame magic video manage wing logic insane slam empower'
  )
})

test('getNdauFromNapu converts napu correctly and adds commas correctly for 1000 ndau', async () => {
  let ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 1000,
    AppConfig.NDAU_SUMMARY_PRECISION,
    true
  )
  expect(ndau).toEqual('1,000.000')
})

test('getNdauFromNapu converts napu correctly and adds commas correctly for 500,000 ndau', async () => {
  let ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 500000,
    AppConfig.NDAU_SUMMARY_PRECISION,
    true
  )
  expect(ndau).toEqual('500,000.000')
})

test('getNdauFromNapu converts napu correctly and adds commas correctly for 1,000,000 ndau', async () => {
  let ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 1000000,
    AppConfig.NDAU_SUMMARY_PRECISION,
    true
  )
  expect(ndau).toEqual('1,000,000.000')
})

test('getNdauFromNapu converts napu correctly and adds commas correctly for 1,000,000,000 ndau', async () => {
  let ndau = DataFormatHelper.getNdauFromNapu(
    AppConstants.QUANTA_PER_UNIT * 1000000000,
    undefined,
    true
  )
  expect(ndau).toEqual('1,000,000,000.000')
})

test('if pass in string we get 8 char hash back', async () => {
  expect(
    DataFormatHelper.create8CharHash('creating a hash from this').length
  ).toBe(8)
  expect(DataFormatHelper.create8CharHash('Wallet 23').length).toBe(8)
  expect(
    DataFormatHelper.create8CharHash(`and she's buying a stairway...to heaven`)
      .length
  ).toBe(8)
})

test('check formatUSDollarValue', async () => {
  expect(DataFormatHelper.formatUSDollarValue(1)).toBe('1.00')
  expect(DataFormatHelper.formatUSDollarValue(11)).toBe('11.00')
  expect(DataFormatHelper.formatUSDollarValue(111)).toBe('111.00')
  expect(DataFormatHelper.formatUSDollarValue(1111)).toBe('1,111.00')
  expect(DataFormatHelper.formatUSDollarValue(11111)).toBe('11,111.00')
  expect(DataFormatHelper.formatUSDollarValue(111111)).toBe('111,111.00')
})

test('if we can find a wallet already existent', async () => {
  const user = {
    userId: 'doesntmatter',
    wallets: {
      blahblahhashblah: {
        walletId: 'jimmypage'
      },
      blahanotherhash: {
        walletId: 'ericjohnson'
      }
    },
    accounts: {}
  }
  expect(
    DataFormatHelper.checkIfWalletAlreadyExists(user, 'jimmypage')
  ).toBeTruthy()
  expect(
    DataFormatHelper.checkIfWalletAlreadyExists(user, 'ericjohnson')
  ).toBeTruthy()
  expect(
    DataFormatHelper.checkIfWalletAlreadyExists(user, 'stevierayvaughan')
  ).toBeFalsy()
  expect(
    DataFormatHelper.checkIfWalletAlreadyExists(undefined, 'stevierayvaughan')
  ).toBeFalsy()
})

test('make sure truncateString works as designed', async () => {
  expect(
    DataFormatHelper.truncateString(
      'This is going to be a very crazy long name'
    )
  ).toBe('This is going to ...')
  expect(DataFormatHelper.truncateString('This will not be as l', 21)).toBe(
    'This will not be a...'
  )
  expect(DataFormatHelper.truncateString('This will not be as la', 22)).toBe(
    'This will not be as...'
  )
  expect(DataFormatHelper.truncateString('This will not be as lar', 23)).toBe(
    'This will not be as ...'
  )
  expect(DataFormatHelper.truncateString('This will not be as larg', 24)).toBe(
    'This will not be as l...'
  )
  expect(DataFormatHelper.truncateString('This will not be as large', 25)).toBe(
    'This will not be as la...'
  )
  expect(
    DataFormatHelper.truncateString('This will not be as large,', 26)
  ).toBe('This will not be as lar...')
  expect(
    DataFormatHelper.truncateString('This will not be as large, ', 27)
  ).toBe('This will not be as larg...')
  expect(
    DataFormatHelper.truncateString('This will not be as large, y', 28)
  ).toBe('This will not be as large...')
  expect(
    DataFormatHelper.truncateString('This will not be as large, ye', 29)
  ).toBe('This will not be as large,...')
  expect(
    DataFormatHelper.truncateString(
      'This is going to be a very crazy long name',
      25
    )
  ).toBe('This is going to be a ...')
  expect(DataFormatHelper.truncateString('This is going to be fun!!', 29)).toBe(
    'This is going to be fun!!'
  )
  expect(DataFormatHelper.truncateString('This is going to be fun!!', 28)).toBe(
    'This is going to be fun!!'
  )
  expect(DataFormatHelper.truncateString('This is going to be fun!!', 30)).toBe(
    'This is going to be fun!!'
  )
  expect(DataFormatHelper.truncateString('This will be small', 25)).toBe(
    'This will be small'
  )
  expect(DataFormatHelper.truncateString('KrisP', 1)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 2)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 3)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 4)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 5)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 6)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 7)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 8)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('KrisP', 9)).toBe('KrisP')
  expect(DataFormatHelper.truncateString('Kristofer', 8)).toBe('Krist...')
  expect(DataFormatHelper.truncateString('Wallet 34')).toBe('Wallet 34')
})

test('make sure nano cents conversion works correctly', async () => {
  expect(DataFormatHelper.convertNanoCentsToDollars(1690000000000)).toBe(
    '16.90'
  )
  expect(DataFormatHelper.convertNanoCentsToDollars(1690000000009)).toBe(
    '16.90'
  )
  expect(DataFormatHelper.convertNanoCentsToDollars(16990000000000)).toBe(
    '169.90'
  )
})
