import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import {
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,
  RefreshControl,
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
import NewAccountModalDialog from '../components/NewAccountModalDialog';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import styleConstants from '../css/styleConstants';
import KeyAddrGenManager from '../keyaddrgen/KeyAddrGenManager';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      lockModalVisible: false,
      unlockModalVisible: false,
      newAccountModalVisible: false,
      number: 1,
      user: {},
      refreshing: false
    };
  }

  componentWillMount() {
    const user = this.props.navigation.getParam('user', {});
    this.setState({ user });
  }

  setLockModalVisible = (visible) => {
    this.setState({ lockModalVisible: visible });
  };

  setUnlockModalVisible = (visible) => {
    this.setState({ unlockModalVisible: visible });
  };

  setNewAccountModalVisible = (visible) => {
    this.setState({ newAccountModalVisible: visible });
  };

  subtractNumber = () => {
    if (this.state.number > 1) {
      this.setState({ number: (this.state.number -= 1) });
    }
  };

  addNumber = () => {
    this.setState({ number: (this.state.number += 1) });
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

  launchAddNewAccountDialog = () => {
    this.setNewAccountModalVisible(true);
  };

  addNewAccount = async () => {
    const user = await KeyAddrGenManager.createNewAccount(this.state.user, this.state.number);

    this.setState({ user });
  };

  _onRefresh = async () => {
    this.setState({ refreshing: true });

    const user = this.state.user;
    await NdauNodeAPIHelper.populateCurrentUserWithAddressData(user);
    console.debug(`user is NOW after refresh: ${JSON.stringify(user, null, 2)}`);

    this.setState({ refreshing: false, user });
  };

  render = () => {
    console.log(`rendering Dashboard`);

    console.debug(`user: ${JSON.stringify(this.state.user, null, 2)}`);

    const { accounts, userId, marketPrice } = this.state.user;
    const totalNdau = NdauNodeAPIHelper.accountTotalNdauAmount(accounts);
    const totalNdauNumber = NdauNodeAPIHelper.accountTotalNdauAmount(accounts, false);
    const currentPrice = NdauNodeAPIHelper.currentPrice(marketPrice, totalNdauNumber);

    return accounts ? (
      <SafeAreaView style={cssStyles.safeContainer}>
        <UnlockModalDialog
          visible={this.state.unlockModalVisible}
          setModalVisible={this.setUnlockModalVisible}
        />
        <LockModalDialog
          visible={this.state.lockModalVisible}
          setModalVisible={this.setLockModalVisible}
        />
        <NewAccountModalDialog
          visible={this.state.newAccountModalVisible}
          setModalVisible={this.setNewAccountModalVisible}
          number={this.state.number}
          subtractNumber={this.subtractNumber}
          addNumber={this.addNumber}
          addNewAccount={this.addNewAccount}
        />
        <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
        <ScrollView
          style={cssStyles.container}
          refreshControl={
            <RefreshControl refreshing={this.state.refreshing} onRefresh={this._onRefresh} />
          }
        >
          <View style={cssStyles.dashboardTextContainer}>
            <Text style={cssStyles.dashboardTextLarge}>Wallet {userId}</Text>
          </View>
          <View style={cssStyles.dashboardTextContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
              <Image
                style={{
                  width: wp('7%'),
                  height: hp('6%'),
                  marginRight: wp('1%')
                }}
                resizeMode="contain"
                source={require('../../img/ndau-icon-green.png')}
              />
              <Text style={cssStyles.dashboardTextVeryLarge}>{totalNdau}</Text>
            </View>
          </View>
          <View style={cssStyles.dashboardSmallTextContainer}>
            <Text style={cssStyles.dashboardTextSmallGreen}>
              {currentPrice}
              <Text style={styles.asterisks}>**</Text>
              <Text style={cssStyles.dashboardTextSmallWhiteEnd}> at current price</Text>
            </Text>
            <View style={cssStyles.dashboardSmallTextContainer}>
              <View
                style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}
              >
                <Text style={cssStyles.dashboardTextSmallGreen}>{accounts.length} addresses</Text>
                <TouchableOpacity
                  style={{ marginLeft: wp('1.5%'), marginTop: hp('.3%') }}
                  onPress={this.launchAddNewAccountDialog}
                >
                  <FontAwesome name="plus-circle" color={styleConstants.ICON_GRAY} size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {accounts ? (
            accounts.map((account, index) => {
              const eaiPercentage = NdauNodeAPIHelper.eaiPercentage(account.addressData);
              const sendingEAITo = NdauNodeAPIHelper.sendingEAITo(account.addressData);
              const receivingEAIFrom = NdauNodeAPIHelper.receivingEAIFrom(account.addressData);
              const accountLockedUntil = NdauNodeAPIHelper.accountLockedUntil(account.addressData);
              const accountNoticePeriod = NdauNodeAPIHelper.accountNoticePeriod(
                account.addressData
              );
              const accountNotLocked = NdauNodeAPIHelper.accountNotLocked(account.addressData);
              const nickname = NdauNodeAPIHelper.accountNickname(account.addressData);
              const accountBalance = NdauNodeAPIHelper.accountNdauAmount(account.addressData);

              return (
                <CollapsiblePanel
                  key={index}
                  index={index}
                  title={nickname}
                  titleRight={accountBalance}
                  lockAdder={accountNotLocked ? 0 : 3}
                  onNotice={accountNoticePeriod ? true : false}
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
                  {accountBalance === 0 ? (
                    <Text style={cssStyles.text}>{account.address}</Text>
                  ) : null}
                  {totalNdau !== 0 ? (
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
                  ) : null}
                </CollapsiblePanel>
              );
            })
          ) : null}
          <View style={cssStyles.dashboardRowContainerCenter}>
            <Text style={styles.asterisks}>**</Text>
            <Text style={cssStyles.dashboardTextVerySmallWhite}>
              The estimated value of ndau in US dollars can be calculated using the Target Price at
              which new ndau have most recently been issued. The value shown here is calculated
              using that method as of the issue price on {DateHelper.getTodaysDate()}. The Axiom
              Foundation bears no responsibility or liability for the calculation of that estimated
              value, or for decisions based on that estimated value.
            </Text>
          </View>
        </ScrollView>
      </SafeAreaView>
    ) : (
      <SafeAreaView style={cssStyles.safeContainer} />
    );
  };
}

export default Dashboard;
