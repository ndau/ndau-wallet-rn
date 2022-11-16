import {createSignClient, Socket} from '../utils/WalletConnectUtil';
import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {useNavigation} from '@react-navigation/native';
import {Appbar, Searchbar, Card} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TextInput, NdauQRCodeScanner} from '../components/common';

import KeyMaster from '../helpers/KeyMaster';

export default function ScanQR({route}) {
  const {account, wallet} = route.params;
  const [pairValue, setPairValue] = useState('');
  const [error, setError] = useState('');
  const navigation = useNavigation();

  const [isScanned, setIsScanned] = React.useState(false);

  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center', elevation: 0}}
    />
  );

  console.log('account..........', account);
  async function onPair(barcode) {
    if (barcode && barcode.data) {
      try {
        const loginData = JSON.parse(barcode.data);
        const {website_socket_id, website_url, request} = loginData;
        if (!website_socket_id || !website_url || request !== 'login') {
          setIsScanned(false);
          setError('Invalid QR code');
        } else {
          const walletAccount = wallet.accounts[account.address];

          console.log('walletAccount...', loginData);
          const validationKeys = walletAccount.validationKeys;
          console.log('validationKeys........', validationKeys);
          console.log('wallet.............', wallet);
          // if (!validationKeys || validationKeys.length == 0) {
          //   setError(
          //     'This address is empty. Please select a wallet with ndau balance',
          //   );
          // } else {
          //   const privateKey = KeyMaster.getPrivateKeyFromHash(
          //     wallet,
          //     validationKeys[0],
          //   );
          //   const publicKey = KeyMaster.getPublicKeyFromHash(
          //     wallet,
          //     validationKeys[0],
          //   );
          //   console.log('privateKeyFromHash', privateKey);
          //   console.log('publicKey', publicKey);

          try {
            await createSignClient(
              account,
              // privateKey,
              // publicKey,
              loginData,
            );
            setIsScanned(true);
            onClose();
          } catch (e) {
            console.log('error', e);
            setIsScanned(false);
          }
          // }
        }
      } catch (e) {
        setIsScanned(false);
        setError('Invalid QR code format');
      }
    }
  }

  const onClose = () => {
    navigation.goBack();
  };

  const onConnect = () => {
    if (pairValue.length == 0) {
      setError('Please Enter Input valid url');
      // setError('Incorrect Input')
    } else {
      onPair(pairValue);
    }
  };

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
              height: hp('45%'),
              alignItems: 'center',
              // justifyContent: 'space-evenly',
            }}>
            <NdauQRCodeScanner
              onBarCodeRead={e => {
                console.log('Get back barcode............');
                onPair(e);
              }}
            />
          </View>
          <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
            <View
              style={{
                backgroundColor: '#47515b',
                height: hp('45%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{color: '#9F9F9F', fontSize: 18, paddingBottom: '4%'}}>
                Or use wallet connect url
              </Text>
              <TextInput
                style={{
                  width: '85%',
                }}
                onChangeText={e => {
                  setPairValue(e), setError(''), setIsScanned(true);
                }}
                value={pairValue}
                placeholder="Enter WC:..."
                autoCapitalize="none"
                noBottomMargin
                noSideMargins
              />

              <TouchableOpacity
                disabled={!isScanned}
                onPress={() => {
                  onConnect();
                }}
                style={{
                  backgroundColor: '#4C9578',
                  padding: '2%',
                  width: wp('100%'),
                  borderRadius: 6,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <Text style={{color: '#D8FFE4'}}>Connect</Text>
              </TouchableOpacity>
              <Text
                style={{
                  position: 'absolute',
                  padding: '2%',
                  bottom: hp('6%'),
                  justifyContent: 'center',
                  color: 'red',
                }}>
                {error}
              </Text>
            </View>
          </KeyboardAvoidingView>
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
