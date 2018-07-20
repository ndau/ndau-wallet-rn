import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Button,
  TextInput,
  SafeAreaView,
  Alert,
  Image
} from 'react-native';

class Passphrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      password: ''
    };
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  login = () => {
    this.props.setPassphrase(this.state.password);
    this.props.navigator.popToRoot();
  };

  render() {
    const { textInputColor } = this.state;
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View style={styles.imageView}>
              <Image source={require('../../img/n_icon_ko.png')} />
            </View>
            <TextInput
              style={{
                height: 45,
                borderColor: 'gray',
                borderWidth: 1,
                marginBottom: 10,
                marginTop: 10,
                paddingLeft: 10,
                color: textInputColor,
                backgroundColor: '#ffffff',
                fontSize: 18,
                fontFamily: 'TitilliumWeb-Regular'
              }}
              onChangeText={(password) => this.setState({ password })}
              value={this.state.password}
              placeholder="Enter a password"
              placeholderTextColor="#333"
              secureTextEntry={!this.state.showPasswords}
            />
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.login} title="Login" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

    backgroundColor: '#1c2227'
  },
  button: {
    marginTop: 0
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  },
  imageView: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingBottom: 40
  }
});

export default Passphrase;
