import DataFormatHelper from '../DataFormatHelper';

test('hasAccountCreationKey should send back false for <= 1.6 versions', async () => {
  const user = {
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  };
  expect(DataFormatHelper.hasAccountCreationKey(user)).toBe(false);
});

test('hasAccountCreationKey should send back true for > 1.6 versions', async () => {
  const user = {
    userId: 'TAC-3PY',
    accountCreationKey:
      'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm',
    accounts: [
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} }
    ],
    keys: {
      npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm: {
        key:
          'npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxm',
        path: "/44'/20036'/100/5",
        derivedFromRoot: 'yes'
      },
      npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443: {
        key:
          'npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj443',
        path: "/44'/20036'/100/5",
        derivedFromRoot: 'yes'
      }
    },
    addresses: [
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn',
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn',
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn',
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn',
      'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn'
    ]
  };
  expect(DataFormatHelper.hasAccountCreationKey(user)).toBe(true);
});

test('hasAccountsObject should send back false if accounts is an array', async () => {
  const user = {
    accounts: [
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} }
    ]
  };
  expect(DataFormatHelper.hasAccountsObject(user)).toBe(false);
});

test('hasAccountsObject should send back true if accounts is an object', async () => {
  const user = {
    accounts: {
      hashkey01: { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      hashkey02: { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      hashkey03: { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      hashkey04: { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} },
      hashkey05: { address: 'tnaq9cjf54ct59bmua78iuv6gtpjtdunc78q8jebwgmxyacn', accountData: {} }
    }
  };
  expect(DataFormatHelper.hasAccountsObject(user)).toBe(true);
});

test('createAccountsFromAddresses creates accounts', async () => {
  const user = {
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  };

  DataFormatHelper.createAccountsFromAddresses(user);
  expect(user.accounts.length).toBe(2);
  expect(user.accounts[0].address).toBe('tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz');
  expect(user.accounts[1].address).toBe('tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv');
});

test('createAccountsFromAddresses does not create accounts if present', async () => {
  const user = {
    userId: '7MP-4FV',
    accounts: [
      { address: 'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz' },
      { address: 'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv' }
    ],
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  };

  DataFormatHelper.createAccountsFromAddresses(user);
  expect(user.accounts.length).toBe(2);
});
