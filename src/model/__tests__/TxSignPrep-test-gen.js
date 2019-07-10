import TxSignPrep from '../TxSignPrep'

describe('Transfer object prepare tests', () => {
  it('should build an object for Transfer and convert to known b64', () => {
    var transfertx = {"source":"ndaexpwhzxa8dut7nd6m6w9e8y78f49yp87cdhjvw8s66syq","destination":"ndan9qxnnjhuchpiagte6yzms3n23href95p6yjdqa7u3537","qty":1550453263105981,"sequence":732340766579218,"signatures":["a4jadtcaawizyz7en6nc2kqbum25dqun5xip3ztz7fnw47agm7gmznkhjtwvh5bbc3hxeq7fzcyffwaadmhmvdzaqid53qp8ddgj29cvnemxuu4u8qsecjx6"]}

    var bb = new TxSignPrep().prepare(transfertx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbjlxeG5uamh1Y2hwaWFndGU2eXptczNuMjNocmVmOTVwNnlqZHFhN3UzNTM3AAWCIQf8/70AApoPXz8aEm5kYWV4cHdoenhhOGR1dDduZDZtNnc5ZTh5NzhmNDl5cDg3Y2RoanZ3OHM2NnN5cQ=="
    )
  })
  it('should build an object for Transfer without signatures and convert to known b64', () => {
    var transfertx = {"destination":"ndan9qxnnjhuchpiagte6yzms3n23href95p6yjdqa7u3537","qty":1550453263105981,"sequence":732340766579218,"source":"ndaexpwhzxa8dut7nd6m6w9e8y78f49yp87cdhjvw8s66syq"}

    var bb = new TxSignPrep().prepare(transfertx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbjlxeG5uamh1Y2hwaWFndGU2eXptczNuMjNocmVmOTVwNnlqZHFhN3UzNTM3AAWCIQf8/70AApoPXz8aEm5kYWV4cHdoenhhOGR1dDduZDZtNnc5ZTh5NzhmNDl5cDg3Y2RoanZ3OHM2NnN5cQ=="
    )
  })
})
describe('ChangeValidation object prepare tests', () => {
  it('should build an object for ChangeValidation and convert to known b64', () => {
    var changevalidationtx = {"target":"ndariixw9jdwkwayu46d593ayw8wq3ccutcyu2gj7hwt67af","new_keys":["npuba8jadtbbecb2r2fnccyrxv4jxmqichhsejj8zaghqw7hpsvyriqdp7jx2mygm9hmdeei8ucs"],"validation_script":"6yDimOF9iwznhqRW","sequence":4589118442271941,"signatures":["a4jadtcaawsmrhiuj8kqjnjdbg7c8nvkivmubszabk455uszw2bs8hv5cgrems5r3dzcu3euc4pjmv3e42idz4vu5vagn7h65ke8xh27f36vjwca9yqzandr"]}

    var bb = new TxSignPrep().prepare(changevalidationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bnB1YmE4amFkdGJiZWNiMnIyZm5jY3lyeHY0anhtcWljaGhzZWpqOHphZ2hxdzdocHN2eXJpcWRwN2p4Mm15Z205aG1kZWVpOHVjcwAQTcdmlXTFbmRhcmlpeHc5amR3a3dheXU0NmQ1OTNheXc4d3EzY2N1dGN5dTJnajdod3Q2N2FmNnlEaW1PRjlpd3puaHFSVw=="
    )
  })
  it('should build an object for ChangeValidation without signatures and convert to known b64', () => {
    var changevalidationtx = {"new_keys":["npuba8jadtbbecb2r2fnccyrxv4jxmqichhsejj8zaghqw7hpsvyriqdp7jx2mygm9hmdeei8ucs"],"sequence":4589118442271941,"target":"ndariixw9jdwkwayu46d593ayw8wq3ccutcyu2gj7hwt67af","validation_script":"6yDimOF9iwznhqRW"}

    var bb = new TxSignPrep().prepare(changevalidationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bnB1YmE4amFkdGJiZWNiMnIyZm5jY3lyeHY0anhtcWljaGhzZWpqOHphZ2hxdzdocHN2eXJpcWRwN2p4Mm15Z205aG1kZWVpOHVjcwAQTcdmlXTFbmRhcmlpeHc5amR3a3dheXU0NmQ1OTNheXc4d3EzY2N1dGN5dTJnajdod3Q2N2FmNnlEaW1PRjlpd3puaHFSVw=="
    )
  })
})
describe('ReleaseFromEndowment object prepare tests', () => {
  it('should build an object for ReleaseFromEndowment and convert to known b64', () => {
    var releasefromendowmenttx = {"destination":"ndad75n7r4r6aiwbv6q5tufshgxvcfrf8rtd9sz3cc7h7fur","qty":1975528111046083,"sequence":7465139729523843,"signatures":["a4jadtcaevnuzviehvi66q9xwp85s3rdnepn5sra73wmwk2wy93243ei4sm5ywear2akj9h4ut7mqg445ifu3e8x3z9seimj44cc7c2g8jihvd78t8gg587c"]}

    var bb = new TxSignPrep().prepare(releasefromendowmenttx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhZDc1bjdyNHI2YWl3YnY2cTV0dWZzaGd4dmNmcmY4cnRkOXN6M2NjN2g3ZnVyAAcEu3tNfcMAGoWBScbkgw=="
    )
  })
  it('should build an object for ReleaseFromEndowment without signatures and convert to known b64', () => {
    var releasefromendowmenttx = {"destination":"ndad75n7r4r6aiwbv6q5tufshgxvcfrf8rtd9sz3cc7h7fur","qty":1975528111046083,"sequence":7465139729523843}

    var bb = new TxSignPrep().prepare(releasefromendowmenttx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhZDc1bjdyNHI2YWl3YnY2cTV0dWZzaGd4dmNmcmY4cnRkOXN6M2NjN2g3ZnVyAAcEu3tNfcMAGoWBScbkgw=="
    )
  })
})
describe('ChangeRecoursePeriod object prepare tests', () => {
  it('should build an object for ChangeRecoursePeriod and convert to known b64', () => {
    var changerecourseperiodtx = {"target":"ndapwk56zsx3t6zfn52c2eideidgppjymjjixez4529gtqk9","period":"11m25dt14h35m49s167320us","sequence":1912297565323361,"signatures":["a4jadtcadup2xr8b752t8bt9cuq2adnzrer498r6uxpw5hq3xugj4izuqtgkt9ix4mgtuuxazr6gdb2qmuxxnjxwptumwhqmv2x4i7ax2bkarpnq6itqbes3"]}

    var bb = new TxSignPrep().prepare(changerecourseperiodtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "MTFtMjVkdDE0aDM1bTQ5czE2NzMyMHVzAAbLOXkWAGFuZGFwd2s1NnpzeDN0NnpmbjUyYzJlaWRlaWRncHBqeW1qaml4ZXo0NTI5Z3Rxazk="
    )
  })
  it('should build an object for ChangeRecoursePeriod without signatures and convert to known b64', () => {
    var changerecourseperiodtx = {"period":"11m25dt14h35m49s167320us","sequence":1912297565323361,"target":"ndapwk56zsx3t6zfn52c2eideidgppjymjjixez4529gtqk9"}

    var bb = new TxSignPrep().prepare(changerecourseperiodtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "MTFtMjVkdDE0aDM1bTQ5czE2NzMyMHVzAAbLOXkWAGFuZGFwd2s1NnpzeDN0NnpmbjUyYzJlaWRlaWRncHBqeW1qaml4ZXo0NTI5Z3Rxazk="
    )
  })
})
describe('Delegate object prepare tests', () => {
  it('should build an object for Delegate and convert to known b64', () => {
    var delegatetx = {"target":"ndadtgn5ajw88k2e8spzp5givid8ye729e59ffqge7waaisw","node":"ndanjygy8gzaw6fttsx83af5haevpnf5hpu8mpfjpmdxazs2","sequence":2483436573217588,"signatures":["a4jadtcaaba36bdzhjxuf5ne4v7mgta8j2z3p644pkrp9dbugb8xhk5vhpwxtan29szq7g8bs7s8jzatudv2rvbyaz45des2rsjbve28zurduezbiyf5c9my"]}

    var bb = new TxSignPrep().prepare(delegatetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbmp5Z3k4Z3phdzZmdHRzeDgzYWY1aGFldnBuZjVocHU4bXBmanBtZHhhenMyAAjSrCLE0zRuZGFkdGduNWFqdzg4azJlOHNwenA1Z2l2aWQ4eWU3MjllNTlmZnFnZTd3YWFpc3c="
    )
  })
  it('should build an object for Delegate without signatures and convert to known b64', () => {
    var delegatetx = {"node":"ndanjygy8gzaw6fttsx83af5haevpnf5hpu8mpfjpmdxazs2","sequence":2483436573217588,"target":"ndadtgn5ajw88k2e8spzp5givid8ye729e59ffqge7waaisw"}

    var bb = new TxSignPrep().prepare(delegatetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbmp5Z3k4Z3phdzZmdHRzeDgzYWY1aGFldnBuZjVocHU4bXBmanBtZHhhenMyAAjSrCLE0zRuZGFkdGduNWFqdzg4azJlOHNwenA1Z2l2aWQ4eWU3MjllNTlmZnFnZTd3YWFpc3c="
    )
  })
})
describe('CreditEAI object prepare tests', () => {
  it('should build an object for CreditEAI and convert to known b64', () => {
    var crediteaitx = {"node":"ndahrschgab8fj39tupsmybsq29ebnhy4bdz93bjjsprbsqq","sequence":2673222963759107,"signatures":["a4jadtcabzkfvr46jmewwubf4gejyhxpdg3h8kn9j8wtivdhrskccxnddsb3a4ue8hcejtcwmnkf483vsbfwm2p5sui7qmtza6a9aksfhjasja4ukutsnber"]}

    var bb = new TxSignPrep().prepare(crediteaitx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhaHJzY2hnYWI4ZmozOXR1cHNteWJzcTI5ZWJuaHk0YmR6OTNiampzcHJic3FxAAl/SDkpCAM="
    )
  })
  it('should build an object for CreditEAI without signatures and convert to known b64', () => {
    var crediteaitx = {"node":"ndahrschgab8fj39tupsmybsq29ebnhy4bdz93bjjsprbsqq","sequence":2673222963759107}

    var bb = new TxSignPrep().prepare(crediteaitx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhaHJzY2hnYWI4ZmozOXR1cHNteWJzcTI5ZWJuaHk0YmR6OTNiampzcHJic3FxAAl/SDkpCAM="
    )
  })
})
describe('Lock object prepare tests', () => {
  it('should build an object for Lock and convert to known b64', () => {
    var locktx = {"target":"ndagrv3mqsqavjc3bqrijy77kx7xhxhhhafebv2ggmj9ad54","period":"3y20dt6h48m279449us","sequence":5203743511895827,"signatures":["a4jadtca8b4c2hxpwx8s8g9i4msfqa9errxad3j6mgy2f74tauk3buqv9yxnedsphm33h2ansybwwekffvwmeb4jgbai2jng5szmjecwnittihnp3u8gnygd"]}

    var bb = new TxSignPrep().prepare(locktx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "M3kyMGR0Nmg0OG0yNzk0NDl1cwASfMbzh18TbmRhZ3J2M21xc3FhdmpjM2JxcmlqeTc3a3g3eGh4aGhoYWZlYnYyZ2dtajlhZDU0"
    )
  })
  it('should build an object for Lock without signatures and convert to known b64', () => {
    var locktx = {"period":"3y20dt6h48m279449us","sequence":5203743511895827,"target":"ndagrv3mqsqavjc3bqrijy77kx7xhxhhhafebv2ggmj9ad54"}

    var bb = new TxSignPrep().prepare(locktx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "M3kyMGR0Nmg0OG0yNzk0NDl1cwASfMbzh18TbmRhZ3J2M21xc3FhdmpjM2JxcmlqeTc3a3g3eGh4aGhoYWZlYnYyZ2dtajlhZDU0"
    )
  })
})
describe('Notify object prepare tests', () => {
  it('should build an object for Notify and convert to known b64', () => {
    var notifytx = {"target":"ndaf8k3pc55gugusn29zs5xtnvm7e4biybcaxbrg5t5gjpy7","sequence":1507085064423784,"signatures":["a4jadtcafntna3h8zub47iqfr4rrk9du2db2e2a6f5jxhums4ic748maarjvaqdyzmvzpeghiuhjiqwejkcdhim3pmw6tpyvtzq77iaiqprkp2h2mr973tns"]}

    var bb = new TxSignPrep().prepare(notifytx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "AAVar5XpSWhuZGFmOGszcGM1NWd1Z3VzbjI5enM1eHRudm03ZTRiaXliY2F4YnJnNXQ1Z2pweTc="
    )
  })
  it('should build an object for Notify without signatures and convert to known b64', () => {
    var notifytx = {"sequence":1507085064423784,"target":"ndaf8k3pc55gugusn29zs5xtnvm7e4biybcaxbrg5t5gjpy7"}

    var bb = new TxSignPrep().prepare(notifytx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "AAVar5XpSWhuZGFmOGszcGM1NWd1Z3VzbjI5enM1eHRudm03ZTRiaXliY2F4YnJnNXQ1Z2pweTc="
    )
  })
})
describe('SetRewardsDestination object prepare tests', () => {
  it('should build an object for SetRewardsDestination and convert to known b64', () => {
    var setrewardsdestinationtx = {"target":"ndaf263tk3zid4h7fcr7d94p76stsu4a7e3ur6zqpxvjtbfg","destination":"ndackgs2umun5ahji7swwzkfqxhnjiq77m7u8z4wbmw7i725","sequence":3658774096214545,"signatures":["a4jadtcask46idyrda7vfzvqfjwbrbqdsp4umpxq3vm8rw27mins8jtdi3fy64yn2yf64u62m9zpyvbrk5vyu8jjwyye6ndbnretiabe7xv2snmedqxwwa69"]}

    var bb = new TxSignPrep().prepare(setrewardsdestinationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhY2tnczJ1bXVuNWFoamk3c3d3emtmcXhobmppcTc3bTd1OHo0d2JtdzdpNzI1AAz/orpRehFuZGFmMjYzdGszemlkNGg3ZmNyN2Q5NHA3NnN0c3U0YTdlM3VyNnpxcHh2anRiZmc="
    )
  })
  it('should build an object for SetRewardsDestination without signatures and convert to known b64', () => {
    var setrewardsdestinationtx = {"destination":"ndackgs2umun5ahji7swwzkfqxhnjiq77m7u8z4wbmw7i725","sequence":3658774096214545,"target":"ndaf263tk3zid4h7fcr7d94p76stsu4a7e3ur6zqpxvjtbfg"}

    var bb = new TxSignPrep().prepare(setrewardsdestinationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhY2tnczJ1bXVuNWFoamk3c3d3emtmcXhobmppcTc3bTd1OHo0d2JtdzdpNzI1AAz/orpRehFuZGFmMjYzdGszemlkNGg3ZmNyN2Q5NHA3NnN0c3U0YTdlM3VyNnpxcHh2anRiZmc="
    )
  })
})
describe('SetValidation object prepare tests', () => {
  it('should build an object for SetValidation and convert to known b64', () => {
    var setvalidationtx = {"target":"ndapvu6gqdhm22ud7tm2tbw6gncuh3r4xcs84xqpupi82yyn","ownership":"npuba8jadtbbece9ghk737ci2byzcs6ism9k7hxfqikfxsjqscecc5fe7q6t7xb6k7juravrx35q","validation_keys":["npuba8jadtbbear3d3qvud6tp8trknmesi5mskt88b2g3u7z54wn63e2ghvnwryd3efbu6ntxgwc"],"validation_script":"4kBZKlEDQoXMGorq","sequence":7142365320213337,"signature":"a4jadtcacam96y34vwjhypt5c33j6ed59mvrak3g6z895zkdnsgb5ink8x4h2qp98sp22rdzhzgmucwtjzgufbc3k6465jkz9j7462cjbs8rj73r86ufzw7f"}

    var bb = new TxSignPrep().prepare(setvalidationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bnB1YmE4amFkdGJiZWNlOWdoazczN2NpMmJ5emNzNmlzbTlrN2h4ZnFpa2Z4c2pxc2NlY2M1ZmU3cTZ0N3hiNms3anVyYXZyeDM1cQAZX/GDxHNZbmRhcHZ1NmdxZGhtMjJ1ZDd0bTJ0Ync2Z25jdWgzcjR4Y3M4NHhxcHVwaTgyeXlubnB1YmE4amFkdGJiZWFyM2QzcXZ1ZDZ0cDh0cmtubWVzaTVtc2t0ODhiMmczdTd6NTR3bjYzZTJnaHZud3J5ZDNlZmJ1Nm50eGd3YzRrQlpLbEVEUW9YTUdvcnE="
    )
  })
  it('should build an object for SetValidation without signatures and convert to known b64', () => {
    var setvalidationtx = {"ownership":"npuba8jadtbbece9ghk737ci2byzcs6ism9k7hxfqikfxsjqscecc5fe7q6t7xb6k7juravrx35q","sequence":7142365320213337,"target":"ndapvu6gqdhm22ud7tm2tbw6gncuh3r4xcs84xqpupi82yyn","validation_keys":["npuba8jadtbbear3d3qvud6tp8trknmesi5mskt88b2g3u7z54wn63e2ghvnwryd3efbu6ntxgwc"],"validation_script":"4kBZKlEDQoXMGorq"}

    var bb = new TxSignPrep().prepare(setvalidationtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bnB1YmE4amFkdGJiZWNlOWdoazczN2NpMmJ5emNzNmlzbTlrN2h4ZnFpa2Z4c2pxc2NlY2M1ZmU3cTZ0N3hiNms3anVyYXZyeDM1cQAZX/GDxHNZbmRhcHZ1NmdxZGhtMjJ1ZDd0bTJ0Ync2Z25jdWgzcjR4Y3M4NHhxcHVwaTgyeXlubnB1YmE4amFkdGJiZWFyM2QzcXZ1ZDZ0cDh0cmtubWVzaTVtc2t0ODhiMmczdTd6NTR3bjYzZTJnaHZud3J5ZDNlZmJ1Nm50eGd3YzRrQlpLbEVEUW9YTUdvcnE="
    )
  })
})
describe('Stake object prepare tests', () => {
  it('should build an object for Stake and convert to known b64', () => {
    var staketx = {"target":"ndadekzegx7g6cjt9ptq9jy2vadpt9j3dgm82xyytvitzts4","staked_account":"ndaqhpsg9rnn9ni2t5s3idqrwwjmzhrehbvmqs8y2kmg6w7p","sequence":6229113420623440,"signatures":["a4jadtca7wf9gbrsvu4ipq3pqkmtv2pekg56kcyvxvhaiuq8xyzef2t4kspvmwtfgw6r5mjvuempjwdq55ibxmpmq3pq5pijmcb6jypipae4cp2nhbrwpbtj"]}

    var bb = new TxSignPrep().prepare(staketx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABYhWHyzrlBuZGFxaHBzZzlybm45bmkydDVzM2lkcXJ3d2ptemhyZWhidm1xczh5MmttZzZ3N3BuZGFkZWt6ZWd4N2c2Y2p0OXB0cTlqeTJ2YWRwdDlqM2RnbTgyeHl5dHZpdHp0czQ="
    )
  })
  it('should build an object for Stake without signatures and convert to known b64', () => {
    var staketx = {"sequence":6229113420623440,"staked_account":"ndaqhpsg9rnn9ni2t5s3idqrwwjmzhrehbvmqs8y2kmg6w7p","target":"ndadekzegx7g6cjt9ptq9jy2vadpt9j3dgm82xyytvitzts4"}

    var bb = new TxSignPrep().prepare(staketx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABYhWHyzrlBuZGFxaHBzZzlybm45bmkydDVzM2lkcXJ3d2ptemhyZWhidm1xczh5MmttZzZ3N3BuZGFkZWt6ZWd4N2c2Y2p0OXB0cTlqeTJ2YWRwdDlqM2RnbTgyeHl5dHZpdHp0czQ="
    )
  })
})
describe('RegisterNode object prepare tests', () => {
  it('should build an object for RegisterNode and convert to known b64', () => {
    var registernodetx = {"node":"ndafi8p3mnh5aprw7ejeysnrzf2vv5ctribminupn98q7a49","distribution_script":"ysJRw2fwwtWTVbtD","rpc_address":"string: thct uax xkqf afplsj bcxoeffr ","sequence":5633755682856050,"signatures":["a4jadtcaaut6rsiyueqizb5v365hmw224erjng5h4jwafncryzzyndb5a8236584iknzmshmj83844u7pewmxnzwbza7qtk2yhmkh8wdsfairss95zcry2j8"]}

    var bb = new TxSignPrep().prepare(registernodetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "eXNKUncyZnd3dFdUVmJ0RG5kYWZpOHAzbW5oNWFwcnc3ZWpleXNucnpmMnZ2NWN0cmlibWludXBuOThxN2E0OXN0cmluZzogdGhjdCB1YXggeGtxZiBhZnBsc2ogYmN4b2VmZnIgABQD3vY6XHI="
    )
  })
  it('should build an object for RegisterNode without signatures and convert to known b64', () => {
    var registernodetx = {"distribution_script":"ysJRw2fwwtWTVbtD","node":"ndafi8p3mnh5aprw7ejeysnrzf2vv5ctribminupn98q7a49","rpc_address":"string: thct uax xkqf afplsj bcxoeffr ","sequence":5633755682856050}

    var bb = new TxSignPrep().prepare(registernodetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "eXNKUncyZnd3dFdUVmJ0RG5kYWZpOHAzbW5oNWFwcnc3ZWpleXNucnpmMnZ2NWN0cmlibWludXBuOThxN2E0OXN0cmluZzogdGhjdCB1YXggeGtxZiBhZnBsc2ogYmN4b2VmZnIgABQD3vY6XHI="
    )
  })
})
describe('NominateNodeReward object prepare tests', () => {
  it('should build an object for NominateNodeReward and convert to known b64', () => {
    var nominatenoderewardtx = {"random":7664575722253654,"sequence":4786722739683373,"signatures":["a4jadtca83xnczqxnb3eb3wznsh2eszvkrjm3ef5y6396q2yzjz8bur8zryrg6g7y33vh4vsk5bm6bz2z946yqmzdjxhke2bbqp3nqwfc4kuk2jmbmwr6hbh"]}

    var bb = new TxSignPrep().prepare(nominatenoderewardtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABs65BlHbVYAEQF/vImALQ=="
    )
  })
  it('should build an object for NominateNodeReward without signatures and convert to known b64', () => {
    var nominatenoderewardtx = {"random":7664575722253654,"sequence":4786722739683373}

    var bb = new TxSignPrep().prepare(nominatenoderewardtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABs65BlHbVYAEQF/vImALQ=="
    )
  })
})
describe('ClaimNodeReward object prepare tests', () => {
  it('should build an object for ClaimNodeReward and convert to known b64', () => {
    var claimnoderewardtx = {"node":"ndam82mp53jpz86r5kz5jarqhqv2wsayu53cn9fu3rvrytiy","sequence":4402827188794727,"signatures":["a4jadtcauk4x3utmatvd2skyfwgf4mtw5druw4pf9rhjb3aecaydri4zygvgpah6z3dtuhzc6cy38e7s98v7wg3kaa64eqs5vpnxx7r2964z3zmqkhw945zi"]}

    var bb = new TxSignPrep().prepare(claimnoderewardtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbTgybXA1M2pwejg2cjVrejVqYXJxaHF2MndzYXl1NTNjbjlmdTNydnJ5dGl5AA+kWRaYdWc="
    )
  })
  it('should build an object for ClaimNodeReward without signatures and convert to known b64', () => {
    var claimnoderewardtx = {"node":"ndam82mp53jpz86r5kz5jarqhqv2wsayu53cn9fu3rvrytiy","sequence":4402827188794727}

    var bb = new TxSignPrep().prepare(claimnoderewardtx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhbTgybXA1M2pwejg2cjVrejVqYXJxaHF2MndzYXl1NTNjbjlmdTNydnJ5dGl5AA+kWRaYdWc="
    )
  })
})
describe('TransferAndLock object prepare tests', () => {
  it('should build an object for TransferAndLock and convert to known b64', () => {
    var transferandlocktx = {"source":"ndagwkrxrqvbuggtjxcpcek33u6a5u5fcdjw8sxrv494477u","destination":"ndabaeru46jcd4kr9skv5xwsvrjbukfuxz2fc93w6k8394ue","qty":6090287018180214,"period":"1y9m15dt10h9m51s569721us","sequence":7443647051579152,"signatures":["a4jadtcappjqgaam3fx42eivjn55xhp9y7v82qvkvda2qdx3f5nm95664ij77x9pv8gwgm2aacegw9yhd8s3sp9jm3zkm5fwbzbugmmeirmubkdbjkgste84"]}

    var bb = new TxSignPrep().prepare(transferandlocktx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhYmFlcnU0NmpjZDRrcjlza3Y1eHdzdnJqYnVrZnV4ejJmYzkzdzZrODM5NHVlMXk5bTE1ZHQxMGg5bTUxczU2OTcyMXVzABWjFXJMfnYAGnH1Ile/EG5kYWd3a3J4cnF2YnVnZ3RqeGNwY2VrMzN1NmE1dTVmY2RqdzhzeHJ2NDk0NDc3dQ=="
    )
  })
  it('should build an object for TransferAndLock without signatures and convert to known b64', () => {
    var transferandlocktx = {"destination":"ndabaeru46jcd4kr9skv5xwsvrjbukfuxz2fc93w6k8394ue","period":"1y9m15dt10h9m51s569721us","qty":6090287018180214,"sequence":7443647051579152,"source":"ndagwkrxrqvbuggtjxcpcek33u6a5u5fcdjw8sxrv494477u"}

    var bb = new TxSignPrep().prepare(transferandlocktx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhYmFlcnU0NmpjZDRrcjlza3Y1eHdzdnJqYnVrZnV4ejJmYzkzdzZrODM5NHVlMXk5bTE1ZHQxMGg5bTUxczU2OTcyMXVzABWjFXJMfnYAGnH1Ile/EG5kYWd3a3J4cnF2YnVnZ3RqeGNwY2VrMzN1NmE1dTVmY2RqdzhzeHJ2NDk0NDc3dQ=="
    )
  })
})
describe('CommandValidatorChange object prepare tests', () => {
  it('should build an object for CommandValidatorChange and convert to known b64', () => {
    var commandvalidatorchangetx = {"public_key":"2kaLTcZiBcJ/wq67","power":7147475985406603,"sequence":3268473309273449,"signatures":["a4jadtcadewjjhbximwzwzxyer9uxpjek7fs28djc6j5nyh5erswkv35gse3avm8qfyavz2g3ud78a6ycaz4qbghj9nmfypper8ja57nnp2f6ehkbh4eirth"]}

    var bb = new TxSignPrep().prepare(commandvalidatorchangetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABlkl28mmosya2FMVGNaaUJjSi93cTY3AAucqL6OnWk="
    )
  })
  it('should build an object for CommandValidatorChange without signatures and convert to known b64', () => {
    var commandvalidatorchangetx = {"power":7147475985406603,"public_key":"2kaLTcZiBcJ/wq67","sequence":3268473309273449}

    var bb = new TxSignPrep().prepare(commandvalidatorchangetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABlkl28mmosya2FMVGNaaUJjSi93cTY3AAucqL6OnWk="
    )
  })
})
describe('UnregisterNode object prepare tests', () => {
  it('should build an object for UnregisterNode and convert to known b64', () => {
    var unregisternodetx = {"node":"ndad4jrhbum84n74bfq9hktwssmqy6rjtvz9yxnb8kx7fxj6","sequence":666378943674263,"signatures":["a4jadtca68bdcvz7nd67f7gfh2pv74p3z5tvgucbdsdpnbw9kep4b7ickbghgsjvxtg84qxfhrru5ueuwhzcberrm2jhz5nym5ps564stips2xeg6k2e4d68"]}

    var bb = new TxSignPrep().prepare(unregisternodetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhZDRqcmhidW04NG43NGJmcTloa3R3c3NtcXk2cmp0dno5eXhuYjhreDdmeGo2AAJeEXA5N5c="
    )
  })
  it('should build an object for UnregisterNode without signatures and convert to known b64', () => {
    var unregisternodetx = {"node":"ndad4jrhbum84n74bfq9hktwssmqy6rjtvz9yxnb8kx7fxj6","sequence":666378943674263}

    var bb = new TxSignPrep().prepare(unregisternodetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhZDRqcmhidW04NG43NGJmcTloa3R3c3NtcXk2cmp0dno5eXhuYjhreDdmeGo2AAJeEXA5N5c="
    )
  })
})
describe('Unstake object prepare tests', () => {
  it('should build an object for Unstake and convert to known b64', () => {
    var unstaketx = {"target":"ndare8rcg5pxa3vd27jrk463e7a484var9i8w65jqj26ijmg","sequence":5623762082951376,"signatures":["a4jadtcarkhahua77kzkazhaks2sj92jgqd533bwsyygft5vuwnzphb5qdf9i8m6w6mksa2far66fjxfmszb5bk4nsp6fq7newk666sni39zunen9eqt862s"]}

    var bb = new TxSignPrep().prepare(unstaketx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABP6yCVBcNBuZGFyZThyY2c1cHhhM3ZkMjdqcms0NjNlN2E0ODR2YXI5aTh3NjVqcWoyNmlqbWc="
    )
  })
  it('should build an object for Unstake without signatures and convert to known b64', () => {
    var unstaketx = {"sequence":5623762082951376,"target":"ndare8rcg5pxa3vd27jrk463e7a484var9i8w65jqj26ijmg"}

    var bb = new TxSignPrep().prepare(unstaketx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABP6yCVBcNBuZGFyZThyY2c1cHhhM3ZkMjdqcms0NjNlN2E0ODR2YXI5aTh3NjVqcWoyNmlqbWc="
    )
  })
})
describe('Issue object prepare tests', () => {
  it('should build an object for Issue and convert to known b64', () => {
    var issuetx = {"qty":3820780875409098,"sequence":2805298263287969,"signatures":["a4jadtcag6xgixqvvt6r9pas2vawy95r2u35p88et7runhkxhj9dq3vcdmvpeck5u8nbk5bmk7jbqzq8hwthucnh9xzubs26daexazkeietf8assd8973c5b"]}

    var bb = new TxSignPrep().prepare(issuetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "AA2S+t7X5soACfdnZnjooQ=="
    )
  })
  it('should build an object for Issue without signatures and convert to known b64', () => {
    var issuetx = {"qty":3820780875409098,"sequence":2805298263287969}

    var bb = new TxSignPrep().prepare(issuetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "AA2S+t7X5soACfdnZnjooQ=="
    )
  })
})
describe('ClaimChildAccount object prepare tests', () => {
  it('should build an object for ClaimChildAccount and convert to known b64', () => {
    var createchildaccounttx = {"target":"ndap3iktb7j8jqmi9zukk4u3ipax7iimeqep6s3kahpz8aqu","child":"ndahibi6ys2vdyqyd5hu3hzkzb5ss3s86inekxw9t3fbd8hm","child_ownership":"npuba8jadtbbea5pg8hjpvmxcituvenswt7sn3v2p2y89q3rz3kizbkzzw5y3fkt3vxdi8tu9jy6","child_signature":"a4jadtca2usdtre78zw8f9urmk56hwa7y3bkzfpr2yjhs7hw9krvmj2i46p2h4wnuwducbta6dwctcnppwz7rgbm5xgpzpzx52jp8427gpxdtsispukmykxp","child_recourse_period":"1y4m6dt5h21m46s343734us","child_validation_keys":["npuba8jadtbbecuus9kvhq64sfaj9i92d7yf9iqvvnbvktemnaawecwzt59wqvzwmfsmt3n9qqp7"],"child_validation_script":"rXKNlIv+hTs6t5d3","sequence":2114375199125313,"signatures":["a4jadtcaasfqqecvccc88qprxfu9umezshpc55xc66rcmckp735h7u4xq3nr3ewf9iuedmb65txi5z4am76p5q2p2m773kyddqwp2c67p3qf7bcrcvbr5ih5"]}

    var bb = new TxSignPrep().prepare(createchildaccounttx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhaGliaTZ5czJ2ZHlxeWQ1aHUzaHpremI1c3Mzczg2aW5la3h3OXQzZmJkOGhtbnB1YmE4amFkdGJiZWE1cGc4aGpwdm14Y2l0dXZlbnN3dDdzbjN2MnAyeTg5cTNyejNraXpia3p6dzV5M2ZrdDN2eGRpOHR1OWp5NjF5NG02ZHQ1aDIxbTQ2czM0MzczNHVzYTRqYWR0Y2EydXNkdHJlNzh6dzhmOXVybWs1Nmh3YTd5M2JremZwcjJ5amhzN2h3OWtydm1qMmk0NnAyaDR3bnV3ZHVjYnRhNmR3Y3RjbnBwd3o3cmdibTV4Z3B6cHp4NTJqcDg0MjdncHhkdHNpc3B1a215a3hwbnB1YmE4amFkdGJiZWN1dXM5a3ZocTY0c2ZhajlpOTJkN3lmOWlxdnZuYnZrdGVtbmFhd2Vjd3p0NTl3cXZ6d21mc210M245cXFwN3JYS05sSXYraFRzNnQ1ZDMAB4MDVqpvQW5kYXAzaWt0YjdqOGpxbWk5enVrazR1M2lwYXg3aWltZXFlcDZzM2thaHB6OGFxdQ=="
    )
  })
  it('should build an object for ClaimChildAccount without signatures and convert to known b64', () => {
    var createchildaccounttx = {"child":"ndahibi6ys2vdyqyd5hu3hzkzb5ss3s86inekxw9t3fbd8hm","child_ownership":"npuba8jadtbbea5pg8hjpvmxcituvenswt7sn3v2p2y89q3rz3kizbkzzw5y3fkt3vxdi8tu9jy6","child_recourse_period":"1y4m6dt5h21m46s343734us","child_signature":"a4jadtca2usdtre78zw8f9urmk56hwa7y3bkzfpr2yjhs7hw9krvmj2i46p2h4wnuwducbta6dwctcnppwz7rgbm5xgpzpzx52jp8427gpxdtsispukmykxp","child_validation_keys":["npuba8jadtbbecuus9kvhq64sfaj9i92d7yf9iqvvnbvktemnaawecwzt59wqvzwmfsmt3n9qqp7"],"child_validation_script":"rXKNlIv+hTs6t5d3","sequence":2114375199125313,"target":"ndap3iktb7j8jqmi9zukk4u3ipax7iimeqep6s3kahpz8aqu"}

    var bb = new TxSignPrep().prepare(createchildaccounttx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "bmRhaGliaTZ5czJ2ZHlxeWQ1aHUzaHpremI1c3Mzczg2aW5la3h3OXQzZmJkOGhtbnB1YmE4amFkdGJiZWE1cGc4aGpwdm14Y2l0dXZlbnN3dDdzbjN2MnAyeTg5cTNyejNraXpia3p6dzV5M2ZrdDN2eGRpOHR1OWp5NjF5NG02ZHQ1aDIxbTQ2czM0MzczNHVzYTRqYWR0Y2EydXNkdHJlNzh6dzhmOXVybWs1Nmh3YTd5M2JremZwcjJ5amhzN2h3OWtydm1qMmk0NnAyaDR3bnV3ZHVjYnRhNmR3Y3RjbnBwd3o3cmdibTV4Z3B6cHp4NTJqcDg0MjdncHhkdHNpc3B1a215a3hwbnB1YmE4amFkdGJiZWN1dXM5a3ZocTY0c2ZhajlpOTJkN3lmOWlxdnZuYnZrdGVtbmFhd2Vjd3p0NTl3cXZ6d21mc210M245cXFwN3JYS05sSXYraFRzNnQ1ZDMAB4MDVqpvQW5kYXAzaWt0YjdqOGpxbWk5enVrazR1M2lwYXg3aWltZXFlcDZzM2thaHB6OGFxdQ=="
    )
  })
})
describe('RecordPrice object prepare tests', () => {
  it('should build an object for RecordPrice and convert to known b64', () => {
    var recordpricetx = {"market_price":5884718809965732,"sequence":2525291496453084,"signatures":["a4jadtca65vwktznswkzvmpa87ebb44zrm2f6ccffwq2ugmhebbe8aiz7j9agj9hudzjxtux682k4mu5rn2k272v6f8kbb5n79vhcbg254bq7rmadjs6sctj"]}

    var bb = new TxSignPrep().prepare(recordpricetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABToHt5FZKQACPi9Ppmz3A=="
    )
  })
  it('should build an object for RecordPrice without signatures and convert to known b64', () => {
    var recordpricetx = {"market_price":5884718809965732,"sequence":2525291496453084}

    var bb = new TxSignPrep().prepare(recordpricetx)
    var b64 = bb.b64encode()
    expect(b64).toEqual(
      "ABToHt5FZKQACPi9Ppmz3A=="
    )
  })
})

