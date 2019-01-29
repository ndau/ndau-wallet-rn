import DateHelper from '../DateHelper'

test('getDaysFromMicroseconds sends back 30 days', async () => {
  expect(DateHelper.getDaysFromMicroseconds(2592000000000)).toBe(30)
})

test('getDaysFromMicroseconds sends back 90 days', async () => {
  expect(DateHelper.getDaysFromMicroseconds(7776000000000)).toBe(90)
})

// these are the same test strings found in the go code
test('parseDurationToMicroseconds does the right thing', async () => {
  var data = [
    { in: 't0s', out: 0 },
    { in: 't1s', out: 1000000 },
    { in: '1m', out: 30 * 24 * 60 * 60 * 1000000 },
    { in: 't1m', out: 60000000 },
    { in: 'p1y2m3dt4h5m6s', out: 36993906000000 },
    { in: 'P1Y2M3DT4H5M6S', out: 36993906000000 },
    { in: '1y2m3dt4h5m6s7u', out: 36993906000007 },
    { in: '1h', out: 0 },
    { in: '100y', out: 100 * 365 * 24 * 60 * 60 * 1000000 },
    { in: '100m', out: 100 * 30 * 24 * 60 * 60 * 1000000 },
    { in: '100d', out: 100 * 24 * 60 * 60 * 1000000 },
    { in: 't100h', out: 100 * 60 * 60 * 1000000 },
    { in: 't100m', out: 100 * 60 * 1000000 },
    { in: 't100s', out: 100000000 },
    { in: 't1u', out: 1 },
    { in: 't1us', out: 1 }
  ]

  data.forEach(d => {
    expect(DateHelper.parseDurationToMicroseconds(d.in)).toBe(d.out)
  })
})
