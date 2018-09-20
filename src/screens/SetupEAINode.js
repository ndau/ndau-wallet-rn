import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, NativeModules } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ndauDashboardApi from '../api/NdauDashboardAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';
import CommonButton from '../components/CommonButton';
import Dropdown from '../components/Dropdown';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class SetupEAINode extends Component {
  constructor(props) {
    super(props);
    const nodeNames = [ 'Boylston', 'Newbury', 'Commonwealth', 'Dartmouth', 'Storrow' ];

    this.state = {
      node: '',
      data: nodeNames,
      selectedNode: nodeNames[Math.floor(Math.random() * nodeNames.length)]
    };
  }

  sendAccountAddresses = (userId, addresses, token) => {
    return new Promise((resolve, reject) => {
      ndauDashboardApi
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

    this.sendAddressesToOneiro(addresses)
      .then(() => {
        const user = this.persistAddresses(addresses);

        NdauNodeAPIHelper.populateCurrentUserWithAddressData(user)
          .then((userWithData) => {
            this.props.navigation.navigate('Dashboard', { user: userWithData });
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  keyGeneration = async () => {
    console.debug('Generating all keys from phrase given...');
    const seedPhraseString = SetupStore.getSeedPhrase().join().replace(/,/g, ' ');
    console.debug(`seedPhraseString: ${seedPhraseString}`);
    const seedPhraseAsBytes = await NativeModules.KeyaddrManager.KeyaddrWordsToBytes(
      'en',
      seedPhraseString
    );
    console.debug(`seedPhraseAsBytes: ${seedPhraseAsBytes}`);
    const publicAddresses = await NativeModules.KeyaddrManager.CreatePublicAddress(
      seedPhraseAsBytes,
      SetupStore.getNumberOfAccounts(),
      SetupStore.getAddressType()
    );
    console.debug(`publicAddresses: ${publicAddresses}`);

    return publicAddresses;
  };

  sendAddressesToOneiro = (addresses) => {
    return this.sendAccountAddresses(SetupStore.getUserId(), addresses, SetupStore.getQRCode());
  };

  persistAddresses = (addresses) => {
    const user = {
      userId: SetupStore.getUserId(),
      addresses: addresses,
      selectedNode: this.state.selectedNode
    };
    AsyncStorageHelper.lockUser(user, SetupStore.getEncryptionPassword());
    return user;
  };

  dropDownSelected = (index, value) => {
    console.log(`index: ${index} and value is ${value}`);
    this.setState({
      selectedNode: value
    });
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <Stepper screenNumber={8} />
            <View style={styles.textContainer}>
              <Text style={cssStyles.wizardText}>
                In order to earn your Ecosystem Alignment Incentive (EAI) you must delegate your
                ndau to a node. Please select the default node for your accounts. You will be able
                to change this later.
              </Text>
            </View>
            <Dropdown
              style={styles.textInput}
              defaultValue={this.state.selectedNode}
              options={this.state.data}
              value={this.state.selectedNode}
              onSelect={this.dropDownSelected}
              full={true}
            />
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton
              onPress={this.finishSetup}
              title="Select and finish"
              id="select-and-finish"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  textContainer: {
    marginBottom: hp('2%')
  },
  textInput: {
    width: wp('95%')
  }
});

export default SetupEAINode;
