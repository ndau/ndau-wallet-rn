import React from 'react'
import { View, TouchableOpacity, Slider } from 'react-native'
import { H4, Button } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'
import { MainContainer, ContentContainer, CloseForBar } from '../common'
import styles from './styles'

export function AccountPanel (props) {
  return (
    <View style={styles.accountMainPanel}>
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1.0]}
        colors={['#0F2748', '#293E63']}
        style={[styles.opaqueOverlay]}
      >
        <View style={styles.accountPanels}>
          <View style={styles.accountTitlePanel}>
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
                <H4 style={styles.accountTitleTextPanel}>
                  {AccountAPIHelper.accountNickname(props.account.addressData)}
                </H4>
                <FontAwesome5Pro
                  name={props.icon}
                  size={18}
                  color='#4B9176'
                  style={styles.accountNicknameIcon}
                  light
                />
                {props.accountNoticePeriod ? (
                  props.accountLockedUntil ? (
                    <FontAwesome5Pro
                      name='clock'
                      size={18}
                      color='#4B9176'
                      style={styles.accountNicknameIcon}
                      light
                    />
                  ) : (
                    <FontAwesome5Pro
                      name='clock'
                      size={18}
                      color='#CC8727'
                      style={styles.accountNicknameIcon}
                      light
                    />
                  )
                ) : null}
              </View>
              <View>
                <H4 style={styles.accountPanelTotal}>
                  {AccountAPIHelper.accountNdauAmount(
                    props.account.addressData
                  )}
                </H4>
              </View>
            </View>
            <View>
              <View style={styles.accountPanelBorder} />
            </View>
          </View>
          <View style={styles.accountButtonPanel}>
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
          <View style={styles.accountActionPanel}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}
            >
              <H4 style={styles.accountActionTextPanel}>
                View account details {'&'} settings
              </H4>
              <TouchableOpacity {...props}>
                <FontAwesome5Pro
                  name='chevron-circle-right'
                  size={24}
                  color='#4B9176'
                  style={styles.accountAngle}
                  solid
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
    <MainContainer>
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.02 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.05]}
          colors={['#0A1724', '#0F2748']}
          style={[styles.appContainerOverlay]}
        >
          <View style={styles.accountTitlePanel}>
            <AccountDetailsBar goBack={() => goBack()} {...props} />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </LinearGradient>
      </View>
    </MainContainer>
  )
}

export function AccountLockContainer (props) {
  close = () => {
    props.navigation.navigate('WalletOverview', { wallet: props.wallet })
  }
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <LinearGradient
          start={{ x: 0.0, y: 0.02 }}
          end={{ x: 0.0, y: 1.0 }}
          locations={[0, 0.05]}
          colors={['#0A1724', '#0F2748']}
          style={[styles.appContainerOverlay]}
        >
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar close={this.close} goBack={this.goBack} />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </LinearGradient>
      </View>
    </MainContainer>
  )
}

export function AccountButton (props) {
  return (
    <Button
      style={styles.accountButton}
      textStyle={styles.accountButtonText}
      uppercase={false}
      {...props}
    >
      {props.children}{' '}
      <FontAwesome5Pro
        name={props.icon}
        size={18}
        color='#4B9176'
        style={styles.accountAngle}
        light
      />
    </Button>
  )
}

export function AccountTotalPanel (props) {
  return (
    <View style={styles.accountTotalPanel}>
      <H4 style={styles.accountTotalPanelText}>
        {AccountAPIHelper.accountNdauAmount(props.account.addressData)}
      </H4>
    </View>
  )
}

export function AccountLockDetailsPanel (props) {
  return (
    <View style={styles.accountDetailsPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountDetailsPanel (props) {
  return (
    <View style={styles.accountDetailsPanel}>
      <View style={styles.accountDetailsTextPanelWithButton}>
        <View>
          {props.accountNotLocked ? (
            <H4 style={styles.accountDetailsLargerText}>Unlocked</H4>
          ) : (
            <H4 style={styles.accountDetailsLargerText}>
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
      <View style={styles.accountDetailsTextPanel}>
        <H4 style={styles.accountDetailsLargerText}>
          {props.eaiPercentage}% annualized incentive (EAI)
        </H4>
      </View>
      <View style={styles.accountDetailsPanelBorder} />
      <View style={styles.accountDetailsTextPanelWithSmallText}>
        <View>
          <H4 style={styles.accountDetailsSmallerText}>
            Weighted average age (WAA):
          </H4>
        </View>
        <View>
          <H4 style={styles.accountDetailsSmallerTextBold}>
            {props.weightedAverageAge}
          </H4>
        </View>
      </View>
      <View style={styles.accountDetailsTextPanelWithSmallText}>
        <View>
          <H4 style={styles.accountDetailsSmallerText}>
            Current EAI based on WAA:
          </H4>
        </View>
        <View>
          <H4 style={styles.accountDetailsSmallerTextBold}>
            {props.eaiPercentage}%
          </H4>
        </View>
      </View>
      {props.sendingEAITo ? (
        <View style={styles.accountDetailsTextPanelWithSmallText}>
          <View>
            <H4 style={styles.accountDetailsSmallerText}>EAI being sent to:</H4>
          </View>
          <View>
            <H4 style={styles.accountDetailsSmallerTextBold}>
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
    <View style={styles.accountDetailsBarContainer}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={props.goBack}>
          <FontAwesome5Pro size={28} name='arrow-left' color='#4B9176' light />
        </TouchableOpacity>
      </View>
      <H4 style={[styles.accountDetailsBarText]}>
        {props.account.addressData
          ? props.account.addressData.nickname
          : 'Account'}{' '}
        details
      </H4>
      <View style={styles.detailsBarCog}>
        <FontAwesome5Pro size={18} name='cog' color='#FFFFFF' light />
      </View>
    </View>
  )
}

export function AccountClosingBar (props) {
  return (
    <View style={styles.accountDetailsBarContainer}>
      <View style={styles.backArrow}>
        <TouchableOpacity onPress={props.goBack}>
          <FontAwesome5Pro size={28} name='arrow-left' color='#4B9176' light />
        </TouchableOpacity>
      </View>
      <H4 style={[styles.accountDetailsBarText]}>{props.title}</H4>
      <CloseForBar {...props} />
    </View>
  )
}

export function AccountLockButton (props) {
  return (
    <View style={styles.accountLockButtonContainer}>
      <View>
        <H4 style={styles.lockSmallerText}>{props.smallText}</H4>
      </View>
      <Button
        style={styles.accountLargeButton}
        textStyle={styles.accountLargeButtonText}
        uppercase={false}
        {...props}
      >
        {props.children}
      </Button>
    </View>
  )
}

export function AccountLockLargerText (props) {
  return (
    <View style={styles.accountLockDetailsTextPanel}>
      <H4 style={styles.accountDetailsLargerText}>{props.children}</H4>
    </View>
  )
}

export function AccountBorder (props) {
  return <View style={styles.accountDetailsPanelBorder} />
}

export function AccountCheckmarkText (props) {
  return (
    <View style={styles.lockAccountTextPanelWithSmallText}>
      <View style={styles.lockAccountCheckmark}>
        <FontAwesome5Pro size={18} name='check' color='#85BE4D' light />
      </View>
      <View>
        <H4 style={styles.accountDetailsSmallerText}>{props.children}</H4>
      </View>
    </View>
  )
}

export function AccountLockSmallerText (props) {
  return (
    <View>
      <H4 style={styles.lockSmallerTextBold}>{props.children}</H4>
    </View>
  )
}

export function AccountLockSlider (props) {
  return (
    <View style={styles.lockSliderContainer}>
      <Slider
        maximumTrackTintColor='#4E957A'
        minimumTrackTintColor='#4E957A'
        step={0.25}
        style={styles.lockSlider}
        {...props}
      />
    </View>
  )
}
