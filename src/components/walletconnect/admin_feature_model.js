import {Modal, Portal, Provider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {useSnapshot} from 'valtio';
import {BlurView} from '@react-native-community/blur';

import WalletStore from '../../stores/WalletStore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import Icon from 'react-native-vector-icons/dist/Feather';

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

const AdminProposalModal = () => {
  const [checked, setchecked] = useState(true);
  const {
    proposal,
    socketId,
    socketLogin,
    appProposalData,
    adminProposalModel,
    adminData,
    adminApprove,
  } = useSnapshot(SessionBloc.state);
  // const data = JSON.parse(proposal);
  // console.log('data....', data);
  const wallet = WalletStore.getWallet();
  let data = adminData != null ? adminData : '';
  const onReject = async () => {
    try {
      Socket.emit(
        adminApprove
          ? 'app-add_admin-denied-server'
          : 'app-delete_admin-denied-server',
        {
          adminAddress: data.adminAddress,
          app_socket_id: socketId,
        },
      );
      SessionBloc.setAdminProposal('', false, true);

      //   LogStore.log(`Rendering wallet: ${JSON.stringify(wallet)}`);
      // if (proposal) {
      //   await signClient.reject({
      //     id: data.id,DFF
      //     reason: getSdkError('USER_REJECTED_METHODS'),
      //   });
      // }
      // SessionBloc.setProposalModal(false);
    } catch (e) {
      SessionBloc.setAdminProposal('', false, true);
      // console.log('reject error', e);
      // SessionBloc.setProposalModal(false);
    }

    // ModalStore.close()
  };
  const onApprove = async () => {
    try {
      Socket.emit(
        adminApprove
          ? 'app-add_admin-confirmed-server'
          : 'app-delete_admin-confirmed-server',
        {
          adminAddress: data.adminAddress,
          app_socket_id: socketId,
        },
      );
      SessionBloc.setAdminProposal('', false, false);

      console.log('connected sucessfully');
      //   SessionBloc.set(false);
      // if (proposal) {
      //   const namespaces = {};
      //   Object.keys(object1).forEach(key => {
      //     const accounts = [];
      //     const acc = 0x44adc72f98b5046cd07eea87d69f2e4d4eb63165;
      //     object1[key].chains.map(chain => {
      //       if (chain === 'solana:8E9rvCKLFQia2Y35HXjjpWzj8weVo44K') {
      //         accounts.push(
      //           `${chain}:Ea4cP6DgpeZxaJQDBubYMEShQ2i9HjqhTyWQXymp3Na6`,
      //         );
      //       } else {
      //         accounts.push(
      //           `${chain}:0x44Adc72F98B5046cD07Eea87D69f2E4d4eB63165`,
      //         );
      //       }
      //       // selectedAccounts[key].map(acc => accounts.push(`${chain}:${acc}`))
      //     });
      //     console.log('chain ids....', accounts);
      //     namespaces[key] = {
      //       accounts,
      //       methods: object1[key].methods,
      //       events: object1[key].events,
      //     }; // console.log('namespaces',namespaces)
      //   });
      //   const {acknowledged, topic} = await signClient.approve({
      //     id: data.id,
      //     relayProtocol: data.params.relays[0].protocol,
      //     namespaces,
      //   });
      //   await acknowledged();
      //   SessionBloc.setProposalModal(false);
      //   console.log('approved', topic);
      //   try {
      //     await AsyncStorage.setItem('Topic', topic);
      //   } catch (e) {
      //     // saving error
      //   }
      // }
    } catch (e) {
      console.log('approve error', e);
      try {
        await AsyncStorage.clear();
      } catch (e) {
        // saving error
      }
      SessionBloc.setAdminProposal('', false, false);
    }
  };
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
            // onDismiss={hideModal}
            contentContainerStyle={styles.modal}>
            <View style={{flex: 1, marginTop: '-5%', paddingHorizontal: '2%'}}>
              {/* <ScrollView> */}

              <Text
                style={{
                  color: '#fff',
                  marginVertical: '5%',
                  fontWeight: 'bold',
                  textAlign: 'center',
                  fontSize: 22,
                }}>
                Session Proposal
              </Text>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#091724', '#0D1D2D', '#21395B']}
                style={{
                  height: hp('10%'),
                  alignItems: 'center',
                  width: ' 100%',
                  paddingLeft: '3%',
                  // paddingRight: 15,
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
                  <View
                    style={{
                      height: hp('7%'),
                      width: hp('7%'),
                      backgroundColor: 'grey',
                      borderRadius: hp('10%'),
                    }}></View>
                  <Text
                    style={{
                      color: '#fff',
                      paddingHorizontal: '5%',
                      fontSize: 16,
                    }}>
                    react-apponnect.com
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
                  {adminApprove ? 'Add admin ' : 'Delete admin '}
                </Text>

                <View
                  style={{
                    width: '100%',

                    paddingVertical: '5%',
                    paddingHorizontal: '4%',
                    borderRadius: 10,
                    borderColor: 'grey',
                    borderWidth: 3,
                    // elevation:2,
                    marginTop: '7%',
                  }}>
                  <Text
                    style={{
                      color: '#fff',
                      fontWeight: 'bold',
                      fontSize: 18,
                    }}>
                    {'Admin id:'}{' '}
                    <Text style={{fontSize: 15}}>
                      {data && data.adminAddress}
                    </Text>
                  </Text>
                </View>
              </View>
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
              {/* <View style={{height: '34%'}}>
                <ScrollView
                  showsVerticalScrollIndicator={false}
                  scrollEnabled={true}></ScrollView>
              </View>
              <View style={{marginVertical: '6%'}}>
                <Text style={{color: '#fff', fontWeight: 'bold', fontSize: 18}}>
                  Account
                </Text>
                <View
                  style={{
                    borderColor: 'grey',
                    flexDirection: 'row',
                    alignItems: 'center',
                    borderWidth: 3,
                    borderRadius: 5,
                    marginTop: '3%',
                    paddingVertical: '4%',
                    paddingHorizontal: '4%',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      // toggleCheck();
                    }}>
                    <View
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        borderColor: 'grey',
                        backgroundColor: 'rgba(255, 255, 255, 0.19)',
                        height: hp('3.5%'),
                        width: wp('6.5%'),
                        borderRadius: 4,
                      }}>
                      {checked ? (
                        <Icon
                          name="check"
                          size={24}
                          color="#fff"
                          style={{marginRight: '4%'}}
                        />
                      ) : null}
                    </View>
                  </TouchableOpacity>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: '#fff',
                      fontSize: 16,
                      marginLeft: wp('20%'),
                      width: '70%',
                    }}>
                    {Object.keys(wallet.accounts)[0]}
                  </Text>
                </View>
              </View> */}
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
                  disabled={!checked}
                  style={{
                    backgroundColor: checked
                      ? 'green'
                      : 'rgba(76, 149, 120, 1)',
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
            {/* </ScrollView> */}
          </Modal>
        </BlurView>
        {/* </ImageBackground> */}
      </View>
    </Portal>
  );
};

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    // alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    padding: '2%',

    borderBottomEndRadius: 0,
    borderBottomRightRadius: 0,
    borderBottomLeftRadius: 0,
    backgroundColor: 'transparent',
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
export default AdminProposalModal;
