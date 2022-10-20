import { fal } from '@fortawesome/pro-light-svg-icons';
import { on } from 'events';
import React, { useState,useRef } from 'react'
import { View ,Text,Image,TouchableOpacity,Button,TextInput, ImageBackground, ScrollView} from 'react-native'
import { RNCamera,onGoogleVisionBarcodesDetected } from 'react-native-camera';
import Modal from "react-native-modal";
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-fontawesome-pro'
import { useCamera } from 'react-native-camera-hooks';
import { signClient } from '../utils/WalletConnectUtil';
import {Appbar, Searchbar, Card} from 'react-native-paper';
import LinearGradient from 'react-native-linear-gradient';
import {DrawerActions} from '@react-navigation/native';
import { getSdkError } from '@walletconnect/utils'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
export default function Pairing () {
  const [session,setSession]=useState(null);
  function onSessionDelete(event)
  {
    onDelete()
    console.log('delete the session....',event)
  }
  useFocusEffect(()=>{
    
    console.log('use effect')
  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('Topic')
   setSession(jsonValue);
   console.log('session....',jsonValue)
    } catch(e) {
      console.log('session.... error',e)

      // error reading value
    }
  }
  getData()

  signClient.on('session_delete', onSessionDelete)
  return () => {
  
    signClient.removeListener('session_delete', onSessionDelete)

    // TODOs
 
  }
    // setSession(data)
  },[session])

 const onDelete=async()=>{
  try{
  let data= await signClient.disconnect({ topic:session, reason: getSdkError('USER_DISCONNECTED') })
console.log('data..',data)
try {
  await AsyncStorage.removeItem('Topic')
} catch (e) {
  console.log('delete error....',)
  // saving error
}
  setSession(null)
}catch(e)
{
  setSession(null)
  console.log('error',e)
  try {
    await AsyncStorage.removeItem('Topic')

  } catch (e) {
    // saving error
  }
}
  
  }
  const navigation = useNavigation();

  // const [first, setfirst] = useState(second)

  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center',elevation:0}}
    />
  );
  async function onPair() {
    try{
    let data=  await signClient.pair({ uri: 'wc:2b69cac3fa51aedea5da09a2f586906d385ce6b2d7a1bb0cf06c6c579c6a3948@2?relay-protocol=irn&symKey=adb2b9c050f2396caef0ed1b25092135b0b065a5e34b30bb0287b57c3e5314e7' })
    console.log('data',data)

    }catch(e){console.log('error',e)}
   
  }
    
  const onClose=()=>{

    navigation.dispatch(DrawerActions.openDrawer())
  }
  

    return (
      <View style={{flex:1,backgroundColor:'#091724'}}>
        
      <Appbar.Header style={{backgroundColor: '#091724',elevation:0}}>
     <Appbar.Action icon="menu" onPress={() => onClose()} />
       
        <ContentTitle title={'Sessions'} style={{color: 'white'}} />
        
      </Appbar.Header>
      {session !=null?(<ScrollView contentContainerStyle={{ flex: 1,alignContent:'center',justifyContent:'space-around' }}>
        {/* <View style={{backgroundColor:'red',flex:1}}><Text>d</Text></View> */}
        <View style={{backgroundColor:'#091724',flex:1,alignItems:'center',marginTop:'2%'}}>

        <LinearGradient start={{x: 0, y: 0}} end={{x: 1, y: 0}} colors={['#091724', '#0D1D2D', '#21395B']} style=   {{
    height:hp('10%'),
    width:wp('95%'),
    paddingHorizontal:'2%',
    paddingRight: 15,
    borderRadius: 5,
   
  }}>
            <View style={{height:hp('10%'),paddingHorizontal:'7%',flexDirection:'row',alignItems:'center',justifyContent:'space-between',width:wp('95%'),borderRadius: wp('2%'),}}>


         <View style={{height:hp('7%'),width:hp('7%'),backgroundColor:'grey',borderRadius:hp('10%')}}></View>
          <Text style={{color:'#fff',fontSize:16}}>react-app....onnect.com</Text>
          <TouchableOpacity style={{padding:'3%',backgroundColor:'rgba(255, 0, 0, 0.3)',borderRadius: 5,}}>
           <Icon
          size={24}
          name='trash-alt'
          color={'rgba(200, 50, 50, 1)'}
          onPress={()=>{onDelete()}}
          type='solid'
        />
        </TouchableOpacity>
        </View>
        </LinearGradient>

     
          {/* <ImageBackground source={require('../../img/border.png')} style={{height:'20%',width:'100%',backgroundColor:'red',alignItems:'center',resizeMode:'cover'}}> */}
      </View>
</ScrollView>):(<View style={{flex:1,backgroundColor:'#091724',alignItems:'center',justifyContent:'center'}}>

<Text style={{fontSize:22,color:'#fff'}}>No Pair Device yet</Text>
</View>)}
        
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
    )
  
}
