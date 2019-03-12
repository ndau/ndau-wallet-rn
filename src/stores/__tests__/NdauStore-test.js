import NdauStore from '../NdauStore'

const marketPrice1 = 16.89
const marketPrice2 = 1234.23

test('Make sure we get back falsy if nothing set', async () => {
  expect(NdauStore.getMarketPrice()).toBeFalsy()
})

test('Make sure we can set and reset the marketPrice', async () => {
  NdauStore.setMarketPrice(marketPrice1)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice1)
  NdauStore.setMarketPrice(marketPrice2)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice2)
  NdauStore.setMarketPrice(marketPrice1)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice1)
  NdauStore.setMarketPrice(marketPrice2)
  expect(NdauStore.getMarketPrice()).toBe(marketPrice2)
  expect(NdauStore.getMarketPrice()).not.toBe(marketPrice1)
})
