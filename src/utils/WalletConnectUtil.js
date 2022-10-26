// import SignClient from '@walletconnect/sign-client'
import React from 'react';
import socketIOClient from 'socket.io-client';
const ENDPOINT = 'http://backend.bpc-dao.ndau.tech/';
// const ENDPOINT = 'http://bpc-dao-backend.ndau.io/'

// const Socket = socketIOClient(ENDPOINT);
// export default Socket;
// socket.emit("hello",'hi how are you');

export let Socket;

// export async function CreateSignClient() {

// }

export async function createSignClient() {
  Socket = socketIOClient(ENDPOINT);
  console.log('socket....................', Socket);
}
