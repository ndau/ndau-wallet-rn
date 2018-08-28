import React from 'react';
import { StyleSheet, Alert, ScrollView } from 'react-native';
import Row from '../components/Row';

class Settings extends React.Component {
  static navigatorStyle = {
    disabledBackGesture: true
  };

  logout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you would like to logout of nadu wallet?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
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
              },
              navigationOptions: {
                gesturesEnabled: false
              }
            });
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Row title={'Logout'} onPress={this.logout} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1c2227'
  }
});

export default Settings;
