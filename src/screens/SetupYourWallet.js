import React, { Component } from 'react';

import { StyleSheet, View, ScrollView, Text } from 'react-native';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import EntropyHelper from '../helpers/EntropyHelper';

class SetupYourWallet extends Component {
  showNextSetup = () => {
    this.props.navigation.navigate('SetupRecoveryPhrase');
  };

  render() {
    EntropyHelper.generateEntropy();

    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={5} />

            <View>
              <Text style={cssStyles.wizardText}>
                Next we will give you a recovery phrase. This is critical to restoring your 
                wallet. You risk losing access to your funds if you do not WRITE IT DOWN and 
                store it in a secure location. Do not save this phrase on your device or in 
                the cloud. Do not do this step in a public place where someone looking over 
                your shoulder could see this phrase.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.showNextSetup} title="Get my recovery phrase" />
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
    paddingTop: 15,
    paddingBottom: 15
  }
});

export default SetupYourWallet;
