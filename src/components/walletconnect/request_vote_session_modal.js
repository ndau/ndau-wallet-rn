import {NativeModules} from 'react-native';
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
  Image,
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
import TxSignPrep from '../../model/TxSignPrep';

const VotingModal = () => {
  const [checked, setchecked] = useState(true);
  const {
    proposal,
    accountAddress: wallet_address,
    accountPublicKey,
    accountPrivateKey,
  } = useSnapshot(SessionBloc.state);

  const data = JSON.parse(proposal);
  const {
    proposal_id,
    voting_option_id,
    proposal_heading,
    voting_option_heading,
  } = data;
  console.log('data....', data);

  const app_socket_id = Socket?.id;
  const wallet = WalletStore.getWallet();

  const onReject = async () => {
    try {
      data.is_approved = 'true';
      data.app_socket_id = app_socket_id;
      data.wallet_address = wallet_address;
      Socket.emit('app-create_vote-rejected-server', data);
      //TODO: We will change the name of this event
      // Socket.emit('app-create_vote-fulfilled-server', data);
      console.log('Reject sucessfully', data);
      SessionBloc.setVotingRequestlModal(false);
      // if (proposal) {
      //   await signClient.reject({
      //     id: data.id,
      //     reason: getSdkError('USER_REJECTED_METHODS'),
      //   });
      // }
      // SessionBloc.setPurposalModal(false);
    } catch (e) {
      // console.log('reject error', e);
      // SessionBloc.setPurposalModal(false);
    }

    // ModalStore.close()
  };

  const onApprove = async () => {
    try {
      const ballot = JSON.stringify({
        vote: 'yes',
        proposal: {
          proposal_id,
          proposal_heading,
          voting_option_id,
          voting_option_heading,
        },
        pubkey: accountPublicKey,
      });
      const preparedTransaction = new TxSignPrep().prepare(ballot);
      const base64EncodedPrepTx = preparedTransaction.b64encode();
      console.log('base64EncodedPrepTx', base64EncodedPrepTx);
      // Get the signature to use in the transaction
      const signature = await NativeModules.KeyaddrManager.sign(
        accountPrivateKey,
        base64EncodedPrepTx,
      );
      console.log('signature', signature);

      const wallet = WalletStore.getWallet();
      data.is_approved = 'true';

      // Socket.emit('app-create_vote-confirmed-server', data);

      Socket.emit('appCreateVoteConfirmedServer', {
        app_socket_id,
        proposal_id,
        voting_option_id,
        proposal_heading,
        voting_option_heading,
        wallet_address,
        ballot,
        signature,
      });
      console.log('Approved sucessfully', {});
      SessionBloc.setVotingRequestlModal(false);
      //   SessionBloc.setVotingRequestlModal(false);
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
      //   SessionBloc.setPurposalModal(false);
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
      SessionBloc.setVotingRequestlModal(false);
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
                Voting Purposal
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
                  Review {'Voting'} Permission
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
                    {'Purposal Heading::'}{' '}
                    <Text style={{fontSize: 15}}>
                      {data && data.proposal_heading}
                    </Text>
                  </Text>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      Purposal ID::{data && data.proposal_id}
                    </Text>

                    {/* { data.params?.requiredNamespaces[key]?.methods&& data?.params?.requiredNamespaces[key]?.methods.lenght !=0 ? data.params.requiredNamespaces[key].methods.map(e=>{
                  return <Text style={{color:"#fff"}}>{e}</Text>
  }):<Text>-</Text>} */}
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      voting_option_headng::{' '}
                      {data && data.voting_option_heading}
                    </Text>

                    {/* { data.params?.requiredNamespaces[key]?.events&& data.params?.requiredNamespaces[key]?.events.lenght !=0 ? data.params.requiredNamespaces[key].events.map(e=>{
                  return <Text style={{color:"#fff"}}>{e}</Text>
  }):null} */}
                    {/* <Text>eth_sendTransaction, eth_signTransaction,</Text> */}
                    {/* <Text>eth_sendTransaction, eth_signTransaction,</Text> */}
                  </View>
                  <View style={{marginTop: '2%'}}>
                    <Text
                      style={{
                        color: '#fff',
                        fontWeight: 'bold',
                        fontSize: 18,
                      }}>
                      voting_option_id:: {data && data.voting_option_id}
                    </Text>

                    {/* { data.params?.requiredNamespaces[key]?.events&& data.params?.requiredNamespaces[key]?.events.lenght !=0 ? data.params.requiredNamespaces[key].events.map(e=>{
                  return <Text style={{color:"#fff"}}>{e}</Text>
  }):null} */}
                    {/* <Text>eth_sendTransaction, eth_signTransaction,</Text> */}
                    {/* <Text>eth_sendTransaction, eth_signTransaction,</Text> */}
                  </View>
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
          </Modal>
        </BlurView>
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
export default VotingModal;
