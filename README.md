[![CircleCI](https://circleci.com/gh/oneiro-ndev/ndau-wallet-rn.svg?style=svg&circle-token=78d92a0e256f79e59d9ca0b2b7617b910db81323)](https://circleci.com/gh/oneiro-ndev/ndau-wallet-rn)

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

Below you will find instructions on how to get ndau wallet running in both Android and iOS. Please make sure to follow the [Getting Started](#getting-started) link first as there are quite a few things that need to be installed before you can start. Please also if you find something missing feel free to update! :)

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Mandatory Scripts](#mandatory-scripts)
- [Available Scripts](#available-scripts)
  - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run ios`](#npm-run-ios)
    - [`npm run android`](#npm-run-android)
- [Writing and Running Tests](#writing-and-running-tests)
- [Troubleshooting](#troubleshooting)
  - [iOS Simulator won't open](#ios-simulator-wont-open)

## Getting Started

The best place to start is the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide within the React Native documentation. Click on the Build Projects with Native Code link and go through both the iOS and Android sections. Here is an overall list you will need to install, the link gives more detail on each:

- `node` via `brew`
- `watchman` via `brew`
- `react-native-cli` via `npm`
- [Java SE Development Kit (JDK) 8 or newer](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio](https://developer.android.com/studio/)

## Mandatory Scripts

You must run the following scripts before you can begin using this application.

First we npm/yarn install:

`npm install`
`yarn install` (just incase you use yarn)

Once this completes you must also make sure to run this command. This one sets up iOS and Android projects pointing to all the correct node_module libraries we use:

`react-native link`

After the above is run you MUST now run the following commands:

`npm install`
`yarn install` (just incase you use yarn)

## Available Scripts

If Yarn was installed when the project was initialized, then dependencies will have been installed via Yarn, and you should probably use it to run these commands as well. Unlike dependency installation, command running syntax is identical for Yarn and NPM at the time of this writing.

### `npm start`

Runs your app in development mode.

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```
npm start --reset-cache
# or
yarn start --reset-cache
```

#### `npm test`

Runs the [jest](https://github.com/facebook/jest) test runner on your tests.

#### `npm run ios`

Like `npm start`, but also attempts to open your app in the iOS Simulator if you're on a Mac and have it installed.

#### `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:


## Writing and Running Tests

This project is set up to use [jest](https://facebook.github.io/jest/) for tests. You can configure whatever testing strategy you like, but jest works out of the box. Create test files in directories called `__tests__` or with the `.test` extension to have the files loaded by jest. See the [the template project](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/App.test.js) for an example test. The [jest documentation](https://facebook.github.io/jest/docs/en/getting-started.html) is also a wonderful resource, as is the [React Native testing tutorial](https://facebook.github.io/jest/docs/en/tutorial-react-native.html).

## Troubleshooting

### iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"
* "You may need to install Xcode" but it is already installed
* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.
2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.
3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.
