import React, {useEffect, useState} from 'react';
import {View, Text, ActivityIndicator, TouchableOpacity} from 'react-native';
import {Appbar} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import pLimit from 'p-limit';
import Icon from 'react-native-fontawesome-pro';
import moment from 'moment';
import {getTransaction} from '../helpers/AccountHistoryHelper';
import {ScrollView} from 'react-native-gesture-handler';
const FilterByTypeTransactions = ({route}) => {
  const [total, setTotal] = React.useState();
  const history = route?.params?.history ? route?.params?.history : [];
  const filtetTypes = route?.params?.filterTypes
    ? route?.params?.filterTypes
    : [];

  // const [loading, setloading] = React.useState(true);

  const navigation = useNavigation();

  const [page, setPage] = useState(0);

  const [filtersAppliedState, setFiltersAppliedState] = useState(null);
  const [unfilteredEventsState, setUnfilteredEventsState] = useState(null);
  const [filteredTransactionsState, setFilteredTransactionsState] = useState(
    [],
  );
  const [pageLength,setPageLength]=React.useState(0)
  const [data,setData]=React.useState([])
  const [groups,setGroup]=React.useState([])
  const [isLoadingState, setIsLoadingState] = useState(true);
  const [fetchingPercentageState, setFetchingPercentageState] = useState(0);

  useEffect(() => {
    setIsLoadingState(true);
    function setUnfilteredEventsFromLocalStorage() {
      const unfilteredEventsString = history;
      if (unfilteredEventsString) {
        setUnfilteredEventsState(unfilteredEventsString);
      }
    }

    function setTypeFiltersFromLocalStorage() {
      const typeFiltersString = filtetTypes;

      setFiltersAppliedState(typeFiltersString);
    }

    setUnfilteredEventsFromLocalStorage();
    setTypeFiltersFromLocalStorage();
  }, []);

  useEffect(() => {
    if (unfilteredEventsState) {
      setFilteredTransactions();

      async function setFilteredTransactions() {
        const filteredTransactions = await filterTransactionsByType();
        console.log('filter...', filteredTransactions);
        setFilteredTransactionsState(filteredTransactions);

        const chunkSize = 13;
        const array = filteredTransactions;
        const groups = array.map((e, i) => { 
             return i % chunkSize === 0 ? array.slice(i, i + chunkSize) : null; 
        }).filter(e => {
          return e; });
          setGroup(groups)
          setPageLength(groups.length)
        setData(groups[page])
        
        setIsLoadingState(false);
      }

      async function filterTransactionsByType() {
        let detailedTransactions = await getTransactionDetails();
        const filteredTransactions = detailedTransactions.filter(
          (transaction, index) => {
            if (transaction) {
              return filtersAppliedState.includes(
                transaction.type.replace(/ /g, ''),
              );
            } else {
              return null;
            }
          },
        );
        return filteredTransactions;
      }

      async function getTransactionsWithProgress(transactionHashes = []) {
        const limit = pLimit(10);
        const transactionRequests = transactionHashes.map(hash => {
          return limit(() => getTransaction(hash));
        });

        function getTransactionsWithCallback(proms, progress_cb) {
          let d = 0;
          let prevPercentage;
          progress_cb(0);
          for (const p of proms) {
            if (d === 0) {
              prevPercentage = 0;
            }
            p.then(() => {
              d++;
              let newPercentage = (d * 100) / proms.length;
              if (newPercentage - prevPercentage > 1) {
                progress_cb((d * 100) / proms.length);
                prevPercentage = newPercentage;
              }
            });
          }
          return Promise.all(proms);
        }

        return getTransactionsWithCallback(transactionRequests, p => {
          if (p) {
            setFetchingPercentageState(p.toFixed(2));
          }
        });
      }

      async function getTransactionDetails() {
        const TransactionHashesArr = unfilteredEventsState.map(
          event => event.TxHash,
        );
        const detailedTransactions = await getTransactionsWithProgress(
          TransactionHashesArr,
        );

        return detailedTransactions;
      }
    }
  }, [unfilteredEventsState]);

  const splitArray=(page)=>{

    
    setData(groups[page])
     console.log(groups.length)
    }
  
    nextPage=(page)=>{
      if(page >= pageLength - 1)
      {
        console.log('no data');
  
      }
      else{
        splitArray(page+1);
        setPage(page+1);
      }
     
  
    }
    previousPage=()=>{
      if(page==0)
      {
        console.log('data');
      }
      else{
        splitArray(page-1);
        setPage(page-1);
      }
     
    }
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center'}}
    />
  );
  return (
    <View style={{flex: 1, backgroundColor: '#181F28', zIndex: 100}}>
      <Appbar.Header style={{backgroundColor: '#181F28'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ContentTitle
          title={'Filtered Transactions'}
          style={{color: 'white'}}
        />
        <View
          style={{flexDirection: 'row', justifyContent: 'space-around'}}></View>
      </Appbar.Header>
      {/* <Text>{fetchingPercentageState}</Text> */}
      {isLoadingState ? (
        <View style={{alignItems: 'center',justifyContent:'center',flex:1}}>
          <ActivityIndicator
            color="#F89D1C"
            size={40}
            style={{textAlign: 'center'}}
          />
          <Text style={{color: '#ffff', fontSize: 18}}>
            {' '}
            {fetchingPercentageState} % Done
          </Text>
          <Text
            textAlign="center"
            style={{
              color: '#ffff',
              fontSize: 18,
              alignContent: 'center',
              alignSelf: 'center',
              paddingHorizontal:'2%',
              textAlign: 'center',
              alignItems: 'center',
            }}>
                {
                    unfilteredEventsState && unfilteredEventsState.length > 750 ? 'Filtering a very large amount of data. There may be significant wait':'Filtering a large amount of data. There may be some wait'
                          
                }
          </Text>

        
        </View>
      ) : (
        <View style={{flex:1}}>
        <ScrollView>
        
          {
              data&&data.length>0?(
          data.map((e,index) => (

              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    marginRight: 'auto',
                    justifyContent: 'space-between',
                    width: '95%',
                    paddingRight:'1%',
                    margin: 8,
                  }}>
               <View style={{width:'10%',}}>
               <Text
                numberOfLines={1}
                adjustsFontSizeToFit={true}
                    style={{
                      backgroundColor: '#012D5A',
                      padding: 10,
                      textAlign:'center',
                      color: '#FFFFFF',
                      opacity: 0.5,
                    }}>
                    {index+1 + page*10}
                    
                  </Text>
               </View>
                  <View style={{justifyContent:'center',width:'40%',paddingLeft:'4%'}}>
                 
                      <Text 
                      numberOfLines={1}
                        style={{
                           
                          color: '#F89D1C',
                          paddingRight:10,
                          textAlign:'left'
                        
                        }}>
                      {e.hash}
                      </Text>
                     
                    
                  </View>
                  <View style={{width:'20%',marginHorizontal:'2%',justifyContent:'center'}}>
                  <Text numberOfLines={1} style={{color:"#FFFFFF",opacity:0.5}}
               >
              {e.raw.type} 
                  </Text>
                </View>
                  <View style={{paddingRight:'10%',marginHorizontal:'1%',justifyContent:'center'}}>
                  <Text style={{color:"#FFFFFF",opacity:0.5}}
               >
              {moment(e.raw.timestamp).fromNow()}
                  </Text>
                </View>
                </View>
                <View
                  style={{
                    height: 0.5,
                    width: '90%',
                    marginRight: 'auto',
                    marginLeft: 'auto',
                    backgroundColor: 'grey',
                  }}
                />
              </View>
          ))
              ):(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{ color:'#fff', textAlign:"center"}}>
              No Transactions Found For That Filter Set
            </Text></View>)
          
          }
        </ScrollView>
       
       {
              data&&data.length>0? <View
              style={{
                backgroundColor: '#F89D1C',
                width: '100%',
                height: '7%',
                justifyContent: 'center',
                alignItems: 'flex-end',
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  marginRight: '5%',
                  width: '65%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text>{`${page}1-${page * 10 + 10}  -  ${filteredTransactionsState.length}  page ${
                  page + 1
                } of ${pageLength}`}</Text>
                <TouchableOpacity
                  style={{padding: '1%', marginHorizontal: '15%'}}
                  onPress={() => {
                    previousPage(page);
                  }}>
                  <Icon
                    name="angle-left"
                    color={'#012D5A'}
                    size={28}
                    type="light"
                    // onPress={prevWord}
                  />
                </TouchableOpacity>

                <TouchableOpacity
                  style={{padding: '1%', marginLeft: '5%'}}
                  onPress={() => {
                    this.nextPage(page);
                  }}>
                  <Icon
                    name="angle-right"
                    color={'#012D5A'}
                    size={28}
                    type="light"
                    // onPress={prevWord}
                  />
                </TouchableOpacity>
              </View>
            </View>:null}
            </View>
      )}
     
    </View>
  );
};

export default FilterByTypeTransactions;
