import React from 'react';
import { Alert, ScrollView } from 'react-native';
import Row from '../components/Row';
import { connect } from 'react-redux';
import cssStyles from '../css/styles';
import { bindActionCreators } from 'redux';
import { pushSetup } from '../actions/NavigationActions';

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
            this.props.pushSetup('ndau.Passphrase');
          }
        }
      ],
      { cancelable: false }
    );
  };

  render() {
    return (
      <ScrollView style={cssStyles.container}>
        <Row title={'Logout'} onPress={this.logout} />
      </ScrollView>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushSetup }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
