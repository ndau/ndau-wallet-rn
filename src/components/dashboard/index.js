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
import { H4, P } from 'nachos-ui'
import FontAwesome5Pro from 'react-native-vector-icons/FontAwesome5Pro'
import LinearGradient from 'react-native-linear-gradient'

export function DashboardLabel (props) {
  return (
    <P style={[componentStyles.dashboardLabelText]} {...props}>
      {props.children}
    </P>
  )
}

export function DashboardContainer (props) {
  return (
    <View style={componentStyles.dashboardContainer}>{props.children}</View>
  )
}

export function DashboardPanel (props) {
  return (
    <View style={componentStyles.dashboardPanel}>
      <LinearGradient
        useAngle
        angle={135}
        angleCenter={{ x: 0.5, y: 0.5 }}
        locations={[0, 1.0]}
        colors={['#0F2748', '#293E63']}
        style={[componentStyles.opaqueOverlay]}
      >
        <View style={componentStyles.dashboardActionPanels}>
          <H4 style={componentStyles.dashboardActionTextPanel}>
            {props.walletName}
          </H4>
          <View style={componentStyles.dashboardActionPanel}>
            <TouchableOpacity {...props}>
              <FontAwesome5Pro
                name='angle-right'
                size={48}
                color='#4B9176'
                style={componentStyles.dashboardAngle}
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
  return (
    <View style={componentStyles.dashboardLabelWithIconContainer}>
      <P style={[componentStyles.dashboardLabelTextWithIcon]}>
        {props.children}
      </P>
      <TouchableOpacity {...props}>
        <FontAwesome5Pro
          size={24}
          name={props.fontAwesomeIconName}
          color='#4B9176'
          light
        />
      </TouchableOpacity>
    </View>
  )
}
