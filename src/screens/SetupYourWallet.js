import React, { Component } from 'react';

import { StyleSheet, View, ScrollView, Text, SafeAreaView } from 'react-native';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { pushSetup } from '../actions/NavigationActions';

class SetupYourWallet extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false
    });
  }

  showNextSetup = () => {
    this.props.pushSetup('ndau.SetupSeedPhrase', this.props.navigator);
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={4} />

            <View>
              <Text style={cssStyles.wizardText}>
                Next we will give you a seed phrase which is the key to restoring your wallet. You
                must WRITE IT DOWN and store it in a secure location or risk losing access to your
                funds. Do not save this phrase on your device or in the cloud. Do not do this step
                in a public place.
              </Text>
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.showNextSetup} title="Get my seed phrase" />
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

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushSetup }, dispatch);
};

export default connect(null, mapDispatchToProps)(SetupYourWallet);
