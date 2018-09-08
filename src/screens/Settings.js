import React from 'react';
import { Alert, ScrollView, SafeAreaView } from 'react-native';
import Row from '../components/Row';
// import { connect } from 'react-redux';
import cssStyles from '../css/styles';
// import { bindActionCreators } from 'redux';
// import { pushSetup } from '../actions/NavigationActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
  }

  logout = () => {
    Alert.alert(
      'Logout Confirmation',
      'Are you sure you would like to logout of ndau wallet?',
      [
        {
          text: 'Cancel',
          onPress: () => {},
          style: 'cancel'
        },
        {
          text: 'OK',
          onPress: () => {
            this.props.navigation.navigate('Passphrase');
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <ScrollView style={cssStyles.container}>
          <Row title={'Logout'} onPress={this.logout} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}

// const mapDispatchToProps = (dispatch) => {
//   return bindActionCreators({ pushSetup }, dispatch);
// };

// export default connect(null, mapDispatchToProps)(Settings);

export default Settings;
