import NodeAddressHelper from '../NodeAddressHelper';

const user = {
  userId: '7MP-4FV',
  addresses: [
    'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
    'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
  ],
  selectedNode: 'Storrow'
};

test('getAccountAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getAccountAPIAddress('Storrow', user.addresses)).toBe(
    'https://storrow.ndau.io/account'
  );
});

test('getMarketPriceAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getMarketPriceAPIAddress('Storrow')).toBe(
    'https://storrow.ndau.io/marketprice'
  );
});

test('getEaiPercentageAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getEaiPercentageAPIAddress('Storrow')).toBe(
    'https://storrow.ndau.io/eaipercentage'
  );
});
