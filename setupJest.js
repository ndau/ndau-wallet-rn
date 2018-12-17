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

// Ignore React Web errors when using React Native
console.error = message => {
  return message
}

require('react-native-mock-render/mock')

global.fetch = require('jest-fetch-mock')

var chai = require('chai')

global.expect = chai.expect

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
// require('react-native-mock/mock'); // <-- side-effects!!!
