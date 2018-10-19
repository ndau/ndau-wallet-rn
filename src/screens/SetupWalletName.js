import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, TextInput, Alert } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import { SafeAreaView } from 'react-navigation';

class SetupEncryptionPassword extends Component {
  constructor(props) {
    super(props);
  }

  showNextSetup = () => {
    this.props.navigation.navigate('SetupEncryptedPassword', { comingFrom: 'SetupWalletName' });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={4} />
            <View style={styles.textContainer}>
              <Text style={cssStyles.wizardText} onPress={this.showInformation}>
                Set a password. This password applies to this app only. Ndau will not have access to
                it. We cannot help you reset this password, so you should write it down.{'  '}
                <FontAwesome name="info" color="#ffffff" size={20} style={{ marginBottom: 3 }} />
              </Text>
            </View>
            <TextInput
              style={cssStyles.textInput}
              onChangeText={(value) => {
                SetupStore.walletName = value;
              }}
              // value={(value) => {
              //   SetupStore.walletName = value;
              // }}
              placeholder="Wallet name"
              placeholderTextColor="#333"
              autoCapitalize="none"
            />
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.showNextSetup} title="Next" />
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
    marginBottom: 8
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end'
  },
  progress: {
    paddingTop: 15,
    paddingBottom: 15
  },
  infoParagraph: {
    flexDirection: 'row'
  }
});

export default SetupEncryptionPassword;
