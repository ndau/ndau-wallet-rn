import { NativeModules } from 'react-native'
import ClaimTransaction from '../transactions/ClaimTransaction'
import KeyMaster from './KeyMaster'
import TransactionAPI from '../api/TransactionAPI'
import TxSignPrep from '../model/TxSignPrep'
import FlashNotification from '../components/FlashNotification'
import Base64 from 'base-64'

const sendClaimTransaction = async (wallet, account) => {
  // ok...if we got here we can assume we do NOT have a validation
  // key, so we need that to call KeyaddrManager.sign...so create it
  // but only if there are none present. This business logic may
  // change in the future, but for now, we only create one validation
  // key per account here
  if (account.validationKeys.length === 0) {
    await KeyMaster.addValidationKey(wallet, account)
  }

  // There is an assumption here that there is only one validation
  // key, this may or may not need to change in the future.
  const privateKeyFromHash = KeyMaster.getPrivateKeyFromHash(
    wallet,
    account.validationKeys[0]
  )

  // creat the transaction without the signature
  const claimTransaction = new ClaimTransaction(account, wallet.keys)
  const jsonClaimTransaction = claimTransaction.create()

  // Use the TxSignPrep to get it ready to send
  const preparedTransaction = new TxSignPrep().prepare(jsonClaimTransaction)
  const base64EncodedPrepTx = preparedTransaction.b64encode()

  console.log(`About to sign`)
  // Get the signature to use in the claim transaction
  const signature = await NativeModules.KeyaddrManager.sign(
    privateKeyFromHash,
    base64EncodedPrepTx
  )

  console.debug(`signature from KeyaddrManager.sign is ${signature}`)

  // add the signature we just created into the claim transaction
  claimTransaction.sign(jsonClaimTransaction, signature)

  // base64 the JSON
  // we assume the string has no special characters otherwise
  // we should use the utf8 npm package to encode before we send
  // to base-64's encode
  const base64EncodedJSONClaimTx = Base64.encode(
    JSON.stringify(jsonClaimTransaction)
  )

  // send to prevalidate
  try {
    await TransactionAPI.prevalidate(base64EncodedJSONClaimTx)
    await TransactionAPI.submit(base64EncodedJSONClaimTx)
  } catch (error) {
    console.warn(`Error from blockchain: ${error.message}`)
    FlashNotification.showError(
      `Problem occurred sending a claim transaction for ${
        account.addressData.nickname
      }`
    )
  }
}

export default {
  sendClaimTransaction
}
