import {NativeModules} from 'react-native';
import {Modal, Portal} from 'react-native-paper';
import React, {useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSnapshot} from 'valtio';
import {BlurView} from '@react-native-community/blur';

import {Text, View, StyleSheet, TouchableOpacity, Image} from 'react-native';
import {Socket} from '../../utils/WalletConnectUtil';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SessionBloc from '../../blocs/SessionBloc';

const GenericSignTextModal = () => {
  const {
    textSigningData,
    accountAddress,
    accountPrivateKey,
  } = useSnapshot(SessionBloc.state);

  const data = typeof textSigningData === 'string' ? JSON.parse(textSigningData) : textSigningData;

  const {
    text: base64Text,
    messageId,
    description = '',
  } = data;

  const decodedText = atob(base64Text);
  const app_socket_id = Socket?.id;

  const onReject = async () => {
    try {
      Socket.emit('app-sign_text-response-server', {
        app_socket_id,
        messageId,
        signed: false,
      });
      console.log('Text signing rejected', {app_socket_id, messageId});
      SessionBloc.setTextSigningModal(false);
    } catch (e) {
      console.log('reject error', e);
      SessionBloc.setTextSigningModal(false);
    }
  };

  const onApprove = async () => {
    try {
      const signature = await NativeModules.KeyaddrManager.sign(
        accountPrivateKey,
        base64Text,
      );
      console.log('signature', signature);

      Socket.emit('app-sign_text-response-server', {
        app_socket_id,
        messageId,
        signed: true,
        signature,
      });
      console.log('Text signing approved', {app_socket_id, messageId, signature});
      SessionBloc.setTextSigningModal(false);
    } catch (e) {
      console.log('approve error', e);
      SessionBloc.setTextSigningModal(false);
    }
  };

  return (
    <Portal>
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingLeft: 1,
          justifyContent: 'center',
          margin: 0,
        }}>
        <BlurView
          style={{
            width: wp('100%'),
            height: hp('100%'),
            marginLeft: 1,
            alignSelf: 'center',
            borderRadius: 30,
            borderWidth: 1,
          }}
          blurType="light"
          blurAmount={10}>
          <Modal
            visible={true}
            contentContainerStyle={styles.modal}>
            <View style={{flex: 1, marginTop: '-5%', paddingHorizontal: '2%'}}>
              <Text
                style={{
                  color: '#fff',
                  marginVertical: '5%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 22,
                }}>
                Sign Text
              </Text>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#091724', '#0D1D2D', '#21395B']}
                style={{
                  height: hp('10%'),
                  alignItems: 'center',
                  width: '100%',
                  paddingLeft: '3%',
                  borderRadius: 5,
                }}>
                <View
                  style={{
                    height: hp('10%'),
                    paddingHorizontal: '4%',
                    flexDirection: 'row',
                    alignItems: 'center',
                    width: wp('95%'),
                    borderRadius: wp('2%'),
                  }}>
                  <Image
                    style={{
                      height: hp('7%'),
                      width: hp('7%'),
                      backgroundColor: 'grey',
                      borderRadius: hp('10%'),
                    }}
                    resizeMode="contain"
                    source={require('img/wallet-connect.png')}
                  />
                  <Text
                    style={{
                      color: '#fff',
                      paddingHorizontal: '5%',
                      fontSize: 16,
                    }}>
                    {'react-apponnect.com'}
                  </Text>
                </View>
              </LinearGradient>
              <View style={{paddingTop: '5%'}}>
                <Text
                  style={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 18,
                  }}>
                  Review Text Signature Request
                </Text>
                {description ? (
                  <View style={{marginTop: '3%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 16,
                      }}>
                      Description:
                    </Text>
                    <Text
                      style={{
                        color: '#fff',
                        fontSize: 14,
                        marginTop: '1%',
                      }}>
                      {description}
                    </Text>
                  </View>
                ) : null}
                <View
                  style={{
                    width: '100%',
                    paddingVertical: '5%',
                    paddingHorizontal: '4%',
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 3,
                    marginTop: '7%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 16,
                    }}>
                    Text to Sign:
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 14,
                      marginTop: '2%',
                    }}>
                    {decodedText}
                  </Text>
                </View>
                <View style={{marginTop: '2%'}}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 14,
                    }}>
                    Message ID: {messageId}
                  </Text>
                </View>
              </View>
              <View style={styles.btnContainer}>
                <TouchableOpacity
                  onPress={() => onReject()}
                  style={{
                    backgroundColor: 'red',
                    width: '40%',
                    borderRadius: 5,
                    padding: '3%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>Reject</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => onApprove()}
                  style={{
                    backgroundColor: 'green',
                    borderRadius: 5,
                    padding: '3%',
                    width: '40%',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text style={{color: '#fff'}}>Approve</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        </BlurView>
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    borderRadius: 30,
    padding: '2%',
    borderBottomEndRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'transparent',
    flexDirection: 'column',
  },
  btnContainer: {
    position: 'absolute',
    bottom: '3%',
    flexDirection: 'row',
    width: '80%',
    height: '7%',
    right: '-2%',
    alignSelf: 'flex-end',
    alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});
export default GenericSignTextModal;