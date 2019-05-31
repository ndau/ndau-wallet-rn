import LogStore from '../LogStore'
import data from '../../api/data'

test('Make sure we can log and get the data out', async () => {
  LogStore.clear()
  LogStore.log('testing 1...')
  LogStore.log('testing 1...2...')

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData.length).toBe(2)
      expect(jsonData[1].message).toEqual('testing 1...2...')
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we DO NOT show private keys if they are present', async () => {
  LogStore.clear()
  LogStore.log(
    'testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    'testing "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData.length).toBe(2)
      expect(jsonData[1].message).toEqual(
        'testing "a" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
      )
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we DO NOT show private keys and careful to not remove npvt somwhere in teh string needlessly', async () => {
  LogStore.clear()
  LogStore.log(
    'testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    'testing "npvt" npvt "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData.length).toBe(2)
      expect(jsonData[1].message).toEqual(
        'testing "npvt" npvt "a" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
      )
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Use more realistic data', async () => {
  LogStore.clear()
  LogStore.log(data.test7MP4FVUserData)
  LogStore.log(data.testUser)

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData[0].message.indexOf('npvt')).toBe(-1)
      expect(jsonData[1].message.indexOf('npvt')).toBe(-1)
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we do not go past the max', async () => {
  LogStore.clear()
  for (var i = 0; i < 350; i++) {
    LogStore.log(`entry for ${i}`)
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData.length).toBe(100)
      expect(jsonData[0].message).toBe('entry for 250')
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we do not go past the max', async () => {
  LogStore.clear()
  for (var i = 0; i < 5000; i++) {
    LogStore.log(`entry for ${i}`)
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      const jsonData = JSON.parse(data)
      expect(jsonData.length).toBe(100)
      expect(jsonData[0].message).toBe('entry for 4900')
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})
