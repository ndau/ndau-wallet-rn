
import React from 'react'
import { proxy } from 'valtio'

// interface State {
//   proposal: string
// }

// const state = proxy<State>({
//   proposal: ''
// })

// const SessionBloc = {
//   state,

//   setProposal(proposal: State['proposal']) {
//     state.proposal = proposal
//   }
// }

// export default SessionBloc;

var state = proxy({
  proposal: '',
  purposalModal:false,
  votingRequestModal:false,
  socketLogin:'',
  request:'',
  navigation:'',
  infomessage:'',
  isApprove:false,
  alertPopup:false,
  appPurposalData:'',
  appPurposalModel:false,
  featurePurposalModel:false,
  adminPurposalModel:false,
  adminApprove:false,
  adminData:'',
  featurePurposalData:'',
  socketId:'',
});
var SessionBloc = {
  state: state,
  setVotingProposal: function (proposal) {
      state.proposal = proposal;
     
  },
  setSocketLogin: function (socketdata,socketId) {
    state.socketLogin = socketdata;
   state.socketId=socketId;
},
  setAlertPopup: function (popup) {

    state.alertPopup = popup;
},
setAppPurposal: function (data,popup,approve) {

  state.appPurposalData = data;
  state.appPurposalModel=popup;
  state.isApprove=approve;
},
setAdminPurposal: function (data,popup,approve) {

  state.adminData = data;
  state.adminPurposalModel=popup;
  state.adminApprove=approve;
},

setFeaturePurposal: function (data,popup) {

  state.featurePurposalData = data;
  state.featurePurposalModel=popup;

},
setAddAdminPurposal: function (data,popup) {

  state.featurePurposalData = data;
  state.featurePurposalModel=popup;

},
  setRequest: function (request) {
    state.request = request;
   
},
setNavigation: function (navigation) {
  state.navigation = navigation;
 
},
  setPurposalModal: function (modalVisible) {
    state.purposalModal=modalVisible
},
setVotingRequestlModal: function (modalVisible) {
  state.votingRequestModal=modalVisible
}
};
export default  SessionBloc;

