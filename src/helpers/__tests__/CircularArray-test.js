import CircularArray from '../CircularArray'

test('do not grow the array as entries get added', async () => {
  const array = new CircularArray(5)
  array.write(1)
  array.write(2)
  array.write(3)
  array.write(4)
  array.write(5)
  array.write(6)
  array.write(7)
  array.write(8)

  class FileIO {
    async writeFile (path, data, encoding) {
      expect(data).toEqual([4, 5, 6, 7, 8])
    }
  }

  array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array a small amount of entries get added', async () => {
  const array = new CircularArray(5)
  for (let i = 0; i < 10; i++) {
    array.write({ key: i })
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      expect(data.length).toBe(5)
    }
  }

  array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array a medium amount of entries get added', async () => {
  const array = new CircularArray(5)
  for (let i = 0; i < 200; i++) {
    array.write({ key: i })
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      expect(data.length).toBe(5)
    }
  }

  array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array a large amount of entries get added', async () => {
  const array = new CircularArray(5)
  for (let i = 0; i < 1000; i++) {
    array.write({ key: i })
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      expect(data.length).toBe(5)
    }
  }

  array.writeArrayToFile(new FileIO(), '/')
})

test('test a more realistic initial amount of entries', async () => {
  const array = new CircularArray(500)
  for (let i = 0; i < 10000; i++) {
    array.write({ key: i, test: '2234' })
  }

  class FileIO {
    async writeFile (path, data, encoding) {
      expect(data.length).toBe(500)
    }
  }

  array.writeArrayToFile(new FileIO(), '/')
})
