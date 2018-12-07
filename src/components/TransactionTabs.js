import React, { Component } from 'react'
import { StyleSheet, Text, View, Share } from 'react-native'
import QRCode from 'react-native-qrcode'
import { createMaterialTopTabNavigator } from 'react-navigation-tabs'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import CommonButton from '../components/CommonButton'
import Padding from './Padding';

class TransactionTabs extends Component {
  render () {
    // const SendWithProps = () => <Send {...this.props} />;
    const ReceiveWithProps = () => <Receive {...this.props} />

    const Navigator = createMaterialTopTabNavigator(
      {
        Receive: ReceiveWithProps,
        // Send: SendWithProps,

        Receive: {
          screen: ReceiveWithProps,
          navigationOptions: ({ navigation }) => ({
            title: 'Receive ndau'
          })
        }
      },
      {
        animationEnabled: false,
        tabBarOptions,
        navigationOptions
      }
    )

    return <Navigator />
  }
}

class Receive extends Component {
  shareAddress = () => {
    Share.share(
      {
        message: this.props.address,
        title: 'Share your public address',
        url: '/'
      },
      {
        dialogTitle: 'Share your public address'
      }
    )
  }

  render () {
    return (
      <View style={styles.container}>
        <Padding>
          <View style={{ alignSelf: 'center' }}>
            <QRCode
              value={this.props.address}
              size={250}
              color='black'
              backgroundColor='white'
            />
          </View>
        </Padding>
        
        
        <Padding bottom={0}>
          <Text style={styles.address}>
            {this.props.address}
          </Text>
        </Padding>
        
        <View styles={{ flex: 1 }}>
          <CommonButton
            title='Share address'
            onPress={this.shareAddress}
            iconProps={{
              name: 'share',
              color: '#000',
              size: 20
            }}
          />
        </View>
      </View>
    )
  }
}

const tabBarOptions = {
  upperCaseLabel: false,
  labelStyle: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  tabStyle: {
    backgroundColor: 'transparent',
  },
  indicatorStyle: {
    backgroundColor: '#ffffff'
  },
  style: {
    backgroundColor: 'transparent',
  }
}

const navigationOptions = {
  swipeEnabled: false
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    marginLeft: wp('2%'),
    marginRight: wp('2%')
  },
  address: {
    color: '#ffffff',
    fontSize: 13,
    fontFamily: 'TitilliumWeb-Regular',
  }
})

export default TransactionTabs
