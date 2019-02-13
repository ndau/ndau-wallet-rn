import deviceLog, { InMemoryAdapter } from 'react-native-device-log'

const { JSDOM } = require('jsdom')
const jsdom = new JSDOM()
const { window } = jsdom

function copyProps (src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter(prop => typeof target[prop] === 'undefined')
    .map(prop => Object.getOwnPropertyDescriptor(src, prop))
  Object.defineProperties(target, props)
}

global.window = window
global.document = window.document
global.navigator = {
  userAgent: 'node.js'
}
copyProps(window, global)

// Setup adapter to work with enzyme 3.2.0
const Enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

Enzyme.configure({ adapter: new Adapter() })

// Ignore React Web errors when using React Native
console.error = message => {
  return message
}

global.fetch = require('jest-fetch-mock')

var chai = require('chai')

global.expect = chai.expect

deviceLog.init(new InMemoryAdapter(), {
  logToConsole: false, // Send logs to console as well as device-log
  logRNErrors: false, // Will pick up RN-errors and send them to the device log
  maxNumberToRender: 2000, // 0 or undefined == unlimited
  maxNumberToPersist: 2000 // 0 or undefined == unlimited
})
