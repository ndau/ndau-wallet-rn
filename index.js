import { AppRegistry } from 'react-native'
import App from './src/app'
if (__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}

AppRegistry.registerComponent('ndauwalletrn', () => App)
