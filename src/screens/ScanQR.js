// import React,{useState,useRef} from 'react'
// import { Button, Text, TextInput, View } from 'react-native'

// import { signClient } from '../utils/WalletConnectUtil'

// export default function WalletView() {
//   const [pairValue, setPairValue] = useState('')
//   const inputRef = useRef(null);

//   async function onPair() {
//     try{
//       await signClient.pair({ uri: pairValue })

//       setPairValue('');
//     }catch(e){console.log('error',e)}

//   }

//   return (
//     <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center',backgroundColor:'#181F28' }}>
//       <Text>Pair</Text>
//       <RNCamera
// style={{height:300,width:200}}
// // torchMode={this.state.torchOn ? Camera.constants.TorchMode.on : Camera.constants.TorchMode.off}

// ref={inputRef}
// ></RNCamera>
//       <TextInput placeholder='Enter Wc:...' style={{backgroundColor:'#fff',height:100,width:'100%'}} value={pairValue} onChangeText={setPairValue} />
//       <View style={{marginTop: 20,}}></View>
//       <Button title="Pair"  onPress={onPair} />
//     </View>
//   )
// }

import {fal} from '@fortawesome/pro-light-svg-icons';
import {on} from 'events';
import {useFocusEffect} from '@react-navigation/native';
import {createSignClient, Socket} from '../utils/WalletConnectUtil';
import SessionBloc from '../blocs/SessionBloc';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';

import {
  Camera,
  useCameraDevices,
  useIsAppForeground,
} from 'react-native-vision-camera';
import {BarcodeFormat, useScanBarcodes} from 'vision-camera-code-scanner';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Searchbar, Card} from 'react-native-paper';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function ScanQR({route}) {
  console.log('abc.................', route.params?.account?.address);
  const [pairValue, setPairValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const cameraRef = useRef(null);
  const devices = useCameraDevices();
  const device = devices.back;
  // const isAppForeground = useIsAppForeground()
  const [hasPermission, setHasPermission] = useState(false);
  const [isScanned, setIsScanned] = React.useState(false);

  const [frameProcessor, barcodes] = useScanBarcodes([BarcodeFormat.QR_CODE], {
    checkInverted: true,
  });

  useEffect(() => {
    (async () => {
      const status = await Camera.requestCameraPermission();
      switch (status) {
        case 'authorized':
          setHasPermission(true);
          break;
        case 'not-determined':
          const status = await Camera.requestCameraPermission();
          setHasPermission(status == 'authorized');
        default:
      }
    })();
  }, []);

  React.useEffect(() => {
    onPair();
    // return () => {
    //   barcodes;
    // };
  }, [barcodes]);

  function onSessionProposal(event) {
    console.log(event, 'event...1');
    // SessionBloc.setProposal(JSON.stringify(event))
    // console.log('event..',event)
    // SessionBloc.setNavigation(navigation)
    // SessionBloc.setPurposalModal(true)

    // navigation.navigate({ name: 'SessionProposal', params: {} })
  }

  // useEffect(() => {
  //   signClient.on('session_proposal', onSessionProposal)
  //   // signClient.on('session_request', onSessionRequest)
  //   // signClient.on('session_ping', data => console.log('ping', data))
  //   // signClient.on('session_event', data => console.log('event', data))
  //   // signClient.on('session_update', data => console.log('update', data))
  //   // signClient.on('session_delete', data => console.log('delete', data))
  //   return () => {
  //     signClient.removeListener('session_proposal', onSessionProposal);
  //     // signClient.removeListener('session_request', onSessionRequest)
  //     // TODOs

  //   }
  // }, [])
  // const [first, setfirst] = useState(second)
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center', elevation: 0}}
    />
  );

  async function onPair() {
    if (barcodes && barcodes.length > 0 && isScanned === false) {
      try {
        const loginData = JSON.parse(barcodes[0].content.data);
        const {website_socket_id, website_url, request} = loginData;
        if (!website_socket_id || !website_url || request !== 'login') {
          setIsScanned(false);
          setError('Invalid QR code');
        } else {
          try {
            await createSignClient(
              route.params?.account?.address,
              barcodes[0].content.data,
            );
            setIsScanned(true);
            onClose();
          } catch (e) {
            console.log('error', e);
            setIsScanned(false);
          }
        }
      } catch (e) {
        setIsScanned(false);
        setError('Invalid QR code format');
      }

      // Socket.on('confirm_wallet_login', data => {
      //   console.log('confirm....', data);
      // });
      // console.log('final Value is ', finalValue);
      // let data = await signClient.pair({
      //   uri: barcodes.data,
      // });
    }
  }

  const onClose = () => {
    navigation.goBack();
  };

  const onScanQr = () => {
    setIsScanned(false);
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 900);
  };

  const onConnect = () => {
    if (pairValue.length == 0) {
      setError('Please Enter Input valid url');
      // setError('Incorrect Input')
    } else {
      onPair();
    }
  };

  console.log('status', loading);
  return (
    <View style={{flex: 1, backgroundColor: '#47515b'}}>
      <Appbar.Header style={{backgroundColor: '#47515b', elevation: 0}}>
        <ContentTitle title={'Wallet Connect'} style={{color: 'white'}} />
        <TouchableOpacity
          onPress={() => {
            onClose();
          }}
          style={{padding: '1%', right: '2%', position: 'absolute'}}>
          <Icon size={34} name="times" color={'#fff'} />
        </TouchableOpacity>
      </Appbar.Header>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#47515b',
              height: hp('60%'),
              alignItems: 'center',
              // justifyContent: 'space-evenly',
            }}>
            {/* <Text style={{color: '#9F9F9F', fontSize: 18}}>
              Scan QR code to connect
            </Text> */}

            {/* <ImageBackground source={require('../../img/border.png')} style={{height:'20%',width:'100%',backgroundColor:'red',alignItems:'center',resizeMode:'cover'}}> */}
            <View
              style={{
                height: hp('10%'),
                marginVertical: hp('5%'),
                width: wp('10%'),
                alignItems: 'center',
              }}>
              {!isScanned && device && hasPermission ? (
                <Camera
                  ref={cameraRef}
                  style={{
                    position: 'absolute',
                    // maxHeight: 140,
                    // top: hp('9%'),
                    opacity: loading ? 0 : 1,
                    height: hp('45%'),

                    // maxWidth: 150,
                    alignItems: 'center',
                    width: hp('45%'),
                  }}
                  device={device}
                  isActive={true}
                  frameProcessor={frameProcessor}
                  frameProcessorFps={5}
                  audio={false}
                  //isActive={isAppForeground}
                />
              ) : (
                <View
                  style={{
                    backgroundColor: 'black',
                    position: 'absolute',
                    // maxHeight: 140,
                    // top:hp('8.2%'),

                    height: hp('45%'),

                    // maxWidth: 150,
                    alignItems: 'center',
                    width: hp('45%'),
                  }}></View>
              )}
              {loading && (
                <ActivityIndicator
                  color={'#4C9578'}
                  style={{position: 'absolute', top: hp('10%')}}
                  size={35}
                />
              )}
              <View
                style={{
                  height: hp('7%'),
                  width: wp('100%'),
                  top: hp('-7%'),
                  position: 'absolute',
                  backgroundColor: '#47515b',
                }}></View>

              <Image
                style={{
                  height: hp('45%'),

                  width: hp('45%'),
                  // top:100,
                  resizeMode: 'contain',
                }}
                source={require('../../img/border.png')}
              />
            </View>

            {isScanned && (
              <TouchableOpacity
                onPress={() => onScanQr()}
                style={{
                  backgroundColor: '#4C9578',
                  padding: '2%',
                  marginTop: hp('35%'),
                  width: wp('50%'),
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#D8FFE4'}}>Rescan</Text>
              </TouchableOpacity>
            )}
          </View>
          <View
            style={{
              backgroundColor: '#47515b',
              height: hp('30%'),
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            {/* <View> */}
            <Text style={{color: '#9F9F9F', fontSize: 18, paddingBottom: '4%'}}>
              Or use wallet connect url
            </Text>

            <TextInput
              placeholderTextColor={'#FFFFFF'}
              placeholder="Enter WC:..."
              style={{
                backgroundColor: '#fff',
                width: '85%',
                borderColor: '#395470',
                backgroundColor: '#1A283A',
                borderRadius: 10,
                fontSize: 13,
                color: '#fff',
                paddingHorizontal: '4%',
                borderWidth: 1,
              }}
              value={pairValue}
              onChangeText={e => {
                setPairValue(e), setError(''), setIsScanned(true);
              }}
            />
            <TouchableOpacity
              disabled={!isScanned}
              onPress={() => {
                onConnect();
              }}
              style={{
                position: 'absolute',
                backgroundColor: '#4C9578',
                padding: '2%',
                right: '9%',
                borderRadius: 6,
                top: '51%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={{color: '#D8FFE4'}}>Connect</Text>
            </TouchableOpacity>
            <Text
              style={{
                position: 'absolute',
                bottom: hp('6%'),
                left: wp('8%'),
                color: 'red',
              }}>
              {error}
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* <TextInput placeholder='Enter Wc:...' style={{backgroundColor:'#fff',height:100,width:'100%'}} value={pairValue} onChangeText={setPairValue} />
      <View style={{marginTop: 20,}}></View>
      <Button title="Pair"  onPress={onPair} /> */}
      {/* { barcodes&& <View>
      
      <Text style={{fontWeight:'bold',color:'#fff'}}>Data:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.data?barcodes.data:''}</Text>
                <Text style={{fontWeight:'bold',color:'#fff'}}>RawData:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.rawData?barcodes.rawData:''}</Text>
                <Text style={{fontWeight:'bold',color:'#fff'}}>Type:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.type?barcodes.type:''}</Text>

      </View>} */}
      {/* <Image style={{ height:hp('100%'),position:'absolute',width:('100%'),resizeMode:'contain'}} source={require('../../img/scan.gif')}/> */}
    </View>
  );
}
