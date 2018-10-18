import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import QRCode from 'react-native-qrcode';
import ModalDialog from './ModalDialog';
import TabView from '../components/TabView';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import CommonButton from '../components/CommonButton';
import cssStyles from '../css/styles';

const SendView = (props) => {
  const send = () => {
    // TODO: transfer funds 
  };

  return (
    <View>
      {/* TODO: add Send form */}
      <View style={cssStyles.footer}>
        <CommonButton
          title={`send ${props.amount}`}
          onPress={send}
        />
      </View>
    </View>
  );
}

const ReceiveView = (props) => {
  const shareAddress = () => {
    // TODO: access device share feature
  }

  return (
    <View>
      <View>
        <QRCode
          value={props.addresst}
          size={300}
          bgColor='black'
          fgColor='white'
        />
      </View>

      <Text style={styles.text}>
        {props.address}
      </Text>

      <View style={cssStyles.footer}>
        <CommonButton onPress={shareAddress} title="Share address" />
        <CommonButton
          title="Share address" 
          onPress={shareAddress}
          iconProps={{
            name: "share-square",
            color: "#000",
            size: 20,
          }}
        />
      </View>
    </View>
  );
}

class TransactionModalDialog extends Component {
  close = () => {
    this.props.setModalVisible(false);
  };

  render() {
    return (
      <ModalDialog {...this.props}>
        <TabView>
          <ReceiveView />
        </TabView>
      </ModalDialog>
    );
  }
}

var styles = StyleSheet.create({
  text: {
    color: '#000000',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    marginTop: hp('1%'),
    marginBottom: hp('1%'),
    marginLeft: wp('1%'),
    marginRight: wp('1%')
  }
});

export default TransactionModalDialog;