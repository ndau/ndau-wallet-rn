import { fal } from '@fortawesome/pro-light-svg-icons';
import React, { Component } from 'react'
import { View ,Text,Image,TouchableOpacity} from 'react-native'
import { RNCamera,onGoogleVisionBarcodesDetected } from 'react-native-camera';
import Modal from "react-native-modal";

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp
  } from 'react-native-responsive-screen'
export default class ScanQR extends Component {
    constructor(props)
    {
        super(props)
        this.state={
            modelVisible:false,
            barcodes:''
        }
    }
    barcodeRecognized = ( barcodes ) => {
     console.log('barcodes',barcodes);
     this.setState({
        barcodes:barcodes,
     })

     if(barcodes)
     {
        console.log('bar code true')
        this.setState({
            modelVisible:true
        })
     }
      }

      hideModel=()=>{
        this.setState({
            modelVisible:true

        },()=>{
            this.props.navigation.goBack();
        })
      }
    //   componentDidMount()
    //   {
    //     console.log('Qr SCAN')
    //   }

       WrapperComponent=()=> {
        let {barcodes}=this.state;
        return (
          <View>
            <Modal isVisible={this.state.modelVisible}>
              <View style={{alignItems:'center', height:hp('50%'),borderRadius:wp('10%'),padding:wp('10%'),backgroundColor:'white'}}>
                <Text style={{fontWeight:'bold',fontSize:20}}>Your QR Code Data</Text>
                <Text style={{fontWeight:'bold'}}>Data:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.data?barcodes.data:''}</Text>
                <Text style={{fontWeight:'bold'}}>RawData:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.rawData?barcodes.rawData:''}</Text>
                <Text style={{fontWeight:'bold'}}>Type:  <Text style={{fontWeight:'400'}}></Text>{barcodes&&barcodes.type?barcodes.type:''}</Text>

                <TouchableOpacity onPress={()=>{
                    this.hideModel()
                }} style={{alignItems:'center', backgroundColor:'green',padding:wp('3%'),width:wp('50%'),borderRadius:wp('5%'),bottom:hp('5%'),alignSelf:'center',position:'absolute'}}>
            <Text style={{color:'white'}}>Ok</Text>
                </TouchableOpacity>
              </View>
            </Modal>
          </View>
        );
      }

  render() {
    return (
      <View style={{flex:1}}>
        <RNCamera
         ref={ref => {
            this.camera = ref;
          }}
          style={{
            flex: 1,
            width: '100%',
            height:100,
            
          }}
          onBarCodeRead={this.barcodeRecognized}
        >
        </RNCamera>
        <Image style={{ height:hp('100%'),position:'absolute',width:('100%'),resizeMode:'contain'}} source={require('../../img/scan.gif')}/>
        <this.WrapperComponent/>
      </View>
    )
  }
}
