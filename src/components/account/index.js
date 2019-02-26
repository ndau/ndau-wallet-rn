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
              <H4 style={componentStyles.accountTitleTextPanel}>
                {AccountAPIHelper.accountNickname(props.account.addressData)}
              </H4>
              <H4 style={componentStyles.accountPanelTotal}>
                {AccountAPIHelper.accountNdauAmount(props.account.addressData)}
              </H4>
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
          start={{ x: 0.0, y: 0.05 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.2]}
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

export function AccountButton (props) {
  return (
    <Button
      style={componentStyles.accountButton}
      textStyle={componentStyles.accountButtonText}
      uppercase={false}
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

export function AccountDetailsPanel (props) {
  return (
    <View style={componentStyles.accountDetailsPanel}>
      <View style={componentStyles.accountDetailsTextPanelWithButton}>
        <View>
          {props.accountNotLocked ? (
            <H4 style={componentStyles.accountDetailsLargerText}>Unlocked</H4>
          ) : (
            <H4 style={componentStyles.accountDetailsLargerText}>Locked</H4>
          )}
        </View>
        <View>
          {props.accountNotLocked ? (
            <AccountButton icon='lock'>Lock</AccountButton>
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
