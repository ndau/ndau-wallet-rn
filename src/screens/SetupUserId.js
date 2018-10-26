import React, { Component } from 'react';
import { View, ScrollView, Text, TextInput, Alert } from 'react-native';
import { SafeAreaView } from 'react-navigation';
import ndauDashboardApi from '../api/NdauDashboardAPI';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/SetupProgressBar';
import RNExitApp from 'react-native-exit-app';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import SetupStore from '../model/SetupStore';

class SetupUserId extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userId: '',
      numberOfAccounts: 0,
      userIdPresent: false
    };
  }

  confirmUserIdPresent = () => {
    if (!this.state.userId) return false;
    return new Promise((resolve, reject) => {
      ndauDashboardApi
        .getNumberOfAccounts(this.state.userId)
        .then((numberOfAccounts) => {
          this.setState({
            numberOfAccounts: numberOfAccounts
          });
          resolve(numberOfAccounts > 0);
        })
        .catch((error) => {
          console.error(error);
          reject(false);
        });
    });
  };

  async verify() {
    if (!this.state.userId) this.showErrorMessage('Please enter a User ID first.');
    const userIdPresent = await this.confirmUserIdPresent();
    this.setState({ userIdPresent: userIdPresent });
    if (!userIdPresent) this.showErrorMessage('No user associated with that ID.');
    if (userIdPresent) this.showInfoMessage('Account verified.');
  }

  showNextSetup = () => {
    SetupStore.userId = this.state.userId;
    SetupStore.numberOfAccounts = this.state.numberOfAccounts;

    this.props.navigation.navigate('SetupQRCode');
  };

  showExitApp() {
    Alert.alert(
      '',
      `We are thrilled you're excited about ndau! At the moment, this wallet app is only useful to accredited investors who have already purchased ndau. Once you have purchased ndau and received your ID, please come back and set your wallet up.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp();
          }
        }
      ],
      { cancelable: false }
    );
  }

  showErrorMessage(msg) {
    Alert.alert('Error', msg, [ { text: 'OK', onPress: () => {} } ], { cancelable: false });
  }

  showInfoMessage(msg) {
    Alert.alert(
      'Information',
      msg,
      [
        {
          text: 'OK',
          onPress: () => {
            this.checkIfAlreadyExists();
          }
        }
      ],
      { cancelable: false }
    );
  }

  textChanged = (userId) => {
    if (userId.length === 3) {
      userId += '-';
    }
    this.setState({ userId });
  };

  checkIfAlreadyExists = async () => {
    try {
      const userIdAlreadyAdded = await AsyncStorageHelper.doesKeyExist(this.state.userId);
      if (userIdAlreadyAdded) {
        Alert.alert(
          'Warning',
          `You are about to create a NEW recovery phrase for an ID which already has one. Are you sure you want to do this? Your old phrase and addresses will be invalidated.`,
          [
            {
              text: 'Cancel',
              onPress: () => {}
            },
            {
              text: 'Create new',
              onPress: () => {
                this.onSendEmail();
              }
            }
          ],
          { cancelable: false }
        );
      } else {
        this.onSendEmail();
      }
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  onSendEmail() {
    if (!this.state.userId) this.showErrorMessage('Please enter a User ID first.');
    ndauDashboardApi
      .triggerQRTEmail(this.state.userId)
      .then(() => {
        this.showNextSetup();
      })
      .catch((error) => {
        this.showErrorMessage('Email could not be sent.');
        console.error(error);
      });
  }

  textChanged = (userId) => {
    let u;
    if (userId.substr(-1) === '-') {
      u = userId;
    } else {
      // c = cleaned
      const c = userId.toUpperCase().replace(/[^A-Z0-9]/g, '').split('');
      u = c.length > 3 ? c.map((c, i) => (i === 2 ? `${c}-` : c)).join('') : c.join('');
    }
    this.setState({ userId: u });
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <Stepper screenNumber={2} />
            <View>
              <Text style={cssStyles.wizardText}>
                To deliver your ndau to your wallet, we need the six-character user ID you use to
                access the ndau dashboard. We will send you an email to confirm you are the account
                holder.
              </Text>
            </View>
            <View style={cssStyles.buttonContainer}>
              <TextInput
                style={cssStyles.textInput}
                onChangeText={(userId) => this.textChanged(userId)}
                value={this.state.userId}
                placeholder="Enter your unique User ID"
                placeholderTextColor="#333"
                autoCapitalize="characters"
                maxLength={7}
              />
            </View>

            <View style={cssStyles.buttonContainer}>
              <CommonButton onPress={this.showExitApp} title="I don't have an ID" />
            </View>
            <Text style={cssStyles.wizardText}>
              We will send you an email to confirm you are the account holder.
            </Text>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton
              onPress={() => {
                this.verify();
              }}
              title="Verify"
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

export default SetupUserId;
