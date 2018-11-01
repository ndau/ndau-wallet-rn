import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CommonButton from '../components/CommonButton';
import SetupProgressBar from '../components/SetupProgressBar';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

class SetupQRCode extends Component {
  constructor(props) {
    super(props);

    let qrToken = '';
    let codeCaptured = false;

    if (__DEV__) {
      qrToken = 'ndqrc0ffeefacade';
      codeCaptured = true;
    }

    this.state = {
      textColor: '#ffffff',
      showErrorText: false,
      qrToken: qrToken,
      codeCaptured: codeCaptured,
      scanning: true,
      cameraPermission: false
    };
  }

  onSuccess(e) {
    if (e.data.substr(0, 4) !== 'ndqr') {
      Alert.alert(
        'Confirmation Error',
        'The QR code square that you scanned was not a valid confirmation code.',
        [
          {
            text: 'OK',
            onPress: () => {
              this.scanner.reactivate();
            }
          }
        ],
        { cancelable: false }
      );
    } else {
      this.setState({
        codeCaptured: true,
        qrToken: e.data
      });
    }
  }

  showNextSetup = () => {
    const { navigation } = this.props;
    SetupStore.qrCode = this.state.qrToken;
  
    this.props.navigation.navigate('SetupEncryptionPassword', {
      comingFrom: 'SetupQRCode' ,
      walletSetupType: navigation.state.params && navigation.state.params.walletSetupType,
    });
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <SetupProgressBar navigation={this.props.navigation} />
            <View>
              <Text style={[ cssStyles.wizardText, { marginBottom: hp('1.5%') } ]}>
                To send and receive ndau, you will need to use your device's camera.
              </Text>
              <CommonButton
                onPress={() => {
                  this.setState({ cameraPermision: true });
                }}
                disabled={this.state.cameraPermision}
                title="Give camera permission"
              />

              {this.state.cameraPermision && this.state.codeCaptured ? (
                <Text style={styles.successText}>Code successfully scanned.</Text>
              ) : this.state.cameraPermision && !this.state.codeCaptured ? (
                <QRCodeScanner
                  style={{ marginRight: wp('2%') }}
                  ref={(node) => {
                    this.scanner = node;
                  }}
                  onRead={(e) => this.onSuccess(e)}
                  topContent={
                    <Text
                      style={[
                        cssStyles.wizardText,
                        { marginTop: hp('1.5%'), marginBottom: hp('1.5%'), marginRight: wp('2%') }
                      ]}
                    >
                      Point this device’s camera at the QR code square in the email we sent, so that
                      it appears below.
                    </Text>
                  }
                />
              ) : null}
            </View>
          </ScrollView>
          <View style={cssStyles.footer}>
            <CommonButton
              onPress={() => this.showNextSetup()}
              title="Next"
              disabled={!this.state.codeCaptured}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  successText: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 80,
    paddingLeft: 10,
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    textAlign: 'center'
  }
});

export default SetupQRCode;
