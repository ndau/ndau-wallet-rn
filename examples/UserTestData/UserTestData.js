// ATTENTION COOL TESTING FEATURE
// If you would like to test sending data from our log entries
// simply populate this with valid JSON from the log file.
// This data is used INSTEAD OF what is in MultiSafe. HOWEVER,
// one caveat to this as it will safe this data into your MultiSafe
// so once you do this you will have the data in MultiSafe until
// you clean the device you are working on. This is not a terrible
// thing at all if you are trying to recreate a customer problem
// MAKE SURE that you set this back to null when finished
const user = null

export default {
  user: user || null
}
