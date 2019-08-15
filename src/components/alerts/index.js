import React, { useState } from 'react'
import Modal from 'react-native-modal'
import { Text, Button, View, Dimensions } from 'react-native'
import AppConfig from '../../AppConfig'
import { ModalTextLink } from '../../components/common'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'

export function FeeAlert (props) {
  return (
    <Modal isVisible={props.isVisible}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          shadowOpacity: 0.24,
          borderRadius: 12,
          elevation: 4,
          shadowOffset: {
            height: 4,
            width: 2
          },
          paddingTop: hp('3%'),
          paddingLeft: hp('3%'),
          paddingRight: hp('3%'),
          paddingBottom: hp('2%')
        }}
      >
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <Text
            style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: '1%' }}
          >
            {props.title}
          </Text>
          <Text style={{ textAlign: 'center' }}>{props.message}</Text>
          {props.fees.map((item, index) => {
            return (
              <Text
                key={index}
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  paddingTop: hp('2%')
                }}
              >
                {item}
              </Text>
            )
          })}
          {props.postMessage ? (
            <Text style={{ paddingTop: hp('2%'), textAlign: 'center' }}>
              {props.postMessage}
            </Text>
          ) : null}
          {props.fees && props.fees.length > 0 ? (
            <ModalTextLink url={AppConfig.TRANSACTION_FEE_KNOWLEDGEBASE_URL}>
              Read more about fees...
            </ModalTextLink>
          ) : null}
        </View>
        <View style={{ paddingTop: hp('2%') }}>
          {props.confirm ? (
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-evenly'
              }}
            >
              <Button
                onPress={() => props.setVisibleHandler(false)}
                title='Cancel'
              />
              <Button
                onPress={() => {
                  props.setVisibleHandler(false)
                  props.confirm()
                }}
                title='Confirm'
              />
            </View>
          ) : (
            <Button
              onPress={() => props.setVisibleHandler(false)}
              title='I understand'
            />
          )}
        </View>
      </View>
    </Modal>
  )
}

export function CustomOneButtonAlert (props) {
  return (
    <Modal isVisible={props.isVisible}>
      <View
        style={{
          backgroundColor: 'white',
          width: '100%',
          shadowOpacity: 0.24,
          borderRadius: 12,
          elevation: 4,
          shadowOffset: {
            height: 4,
            width: 2
          },
          paddingTop: hp('3%'),
          paddingLeft: hp('3%'),
          paddingRight: hp('3%'),
          paddingBottom: hp('2%')
        }}
      >
        <View
          style={{
            flexGrow: 1,
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          {props.title ? (
            <Text
              style={{ fontWeight: 'bold', fontSize: 16, paddingBottom: '1%' }}
            >
              {props.title}
            </Text>
          ) : null}

          <Text style={{ textAlign: 'center' }}>{props.message}</Text>
        </View>
        <View style={{ paddingTop: hp('2%') }}>
          <Button onPress={props.buttonHandler} title={props.buttonTitle} />
        </View>
      </View>
    </Modal>
  )
}
