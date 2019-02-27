import React from 'react'
import {
  View,
  ScrollView,
  StatusBar,
  ImageBackground,
  TouchableOpacity
} from 'react-native'
import { SafeAreaView } from 'react-navigation'
import componentStyles from '../../css/componentStyles'
import { H4, Button } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'

export function AccountPanel (props) {
  return (
    <View style={componentStyles.accountMainPanel}>
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1.0]}
        colors={['#0F2748', '#293E63']}
        style={[componentStyles.opaqueOverlay]}
      >
        <View style={componentStyles.accountPanels}>
          <View style={componentStyles.accountTitlePanel}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center'
                }}
              >
                <H4 style={componentStyles.accountTitleTextPanel}>
                  {AccountAPIHelper.accountNickname(props.account.addressData)}
                </H4>
                <FontAwesome5Pro
                  name={props.icon}
                  size={18}
                  color='#4B9176'
                  style={componentStyles.accountNicknameIcon}
                  light
                />
              </View>
              <View>
                <H4 style={componentStyles.accountPanelTotal}>
                  {AccountAPIHelper.accountNdauAmount(
                    props.account.addressData
                  )}
                </H4>
              </View>
            </View>
            <View style={componentStyles.accountPanelBorder} />
          </View>
          <View style={componentStyles.accountButtonPanel}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              {props.children}
            </View>
          </View>
          <View style={componentStyles.accountActionPanel}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <H4 style={componentStyles.accountActionTextPanel}>
                View account details
              </H4>
              <TouchableOpacity {...props}>
                <FontAwesome5Pro
                  name='chevron-circle-right'
                  size={18}
                  color='#4B9176'
                  style={componentStyles.accountAngle}
                  light
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export function AccountDetailsContainer (props) {
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.02 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.05]}
          colors={['#0A1724', '#0F2748']}
          style={[componentStyles.appContainerOverlay]}
        >
          <View style={componentStyles.accountTitlePanel}>
            <AccountDetailsBar goBack={() => goBack()} {...props} />
          </View>
          <View style={componentStyles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function AccountLockContainer (props) {
  goBack = wallet => {
    props.navigation.navigate('WalletOverview', { wallet })
  }
  return (
    <SafeAreaView
      style={[componentStyles.container, componentStyles.statusBarColor]}
    >
      <StatusBar barStyle='light-content' backgroundColor='#000000' />
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.02 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.05]}
          colors={['#0A1724', '#0F2748']}
          style={[componentStyles.appContainerOverlay]}
        >
          <View style={componentStyles.accountTitlePanel}>
            <AccountClosingBar goBack={this.goBack} {...props} />
          </View>
          <View style={componentStyles.appContainer}>{props.children}</View>
        </LinearGradient>
      </View>
    </SafeAreaView>
  )
}

export function AccountButton (props) {
  return (
    <Button
      style={componentStyles.accountButton}
      textStyle={componentStyles.accountButtonText}
      uppercase={false}
      {...props}
    >
      {props.children}{' '}
      <FontAwesome5Pro
        name={props.icon}
        size={18}
        color='#4B9176'
        style={componentStyles.accountAngle}
        light
      />
    </Button>
  )
}

export function AccountTotalPanel (props) {
  return (
    <View style={componentStyles.accountTotalPanel}>
      <H4 style={componentStyles.accountTotalPanelText}>
        {AccountAPIHelper.accountNdauAmount(props.account.addressData)}
      </H4>
    </View>
  )
}

export function AccountLockDetailsPanel (props) {
  return (
    <View style={componentStyles.accountDetailsPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountDetailsPanel (props) {
  return (
    <View style={componentStyles.accountDetailsPanel}>
      <View style={componentStyles.accountDetailsTextPanelWithButton}>
        <View>
          {props.accountNotLocked ? (
            <H4 style={componentStyles.accountDetailsLargerText}>Unlocked</H4>
          ) : (
            <H4 style={componentStyles.accountDetailsLargerText}>
              Locked ({props.accountNoticePeriod} day countdown)
            </H4>
          )}
        </View>
        <View>
          {props.accountNotLocked ? (
            <AccountButton
              onPress={() => props.showLock(props.account, props.wallet)}
              icon='lock'
            >
              Lock
            </AccountButton>
          ) : (
            <AccountButton icon='lock-open'>Unlock</AccountButton>
          )}
        </View>
      </View>
      <View style={componentStyles.accountDetailsTextPanel}>
        <H4 style={componentStyles.accountDetailsLargerText}>
          {props.eaiPercentage}% annualized incentive (EAI)
        </H4>
      </View>
      <View style={componentStyles.accountDetailsPanelBorder} />
      <View style={componentStyles.accountDetailsTextPanelWithSmallText}>
        <View>
          <H4 style={componentStyles.accountDetailsSmallerText}>
            Weighted average age (WAA):
          </H4>
        </View>
        <View>
          <H4 style={componentStyles.accountDetailsSmallerTextBold}>
            {props.weightedAverageAge}
          </H4>
        </View>
      </View>
      <View style={componentStyles.accountDetailsTextPanelWithSmallText}>
        <View>
          <H4 style={componentStyles.accountDetailsSmallerText}>
            Current EAI based on WAA:
          </H4>
        </View>
        <View>
          <H4 style={componentStyles.accountDetailsSmallerTextBold}>
            {props.eaiPercentage}%
          </H4>
        </View>
      </View>
      {props.sendingEAITo ? (
        <View style={componentStyles.accountDetailsTextPanelWithSmallText}>
          <View>
            <H4 style={componentStyles.accountDetailsSmallerText}>
              EAI being sent to:
            </H4>
          </View>
          <View>
            <H4 style={componentStyles.accountDetailsSmallerTextBold}>
              {props.sendingEAITo}
            </H4>
          </View>
        </View>
      ) : null}
    </View>
  )
}

export function AccountDetailsBar (props) {
  return (
    <View style={componentStyles.accountDetailsBarContainer}>
      <View style={componentStyles.backArrow}>
        <TouchableOpacity onPress={props.goBack}>
          <FontAwesome5Pro size={28} name='arrow-left' color='#4B9176' light />
        </TouchableOpacity>
      </View>
      <H4 style={[componentStyles.accountDetailsBarText]}>
        {props.account.addressData
          ? props.account.addressData.nickname
          : 'Account'}{' '}
        details
      </H4>
      <View style={componentStyles.detailsBarCog}>
        <FontAwesome5Pro size={18} name='cog' color='#FFFFFF' light />
      </View>
    </View>
  )
}

export function AccountClosingBar (props) {
  return (
    <View style={componentStyles.accountDetailsBarContainer}>
      <View style={componentStyles.backArrow} />
      <H4 style={[componentStyles.accountDetailsBarText]}>{props.title}</H4>
      <View style={componentStyles.detailsBarCog}>
        <TouchableOpacity onPress={() => props.goBack(props.wallet)}>
          <FontAwesome5Pro size={18} name='times' color='#4B9176' light />
        </TouchableOpacity>
      </View>
    </View>
  )
}

export function AccountMediumButtons (props) {
  return (
    <View style={componentStyles.accountMediumButtonContainer}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-between'
        }}
      >
        <View>
          <AccountMediumButtonSecondary onPress={props.onPressSecondary}>
            {props.secondary}
          </AccountMediumButtonSecondary>
        </View>
        <View>
          <AccountMediumButton onPress={props.onPressPrimary}>
            {props.primary}
          </AccountMediumButton>
        </View>
      </View>
    </View>
  )
}

export function AccountMediumButton (props) {
  return (
    <Button
      style={componentStyles.mediumButton}
      textStyle={componentStyles.largeButtonText}
      uppercase={false}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export function AccountMediumButtonSecondary (props) {
  return (
    <Button
      style={componentStyles.mediumButtonSecondary}
      textStyle={componentStyles.largeButtonText}
      uppercase={false}
      {...props}
    >
      {props.children}
    </Button>
  )
}

export function AccountLockButton (props) {
  return (
    <View style={componentStyles.accountLockButtonContainer}>
      <View>
        <H4 style={componentStyles.lockSmallerText}>
          Note: You will not be able to spend, transfer or otherwise access the
          principal in this account while it is locked
        </H4>
      </View>
      <Button
        style={componentStyles.largeButton}
        textStyle={componentStyles.largeButtonText}
        uppercase={false}
        {...props}
      >
        {props.children}
      </Button>
    </View>
  )
}
