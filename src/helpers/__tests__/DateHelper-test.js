/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

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

test('getDaysFromISODate returns days from an ISO8601 duration', async () => {
  expect(DateHelper.getDaysFromISODate('3dt18h57m7s726133us')).toBe(4)
  expect(DateHelper.getDaysFromISODate('1y3dt18h57m7s726133us')).toBe(369)
  expect(DateHelper.getDaysFromISODate('3y')).toBe(1095)
})

test('getYearsFromISODate returns days from an ISO8601 duration', async () => {
  expect(DateHelper.getYearsFromISODate('3dt18h57m7s726133us')).toBe(0)
  expect(DateHelper.getYearsFromISODate('1y3dt18h57m7s726133us')).toBe(1)
  expect(DateHelper.getYearsFromISODate('3y')).toBe(3)
  expect(DateHelper.getYearsFromISODate('3m')).toBe(0)
  expect(DateHelper.getYearsFromISODate('11m')).toBe(1)
  expect(DateHelper.getYearsFromISODate('13m')).toBe(1)
})

test('getMonthsFromISODate returns days from an ISO8601 duration', async () => {
  expect(DateHelper.getMonthsFromISODate('3dt18h57m7s726133us')).toBe(0)
  expect(DateHelper.getMonthsFromISODate('1y3dt18h57m7s726133us')).toBe(12)
  expect(DateHelper.getMonthsFromISODate('3y')).toBe(36)
  expect(DateHelper.getMonthsFromISODate('3m')).toBe(3)
  expect(DateHelper.getMonthsFromISODate('11m')).toBe(11)
  expect(DateHelper.getMonthsFromISODate('13m')).toBe(13)
  expect(DateHelper.getMonthsFromISODate('13d')).toBe(0)
  expect(DateHelper.getMonthsFromISODate('24d')).toBe(1)
  expect(DateHelper.getMonthsFromISODate('34d')).toBe(1)
})
