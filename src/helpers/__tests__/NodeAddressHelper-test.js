import NodeAddressHelper from '../NodeAddressHelper';

test('getAccountAPIAddress sends back the correct address', async () => {
  const user = {
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  };
  expect(await NodeAddressHelper.getAccountAPIAddress(user)).toBe(
    'https://storrow.ndau.io/account'
  );
});
