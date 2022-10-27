import {fal} from '@fortawesome/pro-light-svg-icons';
import {on} from 'events';
import {useFocusEffect} from '@react-navigation/native';
import {Socket} from '../utils/WalletConnectUtil';
import SessionBloc from '../blocs/SessionBloc';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  Platform,
  Image,
  TouchableOpacity,
  Button,
  TextInput,
  ImageBackground,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {RNCamera, onGoogleVisionBarcodesDetected} from 'react-native-camera';
import Modal from 'react-native-modal';
import {useNavigation} from '@react-navigation/native';
import {useCamera} from 'react-native-camera-hooks';
import {signClient} from '../utils/WalletConnectUtil';
import {Appbar, Searchbar, Card} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Console} from 'console';
export default function ScanQR({route}) {
  console.log(route.params?.account?.address);
  const [barcodes, setBarcodes] = useState('');
  const [pairValue, setPairValue] = useState('');
  const [scan, setScan] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigation = useNavigation();
  function onSessionProposal(event) {
    console.log(event, 'event...1');
  }
  const cameraRef = useRef(null);
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center', elevation: 0}}
    />
  );
  async function onPair(_barcodes) {
    if (scan) {
      try {
        // console.log('if............', _barcodes.data);
        let socketId;
        async function getIdWithRetry() {
          setTimeout(() => {
            console.log('getting socket id');
            socketId = Socket.id;
            console.log('socket id', socketId);
            if (socketId) {
              console.log(_barcodes, 'barcodes');
              console.log(_barcodes.data, 'barcodes.data');
              // console.log(
              //   socketId,
              //   'socketID is defined',
              //   JSON.parse(barcodes.data),
              // );
              SessionBloc.setSocketLogin(_barcodes.data, socketId);
              SessionBloc.setAccountAddress(route.params?.account?.address);
              SessionBloc.setPurposalModal(true);
              return;
            } else {
              getIdWithRetry();
            }
          }, 100);
        }
        let finalValue = getIdWithRetry();
        // Socket.on('confirm_wallet_login', data => {
        //   console.log('confirm....', data);
        // });
        console.log('final Value is ' + finalValue);
        // let data = await signClient.pair({
        //   uri: barcodes.data,
        // });
        // console.log('data', data);
        setBarcodes('');
        onClose();
      } catch (e) {
        console.log('error', e);
        setError('');
      }
    } else {
      try {
        setPairValue('');
        console.log('data', data);
        onClose();
      } catch (e) {
        console.log('error', e);
        setError('Invalid URL');
      }
    }
  }
  const barcodeRecognized = barcodes => {
    console.log('barcodes', barcodes);
    setBarcodes(barcodes);
    if (barcodes) {
      onPair(barcodes);
      // this.setState({
      //     modelVisible:true
      // })
    }
  };
  const onClose = () => {
    navigation.goBack();
  };
  const onScanQr = () => {
    setScan(true);
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
    <View style={{flex: 1, backgroundColor: '#47515B'}}>
      <Appbar.Header style={{backgroundColor: '#47515B', elevation: 0}}>
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
              backgroundColor: '#47515B',
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
              {scan ? (
                <RNCamera
                  ref={cameraRef}
                  onCameraReady={e => {
                    console.log('ready', e);
                  }}
                  style={{
                    position: 'absolute',
                    // maxHeight: 140,
                    top: Platform.OS == 'ios' ? 0 : hp('9%'),
                    opacity: loading ? 0 : 1,
                    height: Platform.OS == 'ios' ? hp('45%') : hp('10%'),
                    // maxWidth: 150,
                    alignItems: 'center',
                    width: hp('45%'),
                  }}
                  captureAudio={false}
                  onBarCodeRead={barcodeRecognized}></RNCamera>
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
                  backgroundColor: '#47515B',
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
            {/* </ImageBackground> */}
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
              <Text style={{color: '#D8FFE4'}}>Scan QR</Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              backgroundColor: '#47515B',
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
              placeholder="Enter Wc:..."
              style={{
                backgroundColor: '#fff',
                width: '85%',
                height: '20%',
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
                setPairValue(e), setError(''), setScan(false);
              }}
            />
            <TouchableOpacity
              disabled={scan}
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