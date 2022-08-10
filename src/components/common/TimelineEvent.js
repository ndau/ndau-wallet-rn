import React, { Component } from 'react'
import { View,Text } from 'react-native'
import { formatAccountEvent,convertNapuToNdau } from '../../helpers/format';
import CollapsibleBar from './CollapsibleBar';
export default class TimelineEvent extends Component {
    constructor(props){
        super(props)
        this.state = { active: false }
    }
  render() {

    let {
        key,
        index,
        event,
        previousEvent,selected
    }=this.props

    const { active: activeState } = this.state
    const active = selected || activeState
    const accountEvent = formatAccountEvent(event)
    const { balance, timestamp, transactionHash, blockHeight } = accountEvent

    const formattedPreviousEvent = previousEvent
      ? formatAccountEvent(previousEvent)
      : accountEvent
      // console.log(previousEvent,'/////',formatAccountEvent(previousEvent),'////',accountEvent,'accountEvent////////')
    const napuAmount =
      accountEvent.raw.balance - formattedPreviousEvent.raw.balance

      //  console.log('napuAmount....',napuAmount)
    const ndauAmount = (napuAmount)/100000000;
   
    return (
      <View key={index}>
          <CollapsibleBar
    //   {...props}
      title={timestamp}
      titleRight={''} 
      icon='arrow-up-right-and-arrow-down-left-from-center'
   
    // titleStyleRight={{opacity:0,color:'red'}}
      titleMiddle={`${napuAmount === 0 ? '' : napuAmount < 0 ?'' :'+'}${napuAmount === 0 ? '--' : ndauAmount}`}
    //   style={styles.dashboardTotalPanel}
  
    titleStyleMiddle={{ fontSize: 18 ,color:
        napuAmount === 0
          ? 'rgba(255,255,255, 0.7)'
          : napuAmount < 0
          ? 'rgba(255,0,0,0.7)'
          : 'rgba(0,255,0,0.7)',

          textAlign:'left',
          alignSelf:'flex-start',
          alignItems:'flex-start',
      }}
      titleStyleLeft={[{ fontSize: 18,width:'100%',}]}
      collapsible
      style={{backgroundColor:'#132A47'}
    }
      showOnStart={false}
      iconCollapsed='angle-down'
      iconActive='angle-down'
      iconOpened='angle-up'
    //   tintColor={{''}}
      upperBorder
    >
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Amount:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
          {ndauAmount}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Current balance: :
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
          {balance}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Previous balance::
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
          {formattedPreviousEvent.balance}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Time:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
           {timestamp}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Blocks:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 2,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
         #{blockHeight}
            </Text>
          </View>
    </CollapsibleBar>
      </View>
    )
  }
}
