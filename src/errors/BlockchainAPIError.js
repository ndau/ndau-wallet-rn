class BlockchainAPIError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, BlockchainAPIError)
    this.message =
      'The blockchain is temporarily unavailable. Please try your transaction again in a moment.'
  }
}

export default BlockchainAPIError
