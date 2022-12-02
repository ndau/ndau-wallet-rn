import {createSignClient} from '../utils/WalletConnectUtil';
import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  KeyboardAvoidingView,
  Linking,
} from 'react-native';
import Icon from 'react-native-fontawesome-pro';
import {useNavigation} from '@react-navigation/native';
import {Appbar} from 'react-native-paper';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {Button} from 'nachos-ui';
import {
  TextInput,
  NdauQRCodeScanner,
  Label,
  LargeBorderButton,
} from '../components/common';

import KeyMaster from '../helpers/KeyMaster';
import AppConstants from '../AppConstants';

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

  async function onPair(barcode) {
    console.log('.........barcode', barcode);
    if (barcode) {
      if (!barcode.data) {
        setIsScanned(false);
        setError('Wallet connect url is invalid');
      } else {
        try {
          const loginData = JSON.parse(barcode.data);
          const {website_socket_id, website_url, request} = loginData;
          if (!website_socket_id || !website_url || request !== 'login') {
            setIsScanned(false);
            setError('Invalid QR code');
          } else {
            const walletAccount = wallet.accounts[account.address];
            const validationKeys = walletAccount.validationKeys;
            if (!validationKeys || validationKeys.length == 0) {
              setError(
                'This address is empty. Please select a wallet with ndau balance',
              );
            } else {
              const privateKey = KeyMaster.getPrivateKeyFromHash(
                wallet,
                validationKeys[0],
              );
              const publicKey = KeyMaster.getPublicKeyFromHash(
                wallet,
                validationKeys[0],
              );

              try {
                await createSignClient(
                  account,
                  privateKey,
                  publicKey,
                  barcode.data,
                );
                setIsScanned(true);
                goBack();
              } catch (e) {
                console.log('error', e);
                setIsScanned(false);
              }
            }
          }
        } catch (e) {
          setIsScanned(false);
          setError('Invalid QR code format');
        }
      }
    }
  }

  const goBack = () => {
    navigation.goBack();
  };

  const onConnect = () => {
    if (pairValue.length == 0) {
      setError('Please Enter Input valid url');
    } else {
      onPair(pairValue);
    }
  };

  launchWalletConnectGuide = async () => {
    const url = 'https://ndau.io/walletconnect';

    const supported = await Linking.canOpenURL(url);
    if (supported) {
      await Linking.openURL(url);
    } else {
      Alert.alert(
        'Error',
        `Don't know how to open this URL: ${url}`,
        [{text: 'OK', onPress: () => {}}],
        {cancelable: false},
      );
    }
  };

  WalletConnectInfo = props => {
    return (
      <View style={{position: 'absolute', bottom: hp('5%')}}>
        <Button
          style={{
            padding: 0,
            width: wp('92%'),
            height: hp('6%'),
            borderRadius: 4,
            backgroundColor: AppConstants.SQUARE_BUTTON_COLOR,
          }}
          textStyle={{
            color: AppConstants.TEXT_COLOR,
            fontFamily: 'Titillium Web',
            fontSize: 20,
            fontWeight: '600',
          }}
          uppercase={false}
          {...props}>
          {props.children}
        </Button>
      </View>
    );
  };
  return (
    <View style={{flex: 1, backgroundColor: '#47515b'}}>
      <Appbar.Header style={{backgroundColor: '#47515b', elevation: 0}}>
        <Icon
          size={32}
          name="arrow-left"
          color={AppConstants.ICON_BUTTON_COLOR}
          onPress={goBack}
          type="light"
        />
        <ContentTitle title={'Wallet Connect'} style={{color: 'white'}} />
      </Appbar.Header>
      <ScrollView>
        <View style={{flex: 1}}>
          <View
            style={{
              backgroundColor: '#47515b',
              height: hp('45%'),
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}>
            <NdauQRCodeScanner
              onBarCodeRead={e => {
                onPair(e);
              }}
            />
          </View>
          <KeyboardAvoidingView
            keyboardVerticalOffset={Platform.OS === 'ios' ? 100 : -110}
            behavior={Platform.OS === 'ios' ? 'height' : 'position'}>
            <View
              style={{
                backgroundColor: '#47515b',
                height: hp('33%'),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Label
                style={{
                  color: 'white',
                  fontSize: 18,
                  marginTop: hp('13%'),
                  paddingBottom: '2%',
                }}>
                Or use wallet connect url
              </Label>
              <TextInput
                onChangeText={e => {
                  setPairValue(e);
                  setError('');
                  setIsScanned(true);
                }}
                value={pairValue}
                placeholder="wallet connect..."
                autoCapitalize="none"
              />
              <LargeBorderButton
                disabled={!isScanned}
                onPress={() => onConnect()}>
                Connect
              </LargeBorderButton>
              <WalletConnectInfo
                sideMargins
                onPress={() => launchWalletConnectGuide()}>
                What is WalletConnect?
              </WalletConnectInfo>
              <Text
                style={{
                  position: 'absolute',
                  padding: '2%',
                  bottom: '1%',
                  justifyContent: 'center',
                  color: 'red',
                }}>
                {error}
              </Text>
            </View>
          </KeyboardAvoidingView>
        </View>
      </ScrollView>
    </View>
  );
}
