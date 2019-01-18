class BlockchainAPIError extends Error {
  constructor (...args) {
    if (args) {
      super(...args)
      this.message = args[0]
    }

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, BlockchainAPIError)
    }
    if (!this.message) {
      this.message =
        'The blockchain is temporarily unavailable. Please try your transaction again in a moment.'
    }
  }
}

export default BlockchainAPIError
