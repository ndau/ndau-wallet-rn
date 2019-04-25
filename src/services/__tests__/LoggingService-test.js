import LoggingService from '../LoggingService'
import { expect } from 'chai'

const logData = [
  {
    id: '8e14ba1a-3040-83fa-5c9b-4013ddf61d74',
    lengthAtInsertion: 1468,
    level: 'debug',
    message: 'Performing GET on https://api.ndau.tech:31302/order/current',
    timeStamp: '2019-04-23T18:49:00.528Z',
    color: '#5787cf'
  },
  {
    id: 'df8b88d0-5eb3-fa89-8c61-36ca34c2477b',
    lengthAtInsertion: 1467,
    level: 'debug',
    message:
      'https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json response123: {\n  "apinodes": [\n    "api.ndau.tech:31300",\n    "api.ndau.tech:31301",\n    "api.ndau.tech:31302",\n    "api.ndau.tech:31303",\n    "api.ndau.tech:31304"\n  ]\n}',
    timeStamp: '2019-04-23T18:49:00.523Z',
    color: '#5787cf'
  },
  {
    id: '9ed6d778-c998-af7c-fb41-02e97d433803',
    lengthAtInsertion: 1466,
    level: 'debug',
    message:
      'Performing GET on https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json',
    timeStamp: '2019-04-23T18:49:00.107Z',
    color: '#5787cf'
  },
  {
    id: 'ba88a59f-a1c7-69f8-2082-ceec248644ed',
    lengthAtInsertion: 1465,
    level: 'debug',
    message:
      'Service Discovery URL: https://s3.us-east-2.amazonaws.com/ndau-json/services-test.json',
    timeStamp: '2019-04-23T18:49:00.105Z',
    color: '#5787cf'
  },
  {
    id: 'd0d85ce8-6c1f-f273-ff58-72238a87d7e0',
    lengthAtInsertion: 1464,
    level: 'debug',
    message: 'user in Authentication found is',
    timeStamp: '2019-04-23T18:49:00.100Z',
    color: '#5787cf'
  },
  {
    id: '18cbcb89-afff-137c-0605-c1ed21309778',
    lengthAtInsertion: 1463,
    level: 'debug',
    message: 'Connectivity changed: true',
    timeStamp: '2019-04-23T18:48:55.863Z',
    color: '#5787cf'
  },
  {
    id: 'ae2bae97-2464-938a-bfcf-fbb2e207d302',
    lengthAtInsertion: 1462,
    level: 'debug',
    message:
      'keys found in getAllKeys are PasswordIndex,MultiSafe_Meta_Wallet1,MultiSafe_Data_Wallet1',
    timeStamp: '2019-04-23T18:48:55.861Z',
    color: '#5787cf'
  },
  {
    id: 'ccea1d0d-7b9e-0b4f-27f7-14d8df66ca6f',
    lengthAtInsertion: 2,
    level: 'debug',
    message: 'Connectivity changed: true',
    timeStamp: '2019-04-23T18:48:55.491Z',
    color: '#5787cf'
  },
  {
    id: 'a050f565-e4f7-7941-1fc2-14e140dc3183',
    lengthAtInsertion: 1,
    level: 'seperator',
    message: '[NETINFO] CONNECTION TO WIFI',
    timeStamp: '2019-04-23T18:48:55.489Z',
    color: '#FFF'
  }
]

test('make sure we can remove private keys', async () => {
  const scrubbedData = await LoggingService.scrubData(` {
        "userId": "Wallet 1",
        "wallets": {
          "2c963f83": {
            "walletId": "Wallet 1",
            "accountCreationKeyHash": "b7e0ac5e",
            "accounts": {
              "ndaeveqwasgpeujrs54qbymr4njj9yiqdatmen3mqfybbcp7": {
                "address": "ndaeveqwasgpeujrs54qbymr4njj9yiqdatmen3mqfybbcp7",
                "addressData": {
                  "balance": 74614000000,
                  "validationKeys": [
                    "npuba4jaftckeeb84inavvf9mu9gahm87nf693b7bupqrriq9gkuevtehe7atgqe8usfiscm6aaaaaa2wg96mnswb84uy5uvz49rg4xx6r697btfv4hwctj3ctp5c3z4iszhytcbm74f"
                  ],
                  "validationScript": null,
                  "rewardsTarget": null,
                  "incomingRewardsFrom": null,
                  "delegationNode": "ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc",
                  "lock": null,
                  "stake": null,
                  "lastEAIUpdate": "2019-04-23T02:49:14Z",
                  "lastWAAUpdate": "2019-04-23T00:49:53Z",
                  "weightedAverageAge": "t17h20m39s883531us",
                  "sequence": 6,
                  "settlements": null,
                  "settlementSettings": {
                    "period": "2d",
                    "changesAt": null,
                    "next": null
                  },
                  "currencySeatDate": null,
                  "parent": null,
                  "progenitor": null,
                  "nickname": "Account 1",
                  "walletId": "Wallet 1",
                  "eaiValueForDisplay": 0
                },
                "ownershipKey": "ec029bde",
                "validationKeys": [
                  "c90cd429"
                ]
              },
              "ndanvgqvavg5sk4tyckjm8dyiwkh2ggvbzrjxzfb7rh5f9ci": {
                "address": "ndanvgqvavg5sk4tyckjm8dyiwkh2ggvbzrjxzfb7rh5f9ci",
                "addressData": {
                  "balance": 6655000000,
                  "validationKeys": [
                    "npuba4jaftckeeb7qveg5x2bjah5h7he2yzkhk28p2wn2xigshr6iedunhsfu9zfbnsfiscm6aaaaae6ikzvgkh2j3er5jswqcv7ajwrgw4cadva69syvskqi8t2cuh54mm5xi77gstu"
                  ],
                  "validationScript": null,
                  "rewardsTarget": "ndarxxerparq9abudhnwemmskrds37v8vghwmd29e3kipp9s",
                  "incomingRewardsFrom": null,
                  "delegationNode": "ndaq3nqhez3vvxn8rx4m6s6n3kv7k9js8i3xw8hqnwvi2ete",
                  "lock": {
                    "noticePeriod": "3m",
                    "unlocksOn": "2019-07-22T03:27:04Z",
                    "bonus": 0
                  },
                  "stake": null,
                  "lastEAIUpdate": "2019-04-23T03:27:06Z",
                  "lastWAAUpdate": "2019-04-23T02:49:14Z",
                  "weightedAverageAge": "t15h21m18s766106us",
                  "sequence": 5,
                  "settlements": [
                    {
                      "Qty": 6655000000,
                      "Expiry": "2019-04-25T02:49:14Z"
                    }
                  ],
                  "settlementSettings": {
                    "period": "2d",
                    "changesAt": null,
                    "next": null
                  },
                  "currencySeatDate": null,
                  "parent": null,
                  "progenitor": null,
                  "nickname": "Account 2",
                  "walletId": "Wallet 1",
                  "eaiValueForDisplay": 40000000000,
                  "rewardsTargetNickname": "Account 9"
                },
                "ownershipKey": "50f1de74",
                "validationKeys": [
                  "0e337696"
                ]
              },
              "ndahbbimfyq23qceaph2geeidxtfds65zgbdtb97nap3nxs2": {
                "address": "ndahbbimfyq23qceaph2geeidxtfds65zgbdtb97nap3nxs2",
                "addressData": {
                  "nickname": "Account 3",
                  "walletId": "Wallet 1"
                },
                "ownershipKey": "a7effe0d",
                "validationKeys": []
              },
              "ndad78x69bkaw6brrsnat6zyss42iibg3326u2sv6xn693n4": {
                "address": "ndad78x69bkaw6brrsnat6zyss42iibg3326u2sv6xn693n4",
                "addressData": {
                  "nickname": "Account 4",
                  "walletId": "Wallet 1"
                },
                "ownershipKey": "3b36df29",
                "validationKeys": []
              },
              "ndaftkt5rp3e2ikieecg8iqvvbusymdbcp2psf4y2zri5d6s": {
                "address": "ndaftkt5rp3e2ikieecg8iqvvbusymdbcp2psf4y2zri5d6s",
                "addressData": {
                  "nickname": "Account 5",
                  "walletId": "Wallet 1"
                },
                "ownershipKey": "87d09f4d",
                "validationKeys": []
              },
              "ndar5b4ysp34iu2inwy8c49hq8fb3bhn3yypsw9ywnf8aesk": {
                "address": "ndar5b4ysp34iu2inwy8c49hq8fb3bhn3yypsw9ywnf8aesk",
                "addressData": {
                  "nickname": "Account 6",
                  "walletId": "Wallet 1"
                },
                "ownershipKey": "ce286578",
                "validationKeys": []
              },
              "ndarc3nab4x3g95px9eyct7ivhbduusus7e9xqvcnxsb4dui": {
                "address": "ndarc3nab4x3g95px9eyct7ivhbduusus7e9xqvcnxsb4dui",
                "addressData": {
                  "balance": 6846000000,
                  "validationKeys": [
                    "npuba4jaftckeeb7qveg5x2bjah5h7he2yzkhk28p2wn2xigshr6iedunhsfu9zfbnsfiscm6aaaaae6ikzvgkh2j3er5jswqcv7ajwrgw4cadva69syvskqi8t2cuh54mm5xi77gstu"
                  ],
                  "validationScript": null,
                  "rewardsTarget": null,
                  "incomingRewardsFrom": null,
                  "delegationNode": "ndarw5i7rmqtqstw4mtnchmfvxnrq4k3e2ytsyvsc7nxt2y7",
                  "lock": null,
                  "stake": null,
                  "lastEAIUpdate": "2019-04-23T01:13:44Z",
                  "lastWAAUpdate": "2019-04-23T01:12:32Z",
                  "weightedAverageAge": "t16h59m13s386244us",
                  "sequence": 2,
                  "settlements": [
                    {
                      "Qty": 3423000000,
                      "Expiry": "2019-04-25T01:10:07Z"
                    },
                    {
                      "Qty": 3423000000,
                      "Expiry": "2019-04-25T01:12:32Z"
                    }
                  ],
                  "settlementSettings": {
                    "period": "2d",
                    "changesAt": null,
                    "next": null
                  },
                  "currencySeatDate": null,
                  "parent": null,
                  "progenitor": null,
                  "nickname": "Account 7",
                  "walletId": "Wallet 1",
                  "eaiValueForDisplay": 0
                },
                "ownershipKey": "59429571",
                "validationKeys": [
                  "0e337696"
                ]
              },
              "ndajc5jjqew4n6t52udhgj2z9x88jkxgm9hpwdp8a7vatnck": {
                "address": "ndajc5jjqew4n6t52udhgj2z9x88jkxgm9hpwdp8a7vatnck",
                "addressData": {
                  "balance": 3423000000,
                  "validationKeys": [
                    "npuba4jaftckeebqtfkzyamhmmaqidpg8q4tsmzu69hkte3m54pajk33g4j25hqshdifiscm6aaaaabcgwn43mt9ke9x5amcqzzmzee6veznpq4xyyhfk58jnkqdeghzt5cpgtpcmxsi"
                  ],
                  "validationScript": null,
                  "rewardsTarget": "ndarxxerparq9abudhnwemmskrds37v8vghwmd29e3kipp9s",
                  "incomingRewardsFrom": null,
                  "delegationNode": "ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc",
                  "lock": {
                    "noticePeriod": "3m",
                    "unlocksOn": "2019-07-22T00:54:58Z",
                    "bonus": 0
                  },
                  "stake": null,
                  "lastEAIUpdate": "2019-04-23T00:55:00Z",
                  "lastWAAUpdate": "2019-04-23T00:53:30Z",
                  "weightedAverageAge": "t17h17m3s153291us",
                  "sequence": 5,
                  "settlements": [
                    {
                      "Qty": 3423000000,
                      "Expiry": "2019-04-25T00:53:30Z"
                    }
                  ],
                  "settlementSettings": {
                    "period": "2d",
                    "changesAt": null,
                    "next": null
                  },
                  "currencySeatDate": null,
                  "parent": null,
                  "progenitor": null,
                  "nickname": "Account 8",
                  "walletId": "Wallet 1",
                  "eaiValueForDisplay": 30000000000,
                  "rewardsTargetNickname": "Account 9"
                },
                "ownershipKey": "80610e41",
                "validationKeys": [
                  "664f2783"
                ]
              },
              "ndarxxerparq9abudhnwemmskrds37v8vghwmd29e3kipp9s": {
                "address": "ndarxxerparq9abudhnwemmskrds37v8vghwmd29e3kipp9s",
                "addressData": {
                  "balance": 0,
                  "validationKeys": null,
                  "validationScript": null,
                  "rewardsTarget": null,
                  "incomingRewardsFrom": [
                    "ndajc5jjqew4n6t52udhgj2z9x88jkxgm9hpwdp8a7vatnck",
                    "ndanvgqvavg5sk4tyckjm8dyiwkh2ggvbzrjxzfb7rh5f9ci"
                  ],
                  "delegationNode": null,
                  "lock": null,
                  "stake": null,
                  "lastEAIUpdate": "2019-04-23T00:55:00Z",
                  "lastWAAUpdate": "2019-04-23T00:55:00Z",
                  "weightedAverageAge": "t17h15m32s210916us",
                  "sequence": 0,
                  "settlements": null,
                  "settlementSettings": {
                    "period": "2d",
                    "changesAt": null,
                    "next": null
                  },
                  "currencySeatDate": null,
                  "parent": null,
                  "progenitor": null,
                  "nickname": "Account 9",
                  "walletId": "Wallet 1",
                  "eaiValueForDisplay": 0,
                  "incomingRewardsFromNickname": "Account 2 "
                },
                "ownershipKey": "36273edd",
                "validationKeys": []
              }
            },
            "keys": {
              "59429571": {
                "publicKey": "npuba4jaftckeeb7syanbufeegudxtas5wsntumsc9vn8dgn6q6aq98aj6zbz3nxdise52rbwaaaaad4g3zuchffpjfqjxu4jptya2nvzpwfsh6fr32u3ppxj3s77ir37sa3frhpeegv",
                "privateKey": "npvta8jaftcjeah5e235fqgzey7k99j7bvygervbnjmw6wt9fdkhxytmgjtwfdwkqbg8d2paaaaaa8typ6st3jmkjmupnyumnpsgde75pbnb9bm8qeymmpkqnhrkd8rna4394a5f336w",
                "path": "/44'/20036'/100/7",
                "derivedFromRoot": "yes"
              },
              "b7e0ac5e": {
                "publicKey": "npuba4jaftckeebdjcgxdbfv9ndvvi4nuwrp9za4a6yfxmi8un2ach2mrggk4gfayaidn4p92aaaabucfbd3myeaiatmjbw6ep9eatnbvres3893rrb7ta3brizczveehyseibdzi4vu",
                "privateKey": "npvta8jaftcjebgme7jwaksdbsfftbd2mv4ft74mtxhywy7zu49ryjsigzre88auaa5gvr8aaaaanstii8k7tacaek4iphbdr3aeman53egrz8m52rnigim4f2x63bb7wif2m7sh7gqu",
                "path": "/44'/20036'/100",
                "derivedFromRoot": "yes"
              },
              "ec029bde": {
                "publicKey": "npuba4jaftckeebr4rskvtmm6e7s6jqs3ecqt3ndtiqhnmfn6djwrhtkd2f4tidiakse52rbwaaaaaa66nffpeqtta4myg93iynrkkr7f8nsjbfjyfyyfpsmjgnegfrsd6tv7m256q2b",
                "privateKey": "npvta8jaftcjeaweuj4qrxppzej7sdqqewgmf7v9gktxttbbwps8vne4j3duh62msbg8d2paaaaaahhdbjmjdwnigu7tz8kfvd4uv9jrvecijkptpxtmnc4jvbbtm6a9ff8smx34udp3",
                "path": "/44'/20036'/100/1",
                "derivedFromRoot": "yes"
              },
              "50f1de74": {
                "publicKey": "npuba4jaftckeebuz92fp2bvrq7bn5s5db9ct3qwfr3khue24uv2u8anyk9hwz7f3t2e52rbwaaaaabkmtzmmb79ecagvd3wxctj8hkh7f6c87y78ii9wwhse874idmiqe8cqj3rphmq",
                "privateKey": "npvta8jaftcjecjqhhg8vfr2fswtv7b6sjtk8zndwinkz87sipq899675zuysi9w8bg8d2paaaaaaku6p442rr3asbw28pfiwkrt4t9jrazzpzruch7fb6bhzqua44dtgb4ynik2qwnk",
                "path": "/44'/20036'/100/2",
                "derivedFromRoot": "yes"
              },
              "a7effe0d": {
                "publicKey": "npuba4jaftckeebvyjka7ztvn8jcxacdi7kzfyeatiu4eehs923umigjgp4kpy8fbmie52rbwaaaaabtviv2erkpucfx37sfw44gvqmpby6cbx6yzthhbp9men4vydc6x2bec2cgejyw",
                "privateKey": "npvta8jaftcjeaqzuqsv8ac56zmcajje385m3w2uxer64sk7q7fthwfk4an684fd8bg8d2paaaaaann4e8bd4vnstpqrnbpgytw5u5ipzasprfx6j32mr43dgw7s2zfqbzb25knz5xzg",
                "path": "/44'/20036'/100/3",
                "derivedFromRoot": "yes"
              },
              "3b36df29": {
                "publicKey": "npuba4jaftckeebepuyftj4kcq953jvg323cxcwdh5zmh2ky2q84eubkmn7zqhv22qie52rbwaaaaacrhek473kwvyvaeg8miskkzvgggt6789zxdhzd8ymvv2duk3g74bsd978fa6vi",
                "privateKey": "npvta8jaftcjeavdd8at7kyf6gr75khfbwx46nq88m4i868eywhvy9um9d89b644cbg8d2paaaaaav33cyzqkxe7w2bbzu4ecux63ttwrhrz77i3729xu668a6uyjzqspykk6djprwsi",
                "path": "/44'/20036'/100/4",
                "derivedFromRoot": "yes"
              },
              "87d09f4d": {
                "publicKey": "npuba4jaftckeebw7t52jpq5pznssf2bruxiwwipkzvvyi3c4tygfcm46y3tr28ehwie52rbwaaaaacw9ucrcsbm7mxyha2mxt9esp3y2xtethd3qk8rgbf75bzw8vk33a36srhy63y7",
                "privateKey": "npvta8jaftcjec95zsxvzfckm592vfanh83qzhrf7haypjsm82xfq7iec84i6x4xwbg8d2paaaaaaxh6sv2wak9k7pt2gc7nr3edqpyfnjej28muzv3sjrq2p7hw4yqih5r2t5q3qjap",
                "path": "/44'/20036'/100/5",
                "derivedFromRoot": "yes"
              },
              "ce286578": {
                "publicKey": "npuba4jaftckeebe349b6jz6rkscgrkyp9ycpsbz3p39deh8beme5xp5ukp9cnbnmbae52rbwaaaaadd4wum84m836pm5gffzquti7xs69a3rmdimtkirq4bj4iw4b32y8hq8ign3267",
                "privateKey": "npvta8jaftcjebxg34wbj4a2davua9u55zw36pkheu8zi3izk4cdtaigj3znefcckbg8d2paaaaaa28xeu9yu9yrdk83tjp5wwkhpnhh2gm424c6kud5yskqufgsqqfzs6rjxeb8n6f5",
                "path": "/44'/20036'/100/6",
                "derivedFromRoot": "yes"
              },
              "80610e41": {
                "publicKey": "npuba4jaftckeebshze7vv829nwxcij2eavj3e7qp4xpnitgn8kwsep5bkzmwr5cdpse52rbwaaaaaek6xvrppmqyzr6ie4j6vfnwkx2xc7ipbtbpwpbfp7sktaqdgdbtk5hxt4hnbpe",
                "privateKey": "npvta8jaftcjec424gjupsx9sc6azxigpne278y7cubnd44cf2uyrgqfn7sppbpaabg8d2paaaaabczfn55mk5xx59cbgure3mfcxqfizkdinimpdijmrncwids3s2nkytynkr7c7s5w",
                "path": "/44'/20036'/100/8",
                "derivedFromRoot": "yes"
              },
              "c90cd429": {
                "publicKey": "npuba4jaftckeeb84inavvf9mu9gahm87nf693b7bupqrriq9gkuevtehe7atgqe8usfiscm6aaaaaa2wg96mnswb84uy5uvz49rg4xx6r697btfv4hwctj3ctp5c3z4iszhytcbm74f",
                "privateKey": "npvta8jaftcjecq55dv9p8ujdbyfju7kuvmbhb2nmafr8d6zxeqvajuqbqwbfhnwwbkeau9aaaaaagfbz9c5efarywxy6w78z53yxprd9h9injn8t7awkqiwmq2yp8ueecdi38t4cdj9",
                "path": "/44'/20036'/100/10000/1/1",
                "derivedFromRoot": "yes"
              },
              "664f2783": {
                "publicKey": "npuba4jaftckeebqtfkzyamhmmaqidpg8q4tsmzu69hkte3m54pajk33g4j25hqshdifiscm6aaaaabcgwn43mt9ke9x5amcqzzmzee6veznpq4xyyhfk58jnkqdeghzt5cpgtpcmxsi",
                "privateKey": "npvta8jaftcjeba8sup2maww9h3dg4v9qi2wmr6425bhp989jqq9j3zzgz9ejge94bkeau9aaaaaaitxdgyk6r4th7q2c2vx7473bhe3f5dmyxpxt3ky9umcvs3bt76q2krxr68m9cne",
                "path": "/44'/20036'/100/10000/8/2",
                "derivedFromRoot": "yes"
              },
              "36273edd": {
                "publicKey": "npuba4jaftckeebmsrvx6hhfckrfxi4qj3ky4ym4q2kuupckf48yecdt35jzvcaknkie52rbwaaaaaes5bxs5837af8hgrydxq3zsk7n5hc2akjsk8wmrdvykxwc2apnjfmpshwmra9i",
                "privateKey": "npvta8jaftcjecgrfr4z2mifaqyfw7um7g67agcfnw2nhy6jpctzi6exr57nknrenbg8d2paaaaabeg2png9yribrt3v7s7myp6czmg32yacunczxc5267uxpayadmcjmkfxi2j3udpm",
                "path": "/44'/20036'/100/9",
                "derivedFromRoot": "yes"
              },
              "0e337696": {
                "publicKey": "npuba4jaftckeeb7qveg5x2bjah5h7he2yzkhk28p2wn2xigshr6iedunhsfu9zfbnsfiscm6aaaaae6ikzvgkh2j3er5jswqcv7ajwrgw4cadva69syvskqi8t2cuh54mm5xi77gstu",
                "privateKey": "npvta8jaftcjea4zwn5ehcf836hpe926zvy4au5u377yqpg2t4qf358jsjuen923ibkeau9aaaaabhccx63ut8cqjd84nfdsw9icpd3xgssa62hh6fw6cvuhwqawt88u4kw5i5k54x3c",
                "path": "/44'/20036'/100/10000/2/9",
                "derivedFromRoot": "yes"
              }
            },
            "walletName": "Wallet 1"
          }
        },
        "defaults": {
          "marketPrice": 0
        }
      }`)
  console.log(scrubbedData)
  expect(scrubbedData.includes('npvt')).to.be.false
})

test('make sure we can extrapolate logging information', async () => {
  const output = await LoggingService.getLoggingData(logData)
  expect(output).to.not.be.undefined
})
