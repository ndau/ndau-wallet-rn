import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  PixelRatio,
  TouchableOpacity
} from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import cssStyles from '../css/styles';
import styles from '../css/styles';
import DateHelper from '../helpers/DateHelper';
import NdauNodeAPIHelper from '../helpers/NdauNodeAPIHelper';
import AlertPanel from '../components/AlertPanel';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import UnlockModalDialog from '../components/UnlockModalDialog';
import LockModalDialog from '../components/LockModalDialog';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lockModalVisible: false,
      unlockModalVisible: false
    };
  }

  setLockModalVisible = (visible) => {
    this.setState({ lockModalVisible: visible });
  };

  setUnlockModalVisible = (visible) => {
    this.setState({ unlockModalVisible: visible });
  };

  unlock = () => {
    //TODO: This is for issue #28 and #29 for MVP
    //This is being commented out for now as we want the
    //icons, but don't want the actual implementation yet
    // this.setState({ unlockModalVisible: true });
  };

  lock = () => {
    //TODO: This is for issue #28 and #29 for MVP
    //This is being commented out for now as we want the
    //icons, but don't want the actual implementation yet
    // this.setState({ lockModalVisible: true });
  };

  render() {
    console.log(`rendering Dashboard`);

    const { navigation } = this.props;
    const user = navigation.getParam('user', {});

    console.debug(`user found is ${JSON.stringify(user, null, 2)}`);
    const { addresses, addressData, userId } = user;
    console.debug(`addressData: ${addressData}`);
    if (addressData) {
      return addressData ? (
        <SafeAreaView style={cssStyles.safeContainer}>
          <UnlockModalDialog
            visible={this.state.unlockModalVisible}
            setModalVisible={this.setUnlockModalVisible}
          />
          <LockModalDialog
            visible={this.state.lockModalVisible}
            setModalVisible={this.setLockModalVisible}
          />
          <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
          <ScrollView style={cssStyles.container}>
            <View style={cssStyles.dashboardTextContainer}>
              <Text style={cssStyles.dashboardTextLarge}>Wallet {userId}</Text>
            </View>
            <View style={cssStyles.dashboardTextContainer}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Image
                  style={{
                    width: wp('7%'),
                    height: hp('6%'),
                    marginRight: wp('1%')
                  }}
                  resizeMode="contain"
                  source={require('../../img/ndau-icon-green.png')}
                />
                <Text style={cssStyles.dashboardTextVeryLarge}>
                  {NdauNodeAPIHelper.accountTotalNdauAmount(addressData)}
                </Text>
              </View>
            </View>
            <View style={cssStyles.dashboardSmallTextContainer}>
              <Text style={cssStyles.dashboardTextSmallGreen}>
                {NdauNodeAPIHelper.currentPrice(user)}
                <Text style={styles.asterisks}>**</Text>
                <Text style={cssStyles.dashboardTextSmallWhiteEnd}> at current price</Text>
              </Text>
            </View>

            {addressData ? (
              addressData.map((account, index) => {
                const eaiPercentage = NdauNodeAPIHelper.eaiPercentage(account);
                const sendingEAITo = NdauNodeAPIHelper.sendingEAITo(account);
                const receivingEAIFrom = NdauNodeAPIHelper.receivingEAIFrom(account);
                const accountLockedUntil = NdauNodeAPIHelper.accountLockedUntil(account);
                const accountNoticePeriod = NdauNodeAPIHelper.accountNoticePeriod(account);
                const accountNotLocked = NdauNodeAPIHelper.accountNotLocked(account);

                return (
                  <CollapsiblePanel
                    key={index}
                    index={index}
                    title={NdauNodeAPIHelper.accountNickname(account)}
                    account={account}
                    lockAdder={NdauNodeAPIHelper.accountNotLocked(account) ? 0 : 3}
                    onNotice={NdauNodeAPIHelper.accountNoticePeriod(account) ? true : false}
                  >
                    {eaiPercentage ? (
                      <Text style={cssStyles.text}>
                        {eaiPercentage}
                        {'%'} annualized EAI
                      </Text>
                    ) : null}
                    {sendingEAITo ? (
                      <Text style={cssStyles.text}>
                        Sending incentive {'('}EAI{')'} to {sendingEAITo}
                      </Text>
                    ) : null}
                    {receivingEAIFrom ? (
                      <Text style={cssStyles.text}>
                        Receiving incentive {'('}EAI{')'} to {receivingEAIFrom}
                      </Text>
                    ) : null}
                    {accountLockedUntil ? (
                      <Text style={cssStyles.text}>
                        Account will be unlocked {accountLockedUntil}
                      </Text>
                    ) : null}
                    {accountNoticePeriod ? (
                      <Text style={cssStyles.text}>
                        Locked {'('}
                        {accountNoticePeriod} day countdown{')'}
                      </Text>
                    ) : null}
                    {accountNotLocked ? (
                      <Text style={cssStyles.text}>This account is not locked</Text>
                    ) : null}
                    <View style={[ { justifyContent: 'flex-end', alignItems: 'flex-end' } ]}>
                      {accountNoticePeriod ? (
                        <Image
                          style={{
                            width: 23,
                            height: 35
                          }}
                          source={require('../../img/lock_countdown_animation_white.gif')}
                        />
                      ) : null}
                      <TouchableOpacity onPress={this.unlock}>
                        {accountLockedUntil ? (
                          <Image
                            style={{
                              width: 23,
                              height: 35
                            }}
                            source={require('../../img/locked.png')}
                          />
                        ) : null}
                      </TouchableOpacity>
                      <TouchableOpacity onPress={this.lock}>
                        {accountNotLocked ? (
                          <Image
                            style={{
                              width: 30,
                              height: 35
                            }}
                            source={require('../../img/unlocked.png')}
                          />
                        ) : null}
                      </TouchableOpacity>
                    </View>
                  </CollapsiblePanel>
                );
              })
            ) : null}
            <View style={cssStyles.dashboardRowContainerCenter}>
              <Text style={styles.asterisks}>**</Text>
              <Text style={cssStyles.dashboardTextVerySmallWhite}>
                The estimated value of ndau in US dollars can be calculated using the Target Price
                at which new ndau have most recently been issued. The value shown here is calculated
                using that method as of the issue price on {DateHelper.getTodaysDate()}. The Axiom
                Foundation bears no responsibility or liability for the calculation of that
                estimated value, or for decisions based on that estimated value.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    } else {
      return addresses ? (
        <SafeAreaView style={cssStyles.safeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
          <ScrollView style={cssStyles.container}>
            <View style={cssStyles.dashboardTextContainer}>
              <Text style={cssStyles.dashboardTextLarge}>Wallet {userId}</Text>
            </View>
            <AlertPanel alertText="Welcome to the ndau wallet! We are currently verifying your wallet setup. ndau will be
            sent to this app on Genesis Day. Until then, you can continue to view your holdings on
            the online dashboard." />
            <View style={cssStyles.dashboardTextContainer}>
              <Text style={cssStyles.dashboardTextSmall}>{addresses.length} addresses</Text>
            </View>

            {addresses ? (
              addresses.map((address, index) => {
                const counter = index + 1;
                return (
                  <CollapsiblePanel
                    key={index}
                    index={index}
                    title={`Address ${counter}`}
                    address={address}
                  >
                    <Text style={cssStyles.text}>{address}</Text>
                  </CollapsiblePanel>
                );
              })
            ) : null}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    }
  }
}

export default Dashboard;
