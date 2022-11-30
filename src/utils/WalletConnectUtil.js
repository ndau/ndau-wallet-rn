// import SignClient from '@walletconnect/sign-client'
import React from 'react';
import socketIOClient from 'socket.io-client';
import SessionBloc from '../blocs/SessionBloc';
const ENDPOINT = 'https://dev.backend.bpcdao.ndau.tech/';

export let Socket;

export async function createSignClient(
  account,
  privateKey,
  publicKey,
  barcode,
) {
  Socket = socketIOClient(ENDPOINT);

  Socket.on('connect', data => {
    console.log(data, 'connect event data');
    console.log(Socket.id, 'connect event socket.id');

    SessionBloc.setSocketLogin(barcode, Socket.id);
    SessionBloc.setAccountAddress(account.address);
    SessionBloc.setAccountPrivateKey(privateKey);
    SessionBloc.setAccountPubkicKey(publicKey);

    SessionBloc.setProposalModal(true);
  });

  Socket.on('server-ndau_connection-established-app', data => {
    console.log(
      'confirm...1.>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>',
      data,
    );
  });

  Socket.on('server-create_vote-request-app', data => {
    console.log('server-create_vote-request-app', data);
    SessionBloc.setVotingProposal(JSON.stringify(data));
    SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-create_vote-failed-app', data => {
    console.log('server-create_vote-failed-app', data);
    SessionBloc.setAlertPopup(true);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-proposal_reject-request-app', data => {
    console.log('server-proposal_reject-request-app', data);
    SessionBloc.setAppProposal(data, true, false);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-proposal_approve-request-app', data => {
    console.log('server-proposal_approve-request-app', data);
    SessionBloc.setAppProposal(data, true, true);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-feature_proposal-request-app', data => {
    console.log('server-feature_proposal-request-app', data);
    console.log('server-feature_proposal-request-app.......data', data);
    SessionBloc.setFeatureProposal(data, true);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-add_admin-request-app', data => {
    console.log('server-add_admin-request-app', data);
    SessionBloc.setAdminProposal(data, true, true);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  Socket.on('server-delete_admin-request-app', data => {
    console.log('server-delete_admin-request-app', data);
    SessionBloc.setAdminProposal(data, true, false);
    // SessionBloc.setVotingProposal(JSON.stringify(data));
    // SessionBloc.setVotingRequestlModal(true);
  });

  return Socket;
}
