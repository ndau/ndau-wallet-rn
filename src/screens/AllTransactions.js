import React, {useEffect, useState} from 'react';
import moment from 'moment';
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import axios from 'axios';
import {
  AccountHistoryContainer,
  AccountHistoryPanel,
  AccountHistoryPanels,
} from '../components/account';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-fontawesome-pro';
import {Modal, Provider} from 'react-native-paper';
import {
  ActivityIndicator,
  Appbar,
  Button,
  DataTable,
  Searchbar,
} from 'react-native-paper';
import FilterModel from '../components/filterModel';
import ServiceDiscovery from '../api/ServiceDiscovery';
import AccountHistoryHelper from '../helpers/AccountHistoryHelper';
import ShowHistory from '../components/common/showHistory';
import FilterByCategoryModel from '../components/common/filterByCategory';

const ContentTitle = ({title, style}) => (
  <Appbar.Content
    title={<Text style={style}> {title} </Text>}
    style={{alignItems: 'center'}}
  />
);

class AllTransactions extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelVisible: false,
      loading: true,
      data: [],
      arr: [],
      page: 0,
      history: [],
      valid: false,
      oldPage: 0,
      groups: [],
      categoryModel:false,
      fromDate: null,
      toDate: null,
      pageLength: 0,
    };
  }

  componentDidMount() {

    this.getData();
  }

  getData = () => {
    this.setState({loading: true});
    let {fromDate, toDate} = this.state;
    try {
      let address = this.props.route?.params?.address;

      AccountHistoryHelper.getAccountHistorywithfilter(
        address,
        fromDate,
        toDate,
      ).then(history => {
        history = history && [...history].reverse();
        if ((history && history.length === 0) || history[0] === null) {
          console.log('eroor.....');
          this.setState({
            history: null,
            valid: true,
            loading: false,
          });
          return;
        }

        const chunkSize = 10;
        if(this.state.toDate)
        {
          let accounthistory= this.filterEvents(history);
          console.log('accpint',accounthistory)
          if ((accounthistory && accounthistory.length === 0) || accounthistory[0] === null) {
            console.log('eroor.....');
            this.setState({
              history: [],
              valid: true,
              loading: false,
            });
            return;
          }
          else{
            this.setState({history:accounthistory,valid:false});
            
          }
        }
        else{
          this.setState({history:history});
        }
      
   
        const array = this.state.history;
    
        const groups = array
          .map((e, i) => {
            return i % chunkSize === 0 ? array.slice(i, i + chunkSize) : null;
          })
          .filter(e => {
            return e;
          });

        // console.log('last index',groups.length)
        this.setState({
          pageLength: groups.length,
          groups: groups,
          data: groups[this.state.page],
          loading: false,
        });

        // this.setState({ history, loading: false });

        return;
      }).catch(e=>{
        console.log('your error', e); 
        this.setState({loading: false,valid:true});
      });
   
    } catch (e) {
      console.log('your error', e);
      this.setState({loading: false});
    }
  };

  onTypeFilter=(types)=>{
    this.hideCategoryModal();
    this.props.navigation.navigate('FilterByTypeTransactions',{history:this.state.history,filterTypes:types});
    
  }
  dateFilter = (startDate,lastDate) => {
     if(lastDate)
    {
    this.setState({fromDate:startDate,toDate:lastDate,history:[]}, () => {

      if(this.state.toDate!=null)
      {
        console.log('last data is not empty');
        this.hideModal()
        this.setState({
          page:0,
          pageLength: 0,

        },()=>{
          this.getData();
        })

         
     
      
      }
      else{
        console.log('last data is empty')
      }
    });
  }
  };

  filterEvents = (givenEvents) => {
    if (!givenEvents || givenEvents.length === 0 || givenEvents[0] === null) {
      return [];
    }
    const { fromDate, toDate } = this.state;

    const filteredEventsTemp = givenEvents.filter((event) => {
      const eventDate = moment(event.Timestamp);
      const isWithinFilterRange =
        eventDate.isAfter(fromDate) && eventDate.isBefore(toDate);

      return isWithinFilterRange;
    });

    return filteredEventsTemp;
  };

  showModal = () => this.setState({modelVisible: true});
  hideModal = () => this.setState({modelVisible: false});

  showCategoryModal = () => this.setState({categoryModel: true});
  hideCategoryModal = () => this.setState({categoryModel: false});

  

  splitArray = page => {
    console.log(page);
    this.setState({data: this.state.groups[page]});
  };
  nextPage = page => {
    if (this.state.page >= this.state.pageLength - 1) {
      console.log('no data');
    } else {
      this.splitArray(this.state.page + 1);
      this.setState({page: this.state.page + 1});
    }
  };
  getPreviousItem=()=>{
    let {groups,data,page,pageLength}=this.state;
    if(page<= this.state.pageLength - 1)
    {
      if(groups && groups[page+1])
      {
          return groups[page+1][0]
      }
      else{
        return data[data.length-1]

      }
    }
    else{
     return data[data.length-1]
    }
    
  }
  previousPage = () => {
    if (this.state.page == 0) {
      console.log('data');
    } else {
      this.splitArray(this.state.page - 1);
      this.setState({page: this.state.page - 1});
    }
  };

  componentDidUpdate(prevProps) {
    // console.log('prevProps/////',prevProps)
  }

  render() {
    let {loading, data,categoryModel,groups, modelVisible, page, pageLength} = this.state;
    console.log('page....', this.state.page);
    return (
      <View style={{flex: 1, backgroundColor: '#181F28', zIndex: 100}}>
        <Appbar.Header style={{backgroundColor: '#181F28'}}>
          <Appbar.BackAction
            onPress={() => {
              this.props.navigation.goBack();
            }}
          />
          <ContentTitle title={'All Transactions'} style={{color: 'white'}} />
          <View style={{flexDirection:'row',justifyContent:'space-around'}}>
          <TouchableOpacity
            onPress={this.showModal}
            style={{
              borderRadius: 10,
              padding: '3%',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Icon
              name="filter"
              color={'#ffff'}
              size={24}
              type="light"
              // onPress={prevWord}
            />
          </TouchableOpacity>

          
          </View>
        </Appbar.Header>

        {loading ? (
          <ActivityIndicator style={{textAlign: 'center'}} />
        ) :this.state.valid?
        <Provider>
        <View style={{flex:1,alignItems:'center',justifyContent:'center',alignContent:'center',alignSelf:'center'}}>
          <Text style={{color:'#fff',fontSize:18,textAlign:'center'}}>This account currently has no transactions on the blockchain.
      
        </Text>
        
        {modelVisible && <FilterModel hideModal={this.hideModal}  onTypeFilter={this.onTypeFilter}  visible={modelVisible} onDateFilter={this.dateFilter} />}
            {/* {categoryModel && <FilterByCategoryModel  onTypeFilter={this.onTypeFilter} hideModal={this.hideCategoryModal} visible={categoryModel} />} */}
             
        </View>
        </Provider>: (
          <Provider>
            <View
              style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
            {modelVisible && <FilterModel hideModal={this.hideModal}  onTypeFilter={this.onTypeFilter} visible={modelVisible} onDateFilter={this.dateFilter} />}
            {categoryModel && <FilterByCategoryModel  onTypeFilter={this.onTypeFilter} hideModal={this.hideCategoryModal} visible={categoryModel} />}
              <ShowHistory
                data={this.state.data?this.state.data:[]}
                lastPreviousEvent={
                this.getPreviousItem()
                }
                setState={this.state}
              />
             
            </View>
            <View
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
                  width: '70%',
                  alignItems: 'center',
                  justifyContent: 'space-around',
                }}>
                <Text>{`${page}1-${page * 10 + 10} - total ${this.state.history.length}   page ${
                  page + 1
                } of ${pageLength}`}</Text>
                <TouchableOpacity
                  style={{padding: '1%', marginHorizontal: '15%'}}
                  onPress={() => {
                    this.previousPage(page);
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
            </View>
          </Provider>
        )}
      </View>
    );
  }
}

export default AllTransactions;
