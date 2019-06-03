import LogStore from '../LogStore'
import data from '../../api/data'
import AppConfig from '../../AppConfig'

test('Make sure we can log and get the data out', async () => {
  LogStore.clear()
  LogStore.log('#1 testing 1...')
  LogStore.log('#2 testing 1...2...')

  class FileIO {
    async appendFile (path, data, encoding) {
      if (!data) return

      if (data.message.indexOf('#1') !== -1) {
        expect(data.message).toEqual('#1 testing 1...')
      } else if (data.message.indexOf('#2') !== -1) {
        expect(data.message).toEqual('#2 testing 1...2...')
      }
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we DO NOT show private keys if they are present', async () => {
  LogStore.clear()
  LogStore.log(
    '#1 testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    '#2 testing "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y346npvtb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  class FileIO {
    async appendFile (path, data, encoding) {
      if (!data) return

      if (data.message.indexOf('#1') !== -1) {
        expect(data.message).toEqual('#1 testing 1..."*suppressed*"')
      } else if (data.message.indexOf('#2') !== -1) {
        expect(data.message).toBe(
          `#2 testing \"*suppressed*\" and public \"npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y346*suppressed*\"`
        )
      }
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we DO NOT show private even when they are just in there without quotes', async () => {
  LogStore.clear()
  LogStore.log(
    '#1 testing 1...npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb'
  )
  LogStore.log(
    '#2 testing npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y346npvtb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b'
  )

  class FileIO {
    async appendFile (path, data, encoding) {
      if (!data) return

      if (data.message.indexOf('#1') !== -1) {
        expect(data.message).toEqual('#1 testing 1...*suppressed*')
      } else if (data.message.indexOf('#2') !== -1) {
        expect(data.message).toBe(
          '#2 testing *suppressed*" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y346*suppressed*'
        )
      }
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we DO NOT show private keys and careful to not remove npvt somwhere in teh string needlessly', async () => {
  LogStore.clear()
  LogStore.log(
    '#1 testing 1..."npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb"'
  )
  LogStore.log(
    '#2 testing "*suppressed*" *suppressed* "npvt8ard395saaaaafnu25p694rkaxkir29ux5quru9b6nq4m3au4gugm2riue5xuqyyeabkkdcz9mc688665xmidzkjbfrw628y7c5zit8vcz6x7hjuxgfeu4kqaqxb" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
  )

  class FileIO {
    async appendFile (path, data, encoding) {
      if (!data) return

      if (data.message.indexOf('#1') !== -1) {
        expect(data.message).toEqual('#1 testing 1..."*suppressed*"')
      } else if (data.message.indexOf('#2') !== -1) {
        expect(data.message).toBe(
          '#2 testing "*suppressed*" *suppressed* "*suppressed*" and public "npubaard3952aaaaaetmg8gtxb6g75n9i3fxi8y3465qgjb7mmfv47nupz5kgettw7tpkazt5utca85h8ri4qquegqs8byaqhwx66uhnxx8xz4dqfzbgavvs4jkbj44b"'
        )
      }
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Use more realistic data', async () => {
  LogStore.clear()
  LogStore.log(data.test7MP4FVUserData)
  LogStore.log(data.testUser)

  class FileIO {
    async appendFile (path, data, encoding) {
      if (!data) return

      expect(data.message.indexOf('npvt')).toBe(-1)
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
    constructor () {
      this._data = []
    }
    async appendFile (path, data, encoding) {
      if (!data) return
      this._data.push(data)
      expect(this._data.length <= AppConfig.MAX_LOG_ENTRIES).toBe(true)
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
    constructor () {
      this._data = []
    }
    async appendFile (path, data, encoding) {
      if (!data) return
      this._data.push(data)
      expect(this._data.length <= AppConfig.MAX_LOG_ENTRIES).toBe(true)
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})

test('Make sure we do not go past the max', async () => {
  LogStore.clear()
  for (var i = 0; i < 10000; i++) {
    LogStore.log(`entry for ${i}`)
  }

  class FileIO {
    constructor () {
      this._data = []
    }
    async appendFile (path, data, encoding) {
      if (!data) return
      this._data.push(data)
      expect(this._data.length <= AppConfig.MAX_LOG_ENTRIES).toBe(true)
    }
  }

  await LogStore._logData.writeArrayToFile(new FileIO(), '/')
})
