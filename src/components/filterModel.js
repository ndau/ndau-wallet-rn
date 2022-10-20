import {Modal, Portal, Provider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';
import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import CalendarPicker from 'react-native-calendar-picker';
import Icon from 'react-native-fontawesome-pro';
import VectorIcon from 'react-native-vector-icons/Feather';
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {TRANSACTION_TYPES} from '../screens/constants';
import {ScrollView} from 'react-native-gesture-handler';
import CollapsibleBar from './common/CollapsibleBar';

const FilterModel = ({hideModal, visible,onDateFilter,onTypeFilter}) => {
  const [selectedStartDate, setSelectedStartDate] = useState(null);
  const [selectedEndDate, setSelectedEndDate] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selecteId,SetSelectedId]=useState(0);
  const [selectedData, setSelectedData] = useState([]);
  const [lefTab,setLeftTab]=useState(true);
  const [error,setError]=useState(false);
  const [filtererror,setFiltererror]=useState(false);
  
    const [allTransactionsTypes, setAllTransactionTypes] =
    useState([
      { id:1,item:"Transfer"},
      { id:2,item:"ChangeValidation"},
      { id:3,item:"ReleaseFromEndowment"},
      { id:4,item: "ChangeRecoursePeriod"},
      { id:5,item: "Delegate"},
      { id:6,item: "CreditEAI"},
      { id:7,item: "Lock"},
      { id:8,item: "Notify"},
      { id:9,item: "SetRewardsDestination"},
      { id:10,item: "SetValidation"},
      { id:11,item: "Stake"},
      { id:12,item: "RegisterNode"},
      { id:13,item: "NominateNodeReward"},
      { id:14,item: "ClaimNodeReward"},
      { id:15,item: "TransferAndLock"},
      { id:16,item: "CommandValidatorChange"},
      { id:17,item: "UnregisterNode"},
      { id:18,item: "Unstake"},
      { id:19,item: "Issue"},
      { id:20,item: "CreateChildAccount"},
      { id:21,item: "RecordPrice"},
      { id:22,item: "SetSysvar"},
      { id:23,item: "SetStakeRules"},
      { id:24,item: "ChangeSchema"},
 ]);
  

    useEffect(()=>{
      if(selectedCategory)
      {
        setSelectedStartDate(getPreviouDate())
        setSelectedEndDate(new Date())
     
      }
  
    },[selectedCategory])
    
  const DateFilter = [
    {
      id: 0,
      type: 'last-month',
      name: 'Last month',
    },
    {
      id: 1,
      type: 'last-3-months',
      name: 'Last 3 month',
    },
    {
      id: 2,
      type: 'last-6-months',
      name: 'Last 6 month',
    },
    {
      id: 3,
      type: 'last-year',
      name: 'Last year',
    },
  ];
  const Tabs=[
    {id:0,type:'left',name:'Date'},
    {id:1,type:'right',name:'Type'}
  ]

  const onClicTab=(type)=>{

    if(type=='left')
    {
      setLeftTab(true)
      SetSelectedId(0)
    }
    else{
      setLeftTab(false);
      SetSelectedId(1)
    }
  }
    
  onItemSelect = id => {
    let data = [...allTransactionsTypes];
    for (let item of data) {
      if (item.id === id) {
        item.isSelected = item.isSelected == null ? true : !item.isSelected;
        break;
      }
    }
    setAllTransactionTypes(data);
    setFiltererror(false)

   

    const SelectedData = data.filter(function (item) {
      if (item.isSelected === true) {
        return item;
      }
    });
    const temp = [];
  
    SelectedData.map((e,index)=>{
    
      temp.push(e.item);
    })
    console.log('SelectedData',SelectedData)
    setSelectedData(temp)
  

  };


  getPreviouDate = () => {
    let type = selectedCategory;
    const date = new Date();
    const firstDay = date.getDate();
    let selecteddate=new Date();

    // setError(false)
    if (type === 'last-month') {
      const prevMonth = date.getMonth() - 1;
      selecteddate=new Date(date.getFullYear(), prevMonth, firstDay)
      // return selecteddate;
     
    } else if (type === 'last-3-months') {
      const prevMonth = date.getMonth() - 3;
      selecteddate=new Date(date.getFullYear(), prevMonth, firstDay);
 
    } else if (type === 'last-6-months') {
      const prevMonth = date.getMonth() - 6;
      selecteddate= new Date(date.getFullYear(), prevMonth, firstDay);
  
    } else if (type === 'last-year'){
      
    selecteddate= new Date(new Date().setFullYear(new Date().getFullYear() - 1));
  
    }
  
    return selecteddate;

  };
  selectDateFilter = type => {
    console.log('type', type);
    const date = new Date();
    setSelectedCategory(type);
//  

  };
  const [check, setcheck] = useState(false)
 
  onDateChange = (date, type) => {

    
      if (type === 'END_DATE') {
        let date1=new Date(selectedStartDate).getTime();
        let date2= new Date(date).getTime();
        if(date1 === date2) {
          setSelectedStartDate(null);
          setSelectedEndDate(null);
          setcheck(false)
          setSelectedCategory(null);

        }
        else{
          setSelectedEndDate(date);
          setSelectedCategory(null);
          setcheck(false)
        }

       
      } else {
        setError(false)
        setSelectedStartDate(date);
        setSelectedEndDate(null);
      }
    // }
    // setcheck(true)
   
  };


  var halfwayPoint = allTransactionsTypes.length / 2;
  var columnA = allTransactionsTypes.slice(0, halfwayPoint)
  var columnB = allTransactionsTypes.slice(halfwayPoint)
  
    
 
  const minDate = new Date(2000, 6, 3); // Today
  const maxDate = new Date(2029, 6, 3);

  console.log('selectedStartDate',selectedStartDate,'selecteed end date',selectedEndDate);
  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          flex: 1,
          // width:'100%',

          borderRadius: 30,
          borderBottomEndRadius:0,
          borderBottomLeftRadius:0,

          backgroundColor: '#132A47',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <View style={{marginTop: 20,alignItems:'center',alignSelf:'center'}}>
  
  <View style={{flexDirection:'row',width:'80%',marginBottom:'4%',alignSelf:'center',}}>
    {Tabs.map((e,index)=>(
      <TouchableOpacity onPress={()=>{onClicTab(e.type)}}
       style={{flex:1,alignItems:'center',borderBottomColor:e.id===selecteId?'#F89D1C':'transparent',borderBottomWidth:3,}}>
   
        <Text style={{fontSize:18,fontWeight:e.id===selecteId?'bold':'500',paddingVertical:'4%',color:'#fff'}}>{e.name}</Text>
    
       </TouchableOpacity>
    ))}
  </View>

{lefTab?<View style={{flex:1}}>


          <CalendarPicker
            startFromMonday={true}
            allowRangeSelection={true}
            minDate={minDate}
            selectedStartDate={
              selectedCategory ? getPreviouDate() : selectedStartDate
            }
            selectedEndDate={selectedCategory ? new Date() : selectedEndDate}
            maxDate={maxDate}
            previousComponent={
              <Icon
                name="angle-left"
                color={'#fff'}
                size={28}
                type="light"
                // onPress={prevWord}
              />
            }
            todayBackgroundColor="#3498DB"
            dayShape="square"
            nextComponent={
              <Icon
                name="angle-right"
                color={'#fff'}
                size={28}
                type="light"
                // onPress={prevWord}
              />
            }
            dayLabelsWrapper={{borderColor: 'transparent'}}
            textStyle={{color: 'white'}}
            selectedRangeStartStyle={{backgroundColor: '#F89D1C'}}
            selectedRangeEndStyle={{backgroundColor: '#F89D1C'}}
            selectedDayColor="rgba(255, 202, 88, 0.1)"
            selectedDayTextColor="#ffff"
            onDateChange={onDateChange}
          />

          <View style={{flex: 1}}>
            <View>
         
              <FlatList
                scrollEnabled={true}
                contentContainerStyle={{
                  alignContent: 'center',
                  alignItems: 'flex-start',
                  justifyContent: 'flex-start',
                  marginTop: '1%',
                }}
                // columnWrapperStyle={{
                //   justifyContent: 'space-evenly',
                //   width: '90%',
                //   alignItems: 'flex-start',
                // }}
         
                data={DateFilter}
                renderItem={({index, item}) => (
                  <TouchableOpacity
                    onPress={() => {
                      selectDateFilter(item.type);
                    }}
                    style={{
                      paddingVertical: 10,
                      paddingLeft: '3%',
                      width: '40%',
                      alignItems: 'center',
                    }}>
                    <View
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',

                        justifyContent: 'flex-start',
                        width: '100%',
                      }}>
                      <VectorIcon
                        name={
                          selectedCategory === item.type
                            ? 'check-circle'
                            : 'circle'
                        }
                        color={'#fff'}
                        size={23}
                        type="light"
                      />
                      <Text style={{color: '#ffff', paddingHorizontal: '4%'}}>
                        {item.name}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              
            </View>
           
          { error &&selectedEndDate==null? <Text style={{color:'red',position:'absolute', marginTop: '1%',
                bottom:'20%',paddingHorizontal:'10%',fontSize:16}}>Please select date range</Text>:null
              }
      
            <TouchableOpacity onPress={()=>{
              if(selectedEndDate==null)
              {
                setError(true)

              }
              else{
                onDateFilter(selectedStartDate,selectedEndDate)

              }
            
            }}
              style={{
                backgroundColor: '#F89D1C',
                paddingVertical: '3%',
                borderRadius: 10,
                position:'absolute',
                bottom:'5%',
                marginTop: '1%',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '50%',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600'}}>Apply</Text>
            </TouchableOpacity>
          </View>
          </View>
          :
          
          <View style={{flex: 1,}}>
            <View style={{height: '100%',width:'100%',alignItems:'center',alignSelf:'center'}}>
              {/* <Text style={{color:'#ffff',fontWeight:'600',fontSize:20,padding:'5%'}}>Filter BY Categories:{'                                 '}</Text> */}
              <View style={{flexDirection:'row',flex:1,paddingHorizontal:'5%',width:'100%',}}>
            <View style={{alignItems:'center'}} >
            {columnA.map((item, rowIndex) => {
               
        return (
          <TouchableOpacity
                        onPress={() => {
                          onItemSelect(item.id);
                        }}
                        style={{
                          paddingVertical: '3%',
                          paddingLeft: '3%',
                          width: '70%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                            justifyContent: 'flex-start',
                            width: '100%',
                          }}>
                          <VectorIcon
                            name={item.isSelected ? 'check-circle' : 'circle'}
                            color={'#fff'}
                            size={23}
                            type="light"
                            // onPress={prevWord}
                          />
                          <Text
                            style={{
                              color: '#ffff',
                              paddingHorizontal: '4%',
                              width: '80%',
                            }}
                            numberOfLines={1}>
                            {item.item}
                          </Text>
                        </View>
                      </TouchableOpacity>
        )
      })}
            </View>

            <View style={{alignItems:'center'}} >
      {columnB.map((item, rowIndex) => {
                console.log('row',item)
        return (
          <TouchableOpacity
                        onPress={() => {
                          onItemSelect(item.id);
                        }}
                        style={{
                          paddingVertical: '3%',
                          paddingLeft: '1%',
                          width: '70%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                            justifyContent: 'flex-start',
                            width: '100%',
                          }}>
                          <VectorIcon
                            name={item.isSelected ? 'check-circle' : 'circle'}
                            color={'#fff'}
                            size={23}
                            type="light"
                            // onPress={prevWord}
                          />
                          <Text
                            style={{
                              color: '#ffff',
                              paddingHorizontal: '4%',
                              width: '80%',
                            }}
                            numberOfLines={1}>
                            {item.item}
                          </Text>
                        </View>
                      </TouchableOpacity>
        )
      })}
      </View>



          </View>
                  {/* <FlatList
                  
                  
                    contentContainerStyle={{
                      alignContent: 'center',
                      alignItems: 'center',
                    //   backgroundColor:'red',
                      justifyContent: 'center',
                      // marginTop: '1%',
                    }}
                    columnWrapperStyle={{
                      justifyContent: 'center',
                      width: '100%',
                    paddingLeft:'10%',
                      alignItems: 'center',
                    }}
                    numColumns={2}
                    data={allTransactionsTypes}
                    keyExtractor={(item, index) => item.id}
                    renderItem={({index, item}) => {
                  
                      return(
                  
                     
                      <TouchableOpacity
                        onPress={() => {
                          onItemSelect(item.id);
                        }}
                        style={{
                          paddingVertical: '2.5%',
                          paddingLeft: '3%',
                          width: '56%',
                          alignItems: 'center',
                        }}>
                        <View
                          style={{
                            flexDirection: 'row',
                            alignItems: 'center',

                            justifyContent: 'flex-start',
                            width: '100%',
                          }}>
                          <VectorIcon
                            name={item.isSelected ? 'check-circle' : 'circle'}
                            color={'#fff'}
                            size={23}
                            type="light"
                            // onPress={prevWord}
                          />
                          <Text
                            style={{
                              color: '#ffff',
                              paddingHorizontal: '4%',
                              width: '70%',
                            }}
                            numberOfLines={1}>
                            {item.item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                      )}
                          }
                  />  */}
            {filtererror && <Text style={{color:'red',position:'absolute', marginTop: '1%',
            width:'100%',
                bottom:'11%',paddingHorizontal:'10%',fontSize:16,left:'10%',}}>Please select at least one type</Text>}
              
            </View>
            <TouchableOpacity onPress={()=>{
              if(selectedData.length>0)
              {
                onTypeFilter(selectedData)
              }
              else{
                setFiltererror(true)
           
              }
            
            }}
              style={{
                backgroundColor: '#F89D1C',
                paddingVertical: '3%',
                borderRadius: 10,
                marginTop: '1%',
                bottom:'2.6%',
                position:'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '50%',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600'}}>Apply</Text>
            </TouchableOpacity>
          </View>}
          
        </View>
      </Modal>
    </Portal>
  );
};

export default FilterModel;
