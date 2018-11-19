class ServerError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, ServerError)
  }
}

export default ServerError
