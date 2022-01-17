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
import { View, TouchableOpacity } from 'react-native'
import { H4, P, Button } from 'nachos-ui'
import Icon from 'react-native-fontawesome-pro'
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
  return (
    <TouchableOpacity onPress={props.onPress}>
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
              <Icon
                name='wallet'
                size={36}
                color={AppConstants.ICON_BUTTON_COLOR}
                containerStyle={styles.dashboardWallet}
                type='light'
              />
              <H4 style={styles.dashboardActionTextPanel}>{props.walletName}</H4>
            </View>
            <View style={styles.dashboardActionPanel}>
              <Icon
                  name='angle-right'
                  size={48}
                  color={AppConstants.ICON_BUTTON_COLOR}
                  containerStyle={styles.dashboardAngle}
                  type='light'
                />
            </View>
          </View>
        </LinearGradient>
      </View>
    </TouchableOpacity>
  )
}

export function DashboardLabelWithIcon (props) {
  let greenFont = {}
  if (props.greenFont) {
    greenFont = styles.walletOverviewGreenFont
  }
  return (
    <View style={[styles.dashboardLabelWithIconContainer, props.style]}>
      <P style={[styles.dashboardLabelTextWithIcon, greenFont, props.textStyle]}>
        {props.children}
      </P>
      {props.fontAwesomeIconName ? (
        <TouchableOpacity {...props}>
          <Icon
            size={18}
            name={props.fontAwesomeIconName}
            color={AppConstants.ICON_BUTTON_COLOR}
            type='light'
          />
        </TouchableOpacity>
      ) : null}
    </View>
  )
}

export function DashboardButton (props) {
  return (
    <View style={[styles.dashboardLabelWithIconContainer, { justifyContent: 'flex-end' }]}>
      <Button
        style={styles.dashboardButtonBox}
        textStyle={styles.dashboardButtonText}
        uppercase={false}
        onPress={props.onPress}        
      >
        {props.children}
      </Button>
    </View>
  )
}
