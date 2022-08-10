/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import AccountAPI from '../api/AccountAPI'
import TransactionAPI from '../api/TransactionAPI'
import DateHelper from './DateHelper'
import AppConstants from '../AppConstants'
import DataFormatHelper from './DataFormatHelper'
import AppConfig from '../AppConfig'
import ServiceDiscovery from '../api/ServiceDiscovery'
import axios from 'axios';
import { formatAccount, formatTransaction } from './format'
const getAccountHistory = async address => {
  const accountHistory = await AccountAPI.accountHistory(address)
  if (accountHistory.Items) {
    for (let i = 0; i < accountHistory.Items.length; i++) {
      const txHistory = await TransactionAPI.transactionByHash(
        accountHistory.Items[i].TxHash
      )
      accountHistory.Items[i].txDetail = txHistory.Tx
    }
  }

  return accountHistory
}



export const getAccount=async(address)=>{
  const getNodeAddress = async type => {
    return await ServiceDiscovery.getNodeAddress(type)
  

    
  }


  try {
    const accountStateEndpoint= `${await getNodeAddress()}/account/account/${address}`;
console.log('account..',accountStateEndpoint)
    let accountStateEndpointResponse = await axios.get(
      accountStateEndpoint,
      HTTP_REQUEST_HEADER
    );

    const account = {
      address,
      ...accountStateEndpointResponse.data[address],
    };
    console.log('account,,,',account)

    let formattedAccount = formatAccount(account);

    return formattedAccount;

  }catch (e) {
    console.error(e);
    return null;
  }

}
const hasItems = accountHistory => {
  return accountHistory.Items
}

const getTransactionDate = item => {
  return DateHelper.getDate(item.Timestamp)
}

const getTransactionId = item => {
  return item.TxHash
}

export const getTransaction = async (hash) => {

  const getNodeAddress = async type => {
    return await ServiceDiscovery.getNodeAddress(type);

    
  }
  console.log('hash.......',hash);

  // const transactionHash = window.decodeURIComponent(hash);
  // console.log('decodeURIComponent hash.......',transactionHash);
  const transactionEndpoint = `${await getNodeAddress()}/transaction/detail/${hash}`;

  let getTransactionRetrycount = 0;
  let response = await axios.get(transactionEndpoint, HTTP_REQUEST_HEADER);

  while (response.data === null && getTransactionRetrycount < 8) {
   
    const transactionEndpoint = `${await getNodeAddress()}/transaction/detail/${hash}`;
    response = await axios.get(transactionEndpoint, HTTP_REQUEST_HEADER);
    getTransactionRetrycount++;
  }
  return formatTransaction(response.data);
};
const getTransactionDestination = item => {
  // TODO: THIS MAY NOT BE GOOD! My assumption is
  // that this is an array for a reason but there is currently
  // only one in here
  return item.txDetail.Transactable.dst
    ? item.txDetail.Transactable.dst[0]
    : null
}





const getTransactionSource = item => {
  // TODO: THIS MAY NOT BE GOOD! My assumption is
  // that this is an array for a reason but there is currently
  // only one in here
  return item.txDetail.Transactable.src
    ? item.txDetail.Transactable.src[0]
    : null
}

const getTransactionType = accountHistory => {
  return AppConstants.TRANSACTION_TYPES[accountHistory.txDetail.TransactableID]
}

const getTransactionBalance = accountHistory => {
  return DataFormatHelper.getNdauFromNapu(
    accountHistory.Balance,
    AppConfig.NDAU_SUMMARY_PRECISION,
    true
  )
}

export const HTTP_REQUEST_HEADER = {
  method: 'GET',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
}


const dateToday = new Date(Date.now()).toISOString();
const initDate30DaysAgo = new Date(Date.now());
initDate30DaysAgo.setDate(initDate30DaysAgo.getDate() - 30);
let Date30DaysAgo = initDate30DaysAgo.toISOString();

 const getAccountHistorywithfilter = async (
  address,
  fromDate=Date30DaysAgo,
  toDate=dateToday 
) => {
  try{

 
  const dateToday = new Date(Date.now()).toISOString();
  const getAccountHistoryFromDate = fromDate?fromDate.toISOString(): Date30DaysAgo;
  const getAccountHistoryToDate = toDate ?toDate.toISOString(): dateToday;
  //
  //
const getNodeAddress = async type => {
  return await ServiceDiscovery.getNodeAddress(type)
}


  const BlockDateRangeEndpoint = `${await getNodeAddress()}/block/daterange/${getAccountHistoryFromDate}/${getAccountHistoryToDate}?noempty=true&limit=2`;
  //
    //
    console.log('BlockDateRangeEndpoint api..',BlockDateRangeEndpoint)
    const blocksInRange = await axios.get(BlockDateRangeEndpoint);
    const oldestBlockInRange = blocksInRange.data.last_height;
    //

  const limitedAccountHistoryEndpoint = `${await getNodeAddress()}/account/history/${address}?after=${oldestBlockInRange}`;

  const accountHistoryEndpoint = `${await getNodeAddress()}/account/history/${address}`;

  //

  var allItem=[];
 
  let offset = 0;
  let MAX_LOOPS = 100;
  while (true && MAX_LOOPS) {
  
    const url = offset
      ? `${accountHistoryEndpoint}?after=${offset}`
      : limitedAccountHistoryEndpoint;

    const response = await axios.get(url, HTTP_REQUEST_HEADER);
   
    let history = response.data && response.data.Items;

    if (response.data && response.data.Next === "") {
      // console.log('limitedAccountHistoryEndpoint',history)
      
      allItem = allItem.concat(history); // accumulate
      break;
    }
 

    if (response.data && response.data.Next) {
      // assert this format in the Next field since it's not a useable address by itself
      if (!response.data.Next.match(/account\/history\/\?after=\d*/)) {
        throw new Error(
          `Expected /account/history?after=N, got ${response.data.Next}`
        );
      }
      allItem = allItem.concat(history); // accumulate

      // remove everything but the numbers from the url
      offset = response.data.Next.replace(/[^\d]/g, "");
    }
  }


 
  return allItem;
}catch(e){
  return e;
    
  console.log('your error')}
};

export default {
  getAccountHistory,
  getAccountHistorywithfilter,
  hasItems,
  getAccount,
  getTransaction,
  getTransactionDate,
  getTransactionId,
  getTransactionType,
  getTransactionBalance,
  getTransactionDestination,
  getTransactionSource
}
