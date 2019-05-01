const LOCALE = 'en-US'
const CURRENT_PRICE_CURRENCY = 'USD'
const NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY = 30
const NDAU_SUMMARY_PRECISION = 2
const NDAU_DETAIL_PRECISION = 8
const BACKGROUND_TASK_INTERVAL = 15 // 15 minutes
const VALIDATION_KEY_SEARCH_ITERATION_MAX = 10
const NODE_ADDRESSES = [
  'ndarw5i7rmqtqstw4mtnchmfvxnrq4k3e2ytsyvsc7nxt2y7',
  'ndaq3nqhez3vvxn8rx4m6s6n3kv7k9js8i3xw8hqnwvi2ete',
  'ndahnsxr8zh7r6u685ka865wz77wb78xcn45rgskpeyiwuza',
  'ndam75fnjn7cdues7ivi7ccfq8f534quieaccqibrvuzhqxa',
  'ndaekyty73hd56gynsswuj5q9em68tp6ed5v7tpft872hvuc'
]
const VALIDATION_KEY_SEARCH_START_INDEX = 1
// this will be the value of the account.validationScript present
// for a genesis user containing the 2 recovery validation keys
const GENESIS_USER_VALIDATION_SCRIPT = 'somestring'

export default {
  LOCALE,
  CURRENT_PRICE_CURRENCY,
  NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY,
  VALIDATION_KEY_SEARCH_START_INDEX,
  NDAU_SUMMARY_PRECISION,
  NDAU_DETAIL_PRECISION,
  BACKGROUND_TASK_INTERVAL,
  NODE_ADDRESSES,
  VALIDATION_KEY_SEARCH_ITERATION_MAX,
  GENESIS_USER_VALIDATION_SCRIPT
}
