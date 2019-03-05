import MockHelper from '../../helpers/MockHelper'
import AccountHistoryHelper from '../AccountHistoryHelper'

test('validate getAccountHistory works', async () => {
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountHistory('1234asdf')
  MockHelper.mockServiceDiscovery()
  MockHelper.mockTransactionByHash('luWjXZZAITZOrtwfPW0dIA')

  const accountHistory = await AccountHistoryHelper.getAccountHistory(
    '1234asdf'
  )

  const accountHistoryExpected = {
    Items: [
      {
        Balance: 100000000000,
        Timestamp: '2019-02-05T03:42:39Z',
        TxHash: 'luWjXZZAITZOrtwfPW0dIA',
        txDetail: {
          Tx: {
            Nonce: 'FZtxVyj4EemRwApYZGAH3w==',
            TransactableID: 10,
            Transactable: {
              tgt: ['ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8'],
              own: [
                2,
                'IQK/Ybb3x7iR7ZGb+Lp2FOsK1kh5xQsOLu6Hk8+k3QMXqgS9Tz0AAAABbU9Osozc4yYPkAd8wpn0RQOTJVwAyc4n7MMrCATn11M='
              ],
              key: [
                [
                  2,
                  'IQJ/DvTikpGPllPeynPqNJoRW6Tui82gSjGbSd9vt4NU8QgvqOMAAAACaKwn3g58SfWPvl8gYeOBLeDWFmLNR1Zfg0wNLnD+2ps='
                ]
              ],
              val: '',
              seq: 1,
              sig: [
                2,
                'MEUCIQDT9CgHFz8If9OFOAFKSwoW6XGNkPJHbemMA9u7sXBrMgIgUysPO56aFKt2XZM+26HCjeGz06g6V9tM6AFzcASIsKs='
              ]
            }
          }
        }
      }
    ]
  }
  expect(accountHistory).toBeDefined()
  expect(accountHistory).toEqual(accountHistoryExpected)
})

test('validate hasItems works', async () => {
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountHistory('1234asdf')
  MockHelper.mockServiceDiscovery()
  MockHelper.mockTransactionByHash('luWjXZZAITZOrtwfPW0dIA')

  const accountHistory = await AccountHistoryHelper.getAccountHistory(
    '1234asdf'
  )

  const accountHistoryExpected = {
    Items: [
      {
        Balance: 100000000000,
        Timestamp: '2019-02-05T03:42:39Z',
        TxHash: 'luWjXZZAITZOrtwfPW0dIA',
        txDetail: {
          Tx: {
            Nonce: 'FZtxVyj4EemRwApYZGAH3w==',
            TransactableID: 10,
            Transactable: {
              tgt: ['ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8'],
              own: [
                2,
                'IQK/Ybb3x7iR7ZGb+Lp2FOsK1kh5xQsOLu6Hk8+k3QMXqgS9Tz0AAAABbU9Osozc4yYPkAd8wpn0RQOTJVwAyc4n7MMrCATn11M='
              ],
              key: [
                [
                  2,
                  'IQJ/DvTikpGPllPeynPqNJoRW6Tui82gSjGbSd9vt4NU8QgvqOMAAAACaKwn3g58SfWPvl8gYeOBLeDWFmLNR1Zfg0wNLnD+2ps='
                ]
              ],
              val: '',
              seq: 1,
              sig: [
                2,
                'MEUCIQDT9CgHFz8If9OFOAFKSwoW6XGNkPJHbemMA9u7sXBrMgIgUysPO56aFKt2XZM+26HCjeGz06g6V9tM6AFzcASIsKs='
              ]
            }
          }
        }
      }
    ]
  }
  expect(accountHistory).toBeDefined()
  expect(accountHistory).toEqual(accountHistoryExpected)
  expect(AccountHistoryHelper.hasItems(accountHistory)).toBeTruthy()
})

test('validate getTransactionDate works', async () => {
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountHistory('1234asdf')
  MockHelper.mockServiceDiscovery()
  MockHelper.mockTransactionByHash('luWjXZZAITZOrtwfPW0dIA')

  const accountHistory = await AccountHistoryHelper.getAccountHistory(
    '1234asdf'
  )

  const accountHistoryExpected = {
    Items: [
      {
        Balance: 100000000000,
        Timestamp: '2019-02-05T03:42:39Z',
        TxHash: 'luWjXZZAITZOrtwfPW0dIA',
        txDetail: {
          Tx: {
            Nonce: 'FZtxVyj4EemRwApYZGAH3w==',
            TransactableID: 10,
            Transactable: {
              tgt: ['ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8'],
              own: [
                2,
                'IQK/Ybb3x7iR7ZGb+Lp2FOsK1kh5xQsOLu6Hk8+k3QMXqgS9Tz0AAAABbU9Osozc4yYPkAd8wpn0RQOTJVwAyc4n7MMrCATn11M='
              ],
              key: [
                [
                  2,
                  'IQJ/DvTikpGPllPeynPqNJoRW6Tui82gSjGbSd9vt4NU8QgvqOMAAAACaKwn3g58SfWPvl8gYeOBLeDWFmLNR1Zfg0wNLnD+2ps='
                ]
              ],
              val: '',
              seq: 1,
              sig: [
                2,
                'MEUCIQDT9CgHFz8If9OFOAFKSwoW6XGNkPJHbemMA9u7sXBrMgIgUysPO56aFKt2XZM+26HCjeGz06g6V9tM6AFzcASIsKs='
              ]
            }
          }
        }
      }
    ]
  }
  expect(accountHistory).toBeDefined()
  expect(accountHistory).toEqual(accountHistoryExpected)
  expect(
    AccountHistoryHelper.getTransactionDate(accountHistory.Items[0])
  ).toEqual('04 Feb 2019')
})

test('validate getTransactionId works', async () => {
  MockHelper.mockServiceDiscovery()
  MockHelper.mockAccountHistory('1234asdf')
  MockHelper.mockServiceDiscovery()
  MockHelper.mockTransactionByHash('luWjXZZAITZOrtwfPW0dIA')

  const accountHistory = await AccountHistoryHelper.getAccountHistory(
    '1234asdf'
  )

  const accountHistoryExpected = {
    Items: [
      {
        Balance: 100000000000,
        Timestamp: '2019-02-05T03:42:39Z',
        TxHash: 'luWjXZZAITZOrtwfPW0dIA',
        txDetail: {
          Tx: {
            Nonce: 'FZtxVyj4EemRwApYZGAH3w==',
            TransactableID: 10,
            Transactable: {
              tgt: ['ndah7dmb2dsufay2fes8nrh94iy27b6kfrdnqzekj49x2fx8'],
              own: [
                2,
                'IQK/Ybb3x7iR7ZGb+Lp2FOsK1kh5xQsOLu6Hk8+k3QMXqgS9Tz0AAAABbU9Osozc4yYPkAd8wpn0RQOTJVwAyc4n7MMrCATn11M='
              ],
              key: [
                [
                  2,
                  'IQJ/DvTikpGPllPeynPqNJoRW6Tui82gSjGbSd9vt4NU8QgvqOMAAAACaKwn3g58SfWPvl8gYeOBLeDWFmLNR1Zfg0wNLnD+2ps='
                ]
              ],
              val: '',
              seq: 1,
              sig: [
                2,
                'MEUCIQDT9CgHFz8If9OFOAFKSwoW6XGNkPJHbemMA9u7sXBrMgIgUysPO56aFKt2XZM+26HCjeGz06g6V9tM6AFzcASIsKs='
              ]
            }
          }
        }
      }
    ]
  }
  expect(accountHistory).toBeDefined()
  expect(accountHistory).toEqual(accountHistoryExpected)
  expect(
    AccountHistoryHelper.getTransactionId(accountHistory.Items[0])
  ).toEqual('luWjXZZAITZOrtwfPW0dIA')
})
