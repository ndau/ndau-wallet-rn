
import { useNavigation } from '@react-navigation/native'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
// import { SignClientTypes } from '@walletconnect/types'
import React, { useEffect } from 'react'

import SessionBloc from '../blocs/SessionBloc'
import { createSignClient, Socket } from '../utils/WalletConnectUtil'
// import { signClient } from '../utils/WalletConnectUtil'

export default function useSignEventHandler() {
  const navigation = useNavigation<NativeStackNavigationProp<any>>()


  useEffect(() => {
    createSignClient();
    Socket.on('server-ndau_connection-established-app', data => {
      console.log('confirm...1.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', data);
    });
    Socket.on('server-create_vote-request-app', data => {
      console.log('server-create_vote-request-app', data);
      SessionBloc.setVotingProposal(JSON.stringify(data));
      SessionBloc.setVotingRequestlModal(true);

    });
    Socket.on('server-create_vote-failed-app', data => {
      console.log('server-create_vote-failed-app', data);
      SessionBloc.setAlertPopup(true)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);

    });
    Socket.on('server-proposal_reject-request-app', data => {
      console.log('server-proposal_reject-request-app', data);
      SessionBloc.setAppPurposal(data,true,false)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);

    });
    Socket.on('server-proposal_approve-request-app', data => {
      console.log('server-proposal_approve-request-app', data);
      SessionBloc.setAppPurposal(data,true,true)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);

    });
    Socket.on('server-feature_proposal-request-app', data => {
      console.log('server-feature_proposal-request-app', data);
      SessionBloc.setFeaturePurposal(data,true,)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);
    });
    Socket.on('server-add_admin-request-app', data => {
      console.log('server-add_admin-request-app', data);
      SessionBloc.setAdminPurposal(data,true,true)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);
    });
    Socket.on('server-delete_admin-request-app', data => {
      console.log('server-delete_admin-request-app', data);
      SessionBloc.setAdminPurposal(data,true,false)
      // SessionBloc.setVotingProposal(JSON.stringify(data));
      // SessionBloc.setVotingRequestlModal(true);
    });
    

    console.log('data.......return ')

    return () => {
      console.log('data.......return ')
    
   
    }
  }, [])
}
