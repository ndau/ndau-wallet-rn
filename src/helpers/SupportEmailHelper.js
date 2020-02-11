/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import LogStore from '../stores/LogStore'

const Mailer = require('NativeModules').RNMail

const sendSupportEmail = async (hardware, os, version) => {
  const path = await LogStore.writeLogFile()

  LogStore.log(`Sending email with ${path} as attachment...`)
  Mailer.mail(
    {
      subject: `Wallet App Support - ${version} - ${os} - ${hardware}`,
      recipients: ['support@oneiro.freshdesk.com'],
      body:
        'Describe the problem or issue you are having.<br><br><br><br>The attached data does NOT contain any private keys and contains NO secret information (e.g., your wallet password or recovery phrase). This data contains basic state information about your wallet and accounts, and is automatically included in your support email to help us debug any issues you might be having with your wallet app.',
      isHTML: true,
      attachment: {
        path,
        type: 'json'
      }
    },
    async error => {
      if (error) {
        LogStore.log(error)
      }

      // remove the file
      LogStore.deleteLogFile(path)
    }
  )
}

export default {
  sendSupportEmail
}
