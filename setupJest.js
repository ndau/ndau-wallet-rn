// import Enzyme, { shallow, render, mount } from 'enzyme';
// import Adapter from 'enzyme-adapter-react-16';
// // React 16 Enzyme adapter
// Enzyme.configure({ adapter: new Adapter() });
// // Make Enzyme functions available in all test files without importing
// global.shallow = shallow;
// global.render = render;
// global.mount = mount;
const { JSDOM } = require('jsdom');

const jsdom = new JSDOM();
const { window } = jsdom;

function copyProps(src, target) {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => typeof target[prop] === 'undefined')
    .map((prop) => Object.getOwnPropertyDescriptor(src, prop));
  Object.defineProperties(target, props);
}

global.window = window;
global.document = window.document;
global.navigator = {
  userAgent: 'node.js'
};
copyProps(window, global);

// Setup adapter to work with enzyme 3.2.0
const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

Enzyme.configure({ adapter: new Adapter() });

// Ignore React Web errors when using React Native
console.error = (message) => {
  return message;
};

require('react-native-mock-render/mock');

global.fetch = require('jest-fetch-mock');

// This will mutate `react-native`'s require cache with `react-native-mock`'s.
// require('react-native-mock/mock'); // <-- side-effects!!!
