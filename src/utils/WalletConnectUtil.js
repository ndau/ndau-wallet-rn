// import SignClient from '@walletconnect/sign-client'
import React from 'react';
import socketIOClient from 'socket.io-client';
import SessionBloc from '../blocs/SessionBloc';
const ENDPOINT = 'http://backend.bpc-dao.ndau.tech/';

// const Socket = socketIOClient(ENDPOINT);
// export default Socket;
// socket.emit("hello",'hi how are you');

export let Socket;

// export async function CreateSignClient() {

// }

export async function createSignClient(_address, barcode) {
  Socket = socketIOClient(ENDPOINT);

  Socket.on('connect', data => {
    console.log(data, 'connect event data');
    console.log(Socket.id, 'connect event socket.id');
    SessionBloc.setSocketLogin(barcode, Socket.id);
    SessionBloc.setAccountAddress(_address);
    SessionBloc.setPurposalModal(true);
  });
}
