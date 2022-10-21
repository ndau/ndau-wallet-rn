[![CircleCI](https://circleci.com/gh/ndau/ndau-wallet-rn.svg?style=svg&circle-token=78d92a0e256f79e59d9ca0b2b7617b910db81323)](https://circleci.com/gh/ndau/ndau-wallet-rn)

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app). The most recent version of this guide is available [here](https://github.com/react-community/create-react-native-app/blob/master/react-native-scripts/template/README.md).

## Table of Contents

- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Build Instructions](#mandatory-scripts)
- [Additional Build and Test Options](#available-scripts)
    - [`npm start`](#npm-start)
    - [`npm test`](#npm-test)
    - [`npm run ios`](#npm-run-ios)
    - [`npm run android`](#npm-run-android)
- [Writing and Running Tests](#writing-and-running-tests)
- [Circle-CI integration](#circle-ci-integration)
- [Deployment](#deployment)
    - [iOS Deployment](#ios-deployment)
    - [Android Deployment](#android-deployment)
- [Troubleshooting](#troubleshooting)
    - [iOS Simulator won't open](#ios-simulator-wont-open)

## Getting Started

Be sure you're familiar with the [Getting Started](https://facebook.github.io/react-native/docs/getting-started.html) guide within the React Native documentation.

Install the following tools:

- `node` via `brew`
- `watchman` via `brew`
  - `brew install watchman`
- [nvm](https://github.com/creationix/nvm)
- [`react-native-cli` via `npm`](https://www.npmjs.com/package/react-native-cli) - be sure to install it globally.
  - `npm install -g react-native-cli`
- [Java SE Development Kit (JDK) 8 or newer](http://www.oracle.com/technetwork/java/javase/downloads/jdk8-downloads-2133151.html)
- [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12)
- [Android Studio](https://developer.android.com/studio/)
- [Cocoapods](https://cocoapods.org/)
## Software Versions

These instructions are current as of the following releases:
 - macOS 11.6 (Big Sur)
 - Xcode 13.0
 - nvm 0.38.0
 - node v14.18.0
 - npm 6.14.15
 - Cocoapods 1.11.2
## Build Instructions

Use `nvm` to install `Node.js`:
```
nvm install v14.18.0
```
The font assets used by the ndau wallet app are specified in the `.npmrc` file in the `ndau-wallet-rn` folder. As these are licensed fonts they are not included here. Contact a member of the core team to get the access token you will need.
```
@fortawesome:registry=https://npm.fontawesome.com/
//npm.fontawesome.com/:_authToken=YOUR_TOKEN_HERE
```
Replace `YOUR_TOKEN_HERE` with the FontAwesomePro token. The text above is correct - `@fortawesome` is not a typo.
Now npm install:
```
npm install
```
Set up iOS and Android projects with the correct `node_module` libraries:
```
react-native link

// Or, due to autolinking, link and unlink commands have been removed in React Native 0.69. So I try instead: npx react-native-asset
```
Re-run `npm install` and load all assets:
```
npm install
npm run load-assets
```
With `npm` running, load all required iOS pods. In a separate Terminal shell:
```
npm start
```
Leave it running and return to the original shell:
```
cd ios
pod install
```
Build the wallet app and run it in the iOS Simulator:
```
cd ..
npx react-native run-ios --simulator='iPhone 11'
```
## Additional build and test options
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

## Circle-CI integration

This project has been configured through CircleCI's GitHub integration to run tests on every commit. To view or change those settings, you may visit this repo's [CircleCI page](https://circleci.com/gh/ndau/ndau-wallet-rn). If you log in with your GitHub account, and you have appropriate privleges you will be able to change the build settings.

To run the CircleCI tests locally, you can execute the script `./.circleci/local.sh`. It will install the [CircleCI CLI](https://circleci.com/docs/2.0/local-cli/) tool, if you don't already have it.

## Deployment
### iOS Deployment

### Android Deployment

- Use [this](https://facebook.github.io/react-native/docs/signed-apk-android.html) link to create the APK

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

Updates:

npm dependency updates (audit)
componentWillMount => componentDidMount
RNCNetInfo -- deprecated API
Can't perform a React state update on an unmounted component -- to fix, cancel all subscriptions and asynchronous tasks in "a useEffect cleanup function" in RecoveryWordInput (at SetupGetRecoveryPhrase.js:401)