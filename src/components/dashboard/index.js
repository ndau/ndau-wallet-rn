import React from 'react'
import { View, TouchableOpacity } from 'react-native'
import { H4, P } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'
import styles from './styles'
import AppConstants from '../../AppConstants'

export function DashboardLabel (props) {
  return (
    <P style={[styles.dashboardLabelText]} {...props}>
      {props.children}
    </P>
  )
}

export function DashboardContainer (props) {
  return <View style={styles.dashboardContainer}>{props.children}</View>
}

export function DashboardPanel (props) {
  console.log('testing')
  return (
    <View style={styles.dashboardPanel}>
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1.0]}
        colors={['#0F2748', '#293E63']}
        style={[styles.opaqueOverlay]}
      >
        <View style={styles.dashboardActionPanels}>
          <View style={styles.dashboardWalletName}>
            <FontAwesome5Pro
              name='wallet'
              size={36}
              color={AppConstants.ICON_BUTTON_COLOR}
              style={styles.dashboardWallet}
              light
            />
            <H4 style={styles.dashboardActionTextPanel}>{props.walletName}</H4>
          </View>
          <View style={styles.dashboardActionPanel}>
            <TouchableOpacity {...props}>
              <FontAwesome5Pro
                name='angle-right'
                size={48}
                color={AppConstants.ICON_BUTTON_COLOR}
                style={styles.dashboardAngle}
                light
              />
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>
    </View>
  )
}

export function DashboardLabelWithIcon (props) {
  let greenFont = {}
  if (props.greenFont) {
    greenFont = styles.walletOverviewGreenFont
  }
  return (
    <View style={[styles.dashboardLabelWithIconContainer, props.style]}>
      <P style={[styles.dashboardLabelTextWithIcon, greenFont]}>
        {props.children}
      </P>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={24}
          name={props.fontAwesomeIconName}
          color={AppConstants.ICON_BUTTON_COLOR}
          light
        />
      </TouchableOpacity>
    </View>
  )
}

export function WalletOverviewSpendable (props) {
  return (
    <View style={[styles.walletOverviewLabelWithIconContainer, props.style]}>
      <P style={[styles.dashboardLabelTextWithIcon]}>{props.children}</P>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={24}
          name='info-circle'
          color={AppConstants.ICON_BUTTON_COLOR}
          light
        />
      </TouchableOpacity>
    </View>
  )
}
