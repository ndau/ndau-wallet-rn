import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, SafeAreaView, NativeModules } from 'react-native';
import ndauApi from '../api/NdauAPI';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import { Dropdown } from 'react-native-material-dropdown';
import cssStyles from '../css/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { push } from '../actions/NavigationActions';

function mapStateToProps(state) {
  return {
    userId: state.userId,
    qrCode: state.qrCode,
    numberOfAccounts: state.numberOfAccounts,
    seedPhraseArray: state.seedPhraseArray
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push }, dispatch);
}

//"nd" for mainnet, or "tn" for testnet.
const addressGenerationType = 'nd';

class SetupEAINode extends Component {
  constructor(props) {
    super(props);
    const nodeNames = [
      {
        value: 'Boylston'
      },
      {
        value: 'Newbury'
      },
      {
        value: 'Commonwealth'
      },
      {
        value: 'Dartmouth'
      },
      {
        value: 'Storrow'
      }
    ];

    this.state = {
      node: '',
      data: nodeNames,
      selectedNode: nodeNames[Math.floor(Math.random() * nodeNames.length)].value
    };
  }

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

    this.sendAddressesToOneiro(addresses)
      .then(() => {
        this.persistAddresses(addresses);

        this.returnToDashboard();
      })
      .catch((error) => {
        console.error(error);
      });
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
      this.props.numberOfAccounts,
      addressGenerationType
    );
    console.debug(`publicAddresses: ${publicAddresses}`);

    return publicAddresses;
  };

  sendAddressesToOneiro = (addresses) => {
    return this.sendAccountAddresses(this.props.userId, addresses, this.props.qrCode);
  };

  persistAddresses = (addresses) => {
    const user = {
      userId: this.props.userId,
      addresses: addresses,
      selectedNode: this.state.selectedNode
    };
    AsyncStorageHelper.setUser(user, this.props.encryptionPassword);
  };

  showNextSetup = () => {
    this.props.push('ndau.Dashboard');
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={8} />
            <View style={styles.textContainer}>
              <Text style={cssStyles.wizardText}>
                In order to earn your Ecosystem Alignment Incentive (EAI) you must delegate your
                ndau to a node. Please select the default node for your accounts. You will be able
                to change this later.
              </Text>
            </View>
            <Dropdown
              label="Please choose an EAI node"
              data={this.state.data}
              baseColor="#ffffff"
              selectedItemColor="#000000"
              textColor="#ffffff"
              itemTextStyle={cssStyles.wizardText}
              fontSize={20}
              labelFontSize={14}
              value={this.state.selectedNode}
            />
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
  button: {
    marginTop: 0
  },
  textContainer: {
    marginBottom: 5
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
  checkbox: { flex: 1, padding: 10 }
});

export default connect(mapStateToProps, mapDispatchToProps)(SetupEAINode);
