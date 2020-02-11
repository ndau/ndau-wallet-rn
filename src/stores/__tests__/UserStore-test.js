/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import UserStore from '../UserStore'
import KeyPathHelper from '../../helpers/KeyPathHelper'

const testUser1 = {
  userId: '7MP-4FV',
  wallets: {
    '7MP-4FV': {
      walletId: '7MP-4FV',
      accountCreationKeyHash: 'e58b438d',
      accounts: {
        ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun: {
          address: 'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun',
          addressData: {
            nickname: 'Account 1'
          },
          ownershipKey: 'b32d1dfb',
          validationKeys: []
        },
        ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz: {
          address: 'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz',
          addressData: {
            nickname: 'Account 2'
          },
          ownershipKey: 'e54b7ece',
          validationKeys: []
        },
        ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55: {
          address: 'ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55',
          addressData: {
            nickname: 'Account 3'
          },
          ownershipKey: '3fcd79f1',
          validationKeys: []
        },
        ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f67g: {
          address: 'ndanhgm5avd68gj9ufiwq7ttcsshxciupgz5i7nnzk68f67g',
          addressData: {
            nickname: 'Account 4'
          },
          ownershipKey: '2d4a67b0',
          validationKeys: []
        },
        ndafwi9munvx8uhgg3pmaw7m6p22ixp5mpv7nipgc5zjyp5c: {
          address: 'ndafwi9munvx8uhgg3pmaw7m6p22ixp5mpv7nipgc5zjyp5c',
          addressData: {
            nickname: 'Account 5'
          },
          ownershipKey: '3a7d2974',
          validationKeys: []
        },
        ndap34mk6yzyiru49ivfitgzybkfqxnejcr9qvtnd3ychbfq: {
          address: 'ndap34mk6yzyiru49ivfitgzybkfqxnejcr9qvtnd3ychbfq',
          addressData: {
            nickname: 'Account 6'
          },
          ownershipKey: '84f010f1',
          validationKeys: []
        },
        ndaq9euuwf83yds7f3bwcfqdqsx43x5v4vjbcctkndy2fk98: {
          address: 'ndaq9euuwf83yds7f3bwcfqdqsx43x5v4vjbcctkndy2fk98',
          addressData: {
            nickname: 'Account 7'
          },
          ownershipKey: '7bc381ff',
          validationKeys: []
        }
      },
      keys: {
        e58b438d: {
          publicKey: '',
          privateKey:
            'npvta8jaftcjed7stf8bkz3nnipyqahdau5vexjr52ez4wvcuusgimc7fjac52pbwa4fdissaaaanv2qizmsubdetvqmqys8fwvj4pw2b9vg9jire7cd3xm9cg74sc75yu44tbkhh23s',
          path: KeyPathHelper.accountCreationKeyPath(),
          derivedFromRoot: 'yes'
        },
        b32d1dfb: {
          publicKey:
            'npuba4jaftckeeb8m2xih7dbwsqndrt2hzz6k6xxvn3k48kss87uwuta2rbaj2dz7tie4nw4waaaaaahwni9kfku8detab44b4mqenf3qx4skffjxzfmgev5pipapeiaeqqbqsvdzkit',
          privateKey:
            'npvta8jaftcjed2vzrknnzf8fj83q6bsfqnf72q7pr4b4evxzgfgn24tznve5gcfkbgvfgxaaaaaab7dch4tkwzs3eiaqysqu5tdbqmxqwctjkpp3k3te85kdidjcabdu6fkrqkq356k',
          path: "/44'/20036'/100/0",
          derivedFromRoot: 'yes'
        },
        e54b7ece: {
          publicKey:
            'npuba4jaftckeebbfznxrdsdk893xn64axz3fv5ayg8ygip6grpgeudqkfyij9kjbm2e4nw4waaaaaa6pmfcm6tvpiar9xgi3udqbbarv2g7i5dei6rj5ppw76zdjkyf5bqigdtzb36x',
          privateKey:
            'npvta8jaftcjeai6tm5yy3j4ruh6tc9c2qgyt8jhijns3j9ib8i5jdhfvcpkj52tgbgvfgxaaaaaahdk3iu9en5kad97jugns5siid68bzkg23chd4q5mphrf24kxtq2mwu775a2cky7',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        '3fcd79f1': {
          publicKey:
            'npuba4jaftckeebsfgvpt2agx6pf7i5k233d4bcetgpx9vfp9wcp7pwkbtzufqu4ktse4nw4waaaaabf92p46hd6zi322kjg7f46vfdi4xs5agy3nn24b386mwprk9hjzgx8yckunvtz',
          privateKey:
            'npvta8jaftcjec3htae7jzmrbbrtxyw5e8nmg3yuahca77rqm2y2cyzw4nuevcbeabgvfgxaaaaaajr8dqzb29f4gqgcujzjqze3i4gxng2bxymdggsqrzc7dm4z34p3x7igz6vthnjt',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        '2d4a67b0': {
          publicKey:
            'npuba4jaftckeeb5w22tqagu2cx336uh43w22y3na8ztf24367div8u84zd29xpbf22e4nw4waaaaabuqsax6t9yj9nb9phjjjjurtg3yk8wbie5q6hcj72dq7xxdffd2jr2cdgxti9h',
          privateKey:
            'npvta8jaftcjea6ks77rbjv8zgtwyjqnbyckgmp49crrwks2mspepfhjcwwa5a3csbgvfgxaaaaaanvwafrer7ur5ar5j4kkknv6jypuzxakbg5zb2urqa5zppi3ji8cmm6c4ivbhmnc',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        '3a7d2974': {
          publicKey:
            'npuba4jaftckeebjixrgdscppt7n4x672zshxgz28x8zqxetrmeh4gknysgg6umwfg2e4nw4waaaaacgpdrebq9f68njadaf379r42vyrsdigieaw77554qz8b4xbnner6x7zg259mdz',
          privateKey:
            'npvta8jaftcjedv4znk8s5egwmmcc2tcyhi8uiqjqaip5zvxurj7skjrixt7gyr6ubgvfgxaaaaaatvi53amz3rhvcia2bqrr58ye7v6a4bubafhrq88vx9sqximdbd9fh8mnhrker2m',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '84f010f1': {
          publicKey:
            'npuba4jaftckeebj42zrwgkib944y62gm3qxw9pru2gi46fg7d7iebssysx8ppfdujie4nw4waaaaac4jvnbjc8sisi234mrsfr5ztdsv87gcduwz8ustszgy33urys2s3e4c83eiqyk',
          privateKey:
            'npvta8jaftcjeburqvbt33rse4gjrcep2sgwb5uex9gqbc6v59wyz8se8n3ix668sbgvfgxaaaaaayun5akizwcecggqu56bm876i6e9zjss6xf9wwenf3xyqnv7wgegjqyk56z3ii33',
          path: "/44'/20036'/100/5",
          derivedFromRoot: 'yes'
        },
        '7bc381ff': {
          publicKey:
            'npuba4jaftckeeb487azwikysx3dg3gmzp2ai64jfkb95mncqt3ny7eg93ziv2wkbf2e4nw4waaaaadd8rtspfv6wyifrp8ibpf8tu5j57p6rkggg8rsc9zfripujnbmyaiq4htq9jz8',
          privateKey:
            'npvta8jaftcjeb2vezpkjfv9g82qpqwu5r7g57cb6ws2udp74xpcgb752kgq88ncibgvfgxaaaaaa29v6ndjn9ffubm5ruamjrwny4q9mrd4tttzv6az73m4dnumak7sdxgkkuyxzbm6',
          path: "/44'/20036'/100/6",
          derivedFromRoot: 'yes'
        }
      }
    }
  }
}

const testUser2 = {
  userId: 'TheNewGuy',
  wallets: {
    TheNewGuy: {
      walletId: 'TheNewGuy',
      accountCreationKeyHash: 'e58b438d',
      accounts: {
        ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun: {
          address: 'ndarc8etbkidm5ewytxhvzida94sgg9mvr3aswufbty8zcun',
          addressData: {
            nickname: 'Account 1'
          },
          ownershipKey: 'b32d1dfb',
          validationKeys: []
        },
        ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz: {
          address: 'ndaiap4q2me85dtnp5naifa5d8xtmrimm4b997hr9mcm38vz',
          addressData: {
            nickname: 'Account 2'
          },
          ownershipKey: 'e54b7ece',
          validationKeys: []
        },
        ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55: {
          address: 'ndamm8kxzf9754axd24wrkh3agvj2cidx75wdfhjiufcjf55',
          addressData: {
            nickname: 'Account 3'
          },
          ownershipKey: '3fcd79f1',
          validationKeys: []
        }
      },
      keys: {
        e58b438d: {
          publicKey: '',
          privateKey:
            'npvta8jaftcjed7stf8bkz3nnipyqahdau5vexjr52ez4wvcuusgimc7fjac52pbwa4fdissaaaanv2qizmsubdetvqmqys8fwvj4pw2b9vg9jire7cd3xm9cg74sc75yu44tbkhh23s',
          path: KeyPathHelper.accountCreationKeyPath(),
          derivedFromRoot: 'yes'
        },
        b32d1dfb: {
          publicKey:
            'npuba4jaftckeeb8m2xih7dbwsqndrt2hzz6k6xxvn3k48kss87uwuta2rbaj2dz7tie4nw4waaaaaahwni9kfku8detab44b4mqenf3qx4skffjxzfmgev5pipapeiaeqqbqsvdzkit',
          privateKey:
            'npvta8jaftcjed2vzrknnzf8fj83q6bsfqnf72q7pr4b4evxzgfgn24tznve5gcfkbgvfgxaaaaaab7dch4tkwzs3eiaqysqu5tdbqmxqwctjkpp3k3te85kdidjcabdu6fkrqkq356k',
          path: "/44'/20036'/100/0",
          derivedFromRoot: 'yes'
        },
        e54b7ece: {
          publicKey:
            'npuba4jaftckeebbfznxrdsdk893xn64axz3fv5ayg8ygip6grpgeudqkfyij9kjbm2e4nw4waaaaaa6pmfcm6tvpiar9xgi3udqbbarv2g7i5dei6rj5ppw76zdjkyf5bqigdtzb36x',
          privateKey:
            'npvta8jaftcjeai6tm5yy3j4ruh6tc9c2qgyt8jhijns3j9ib8i5jdhfvcpkj52tgbgvfgxaaaaaahdk3iu9en5kad97jugns5siid68bzkg23chd4q5mphrf24kxtq2mwu775a2cky7',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        '3fcd79f1': {
          publicKey:
            'npuba4jaftckeebsfgvpt2agx6pf7i5k233d4bcetgpx9vfp9wcp7pwkbtzufqu4ktse4nw4waaaaabf92p46hd6zi322kjg7f46vfdi4xs5agy3nn24b386mwprk9hjzgx8yckunvtz',
          privateKey:
            'npvta8jaftcjec3htae7jzmrbbrtxyw5e8nmg3yuahca77rqm2y2cyzw4nuevcbeabgvfgxaaaaaajr8dqzb29f4gqgcujzjqze3i4gxng2bxymdggsqrzc7dm4z34p3x7igz6vthnjt',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        }
      }
    }
  }
}

const password1 = '1234asdf'
const password2 = ';lkj-098'

test('Make sure we get back falsy if nothing set for user', async () => {
  expect(UserStore.getUser()).toBeFalsy()
})

test('Make sure we can set and reset a user', async () => {
  UserStore.setUser(testUser1)
  expect(UserStore.getUser()).toBe(testUser1)
  UserStore.setUser(testUser2)
  expect(UserStore.getUser()).toBe(testUser2)
  UserStore.setUser(testUser1)
  expect(UserStore.getUser()).toBe(testUser1)
  UserStore.setUser(testUser2)
  expect(UserStore.getUser()).toBe(testUser2)
  expect(UserStore.getUser()).not.toBe(testUser1)
})

test('Make sure we get back falsy if nothing set for password', async () => {
  expect(UserStore.getPassword()).toBeFalsy()
})

test('Make sure we can set and reset a password', async () => {
  UserStore.setPassword(password1)
  expect(UserStore.getPassword()).toBe(password1)
  UserStore.setPassword(password2)
  expect(UserStore.getPassword()).toBe(password2)
  UserStore.setPassword(password1)
  expect(UserStore.getPassword()).toBe(password1)
  UserStore.setPassword(password2)
  expect(UserStore.getPassword()).toBe(password2)
  expect(UserStore.getPassword()).not.toBe(password1)
})
