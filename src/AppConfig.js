/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

const LOCALE = 'en-US'
const CURRENT_PRICE_CURRENCY = 'USD'
const NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY = 30
const NDAU_SUMMARY_PRECISION = 2
const NDAU_DETAIL_PRECISION = 8
const BACKGROUND_TASK_INTERVAL = 60 // 60 minutes
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
const GENESIS_USER_VALIDATION_SCRIPT = 'oAARiKABAiCI'

const API_MAX_RETRIES = 3 // allow 3 unsuccessful attempts
const API_RETRY_DELAY_MS = 1 * 1000 // 1 * 1000 = 1 second (in miliseconds)
const API_DEFAULT_TIMEOUT_MS = 10 * 1000 // 10 * 1000 = 10 seconds (in miliseconds)

const TRANSACTION_FEE_KNOWLEDGEBASE_URL =
  'https://ndaucollective.org/knowledge-base/transaction-fees/'
const SIB_FEE_KNOWLEDGEBASE_URL =
  'https://ndaucollective.org/knowledge-base/stabilization-incentive-burn-sib/'
const SPENDABLE_KNOWLEDGEBASE_URL =
  'https://ndaucollective.org/knowledge-base/spendable/'
const EAI_KNOWLEDGEBASE_URL =
  'https://ndaucollective.org/knowledge-base/ecosystem-alignment-incentive-eai/'
const BLOCKCHAIN_KNOWLEDGEBASE_URL = 
  'https://ndau.io/knowledge-base/what-is-market-price-and-how-is-it-recorded-on-the-ndau-blockchain/'
const BUY_NDAU_URL = 'https://ndau.io/buy'

const MAX_LOG_ENTRIES = 101

const calcExplorerUrl = (address, network) =>
  `https://explorer.service.ndau.tech/account/${address}/?node=${network}`

const FRESHDESK_INTEGRATION_API_KEY = 'WfxQlzgny92866U26BCxvshY2nCf8kO531Yyfdkj'
const FRESHDESK_TICKET_ENDPOINT =
  'https://support.ndau.tech/default/freshdesk-integration'

export default {
  calcExplorerUrl,
  LOCALE,
  CURRENT_PRICE_CURRENCY,
  NUMBER_OF_KEYS_TO_GRAB_ON_RECOVERY,
  VALIDATION_KEY_SEARCH_START_INDEX,
  NDAU_SUMMARY_PRECISION,
  NDAU_DETAIL_PRECISION,
  BACKGROUND_TASK_INTERVAL,
  NODE_ADDRESSES,
  VALIDATION_KEY_SEARCH_ITERATION_MAX,
  GENESIS_USER_VALIDATION_SCRIPT,
  API_MAX_RETRIES,
  API_RETRY_DELAY_MS,
  API_DEFAULT_TIMEOUT_MS,
  TRANSACTION_FEE_KNOWLEDGEBASE_URL,
  SIB_FEE_KNOWLEDGEBASE_URL,
  BLOCKCHAIN_KNOWLEDGEBASE_URL,
  BUY_NDAU_URL,
  MAX_LOG_ENTRIES,
  SPENDABLE_KNOWLEDGEBASE_URL,
  EAI_KNOWLEDGEBASE_URL,
  FRESHDESK_INTEGRATION_API_KEY,
  FRESHDESK_TICKET_ENDPOINT
}
