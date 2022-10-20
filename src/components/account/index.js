/* ----- ---- --- -- -
 * Copyright 2020 The Axiom Foundation. All Rights Reserved.
 *
 * Licensed under the Apache License 2.0 (the "License").  You may not use
 * this file except in compliance with the License.  You can obtain a copy
 * in the file LICENSE in the source distribution or at
 * https://www.apache.org/licenses/LICENSE-2.0.txt
 * - -- --- ---- -----
 */

import React from 'react'
import {
  View,
  TouchableOpacity,
  TouchableHighlight,
  Text,
  Linking,
  Platform,
  ScrollView
} from 'react-native'
import Clipboard from '@react-native-clipboard/clipboard';
import FlashNotification from '../common/FlashNotification'
import { H4, H3, P, Button } from 'nachos-ui'
import Icon from 'react-native-fontawesome-pro'
import LinearGradient from 'react-native-linear-gradient'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'
import DataFormatHelper from '../../helpers/DataFormatHelper'
import {
  MainContainer,
  ContentContainer,
  CloseForBar,
  TitleBarGradient,
  AccountDetailsTitleBarGradient,
  Label,
  TextInput
} from '../common'
import CollapsibleBar from '../common/CollapsibleBar'
import styles from './styles'
import AccountHistoryHelper from '../../helpers/AccountHistoryHelper'
import AppConstants from '../../AppConstants'
import ndaujs from 'ndaujs'
import AppConfig from '../../AppConfig'
import NdauNumber from '../../helpers/NdauNumber'
import { DrawerHeader } from '../drawer'
import Share from 'react-native-share'
import LogStore from '../../stores/LogStore'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import { WebView } from 'react-native-webview'

export function AccountPanel (props) {
  const accountAmount = new NdauNumber(
    DataFormatHelper.accountNdauAmount(props.account.addressData)
  )
  const truncatedAddress = ndaujs.truncateAddress(props.account.address)

  const copyAddress = () => {
    Clipboard.setString(props.account.address)
    FlashNotification.showInformation('Account address has been copied to the clipboard.')
  } 

  return (
    <View style={(props.index == 0) ? { marginTop: hp('0%') } : styles.accountPanels}>
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1.0]}
        colors={['#0F2748', '#293E63']}
      >
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
            <Text style={styles.accountTitleTextPanel}>
              {AccountAPIHelper.accountNickname(props.account.addressData)}
            </Text>
            <Icon
              name={props.icon}
              size={18}
              color={AppConstants.ICON_BUTTON_COLOR}
              containerStyle={styles.accountNicknameIcon}
              type='solid'
            />
            {props.isAccountLocked ? (
              props.accountLockedUntil === null ? (
                <Icon
                  name='clock'
                  size={18}
                  color={AppConstants.CAUTION_ICON_COLOR}
                  containerStyle={styles.accountNicknameIcon}
                  type='light'
                />
              ) : (
                <Icon
                  name='clock'
                  size={18}
                  color={AppConstants.ICON_BUTTON_COLOR}
                  containerStyle={styles.accountNicknameIcon}
                  type='light'
                />
              )
            ) : null}
          </View>
          <View style={styles.ndauTotalContainer}>
            <View>
              <P style={styles.ndauSmall}>n</P>
            </View>
            <View>
              <H4 style={styles.accountPanelTotal}>
                {accountAmount.toSummary()}
              </H4>
            </View>
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View
            style={{
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              paddingLeft: wp('4%'),
              paddingBottom: hp('1%')
            }}
          >
            <Text style={styles.addressCopyPanelTextOnDetail}>
              {truncatedAddress}
            </Text>
          </View>
          <View style={styles.addressCopyButtonContainer}>
            <TouchableHighlight 
              underlayColor={AppConstants.SQUARE_BUTTON_COLOR} 
              style={styles.addressCopyButton}
              onPress={copyAddress}>
              <Text style={styles.addressCopyButtonText}>Copy</Text>
            </TouchableHighlight>
          </View>
        </View>
      </LinearGradient>
      <TouchableOpacity {...props}>
        <View style={styles.accountActionPanel}>
          <H4 style={styles.accountActionTextPanel}>View account details</H4>
          <Icon
            name='chevron-right'
            color={AppConstants.TEXT_COLOR}
            type='light'
          />
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function WalletOverviewHeaderActions (props) {
  return (
    <View style={styles.walletOverviewHeaderActions}>{props.children}</View>
  )
}

export function AccountDetailsContainer (props) {
  const goBack = () => {
    props.navigation.goBack()
  }
  const title = props.account.addressData
    ? props.account.addressData.nickname
    : 'Account'
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <AccountDetailsTitleBarGradient>
          <View style={styles.accountDetailsTitlePanel}>
            <AccountClosingBar
              backArrowStyle={styles.backArrowForLock}
              title={title}
              backBar
              goBack={goBack}
            />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </AccountDetailsTitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountLockContainer (props) {
  const close = () => {
    props.navigation.navigate('AccountDetails', { wallet: props.wallet })
  }
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              backArrowStyle={styles.backArrowForLock}
              title={props.title}
              closeBar
              close={close}
              backBar
              goBack={goBack}
            />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountUnlockContainer (props) {
  const close = () => {
    props.navigation.navigate('AccountDetails', {
      wallet: props.wallet,
      account: props.account
    })
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              title={props.title}
              closeBar
              close={close}
            />
          </View>
          <ContentContainer style={styles.accountContentPanel}>
            {props.children}
          </ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountSendContainer (props) {
  const close = () => {
    props.navigation.navigate('AccountDetails', {
      wallet: props.wallet,
      account: props.account
    })
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              title={props.title}
              closeBar
              close={close}
            />
          </View>
          <ContentContainer style={styles.accountContentPanel}>
            <ScrollView keyboardShouldPersistTaps='always'>
              {props.children}
            </ScrollView>
          </ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountScanContainer (props) {
  const close = () => {
    props.navigation.navigate('AccountDetails', {
      wallet: props.wallet,
      account: props.account
    })
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              title={props.title}
              closeBar
              close={close}
            />
          </View>
          <ContentContainer style={styles.accountContentPanel}>
            {props.children}
          </ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function SettingsContainer (props) {
  return (
    <MainContainer>
      <View
        style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}
      >
        <TitleBarGradient>
          <DrawerHeader {...props}>{props.title}</DrawerHeader>
          <ContentContainer style={styles.accountContentPanel}>
            {props.children}
          </ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountHistoryContainer (props) {
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              backArrowStyle={styles.backArrowForHistory}
              backBar
              goBack={goBack}
              {...props}
            />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

/**
 * This is a homegrown button as opposed to using nachosui. The reason
 * here is that they way nachosui inserts Icon objects does not allow
 * customization. You can change the fontset but the button doesn't call
 * the Icon correctly to pass in the name of the icon. It uses a hardcoded
 * map of name to unicode characters. These unicode characters do not line
 * up to the FontAwesomePro5 set.
 *
 * @param {Object} props
 */
export function AccountButton (props) {
  return (
    <View
      style={[styles.accountButton, props.disabled ? { opacity: 0.3 } : {}]}
    >
      <TouchableOpacity
        disabled={props.disabled}
        activeOpacity={0.8}
        accessibilityTraits='button'
        accessibilityComponentType='button'
        {...props}
      >
        <View style={styles.accountButtonInnerPanel}>
          <Text style={styles.accountButtonText}>
            {props.children}{' '}
            {Platform.OS === 'ios' ? (
              <Icon
                name={props.customIconName}
                size={18}
                color={AppConstants.ICON_BUTTON_COLOR}
                type='light'
              />
            ) : null}
          </Text>
          {Platform.OS === 'android' ? (
            <Icon
              name={props.customIconName}
              size={18}
              color={AppConstants.ICON_BUTTON_COLOR}
              type='light'
            />
          ) : null}
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function AccountTotalPanel (props) {
  const amount = new NdauNumber(
    DataFormatHelper.accountNdauAmount(
      props.account.addressData,
      true,
      AppConfig.NDAU_DETAIL_PRECISION
    )
  ).toDetail()
  return (
    <TouchableOpacity style={styles.ndauTotalContainerMedium} onPress={()=>{props.onPress()}}>
      <P style={styles.ndauMedium}>n</P>
      <H4 style={styles.accountTotalPanelText}>{amount}</H4>
    </TouchableOpacity>
  )
}

export function AccountDetailsButtonPanel (props) {
  return (
    <View style={styles.accountDetailsButtonPanel}>
      <View>
        <AccountButton
          disabled={props.disableSend}
          onPress={() => props.send(props.account, props.wallet)}
          customIconName='arrow-alt-up'
        >
          Send
        </AccountButton>
      </View>
      <View>
        <AccountButton
          disabled={props.disabledReceive}
          onPress={() => props.receive(props.account, props.wallet)}
          customIconName='arrow-alt-down'
        >
          Receive
        </AccountButton>
      </View>
      <View>
        <AccountButton
          disabled={props.disableLock}
          onPress={() => props.lock(props.account, props.wallet)}
          customIconName='lock'
        >
          Lock
        </AccountButton>
      </View>
      <View>
        <AccountButton
          disabled={false}
          onPress={() => props.setEAI(props.account, props.wallet)}
          customIconName='coins'
        >
          SetEAI
        </AccountButton>
      </View>
    </View>
  )
}

export function AccountLockDetailsPanel (props) {
  return (
    <View style={styles.accountLockPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountLockOptionsPanel (props) {
  return (
    <View style={styles.accountLockOptionsPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountReceiveParagraphText (props) {
  return <P style={styles.accountReceiveParagraphText}>{props.children}</P>
}

export function AccountParagraphText (props) {
  return (
    <View style={styles.accountDetailsItemPanel}>
      {props.customIconName ? (
        <Icon
          name={props.customIconName}
          size={18}
          color={props.customIconColor || AppConstants.ICON_BUTTON_COLOR}
          containerStyle={styles.accountDetailsIcons}
          type={props.iconType || 'light'}
        />
      ) : null}
      <View>
        <P style={styles.accountDetailsParagraphText}>{props.children}</P>
      </View>
    </View>
  )
}

export function AccountHeaderText (props) {
  return <H3 style={styles.accountDetailsLargerText}>{props.children}</H3>
}

export function AccountDetailsPanel (props) {
  let additionalProps = {}
  if (props.firstPanel) {
    additionalProps = styles.firstAccountDetailsPanel
  } else if (props.secondPanel) {
    additionalProps = styles.secondAccountDetailsPanel
  }
  return (
    <View style={[styles.accountDetailsPanel, additionalProps]}>
      {props.children}
    </View>
  )
}

export function AccountClosingBar (props) {
  return (
    <View style={styles.accountClosingBarContainer}>
      {props.backBar ? (
        <View style={[styles.backArrow, props.backArrowStyle]}>
          <Icon
            size={32}
            name='arrow-left'
            color={AppConstants.ICON_BUTTON_COLOR}
            onPress={props.goBack}
            type='light'
          />
        </View>
      ) : (
        <View style={styles.backArrow} />
      )}

      <H4 style={[styles.accountClosingBarText]}>{props.title}</H4>
      {props.closeBar ? (
        <CloseForBar style={styles.closeIcon} {...props} />
      ) : (
        <View style={styles.closeIcon} />
      )}
    </View>
  )
}

export function AccountLockConfirmBottomPanel (props) {
  return (
    <View style={styles.accountLockButtonTypeContainer}>
      <Label noMargin>Please enter the word 'Lock' to confirm</Label>
      <TextInput
        onChangeText={word => props.onChangeText(word)}
        placeholder='Enter the word...'
        value={props.word}
        autoCapitalize='none'
        noSideMargins
      />
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

export function AccountSetEAIContainer (props) {
  const close = () => {
    props.navigation.navigate('AccountDetails', { wallet: props.wallet })
  }
  const goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <TitleBarGradient>
          <View style={styles.accountTitlePanel}>
            <AccountClosingBar
              backArrowStyle={styles.backArrowForLock}
              title={props.title}
              closeBar
              close={close}
              backBar
              goBack={goBack}
            />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountSetEAIDetailsPanel (props) {
  return (
    <View style={styles.accountSetEAIDetailsPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountSetEAIOptionsPanel (props) {
  return (
    <View style={styles.accountSetEAIOptionsPanel}>
      <View>{props.children}</View>
    </View>
  )
}

export function AccountSetEAIConfirmBottomPanel (props) {
  return (
    <View style={styles.accountSetEAIButtonTypeContainer}>
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

export function AccountSetEAIButton (props) {
  return (
    <View style={styles.accountSetEAIButtonContainer}>
      <View>
        <H4 style={styles.setEAISmallerText}>{props.smallText}</H4>
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

export function AccountSetEAITypeButton (props) {
  return (
    <View style={styles.accountSetEAIButtonTypeContainer}>
      <View>
        <H4 style={styles.setEAISmallerText}>{props.smallText}</H4>
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

export function AccountSetEAINoteText (props) {
  return (
    <View>
      <H4 style={[styles.setEAISmallerText, styles.accountSideMargins]}>
        {props.children}
      </H4>
    </View>
  )
}

export function AccountSetEAILargerText (props) {
  return (
    <View style={styles.accountSetEAIDetailsTextPanel}>
      <H4 style={styles.accountDetailsParagraphText}>{props.children}</H4>
    </View>
  )
}

export function AccountSetEAIGreenText (props) {
  return <H4 style={styles.accountSetEAIGreenText}>{props.children}</H4>
}

export function AccountSendButton (props) {
  return (
    <View style={styles.accountSendButtonContainer}>
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

export function AccountLockTypeButton (props) {
  return (
    <View style={styles.accountLockButtonTypeContainer}>
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


export function AccountLockNoteText (props) {
  return (
    <View>
      <H4 style={[styles.lockSmallerText, styles.accountSideMargins]}>
        {props.children}
      </H4>
    </View>
  )
}

export function AccountLockLargerText (props) {
  return (
    <View style={styles.accountLockDetailsTextPanel}>
      <H4 style={styles.accountDetailsParagraphText}>{props.children}</H4>
    </View>
  )
}

export function AccountLockGreenText (props) {
  return <H4 style={styles.accountLockGreenText}>{props.children}</H4>
}

export function AccountDetailsLargerText (props) {
  return (
    <View style={[styles.accountDetailsTextPanelTopMargin]}>
      <H4 style={styles.accountDetailsLargerText}>{props.children}</H4>
    </View>
  )
}

export function AccountBorder (props) {
  let sideMargins = {}
  if (props.sideMargins) {
    sideMargins = styles.accountSideMargins
  }
  return <View style={[styles.accountDetailsPanelBorder, sideMargins, props.verticalMargins]} />
}

export function AccountIconText (props) {
  return (
    <View style={styles.lockAccountTextPanelWithSmallText}>
      <View style={styles.lockAccountCheckmark}>
        <Icon
          size={18}
          name={props.iconName ? props.iconName : 'check'}
          color={
            props.iconColor ? props.iconColor : AppConstants.CHECKBOX_COLOR
          }
          type='light'
        />
      </View>
      <View>
        <H4 style={styles.accountDetailsSmallerText}>{props.children}</H4>
      </View>
    </View>
  )
}

export function AccountHistoryPanel (props) {
  return <View style={styles.accountHistoryPanel}>{props.children}</View>
}

export function AccountDetailPanel (props) {
  return <View style={styles.accountDetailsPanel}>{props.children}</View>
}

export function AccountSendPanel (props) {
  return <View style={styles.accountSendPanel}>{props.children}</View>
}

export function AccountHistoryPanels (props) {
  if (!AccountHistoryHelper.hasItems(props.accountHistory)) {
    return null
  }

  return props.accountHistory.Items.map((item, index) => {
    const transactionDestination = AccountHistoryHelper.getTransactionDestination(
      item
    )
    const transactionSource = AccountHistoryHelper.getTransactionSource(item)
    const destinationUsed =
      transactionDestination && props.address !== transactionDestination
    const sourceUsed = transactionSource && props.address !== transactionSource
    const dest = ndaujs.truncateAddress(transactionDestination)
    const source = ndaujs.truncateAddress(transactionSource)

    return (
      <CollapsibleBar
        key={index}
        title={AccountHistoryHelper.getTransactionDate(item)}
        titleMiddle={AccountHistoryHelper.getTransactionType(item)}
        titleRight={AccountHistoryHelper.getTransactionBalance(item)}
        collapsible
        showOnStart={false}
        iconCollapsed='angle-down'
        iconActive='angle-down'
        iconOpened='angle-up'
        tintColor={AppConstants.ICON_BUTTON_COLOR}
        lowerBorder
      >
        <View style={styles.accountHistoryTextPanelWithSmallText}>
          <View>
            <H4 style={styles.accountHistorySmallerTextBold}>
              Transaction ID:
            </H4>
          </View>
          <View>
            <H4 style={styles.accountHistorySmallerText}>
              {AccountHistoryHelper.getTransactionId(item)}
            </H4>
          </View>
        </View>
        {destinationUsed ? (
          <View style={styles.accountHistoryTextPanelWithSmallText}>
            <View>
              <H4 style={styles.accountHistorySmallerTextBold}>Sent to:</H4>
            </View>
            <View>
              <H4 style={styles.accountHistorySmallerText}>{dest}</H4>
            </View>
          </View>
        ) : null}
        {sourceUsed ? (
          <View style={styles.accountHistoryTextPanelWithSmallText}>
            <View>
              <H4 style={styles.accountHistorySmallerTextBold}>
                Received from:
              </H4>
            </View>
            <View>
              <H4 style={styles.accountHistorySmallerText}>{source}</H4>
            </View>
          </View>
        ) : null}
      </CollapsibleBar>
    )
  })
}

export function DashboardTotalPanel (props) {
  return (
    <CollapsibleBar
      {...props}
      style={styles.dashboardTotalPanel}
      titleStyle={styles.dashboardTotalTitleLeft}
      collapsible
      showOnStart={false}
      iconCollapsed='angle-down'
      iconActive='angle-down'
      iconOpened='angle-up'
      tintColor={AppConstants.TEXT_COLOR}
      upperBorder
    >
      <View style={styles.dashboardTotalPanelTextContainer}>
        <P style={styles.totalAsterickTextVerySmallWhite}>
          * This is an estimated value of ndau based on recent trading volume.
        </P>
      </View>
    </CollapsibleBar>
  )
}

export function WalletTotalPanel (props) {
  return (
    <CollapsibleBar
      {...props}
      style={styles.dashboardTotalPanel}
      titleStyle={{ fontSize: 14 }}
      titleStyleRight={[styles.dashboardTotalTitleLeft, { fontSize: 14 }]}
      collapsible
      showOnStart={false}
      iconCollapsed='angle-down'
      iconActive='angle-down'
      iconOpened='angle-up'
      tintColor={AppConstants.TEXT_COLOR}
      upperBorder
    >
      <View style={[styles.dashboardTotalPanelTextContainer, { height: 280 }]}>
        <Text style={styles.walletTotalPanelText}>
          * Updated and recorded on the ndau blockchain every 5 minutes.
        </Text>
        <Text 
          style={styles.walletTotalPanelLinkText}
          onPress={() => Linking.openURL(AppConfig.BLOCKCHAIN_KNOWLEDGEBASE_URL)}
        >
          What is Blockchain Market Price and how is it calculated?
        </Text>
        <WebView
          source={{
            html: `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=0.73">
                  </head>
                  <body>
                    <div class="nomics-ticker-widget" data-name="Ndau" data-base="XND" data-quote="USD"></div>
                    <script src="https://widget.nomics.com/embed.js"></script>
                  </body>
                  </html>`
          }}
        />
      </View>
    </CollapsibleBar>
  )
}

export function AccountConfirmationItem (props) {
  return (
    <View
      style={[styles.accountSendTextPanelWithSmallText, { ...props.style }]}
    >
      <View>
        {props.url ? (
          <H4
            onPress={() => Linking.openURL(props.url)}
            style={styles.accountHistoryLinkText}
          >
            {props.children}
          </H4>
        ) : (
          <H4
            style={
              props.largerText
                ? styles.accountHistoryLargerTextBold
                : styles.accountHistorySmallerText
            }
          >
            {props.children}
          </H4>
        )}
      </View>
      <View>
        <H4
          style={
            props.largerText
              ? styles.accountHistoryLargerTextBold
              : styles.accountHistorySmallerText
          }
        >
          {props.value}
        </H4>
      </View>
    </View>
  )
}

export function AccountSendErrorText (props) {
  return (
    <View style={styles.accountSideMargins}>
      <View>
        <H4
          style={[
            styles.accountHistorySmallerText,
            styles.accountSendErrorColor
          ]}
        >
          {props.children}
        </H4>
      </View>
    </View>
  )
}

export function AccountLockOption (props) {
  let selectedStyle = {}
  if (props.selected) {
    selectedStyle = styles.accountLockOptionSelected
  }
  return (
    <TouchableOpacity {...props}>
      <View style={[styles.accountLockOption, selectedStyle]}>
        <P style={styles.accountLockOptionHeaderText}>{props.lock}</P>
        <P style={styles.accountLockOptionText}>{`${props.base}%`}</P>
        <P style={styles.accountLockOptionTextSmall}>+</P>
        <P style={styles.accountLockOptionText}>{`${props.bonus}%`}</P>
        <P style={styles.accountLockOptionTextSmall}>=</P>
        <P style={styles.accountLockOptionText}>{`${props.total}%`}</P>
        <P style={styles.accountLockOptionTextSmall} />

        {props.selected ? (
          <Icon
            containerStyle={styles.accountLockCheckbox}
            size={18}
            name='check'
            color='#85BE4D'
            type='light'
          />
        ) : null}
      </View>
    </TouchableOpacity>
  )
}

export function AccountLockOptionHeader (props) {
  return (
    <View style={styles.accountLockOptionHeader}>
      <P style={styles.accountLockOptionHeaderTextTop}>Lock for</P>
      <P style={styles.accountLockOptionHeaderTextTop}>New base</P>
      <P style={styles.accountLockOptionHeaderTextTop}>Bonus</P>
      <P style={styles.accountLockOptionHeaderTextTop}>Total</P>
    </View>
  )
}

export function AddressSharePanel (props) {
  const address = props.address
  const truncatedAddress = ndaujs.truncateAddress(address)

  const share = async address => {
    try {
      await Share.open({
        message: address,
        title: 'ndau address'
      })
    } catch (error) {
      LogStore.log(error)
    }
  }

  let transparentBackground = {}
  if (props.transparent) {
    transparentBackground = {
      backgroundColor: 'transparent'
    }
  }

  let noPadding = {}
  if (props.noPadding) {
    noPadding = { paddingHorizontal: 0 }
  }

  return (
    <View
      style={
        props.scroll
          ? styles.addressCopyPanelContainerScrollView
          : styles.addressCopyPanelContainerBottomNoBorder
      }
    >
      <View
        style={[
          styles.addressCopyPanel,
          transparentBackground,
          noPadding,
          props.style
        ]}
        {...props}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <View>
            <Text style={styles.addressCopyPanelText}>{truncatedAddress}</Text>
          </View>
          <View>
            <Button
              style={styles.addressShareButton}
              textStyle={styles.addressButtonText}
              uppercase={false}
              onPress={() => share(props.address)}
              {...props}
            >
              Share
            </Button>
          </View>
        </View>
      </View>
    </View>
  )
}
