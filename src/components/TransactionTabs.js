import React, { Component } from 'react';
import { Text, View } from 'react-native';
import QRCode from 'react-native-qrcode-svg';
import { createMaterialTopTabNavigator } from 'react-navigation-tabs';
import CommonButton from '../components/CommonButton';

class Send extends Component {
  constructor(props) {
    super(props);

    this.state = {
      amount: 0
    }
  }

  send = () => {
    // TODO: transfer funds 
  }

  render() {
    return (
      <View>
        <Text>send</Text>
        {/* TODO: add Send form */}
        <View>
          <CommonButton
            title={`send ${this.state.amount}`}
            onPress={this.send}
          />
        </View>
      </View>
    );
  }
}

class Receive extends Component {
  shareAddress = () => {
    // TODO: access device share feature
  }

  render() {
    return (
      <View>
        <Text>receive</Text>
        <View>
          <QRCode
            value={this.props.address}
            size={250}
            color='black'
            backgroundColor='white'
            // logo={require('../../img/n_icon_ko.png')}
            // logoSize={60}
            // logoBackgroundColor='black'
          />
        </View>
  
        <Text style={styles.text}>
          {this.props.address}
        </Text>
  
        <View>
          <CommonButton
            title="Share address" 
            onPress={this.shareAddress}
            iconProps={{
              name: "share-square",
              color: "#000",
              size: 20,
            }}
          />
        </View>
      </View>
    );
  }
}

class TransactionTabs extends Component {
  render() {
    const SendWithProps = () => <Send {...this.props} />;
    const ReceiveWithProps = () => <Receive {...this.props} />;

    const Navigator = createMaterialTopTabNavigator({
      Send: SendWithProps,
      Receive: ReceiveWithProps,
    });

    return (
      <Navigator />
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%')
  }
});

export default TransactionTabs;