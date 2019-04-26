import LoggingService from "../services/LoggingService";

const APIErrors = [
  {
    code: 1000,
    message: "Insufficient balance in account",
    re: new RegExp("insufficient available balance")
  }
]

const MessagesByCode = APIErrors.reduce((p, c, i, a) => {
  a[c.code] = c.message
  return a
}, {})

// codeFromMessage should return an error code based on
// returns null if not found
function codeFromMessage(msg) {
  const s = String(msg)
  const keys = Object.keys(APIErrors)
  for (let i = 0, l = keys.length; i<l; i++) {
    if (s.match(APIErrors[keys[i]].re)) {
      return APIErrors[keys[i]].code
    }
  }
  // If no code is found return `null`
  return null
}

// shown if error not recognized
const DEFAULT_UNKNOWN_MESSAGE = "Blockchain API error: "

class BlockchainAPIError extends Error {
  constructor (...args) {
    if (args) {
      super(...args)
      if (Object.prototype.toString.call(args[0]) === "[object String]") {
        this.message = args[0]
      } else if (Object.prototype.toString.call(args[0]) === "[object Object]") {
        this.message = args[0].msg
        this.status = args[0].status
      }
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BlockchainAPIError)
    }

    const parsedCode = parseInt(this.message)
    if ( parsedCode > 999 && parsedCode < 9999 ) {
      this.message = MessagesByCode[code]
    } else {
      const code = codeFromMessage(this.message)
      const statusOrNot = this.status ? ` status code: ${this.status}` : ''
      if (code === null) {
        this.message = `${DEFAULT_UNKNOWN_MESSAGE}${statusOrNot} [${code}]`
      } else {
      this.message = MessagesByCode[code]
      }
    }
  }
}

export default BlockchainAPIError
