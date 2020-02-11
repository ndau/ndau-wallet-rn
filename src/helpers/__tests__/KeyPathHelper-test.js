/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import KeyPathHelper from '../KeyPathHelper'

const user = {
  userId: 'Wallet 1',
  wallets: {
    '2c963f83': {
      walletId: 'Wallet 1',
      accountCreationKeyHash: '308c3bc3',
      accounts: {
        ndaabymd5p86e5bixjzh7zm45uin4yv64dmtqhzfpepvw922: {
          address: 'ndaabymd5p86e5bixjzh7zm45uin4yv64dmtqhzfpepvw922',
          addressData: {
            balance: 1034000000,
            validationKeys: [
              'npuba4jaftckeeb48b8qsekr6v33phcm6g2xthk4gx6bczhqfpmgaqyzidv364mypnsiw4etsaaaaacg7pu8xgbdxi7u4w5wqs49ntjw68hvwvfu7cz2kkfa46rnxjqq5f948qiz466q'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc',
            lock: {
              noticePeriod: '6m',
              unlocksOn: null,
              bonus: 0
            },
            stake: null,
            lastEAIUpdate: '2019-04-03T00:05:04Z',
            lastWAAUpdate: '2019-04-02T19:31:35Z',
            weightedAverageAge: '2dt19h55m48s220684us',
            sequence: 3,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 1',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 70000000000
          },
          ownershipKey: 'baed9596',
          validationKeys: ['d0aa4ea3']
        },
        ndaavztqwam7visagifc49d47cpa2mnh7i7bab4c8wjbwikn: {
          address: 'ndaavztqwam7visagifc49d47cpa2mnh7i7bab4c8wjbwikn',
          addressData: {
            balance: 1023000000,
            validationKeys: [
              'npuba4jaftckeeb34gpzjxpjmvry2y8zqadbx6v7wst3qvpta7v8bviv4tmgih66misi2zqcqaaaaae4w4y5z2xrejdk5t7nsdkxb4rzir3bhwsgsrj23g9ugq3r64db38b9qctwgtmr'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza',
            lock: {
              noticePeriod: '3m',
              unlocksOn: '2019-07-02T01:36:37Z',
              bonus: 0
            },
            stake: null,
            lastEAIUpdate: '2019-04-03T01:36:37Z',
            lastWAAUpdate: '2019-04-03T01:34:26Z',
            weightedAverageAge: '2dt13h52m57s291734us',
            sequence: 4,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 2',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 30000000000
          },
          ownershipKey: '20fe98fd',
          validationKeys: ['5f4ab071']
        },
        ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze: {
          address: 'ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze',
          addressData: {
            balance: 16422859,
            validationKeys: [
              'npuba4jaftckeeba47fzizq3gs2vnnawj329tkiuh4xi2u8gurh3y2vu8jgbvndeh9sieut3eaaaaaaxrtumjidjk2y6fcdsb6rdy5gc9yfptsexhan92ch373d52z7y8izmz8j7rddg'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: [
              'ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4'
            ],
            delegationNode: 'ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa',
            lock: null,
            stake: null,
            lastEAIUpdate: '2019-03-26T19:49:12Z',
            lastWAAUpdate: '2019-03-11T19:48:25Z',
            weightedAverageAge: '5m1dt6h36m42s476192us',
            sequence: 1,
            holds: null,
            recourseSettings: {
              period: '1dt23h59m',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 3',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 60000000000,
            incomingRewardsFromNickname: 'Account 4 '
          },
          ownershipKey: 'ddb5fb2c',
          validationKeys: ['227f6338']
        },
        ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4: {
          address: 'ndae2m6h32eee2qci9fjhzmfxtpni6pizmks839npbqz8yq4',
          addressData: {
            balance: 100000000,
            validationKeys: [
              'npuba4jaftckeebijwfxqwdyk3nt9bjxek7dq2mx2kjfgpbkq7dmrpa3rep5bsp3362idhqsyaaaaabaff879kt39fvjd7nntqutczzu2hm6u7vr73uutw3gqjxeqvgyjzf2es8ry7fi'
            ],
            validationScript: null,
            rewardsTarget: 'ndac6k7vxp5majxe8ed2wagp2dw8ip8ce3mwxeuttym9c9ze',
            incomingRewardsFrom: null,
            delegationNode: 'ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa',
            lock: {
              noticePeriod: '1y25d',
              unlocksOn: '2019-06-26T00:00:00Z',
              bonus: 0
            },
            stake: null,
            lastEAIUpdate: '2019-03-24T23:59:23Z',
            lastWAAUpdate: '2018-06-01T00:00:00Z',
            weightedAverageAge: '10m8dt15h27m24s172149us',
            sequence: 1,
            holds: null,
            recourseSettings: {
              period: '1dt23h59m',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 4',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 100000000000,
            rewardsTargetNickname: 'Account 3'
          },
          ownershipKey: 'f5b17631',
          validationKeys: ['d6762b70']
        },
        ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech: {
          address: 'ndafxgxquvuzrmrungp3kgn5jnsgptxd7th67ymxxwsscech',
          addressData: {
            balance: 1300000000,
            validationKeys: [
              'npuba4jaftckeebzzd984rsz9gmhsgp5hme87dxt3vfpd6y38ubcpybgd59gtu9riyiixnay8aaaaae7i86ypxnwsfqfnkq7r83bk2jeikqwxq3xxzvwd7idxtksvkqrk9f5w58wpdjr'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza',
            lock: {
              noticePeriod: '3m',
              unlocksOn: '2019-07-02T02:12:21Z',
              bonus: 0
            },
            stake: null,
            lastEAIUpdate: '2019-04-03T02:12:21Z',
            lastWAAUpdate: '2019-04-03T02:06:48Z',
            weightedAverageAge: '2dt13h20m35s320985us',
            sequence: 4,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 5',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 30000000000
          },
          ownershipKey: '358fffef',
          validationKeys: ['987ae7b1']
        },
        ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6: {
          address: 'ndagxwdab8xcqugwnsyg6nzvvw9faun6ah5fx6w7r7ee98h6',
          addressData: {
            balance: 102345000000,
            validationKeys: [
              'npuba4jaftckeebaw5tse46r9rrasmagk86crg8wmf8zxxx9uywqjdf6d2k8eri4a22iwpatnaaaaacdyrab4bz5fnpy3bbw4etqqqmqjxjp823uiz3effeq4b9esxita8ggdwhug2pf'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc',
            lock: null,
            stake: null,
            lastEAIUpdate: '2019-04-02T19:29:17Z',
            lastWAAUpdate: '2019-04-02T19:28:54Z',
            weightedAverageAge: '2dt19h58m29s694200us',
            sequence: 2,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: '2019-04-05T12:48:19Z',
            parent: null,
            progenitor: null,
            nickname: 'Account 6',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 0
          },
          ownershipKey: '569f6154',
          validationKeys: ['b67b151d']
        },
        ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3: {
          address: 'ndajh3pt3appxib22sjf4ec6deu7mwgqph2jjd26i63iepp3',
          addressData: {
            balance: 27047400000,
            validationKeys: [
              'npuba4jaftckeeb8jb8gzn7n9v7sw82yyhhekvvg4f8at9zrzxads6hf9tya8bfnxbiipfnqqaaaaabw4wez2ritu7za8fep9ajxqy8x4j6bkpdyruwb8fqzk2s6rt2qr5cbwkkmjpa3'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc',
            lock: null,
            stake: null,
            lastEAIUpdate: '2019-04-03T02:06:48Z',
            lastWAAUpdate: '2019-03-26T23:57:31Z',
            weightedAverageAge: '9dt15h29m52s413627us',
            sequence: 11,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 7',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 0
          },
          ownershipKey: 'f2fb495a',
          validationKeys: ['71e9485e']
        },
        ndajsmbxzesecwj5dcuz438vv9kbenxiu2u2eu95zfc9kiba: {
          address: 'ndajsmbxzesecwj5dcuz438vv9kbenxiu2u2eu95zfc9kiba',
          addressData: {
            balance: 7029000000,
            validationKeys: [
              'npuba4jaftckeebtuyaanpikemzkmybpkcypunrd796k9xnf4ndrkg95rvyx9yam7rii4yecgaaaaaej89g6tec729dcyihsde4ubatm84zmnd4k6czhedf65k8k9nxa2scrdgmcbmyu'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza',
            lock: {
              noticePeriod: '12m',
              unlocksOn: null,
              bonus: 0
            },
            stake: null,
            lastEAIUpdate: '2019-04-03T00:17:32Z',
            lastWAAUpdate: '2019-04-03T01:33:45Z',
            weightedAverageAge: '2dt14h42m52s105281us',
            sequence: 3,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 8',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 100000000000
          },
          ownershipKey: '7256cb12',
          validationKeys: ['2128ca15']
        },
        ndamiu8mr8s4taux33r8eacmc9ahd6fz9wjf95shr7bedjrv: {
          address: 'ndamiu8mr8s4taux33r8eacmc9ahd6fz9wjf95shr7bedjrv',
          addressData: {
            balance: 6745600000,
            validationKeys: [
              'npuba4jaftckeeb2mvrzjx72vmd67vaehhpfht6zpfpte8ebkf2u6uzidvq9jgzpinaih6hq2aaaaacbuxgc6jtpq59v9gg2c9stmdt2cabir8frfq4bsq6keehvum7er98p2u8ysygx'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc',
            lock: null,
            stake: null,
            lastEAIUpdate: '2019-04-02T19:31:32Z',
            lastWAAUpdate: '2019-04-02T19:29:21Z',
            weightedAverageAge: '2dt19h58m3s126850us',
            sequence: 2,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 9',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 0
          },
          ownershipKey: '39aa93bb',
          validationKeys: ['4a81c192']
        },
        ndanai5i3atctzm4w5mxjp24zxyk6aeihtf297i23rc3hs54: {
          address: 'ndanai5i3atctzm4w5mxjp24zxyk6aeihtf297i23rc3hs54',
          addressData: {
            balance: 3476000000,
            validationKeys: [
              'npuba4jaftckeebt6k65kqfngjd37dvrbkj5hjkn7iwayfdaet5vv92ksar3a854bu2iwqariaaaaadxy8g99z7b7cju4nwyi9agrtr6kyd8a4r3aak7vb3894ek2rfcn58ijhnund8u'
            ],
            validationScript: null,
            rewardsTarget: null,
            incomingRewardsFrom: null,
            delegationNode: 'ndarw5i7rmqtqstw4mtnchmfvxnrq4k3e2ytsyvsc7nxt2y7',
            lock: null,
            stake: null,
            lastEAIUpdate: '2019-04-02T19:33:47Z',
            lastWAAUpdate: '2019-04-02T19:33:07Z',
            weightedAverageAge: '2dt19h54m16s739001us',
            sequence: 2,
            holds: null,
            recourseSettings: {
              period: '2d',
              changesAt: null,
              next: null
            },
            currencySeatDate: null,
            parent: null,
            progenitor: null,
            nickname: 'Account 10',
            walletId: 'Wallet 1',
            eaiValueForDisplay: 0
          },
          ownershipKey: '2eb1bb1f',
          validationKeys: ['094995d2']
        }
      },
      keys: {
        '308c3bc3': {
          publicKey: '',
          privateKey:
            'npvta8jaftcjea446vn5snnzfcf8qvvj9cp6tyv6s4bja6xg8zm2h2vtsj9hu9ghga9ifmrsaaaantpt9panczx3iyct5k4zwg7iw3jfizuqs8j9wkrphg3qkxr7gjbgkf9weizd7f8h',
          path: "/44'/20036'/100",
          derivedFromRoot: 'yes'
        },
        baed9596: {
          publicKey:
            'npuba4jaftckeebrvj7icu9eknzrzu3tyq3szizqj625qei8qszrqszu4bmv6wr6cssebgfnuaaaaad59xbxu8q3i9k27c8pzkxbf3jh8yw9udpracyi4c585xjcbn3d54vgsew334jd',
          privateKey:
            'npvta8jaftcjebgp7mem3punvbhh4cx7beztxyfkz7vzdw2qyyjdkvew8x2tg3mbnbajtmesaaaaa897ipnzvykh4yhizvp4xijqkj9xxh6s5m2axugsy9y7kismgi88whzcvw6pzycu',
          path: "/44'/20036'/100/7",
          derivedFromRoot: 'yes'
        },
        '20fe98fd': {
          publicKey:
            'npuba4jaftckeeb3jme6cxp8wsegu7v5kes43d2vbp779h3qbxr6k999pnyzqf9t5nsebgfnuaaaaahmprn5w5rzuhyftrgvxfqsrymgyffavxtw8w9zq2af8x72pb6qprdngjrmrmfa',
          privateKey:
            'npvta8jaftcjeakiyzb5xegpnz6k3r5a95cj9gf4jrr8wpecartrxkxv5ifiykv84bajtmesaaaab45m5g7g576t7tnm3w7jmwd7u3xtjie7nphxh75yabrxrqdirdvm2fhgzss3fshd',
          path: "/44'/20036'/100/14",
          derivedFromRoot: 'yes'
        },
        ddb5fb2c: {
          publicKey:
            'npuba4jaftckeebgxwhzw2mir4czjkuwyp7g9vpsh4bx9t5dym87h8gbkbqinmjqdjaebgfnuaaaaabciwbqfusup9mpmwwi95p9diatshqegkq4j8jwyd7qayid9tvy64uig6he34ei',
          privateKey:
            'npvta8jaftcjedzdyjeqdrxh5k9dmdr5xqxjy6q6tp34hgj4sppn386yzrvmk4ke2bajtmesaaaaaiufamtnwevr45k7fch85r24aenb5tbuvyurupfs9msfua96n7zgwp92tjxzekmv',
          path: "/44'/20036'/100/2",
          derivedFromRoot: 'yes'
        },
        f5b17631: {
          publicKey:
            'npuba4jaftckeebetgbepdnd9i99mwmtj8cjphfwnec3z2shy6dyu6t2mt8zkxg86i2ebgfnuaaaaaax7xqpbtrwsj896d6izqqw4nbzw3gde4ygc58rfzzwcxxrxrgvdhcrf7izg49q',
          privateKey:
            'npvta8jaftcjedk7pfu7nk5ekdu9gwwqztrmryqcf39tv2djhgkcgwzsv9ebzdmb2bajtmesaaaaafrpmvinm7ecrz9a9cf5vxgvap7gjs3gxtsy9v3p77axpm7m3w232pduuiibs8qp',
          path: "/44'/20036'/100/1",
          derivedFromRoot: 'yes'
        },
        '358fffef': {
          publicKey:
            'npuba4jaftckeebd3kvpv4ngpqi6ne5ti9a47ryu4kvqb7qan84y7wut5n34bue7g72ebgfnuaaaaacbd87ke2nj35yyd532fzhcjg3mbfywdyef8ncxjbtjesshgt2qa7jy38nu9hi7',
          privateKey:
            'npvta8jaftcjeby72nd8kgki3pqa2gb5avav5829px86pj4am55fkjh28nuk8v78sbajtmesaaaaasi9zktgdcqq7xs88qbp32ujyk2jpxa7tbrvaxkinkjeeb3wqdshmeth3wrh34u6',
          path: "/44'/20036'/100/4",
          derivedFromRoot: 'yes'
        },
        '569f6154': {
          publicKey:
            'npuba4jaftckeebpwg4zs7zknwftppzazp5etsm9d44fndf5z7xyeb3g4ipn23xxpxaebgfnuaaaaadcaiadxhwk5wth3hg58v82suv99p5ck3pheqk6hrzjqbkps9v9bti76nhkfa35',
          privateKey:
            'npvta8jaftcjecspxamtkbnb5w34ai7ft8h844563wiwkj3ybikc47kvfza9d355kbajtmesaaaaa2scaa7j7cy7ej8j3y9w9yeew995q2uymj3duzb574mskvnh692nk4bj3326rdas',
          path: "/44'/20036'/100/6",
          derivedFromRoot: 'yes'
        },
        f2fb495a: {
          publicKey:
            'npuba4jaftckeeb6kcdj4hngiv8b4is4z2h3hwzypq9etkvnpjn8483uq43i99rsf82ebgfnuaaaaabs4jwv9k8dnth46qyzjsmw6cfqgy6ipvqb4hky8gwtg9tpe22yijbdg4sw4i5u',
          privateKey:
            'npvta8jaftcjed3nca6nhrzikygcsmyxh6yxjwxxh5m2tbhvb5is32zkubawiemmibajtmesaaaaangupe94zs5ej8zdxx4nc7hatmtxzcdn5sqt4xztxejz6mjggfucjiby2vqhikk9',
          path: "/44'/20036'/100/3",
          derivedFromRoot: 'yes'
        },
        '7256cb12': {
          publicKey:
            'npuba4jaftckeebpyvemss5km9x9um6yiqpxb3as25tnehkw56pymhyp2fd7q7ke3eiebgfnuaaaaafq7a9khy4bsvyvjnnm3k35qecp5b7yxpfyuuu8k9bz52hv9zieyd3xqx8cskfe',
          privateKey:
            'npvta8jaftcjecqj2uefwfzvbcuwkmydhfhdk6ms72cfrjv3cnwfriuvrn3t9pupybajtmesaaaabmzih4t7ysne7w4mdc8kyq5tavq2rpxmjpwwwzuz2p88b6974bfs8w2gbmkgm2w7',
          path: "/44'/20036'/100/10",
          derivedFromRoot: 'yes'
        },
        '39aa93bb': {
          publicKey:
            'npuba4jaftckeebd4xjixd8hfhybr9ssv7zbh5fzgnvxent8weurevruv7yajcd4scaebgfnuaaaaaedgws6a7c6ng26hsgw2vkca9dptn4ipjk8digubu5cxcuwygh477heuzurqpk5',
          privateKey:
            'npvta8jaftcjebedpnax5sj7eu8tcs38fzveqc8xwi7s3uxjtmk2wc3v8ck9snq6ybajtmesaaaaba3xehahizdbyhb6bxge4ssh25nmgudkkzs4bwsny2xiwxftt8zrjndk85ej7vdp',
          path: "/44'/20036'/100/8",
          derivedFromRoot: 'yes'
        },
        '2eb1bb1f': {
          publicKey:
            'npuba4jaftckeebt8ijhuqzt5esq3vu2r38pbdq93zna9arsbsvdb7ys8ywh2ifch72ebgfnuaaaaagiyags3tmx3v9dfu3guyctvrrf4xqghcx7ywdgp6f2i5pcu5sx3ckrw78jtf6g',
          privateKey:
            'npvta8jaftcjedeedu5h82euv29fhbrtuaxz8nfnzwy8p499ctdvex5ajsmdm9k48bajtmesaaaabufsbwgnk7qn923nyjwxswn553qxmtt2xrpxa3vrbqcg5iwy6fqiv8vi7gatj3eb',
          path: "/44'/20036'/100/12",
          derivedFromRoot: 'yes'
        }
      },
      walletName: 'Wallet 1'
    }
  }
}

test('test getLegacy2Thru4RootAccountValidationKeyPath', async () => {
  const wallet = user.wallets['2c963f83']
  const account1 =
    wallet.accounts['ndaabymd5p86e5bixjzh7zm45uin4yv64dmtqhzfpepvw922']
  const account2 =
    wallet.accounts['ndamiu8mr8s4taux33r8eacmc9ahd6fz9wjf95shr7bedjrv']
  const account3 =
    wallet.accounts['ndanai5i3atctzm4w5mxjp24zxyk6aeihtf297i23rc3hs54']

  expect(
    KeyPathHelper.getLegacy2Thru4RootAccountValidationKeyPath(wallet, account1)
  ).toBe(`/44'/20036'/100/10000/7`)
  expect(
    KeyPathHelper.getLegacy2Thru4RootAccountValidationKeyPath(wallet, account2)
  ).toBe(`/44'/20036'/100/10000/8`)
  expect(
    KeyPathHelper.getLegacy2Thru4RootAccountValidationKeyPath(wallet, account3)
  ).toBe(`/44'/20036'/100/10000/12`)
})

test('test getLegacy2Thru4AccountValidationKeyPath', async () => {
  const wallet = user.wallets['2c963f83']
  const account1 =
    wallet.accounts['ndaabymd5p86e5bixjzh7zm45uin4yv64dmtqhzfpepvw922']
  const account2 =
    wallet.accounts['ndamiu8mr8s4taux33r8eacmc9ahd6fz9wjf95shr7bedjrv']
  const account3 =
    wallet.accounts['ndanai5i3atctzm4w5mxjp24zxyk6aeihtf297i23rc3hs54']

  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(wallet, account1)
  ).toBe(`/44'/20036'/100/10000/7/1`)
  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(wallet, account2)
  ).toBe(`/44'/20036'/100/10000/8/1`)
  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(wallet, account3)
  ).toBe(`/44'/20036'/100/10000/12/1`)
})

test('test getLegacy2Thru4AccountValidationKeyPath with index', async () => {
  const wallet = user.wallets['2c963f83']
  const account1 =
    wallet.accounts['ndaabymd5p86e5bixjzh7zm45uin4yv64dmtqhzfpepvw922']
  const account2 =
    wallet.accounts['ndamiu8mr8s4taux33r8eacmc9ahd6fz9wjf95shr7bedjrv']
  const account3 =
    wallet.accounts['ndanai5i3atctzm4w5mxjp24zxyk6aeihtf297i23rc3hs54']

  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(wallet, account1, 23)
  ).toBe(`/44'/20036'/100/10000/7/23`)
  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(wallet, account2, 500)
  ).toBe(`/44'/20036'/100/10000/8/500`)
  expect(
    KeyPathHelper.getLegacy2Thru4AccountValidationKeyPath(
      wallet,
      account3,
      10000000
    )
  ).toBe(`/44'/20036'/100/10000/12/10000000`)
})
