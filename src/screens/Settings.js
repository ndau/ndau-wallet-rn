import React from 'react';
import { Alert, ScrollView, TouchableHighlight, View, Text, StyleSheet } from 'react-native';
import Row from '../components/Row';
import { connect } from 'react-redux';
import cssStyles from '../css/styles';
import { bindActionCreators } from 'redux';
import { pushSetup } from '../actions/NavigationActions';

class Settings extends React.Component {
  constructor(props) {
    super(props);
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
      <ScrollView style={cssStyles.container}>
        <Row title={'Logout'} onPress={this.logout} />
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 68,
    paddingHorizontal: 16,
    paddingBottom: 20,
    paddingTop: 20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.054)'
  },
  text: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

const mapStateToProps = (state) => {
  return {};
};
const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ pushSetup }, dispatch);
};

export default connect(null, mapDispatchToProps)(Settings);
