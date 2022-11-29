import React, { Component } from 'react'
import { View,Text, ScrollView } from 'react-native'
import TimelineEvent from './TimelineEvent';

export default class ShowHistory extends Component {
    constructor(props)
    {
        super(props);
        this.state={

        }
    }
  render() {
     let {data,lastPreviousEvent}=this.props;
    //  console.log('lastPreviousEvent',lastPreviousEvent)
    return (
        <ScrollView style={{flex:1}}>
        {data.map((event, index, currentPageEventsArr) => {
            let previousEventVal = currentPageEventsArr[index + 1];
  
            if (index === currentPageEventsArr.length - 1) {
              previousEventVal = lastPreviousEvent;
            }
            return (

              <TimelineEvent
                key={JSON.stringify(event) + index}
                index={index}
                event={event}
                previousEvent={previousEventVal}
              />
            );
          })}
     </ScrollView>
    )
  }
}
