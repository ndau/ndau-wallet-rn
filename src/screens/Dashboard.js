import React, { Component } from 'react';

import { StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import ndauApi from '../api/NdauAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
      passPhrase: null
    };
  }

  componentDidMount = () => {
    this.loginOrSetup(this.state.passPhrase);
  };

  setPassphrase = (passPhrase) => {
    this.setState({ passPhrase: passPhrase });
    this.loginOrSetup(passPhrase);
  };

  loginOrSetup = async (passPhrase) => {
    const localUser = await !AsyncStorageHelper.getUser(passPhrase);
    console.debug(`AsyncStorageHelper user is: ${localUser}`);
    if (!localUser) {
      this.showSetupIfNeeded();
    } else {
      this.props.navigator.push({
        screen: 'ndau.Passphrase',
        title: 'Passphrase',
        backButtonHidden: true,
        passProps: {
          parentStyles: styles,
          iconsMap: this.props.iconsMap,
          setPassphrase: this.setPassphrase
        },
        navigatorStyle: {
          drawUnderTabBar: true,
          tabBarHidden: true
        }
      });
    }
  };

  showSetupIfNeeded = (user) => {
    this.props.navigator.push({
      screen: 'ndau.SetupMain',
      title: 'Setup',
      backButtonHidden: true,
      passProps: {
        parentStyles: styles,
        iconsMap: this.props.iconsMap
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true
      }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.container}>
          {this.user ? (
            this.user.addresses.map((address, index) => {
              <CollapsiblePanel key={address} title={address}>
                <Text style={styles.text}>Target Price: {this.state.targetPrice}</Text>
              </CollapsiblePanel>;
            })
          ) : (
            ''
          )}
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  container: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    backgroundColor: '#4d9678',
    borderRadius: 3,
    fontFamily: 'TitilliumWeb-Light',
    margin: '0.5%',
    padding: '2px',
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  }
});
