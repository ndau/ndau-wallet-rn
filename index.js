/**
 * @format
 */
import {AppRegistry} from 'react-native';

import BackgroundTasks from './src/services/BackgroundTasks'
import 'react-native-get-random-values'
// import crypto from 'crypto'

import {name as appName} from './app.json';
import { Text,TextInput,LogBox } from 'react-native';
import App from './src/app'
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

AppRegistry.registerComponent(appName, () => App);
BackgroundTasks.register()

// if (Text.defaultProps == null) {
//     Text.defaultProps = {};
//     Text.defaultProps.allowFontScaling = false;
// }

// if (TextInput.defaultProps == null) {
//     TextInput.defaultProps = {};
//     TextInput.defaultProps.allowFontScaling = false;
// }