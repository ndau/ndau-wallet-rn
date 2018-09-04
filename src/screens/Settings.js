import React from 'react';
import { Alert, ScrollView, SafeAreaView } from 'react-native';
import Row from '../components/Row';
import { connect } from 'react-redux';
import cssStyles from '../css/styles';
import { bindActionCreators } from 'redux';
import { pushSetup } from '../actions/NavigationActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);

    this.props.navigator.toggleNavBar({
      to: 'hidden',
      animated: false
    });
  }

  static navigatorStyle = {
    topBarElevationShadowEnabled: false,
    disabledBackGesture: true
  };

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
            this.props.pushSetup('ndau.Passphrase', this.props.navigator);
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

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushSetup }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Settings);
