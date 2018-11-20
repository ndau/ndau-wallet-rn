class ServiceDiscoveryError extends Error {
  constructor (...args) {
    super(...args)
    Error.captureStackTrace(this, ServiceDiscoveryError)
    this.message =
      'Our service discovery API is temporarily unavailable. Please try your transaction again in a moment.'
  }
}

export default ServiceDiscoveryError
