import LogStore from '../LogStore'

test('Make sure we can log and get the data out', async () => {
  LogStore.log('testing 1...')
  LogStore.log('testing 1...2...')

  const data = LogStore._getLoggingData()
  expect(Object.keys(data).length).toBe(2)
  expect(Object.keys(data)[0].entry === 'testing 1...2...')
})

test('Make sure we do not go past the max', async () => {
  for (var i = 0; i < 350; i++) {
    LogStore.log(`entry for ${i}`)
  }

  const data = LogStore._getLoggingData()
  expect(Object.keys(data).length).toBe(100)
  expect(Object.keys(data)[0].entry === 'entry for 349')
})

test('Make sure we DO NOT show private keys if they are present', async () => {
  LogStore.log(
    'testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    'testing "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  const data = LogStore._getLoggingData()
  // because above we added LOTS
  expect(Object.keys(data).length).toBe(100)
  expect(
    Object.keys(data)[0].entry ===
      'testing "a" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )
})

test('Make sure we DO NOT show private keys and careful to not remove npvt somwhere in teh string needlessly', async () => {
  LogStore.log(
    'testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    'testing "npvt" npvt "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  const data = LogStore._getLoggingData()
  // because above we added LOTS
  expect(Object.keys(data).length).toBe(100)
  expect(
    Object.keys(data)[0].entry ===
      'testing "npvt" npvt "a" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )
})
