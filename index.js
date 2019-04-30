import { AppRegistry } from 'react-native'
import App from './src/app'
import LoggingService from './src/services/LoggingService'

if (__DEV__) {
  import('./ReactotronConfig').then(() =>
    LoggingService.debug('Reactotron Configured')
  )
}

AppRegistry.registerComponent('ndauwalletrn', () => App)
