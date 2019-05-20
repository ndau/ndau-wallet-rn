import LoggingService from '../services/LoggingService'

export const Messages = {
  INSUFFICIENT_BALANCE: 'Insufficient balance in account',
  SRC_NO_HISTORY: 'Source account has no history and no balance',
  SRC_DEST_SAME: 'Cannot send and receive from the same account'
}
const APIErrors = [
  {
    code: 1000,
    message: Messages.INSUFFICIENT_BALANCE,
    re: new RegExp('insufficient available balance', 'i')
  },
  {
    code: 1001,
    message: Messages.SRC_NO_HISTORY,
    re: new RegExp('no sequence found', 'i')
  },
  {
    code: 1002,
    message: Messages.SRC_DEST_SAME,
    re: new RegExp('source == destination', 'i')
  }
]

export const MessagesByCode = APIErrors.reduce((a, c, i, s) => {
  a[c.code] = c.message
  return a
}, {})

// codeFromMessage should return an error code based on
// returns null if not found
function codeFromMessage (msg) {
  const s = String(msg)
  const keys = Object.keys(APIErrors)
  for (let i = 0, l = keys.length; i < l; i++) {
    if (s.match(APIErrors[keys[i]].re)) {
      return APIErrors[keys[i]].code
    }
  }
  // If no code is found return `null`
  return null
}

// _getError tries to parse an axiosErr for BlockchainAPIError.
// It will first try to return an error, which is parseable by BlockChainAPIError
const _getError = axiosErr => {
  if (axiosErr && axiosErr.response && axiosErr.response.data) {
    const data = axiosErr.response.data
    if (data.err_code && data.err_code != -1) {
      return data.err_code // return a code, BlockchainAPIError's constructor will use it to look up a message
    } else {
      return data.err || data.msg || data
    }
  }
  return axiosErr
}

// shown if error not recognized
const DEFAULT_UNKNOWN_MESSAGE = 'Blockchain API error: '

class BlockchainAPIError extends Error {
  constructor (...args) {
    if (args) {
      super(...args)
      const err = args[0].err || args[0]
      this.error = err
      if (Object.prototype.toString.call(err) === '[object String]') {
        // If the err is a string. Just use that as the message
        this.message = err
      } else if (err instanceof BlockchainAPIError) {
        // if the error being thrown was already a blockchain api error, then copy it
        this.message = err.message
        this.status = err.status
      } else if (err.response) {
        // if the error being thrown was an axios error
        this.message = _getError(err)
        this.status = args[0].status
      } else if (err instanceof Error) {
        // pass through an error
        this.message = err.message
      } else {
        this.message = err
      }
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BlockchainAPIError)
    }

    const parsedCode = parseInt(this.message)
    if (parsedCode > 999 && parsedCode < 9999) {
      this.message = MessagesByCode[parsedCode]
    } else {
      const code = codeFromMessage(this.message)
      const statusOrNot = this.status ? `${this.status} ` : ' '
      if (code !== null) {
        this.message = MessagesByCode[code]
      } else {
        this.message = `${DEFAULT_UNKNOWN_MESSAGE}${statusOrNot}${this.message}`
      }
    }
  }

  getData () {
    if (this.error && this.error.response && this.error.response.data) {
      return this.error.response.data
    }

    return null
  }
}

export default BlockchainAPIError
