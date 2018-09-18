import DateHelper from '../DateHelper';

test('getDaysFromMicroseconds sends back 30 days', async () => {
  expect(DateHelper.getDaysFromMicroseconds(2592000000000)).toBe(30);
});

test('getDaysFromMicroseconds sends back 90 days', async () => {
  expect(DateHelper.getDaysFromMicroseconds(7776000000000)).toBe(90);
});
