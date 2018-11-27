import DataFormatHelper from '../DataFormatHelper'
import AppConstants from '../../AppConstants'

test('moveTempUserToWalletName must do the needful', async () => {
  const user = {
    userId: AppConstants.TEMP_USER,
    wallets: {
      'temp-user': {
        walletId: AppConstants.TEMP_USER,
        accountCreationKey: '1e48ba8c',
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
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: "/44'/20036'/100/1",
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: "/44'/20036'/100/2",
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: "/44'/20036'/100",
            derivedFromRoot: 'yes'
          }
        }
      }
    }
  }

  const userGettingCreated = {
    userId: 'Kris',
    wallets: {
      Kris: {
        walletId: 'Kris',
        accountCreationKey: '1e48ba8c',
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
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: "/44'/20036'/100/1",
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: "/44'/20036'/100/2",
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: "/44'/20036'/100",
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
    walletId: AppConstants.TEMP_USER,
    accountCreationKey: '1e48ba8c',
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
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: "/44'/20036'/100/1",
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: "/44'/20036'/100/2",
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: "/44'/20036'/100",
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(
    wallet,
    "/44'/20036'/100"
  )
  expect(nextPathIndex).toEqual(3)
})

test('getNextPathIndex gets me the correct next root path index', async () => {
  const wallet = {
    walletId: AppConstants.TEMP_USER,
    accountCreationKey: '1e48ba8c',
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
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: '/1',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/4',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: '/',
        derivedFromRoot: 'yes'
      }
    }
  }

  const nextPathIndex = DataFormatHelper.getNextPathIndex(wallet, '/')
  expect(nextPathIndex).toEqual(5)
})

test('getNdauFromNapu converts napu correctly', async () => {
  const ndau = DataFormatHelper.getNdauFromNapu(1000000000)
  expect(ndau).toEqual(10)
})

test('getObjectWithAllAccounts sends back the correct amount of accounts', async () => {
  const user = {
    userId: 'Kris',
    wallets: {
      Kris: {
        walletId: 'Kris',
        accountCreationKey: '1e48ba8c',
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
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: "/44'/20036'/100/1",
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: "/44'/20036'/100/2",
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: "/44'/20036'/100",
            derivedFromRoot: 'yes'
          }
        }
      },
      Jill: {
        walletId: 'Jill',
        accountCreationKey: '1e48ba8c',
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
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
            path: "/44'/20036'/100/1",
            derivedFromRoot: 'yes'
          },
          '1e12ca49': {
            publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
            path: "/44'/20036'/100/2",
            derivedFromRoot: 'yes'
          },
          '1e48ba8c': {
            publicKey: '',
            privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
            path: "/44'/20036'/100",
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
    walletId: AppConstants.TEMP_USER,
    accountCreationKey: '1e48ba8c',
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
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj446',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx6',
        path: '/1',
        derivedFromRoot: 'yes'
      },
      '1e12ca49': {
        publicKey: 'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj447',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqx7',
        path: '/4',
        derivedFromRoot: 'yes'
      },
      '1e48ba8c': {
        publicKey: '',
        privateKey: 'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6sq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmid3kjbfrw628y7c5zit8vcz6x7hjuxgfeu4kasdf4',
        path: '/',
        derivedFromRoot: 'yes'
      }
    }
  }

  const request = DataFormatHelper.getAccountEaiRateRequest(wallet)
  expect(request.length).toEqual(2)
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
