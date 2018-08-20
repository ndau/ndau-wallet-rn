import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  ProgressViewIOS,
  Platform,
  ProgressBarAndroid,
  Picker,
  PickerIOS,
  SafeAreaView,
  NativeModules
} from 'react-native';
import ndauApi from '../api/NdauAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import CommonButton from '../components/CommonButton';

class SetupEAINode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: ''
    };
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  sendAccountAddresses = (userId, addresses, token) => {
    return new Promise((resolve, reject) => {
      ndauApi
        .sendAccountAddresses(userId, addresses, token)
        .then((whatPersisted) => {
          console.debug(`sendAccountAddresses persisted: ${whatPersisted}`);
          resolve(whatPersisted);
        })
        .catch((error) => {
          console.error(error);
          reject(error);
        });
    });
  };

  finishSetup = async () => {
    console.debug('Finishing Setup...');
    const addresses = await this.keyGeneration();

    this.sendAddressesToOneiro(addresses);
    this.persistAddresses(addresses);

    this.returnToDashboard();
  };

  keyGeneration = async () => {
    console.debug('Generating all keys from phrase given...');
    const seedPhraseString = this.props.seedPhraseArray.join().replace(/,/g, ' ');
    console.debug(`seedPhraseString: ${seedPhraseString}`);
    const seedPhraseAsBytes = await NativeModules.KeyaddrManager.KeyaddrWordsToBytes(
      'en',
      seedPhraseString
    );
    console.debug(`seedPhraseAsBytes: ${seedPhraseAsBytes}`);
    const publicAddresses = await NativeModules.KeyaddrManager.CreatePublicAddress(
      seedPhraseAsBytes,
      this.props.numberOfAccounts
    );
    console.debug(`publicAddresses: ${publicAddresses}`);

    return publicAddresses;
  };

  sendAddressesToOneiro = (addresses) => {
    this.sendAccountAddresses(this.props.userId, addresses, this.props.qrToken);
  };

  persistAddresses = (addresses) => {
    const user = {
      userId: this.props.userId,
      addresses: addresses
    };
    AsyncStorageHelper.setUser(user, this.props.encryptionPassword);
  };

  returnToDashboard = () => {
    this.props.navigator.push({
      label: 'Dashboard',
      screen: 'ndau.Dashboard',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts,
        seedPhraseArray: this.props.seedPhraseArray
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true
      },
      backButtonHidden: true
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Select a node</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={1}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                  <ProgressViewIOS progress={1} style={this.props.parentStyles.progress} />
                )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                In order to earn your Ecosystem Alignment Incentive (EAI) you must delegate your
                ndau to a node. Please select the default node for your accounts. You will be able
                to change this later.
              </Text>
            </View>
            {Platform.OS === 'android' ? (
              <Picker
                selectedValue={this.state.node}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({ node: itemValue })}
              >
                <Picker.Item label="Node A" value="nodeA" />
                <Picker.Item label="Node B" value="nodeB" />
              </Picker>
            ) : (
                <PickerIOS
                  selectedValue={this.state.node}
                  itemStyle={styles.picker}
                  onValueChange={(itemValue, itemIndex) => this.setState({ node: itemValue })}
                >
                  <PickerIOS.Item label="Node A" value="nodeA" />
                  <PickerIOS.Item label="Node B" value="nodeB" />
                </PickerIOS>
              )}
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton
              onPress={this.finishSetup}
              title="Select and Finish"
              id="select-and-finish"
            />
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
  progress: {
    paddingTop: 30,
    paddingBottom: 30
  },
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#ffffff'
  },
  checkbox: { flex: 1, padding: 10 }
});

export default SetupEAINode;
