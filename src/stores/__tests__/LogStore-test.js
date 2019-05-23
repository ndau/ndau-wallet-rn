import LogStore from '../LogStore'

test('Make sure we can log and get the data out', async () => {
  LogStore.log('testing 1...')
  LogStore.log('testing 1...2...')

  const data = LogStore.getLoggingData()
  expect(Object.keys(data).length).toBe(2)
  expect(Object.keys(data)[0].entry === 'testing 1...2...')
})

test('Make sure we do not go past the max', async () => {
  for (var i = 0; i < 350; i++) {
    LogStore.log(`entry for ${i}`)
  }

  const data = LogStore.getLoggingData()
  expect(Object.keys(data).length).toBe(100)
  expect(Object.keys(data)[0].entry === 'entry for 349')
})
