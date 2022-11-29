import {Modal, Portal, Provider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSnapshot} from 'valtio';
import {BlurView} from '@react-native-community/blur';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ImageBackground,
  FlatList,
} from 'react-native';
import {Socket} from '../../utils/WalletConnectUtil';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import SessionBloc from '../../blocs/SessionBloc';
// import VectorIcon from 'react-native-vector-icons/Feather';
// import CollapsibleBar from './CollapsibleBar';

const ErrorModal = () => {
  const [checked, setchecked] = useState(true);
  const {proposal, alertPopup} = useSnapshot(SessionBloc.state);
  // const data = JSON.parse(proposal);
  // console.log('data....', data);

  return (
    <Portal>
      {/* <ImageBackground  style={{backgroundColor:'white',flexGrow:1,justifyContent:'center',shadowOpacity:0,borderRadius:30}} source={require('../../../img/bg.png')}> */}
      <View
        style={{
          flex: 1,
          alignItems: 'center',
          paddingLeft: 1,
          justifyContent: 'center',
          margin: 0,
        }}>
        <Modal
          visible={alertPopup}
          onDismiss={() => {
            SessionBloc.setAlertPopup(false);
          }}
          contentContainerStyle={styles.modal}>
          <View style={{flex: 1, paddingHorizontal: '2%'}}>
            {/* <ScrollView> */}

            <Text
              style={{
                color: '#fff',
                marginTop: '5%',
                fontWeight: 'bold',
                textAlign: 'center',
                fontSize: 22,
              }}>
              Alert Proposal
            </Text>

            {/* <View
            style={{
              flexDirection: 'row',
              paddingTop: '4%',
              alignItems: 'center',
              justifyContent: 'space-around',
              borderBottomWidth: 1,
              paddingBottom: '4%',
              borderBottomColor: 'grey',
            }}>
            <View style={styles.circle}></View>
            <Text style={styles.urlText}>
              https://react-app.walletconnect.com
            </Text>
          </View> */}
            <View style={{marginVertical: '6%', alignItems: 'center'}}>
              <Icon name="error-outline" size={90} color="#fff" />

              <Text
                style={{
                  color: '#fff',
                  textAlign: 'center',
                  marginTop: '5%',
                  fontWeight: 'bold',
                  fontSize: 18,
                }}>
                Youu have already voted for this proposal.
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => {
                SessionBloc.setAlertPopup(false);
              }}
              style={{
                alignSelf: 'center',
                width: '40%',
                marginTop: '10%',
                borderRadius: 5,
                height: '20%',
                padding: '3%',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  color: '#fff',
                  height: 30,
                  fontSize: 20,
                  fontWeight: '600',
                }}>
                OK
              </Text>
            </TouchableOpacity>
          </View>
          {/* </ScrollView> */}
        </Modal>
        {/* </ImageBackground> */}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    // flex: 1,
    height: '50%',
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: '2%',
    marginHorizontal: '3%',
    // borderBottomEndRadius: 0,
    // borderBottomRightRadius: 0,
    // borderBottomLeftRadius: 0,
    backgroundColor: '#1A283A',
    flexDirection: 'column',
    // alignItems: 'flex-start',
  },
  circle: {
    height: 50,
    width: 50,
    backgroundColor: 'grey',
    borderRadius: 50,
  },
  urlText: {color: 'white', fontSize: 16, textDecorationLine: 'underline'},
  btnContainer: {
    bottom: '3%',
    flexDirection: 'row',
    width: '80%',
    height: '7%',
    // right: '-2%',
    alignSelf: 'center',
    // alignItems: 'flex-end',
    justifyContent: 'space-around',
  },
});
export default ErrorModal;
