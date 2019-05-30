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

  console.log(`array has ${array.read()}`)

  expect(array.read()).toEqual([4, 5, 6, 7, 8])
})

test('do not grow the array as LOTS of entries get added', async () => {
  const array = new CircularArray(5)
  for (let i = 0; i < 300; i++) {
    array.write({ key: i })
  }

  expect(array.read().length).toBe(5)
})
