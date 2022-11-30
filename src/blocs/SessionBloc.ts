import React from 'react';
import {proxy} from 'valtio';

var state = proxy({
  proposalModal: false,
  socketLogin: '',
  votingRequestModal: false,
  proposal: '',
  request: '',
  navigation: '',
  infomessage: '',
  isApprove: false,
  alertPopup: false,
  appProposalData: '',
  appProposalModel: false,
  featureProposalModel: false,
  adminProposalModel: false,
  adminApprove: false,
  adminData: '',
  featureProposalData: '',
  socketId: '',
  accountAddress: '',
  accountPrivateKey: '',
  accountPublicKey: '',
});
var SessionBloc = {
  state: state,
  setVotingProposal: function (proposal) {
    state.proposal = proposal;
  },
  setSocketLogin: function (socketdata, socketId) {
    state.socketLogin = socketdata;
    state.socketId = socketId;
  },
  setAlertPopup: function (popup) {
    state.alertPopup = popup;
  },
  setAppProposal: function (data, popup, approve) {
    state.appProposalData = data;
    state.appProposalModel = popup;
    state.isApprove = approve;
  },

  setAccountAddress: function (address) {
    state.accountAddress = address;
  },
  setAccountPrivateKey: function (key) {
    state.accountPrivateKey = key;
  },
  setAccountPubkicKey: function (key) {
    state.accountPublicKey = key;
  },

  setAdminProposal: function (data, popup, approve) {
    state.adminData = data;
    state.adminProposalModel = popup;
    state.adminApprove = approve;
  },

  setFeatureProposal: function (data, popup) {
    state.featureProposalData = data;
    state.featureProposalModel = popup;
  },
  setAddAdminProposal: function (data, popup) {
    state.featureProposalData = data;
    state.featureProposalModel = popup;
  },
  setRequest: function (request) {
    state.request = request;
  },
  setNavigation: function (navigation) {
    state.navigation = navigation;
  },
  setProposalModal: function (modalVisible) {
    state.proposalModal = modalVisible;
  },
  setVotingRequestlModal: function (modalVisible) {
    state.votingRequestModal = modalVisible;
  },
};
export default SessionBloc;
