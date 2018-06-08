import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  Text,
  View,
  AppRegistry,
  NavigatorIOS,
  TouchableHighlight
} from 'react-native';

// Importing scenes for our app
import Home from './Home';
import Movie from './Movie';
import Splash from './Splash';

// export default class App extends Component {
// Our renderScene function will choose which scene to render based on the route id
// renderScene(route, navigator) {
//   if (route.id === 1) {
//     return <Home navigator={navigator} />;
//   } else if (route.id === 2) {
//     return <Movie navigator={navigator} {...route.passProps} />;
//   } else if (route.id === 3) {
//     return <Splash navigator={navigator} />;
//   }
// }

// The configureScene function allows us to change the animation properties of a scene
// configureScene() {
//   return Navigator.SceneConfigs.FloatFromBottom;
// }

// render() {
//   return (
//     // Our Navigator handles the transition between different scenes in our app
//     <Navigator
//       // The first page we are going to render
//       initialRoute={{ id: 3 }}
//       // Passing in our renderScene function
//       renderScene={this.renderScene}
//       // Passing in our configureScene function
//       configureScene={this.configureScene}
//     />
//   );
// }
// render() {
//   return (
//     <View style={styles.container}>
//       <Text>Open up App.js to start working on your app!</Text>
//       <Text>Changes you make will automatically reload.</Text>
//       <Text>Shake your phone to open the developer menu.</Text>
//       <NavigatorIOS
//         // The first page we are going to render
//         initialRoute={{ id: 3 }}
//         // Passing in our renderScene function
//         renderScene={this.renderScene}
//         // Passing in our configureScene function
//         configureScene={this.configureScene}
//       />
//     </View>
//   );
// }
// render() {
//   return (
//     <NavigatorIOS
//       initialRoute={{
//         component: MyScene,
//         title: 'My Initial Scene'
//       }}
//       style={{ flex: 1 }}
//     />
//   );
// }
//   render() {
//     return (
//       // Our Navigator handles the transition between different scenes in our app
//       <NavigatorIOS
//         // The first page we are going to render
//         initialRoute={{
//           component: MultipleSceneApp,
//           title: 'My Initial Scene'
//         }}
//         // Passing in our renderScene function
//         renderScene={this.renderScene}
//         // Passing in our configureScene function
//         configureScene={this.configureScene}
//       />
//     );
//   }
// }

export default class MultipleSceneApp extends Component {
  // Our renderScene function will choose which scene to render based on the route id
  renderScene(route, navigator) {
    if (route.id === 1) {
      return <Home navigator={navigator} />;
    } else if (route.id === 2) {
      return <Movie navigator={navigator} {...route.passProps} />;
    } else if (route.id === 3) {
      return <Splash navigator={navigator} />;
    }
  }

  // The configureScene function allows us to change the animation properties of a scene
  configureScene() {
    return Navigator.SceneConfigs.FloatFromBottom;
  }

  render() {
    return (
      // Our Navigator handles the transition between different scenes in our app
      <NavigatorIOS
        // The first page we are going to render
        // initialRoute={{ id: 3 }}
        initialRoute={{
          component: MultipleSceneApp,
          title: 'My Initial Scene'
        }}
        // Passing in our renderScene function
        renderScene={this.renderScene}
        // Passing in our configureScene function
        configureScene={this.configureScene}
      />
    );
  }
}
AppRegistry.registerComponent('MultipleSceneApp', () => MultipleSceneApp);

// class MyScene extends Component {
//   static propTypes = {
//     // title: PropTypes.string.isRequired,
//     navigator: PropTypes.object.isRequired
//   };

//   _onForward = () => {
//     this.props.navigator.push({
//       title: 'Scene ' + nextIndex
//     });
//   };

//   render() {
//     return (
//       <View>
//         <Text>Current Scene: {this.props.title}</Text>
//         <TouchableHighlight onPress={this._onForward}>
//           <Text>Tap me to load the next scene</Text>
//         </TouchableHighlight>
//       </View>
//     );
//   }
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center'
//   }
// });
