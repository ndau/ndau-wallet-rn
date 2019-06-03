import CircularArray from '../CircularArray'

test('handle the case were we have not taken up the full array yet', async () => {
  const array = new CircularArray(10)
  array.write(1)
  array.write(2)
  array.write(3)
  array.write(4)
  array.write(5)
  array.write(6)
  array.write(7)
  array.write(8)

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data == '8') {
        expect(fileData.length).toBe(8)
        expect(fileData).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

test('handle the case were we have just filled the array', async () => {
  const array = new CircularArray(5)
  array.write(1)
  array.write(2)
  array.write(3)
  array.write(4)
  array.write(5)

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data == '5') {
        expect(fileData.length).toBe(5)
        expect(fileData).toEqual([1, 2, 3, 4, 5])
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

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

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data == '8') {
        expect(fileData.length).toBe(5)
        expect(fileData).toEqual([4, 5, 6, 7, 8])
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array with a small amount of entries get added', async () => {
  const array = new CircularArray(5)
  for (let i = 0; i < 10; i++) {
    array.write({ key: i })
  }

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data.key == '9') {
        expect(fileData.length).toBe(5)
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array with a medium amount of entries get added', async () => {
  const array = new CircularArray(50)
  for (let i = 0; i < 300; i++) {
    array.write({ key: i })
  }

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data.key == '299') {
        expect(fileData.length).toBe(50)
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array with a large amount of entries get added', async () => {
  const array = new CircularArray(1000)
  for (let i = 0; i < 7000; i++) {
    array.write({ key: i })
  }

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data.key == '6999') {
        expect(fileData.length).toBe(1000)
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})

test('do not grow the array with an extra large amount of entries get added', async () => {
  const array = new CircularArray(5000)
  for (let i = 0; i < 40000; i++) {
    array.write({ key: i })
  }

  let fileData = []
  class FileIO {
    async appendFile (path, data, encoding) {
      fileData.push(data)
      if (data.key == '39999') {
        expect(fileData.length).toBe(5000)
      }
    }
  }

  await array.writeArrayToFile(new FileIO(), '/')
})
