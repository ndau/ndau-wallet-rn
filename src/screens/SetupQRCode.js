import React, { Component } from 'react';
import { StyleSheet, View, ScrollView, Text, Button, SafeAreaView, Alert } from 'react-native';
import QRCodeScanner from 'react-native-qrcode-scanner';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';

class SetupConfirmSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: '#ffffff',
      showErrorText: false,
      qrToken: '',
      codeCaptured: false,
      scanning: true,
      cameraPermission: false
    };
  }

  componentDidMount() {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  }

  onSuccess(e) {
    console.log(e.data);
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

  onPushAnother() {
    this.props.navigator.push({
      label: 'SetupEncryptionPassword',
      screen: 'ndau.SetupEncryptionPassword',
      passProps: {
        qrToken: this.state.qrToken,
        userId: this.state.userId,
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.state.numberOfAccounts
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      },
      backButtonHidden: true
    });
  }

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={this.props.parentStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={1} />
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                This app will need access to your device's camera to scan address codes, so you can
                send and receive ndau. Start the permission process to scan the code we just sent
                you.
              </Text>
              <CommonButton
                style={{ marginTop: 15 }}
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
                  style={{ marginRight: 20 }}
                  ref={(node) => {
                    this.scanner = node;
                  }}
                  onRead={(e) => this.onSuccess(e)}
                  topContent={
                    <Text
                      style={[
                        this.props.parentStyles.wizardText,
                        { marginTop: 15, marginBottom: 15, marginRight: 20 }
                      ]}
                    >
                      Point this device's camera at the QR code square in the email we sent, so that
                      it appears below.
                    </Text>
                  }
                />
              ) : null}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton
              onPress={() => this.onPushAnother()}
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
  centerText: {
    flex: 1,
    fontSize: 18,
    padding: 32,
    color: '#777'
  },
  textBold: {
    fontWeight: '500',
    color: '#000'
  },
  buttonText: {
    fontSize: 21,
    color: 'rgb(0,122,255)'
  },
  buttonTouchable: {
    padding: 16
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'column',
    padding: 5
  },
  successText: {
    flex: 1,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 80,
    paddingLeft: 10,
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  },

  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
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
  errorText: {
    color: '#f75f4b',
    fontSize: 20
  },
  errorContainer: {
    backgroundColor: '#f5d8d1'
  }
});

export default SetupConfirmSeedPhrase;
