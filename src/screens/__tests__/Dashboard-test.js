import React from 'react'
import { StyleSheet } from 'react-native'
import Dashboard from '../Dashboard'
import renderer from 'react-test-renderer'
import { getTodaysDate } from '../../helpers/DateHelper'

jest.mock('../../helpers/DateHelper', () => ({
  getTodaysDate: jest.fn()
}))

describe('testing Dashboard...', () => {
  getTodaysDate.mockImplementation(() => {
    return '09/27/2018'
  })
  let styles = StyleSheet.create({
    wizardText: {
      color: '#ffffff',
      fontSize: 20
    }
  })
  const navigation = {
    getParam: () => {
      return {
        userId: '7MP-4FV',
        wallets: {
          '7MP-4FV': {
            walletId: '7MP-4FV',
            accountCreationKey: 'npvta8jaftcjec4q2p9dj7kcc5vw6xvnw36z438unqqfm3uhjaim2un9xpkvikppsa8bueaaaaaantceu3mfgqgz43swucmnkvsqpt7ndf88xftin3fhyefe3uzp3fqdbirtp6qqi5hg',
            accounts: [
              {
                address: 'ndai79tr79wp4qzi79hvqgkddy56h9g86aaqt5cffnifvf8z',
                addressData: {
                  nickname: 'Account 1'
                },
                ownershipKey: 'd25e4f17',
                validationKeys: ['285cff41', '7eeff2f0']
              },
              {
                address: 'ndar3agwr9s6uxpmsiq58xngtmgmb3jxse8tx9xvbfcjhggb',
                addressData: {
                  nickname: 'Account 2'
                },
                ownershipKey: 'd25e4f17',
                validationKeys: ['29992070', 'c1287590']
              }
            ],
            keys: {
              '29992070': {
                key: 'npvta8jaftcjedsf8h89ynw9pmvx7c2mkenw6q3khy693tii6v8jpsgazhkakcyqsbbbimqaaaaaacvdyb4kq6d3gmmfpx4tedux59gjdfkgree898zjp2tengq4ed555ggn7atsabyc',
                path: "/44'/20036'/100/0",
                derivedFromRoot: 'yes'
              },
              d25e4f17: {
                key: 'npvta8jaftcjec4q2p9dj7kcc5vw6xvnw36z438unqqfm3uhjaim2un9xpkvikppsa8bueaaaaaantceu3mfgqgz43swucmnkvsqpt7ndf88xftin3fhyefe3uzp3fqdbirtp6qqi5hg',
                path: "/44'/20036'/100",
                derivedFromRoot: 'yes'
              },
              '285cff41': {
                key: 'npvta8jaftcjeaie5h9pp5iyhh3ahubb2ejv52wsc3ypyn2g2hxstp7afjahv87q4bbbimqaaaaaahmq4exepcvjn5rfvefsbshvi8ts2ceupgp6scx79u7utaisacq4t978tbtne4ge',
                path: "/44'/20036'/100/1",
                derivedFromRoot: 'yes'
              },
              '7eeff2f0': {
                key: 'npuba4jaftckeebpkju3p5pahuyyw5tyyud8kt7sdfd64i9fk7a4z7baj22q2f38giaeefbp2aaaaaa7p5iuwtwkpfvp6ynsyaga8pd4gdaiujw3zuakzz8mykebcaaj5khavhfzvwuz',
                path: "/44'/20036'/100/1",
                derivedFromRoot: 'yes'
              },
              c1287590: {
                key: 'npuba4jaftckeebxrndte6qsi7rz5ki5zjnybizh82ijcc73s3u2anq8mnjaz2qig9ieefbp2aaaaaaknq2hjj5sre3pnxyzkesqkzr63enxi36sv5947fzcets35isrrrp3irpbuuru',
                path: "/44'/20036'/100/0",
                derivedFromRoot: 'yes'
              }
            },
            addresses: [],
            marketPrice: 16.34
          }
        }
      }
    }
  }

  it('renders correctly', () => {
    const tree = renderer
      .create(
        <Dashboard
          parentStyles={styles}
          navigation={navigation}
          activeAddress={'asdf'}
        />
      )
      .toJSON()
    expect(tree).toMatchSnapshot()
  })
})
