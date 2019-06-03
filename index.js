import { AppRegistry } from 'react-native'
import App from './src/app'
import LogStore from './src/stores/LogStore'

if (__DEV__) {
  import('./ReactotronConfig').then(() => LogStore.log('Reactotron Configured'))
}

AppRegistry.registerComponent('ndauwalletrn', () => App)
