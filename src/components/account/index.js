import React from 'react'
import { View, TouchableOpacity, Share, Text, Linking } from 'react-native'
import { H4, H3, P, Button } from 'nachos-ui'
import Icon from 'react-native-fontawesome-pro'
import LinearGradient from 'react-native-linear-gradient'
import AccountAPIHelper from '../../helpers/AccountAPIHelper'
import {
  MainContainer,
  ContentContainer,
  CloseForBar,
  TitleBarGradient,
  AccountDetailsTitleBarGradient,
  FullBarBorder,
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

export function AccountPanel (props) {
  const accountAmount = new NdauNumber(
    AccountAPIHelper.accountNdauAmount(props.account.addressData)
  )
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
                <Icon
                  name={props.icon}
                  size={18}
                  color={AppConstants.ICON_BUTTON_COLOR}
                  containerStyle={styles.accountNicknameIcon}
                  type='light'
                />
                {props.accountNoticePeriod ? (
                  props.accountLockedUntil ? (
                    <Icon
                      name='clock'
                      size={18}
                      color={AppConstants.ICON_BUTTON_COLOR}
                      containerStyle={styles.accountNicknameIcon}
                      type='light'
                    />
                  ) : (
                    <Icon
                      name='clock'
                      size={18}
                      color='#CC8727'
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
                <Icon
                  name='chevron-circle-right'
                  size={24}
                  color={AppConstants.ICON_BUTTON_COLOR}
                  containerStyle={styles.accountAngle}
                  type='light'
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export function WalletOverviewHeaderActions (props) {
  return (
    <View style={styles.walletOverviewHeaderActions}>{props.children}</View>
  )
}

export function AccountDetailsContainer (props) {
  goBack = () => {
    props.navigation.goBack()
  }
  return (
    <MainContainer>
      <View style={{ flex: 1 }}>
        <AccountDetailsTitleBarGradient>
          <View style={styles.accountDetailsTitlePanel}>
            <AccountDetailsBar goBack={() => goBack()} {...props} />
            <FullBarBorder />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </AccountDetailsTitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountLockContainer (props) {
  close = () => {
    props.navigation.navigate('AccountDetails', { wallet: props.wallet })
  }
  goBack = () => {
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
              close={this.close}
              backBar
              goBack={this.goBack}
            />
          </View>
          <ContentContainer>{props.children}</ContentContainer>
        </TitleBarGradient>
      </View>
    </MainContainer>
  )
}

export function AccountUnlockContainer (props) {
  close = () => {
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
              close={this.close}
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
  close = () => {
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
              close={this.close}
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
  goBack = () => {
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
              goBack={this.goBack}
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
            <Icon
              name={props.customIconName}
              size={18}
              color={AppConstants.ICON_BUTTON_COLOR}
              type='light'
            />
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

export function LargeAccountButton (props) {
  return (
    <Button
      style={styles.largeAccountButton}
      textStyle={styles.accountButtonText}
      uppercase={false}
      {...props}
    >
      {props.children}{' '}
      <Icon
        name={props.customIconName}
        size={18}
        color={AppConstants.ICON_BUTTON_COLOR}
        containerStyle={styles.accountAngle}
        type='light'
      />
    </Button>
  )
}

export function AccountTotalPanel (props) {
  const amount = new NdauNumber(
    AccountAPIHelper.accountNdauAmount(
      props.account.addressData,
      true,
      AppConfig.NDAU_DETAIL_PRECISION
    )
  ).toDetail()
  return (
    <View style={styles.accountTotalPanel}>
      <View style={styles.ndauTotalContainerMedium}>
        <P style={styles.ndauMedium}>n</P>
        <H4 style={styles.accountTotalPanelText}>{amount}</H4>
      </View>
    </View>
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
          type='light'
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

export function AccountDetailsBar (props) {
  return (
    <View style={styles.accountDetailsBarContainer}>
      <View style={styles.backArrow}>
        <Icon
          size={32}
          name='arrow-left'
          color={AppConstants.ICON_BUTTON_COLOR}
          containerStyle={styles.accountAngle}
          onPress={props.goBack}
          type='light'
        />
      </View>
      <H4 style={[styles.accountDetailsBarText]}>
        {props.account.addressData
          ? props.account.addressData.nickname
          : 'Account'}{' '}
        details
      </H4>
      <View style={styles.detailsBarCog} />
    </View>
  )
}

export function AccountClosingBar (props) {
  return (
    <View style={styles.accountClosingBarContainer}>
      <View>
        <Text style={styles.testText}>TEST</Text>
      </View>

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
        <View />
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
  return <View style={[styles.accountDetailsPanelBorder, sideMargins]} />
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

export function AccountLockSmallerText (props) {
  return (
    <View>
      <H4 style={styles.lockSmallerTextBold}>{props.children}</H4>
    </View>
  )
}

export function AccountHistoryPanel (props) {
  return <View style={styles.accountHistoryPanel}>{props.children}</View>
}

export function AccountDetailPanel (props) {
  return <View style={styles.accountDetailsPanel}>{props.children}</View>
}

export function AccountReceivePanel (props) {
  return <View style={styles.accountReceivePanel}>{props.children}</View>
}

export function AccountSendPanel (props) {
  return <View style={styles.accountSendPanel}>{props.children}</View>
}

export function AccountScanPanel (props) {
  return <View style={styles.accountScan}>{props.children}</View>
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
      tintColor={AppConstants.ICON_BUTTON_COLOR}
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

  share = address => {
    Share.share(
      {
        message: address,
        title: 'ndau address',
        url: '/'
      },
      {
        dialogTitle: 'ndau address'
      }
    )
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
            justifyContent: 'space-between'
          }}
        >
          <View>
            <P style={styles.addressCopyPanelText}>{truncatedAddress}</P>
          </View>
          <View>
            <Button
              style={styles.addressShareButton}
              textStyle={styles.addressButtonText}
              uppercase={false}
              onPress={() => this.share(props.address)}
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
