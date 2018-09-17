import MockAsyncStorage from 'mock-async-storage';

const mock = () => {
  const mockImpl = new MockAsyncStorage();
  jest.mock('AsyncStorage', () => mockImpl);
};

mock();
import AsyncStorageHelper from '../../model/AsyncStorageHelper';
import NodeAddressHelper from '../NodeAddressHelper';

beforeEach(async (done) => {
  AsyncStorageHelper.setCurrentUser({
    userId: '7MP-4FV',
    addresses: [
      'tnai24puxki6s4zqyy7ebizgcviw2ui9z9x98pmah5n3ynmz',
      'tnarpmwz3yxxyk7fdgiu2irmvatygg5u8nrg735xcu5ezezv'
    ],
    selectedNode: 'Storrow'
  });
  done();
});

test('getAccountAPIAddress sends back the correct address', async () => {
  expect(await NodeAddressHelper.getAccountAPIAddress()).toBe('https://storrow.ndau.io/account');
});
