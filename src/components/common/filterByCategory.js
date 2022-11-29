import {Modal, Portal, Provider} from 'react-native-paper';
import React, {useEffect, useState} from 'react';

import {Text, View, TouchableOpacity, FlatList} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import VectorIcon from 'react-native-vector-icons/Feather';
import {ScrollView} from 'react-native-gesture-handler';
// import CollapsibleBar from './CollapsibleBar';

const FilterByCategoryModel = ({hideModal, visible, onTypeFilter}) => {
  const [selectedData, setSelectedData] = useState([]);
  const [error, setError] = useState(false);
  const [opacity, setOpacity] = useState(0);
  const [allTransactionsTypes, setAllTransactionTypes] = useState([
    {id: 1, item: 'Transfer'},
    {id: 2, item: 'ChangeValidation'},
    {id: 3, item: 'ReleaseFromEndowment'},
    {id: 4, item: 'ChangeRecoursePeriod'},
    {id: 5, item: 'Delegate'},
    {id: 6, item: 'CreditEAI'},
    {id: 7, item: 'Lock'},
    {id: 8, item: 'Notify'},
    {id: 9, item: 'SetRewardsDestination'},
    {id: 10, item: 'SetValidation'},
    {id: 11, item: 'Stake'},
    {id: 12, item: 'RegisterNode'},
    {id: 13, item: 'NominateNodeReward'},
    {id: 14, item: 'ClaimNodeReward'},
    {id: 15, item: 'TransferAndLock'},
    {id: 16, item: 'CommandValidatorChange'},
    {id: 17, item: 'UnregisterNode'},
    {id: 18, item: 'Unstake'},
    {id: 19, item: 'Issue'},
    {id: 20, item: 'CreateChildAccount'},
    {id: 21, item: 'RecordPrice'},
    {id: 22, item: 'SetSysvar'},
    {id: 23, item: 'SetStakeRules'},
    {id: 24, item: 'ChangeSchema'},
  ]);

  var halfwayPoint = allTransactionsTypes.length / 2;
  var columnA = allTransactionsTypes.slice(0, halfwayPoint);
  var columnB = allTransactionsTypes.slice(halfwayPoint);

  onItemSelect = id => {
    let data = [...allTransactionsTypes];
    for (let item of data) {
      if (item.id === id) {
        item.isSelected = item.isSelected == null ? true : !item.isSelected;
        break;
      }
    }
    setAllTransactionTypes(data);
    setError(false);

    const SelectedData = data.filter(function (item) {
      if (item.isSelected === true) {
        return item;
      }
    });
    const temp = [];

    SelectedData.map((e, index) => {
      temp.push(e.item);
    });
    console.log('SelectedData', SelectedData);
    setSelectedData(temp);
  };

  return (
    <Portal>
      <Modal
        visible={visible}
        onDismiss={hideModal}
        contentContainerStyle={{
          flex: 1,

          borderRadius: 30,

          backgroundColor: '#132A47',
          flexDirection: 'column',
          alignItems: 'flex-start',
        }}>
        <View style={{marginTop: '2%'}}>
          <View style={{flex: 1}}>
            <View style={{height: '100%'}}>
              <Text
                style={{
                  color: '#ffff',
                  fontWeight: '600',
                  fontSize: 20,
                  padding: '5%',
                }}>
                Filter BY Categories:
              </Text>

              <View
                style={{
                  flexDirection: 'row',
                  flex: 1,
                  paddingHorizontal: '5%',
                }}>
                <View>
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
                              width: '70%',
                            }}
                            numberOfLines={1}>
                            {item.item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  })}
                </View>

                <View>
                  {columnB.map((item, rowIndex) => {
                    console.log('row', item);
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
                              width: '70%',
                            }}
                            numberOfLines={1}>
                            {item.item}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
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
                    data={[...allTransactionsTypes]}
                    keyExtractor={(item, index) => index}
                    renderItem={({index, item}) => {
                   console.log(item,index)
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
                  /> */}
              {error && (
                <Text
                  style={{
                    color: 'red',
                    position: 'absolute',
                    marginTop: '1%',
                    bottom: '10%',
                    paddingHorizontal: '10%',
                    fontSize: 16,
                  }}>
                  please select at least one type
                </Text>
              )}
            </View>
            <TouchableOpacity
              onPress={() => {
                if (selectedData.length > 0) {
                  onTypeFilter(selectedData);
                } else {
                  setError(true);
                }
              }}
              style={{
                backgroundColor: '#F89D1C',
                paddingVertical: '3%',
                borderRadius: 10,
                marginTop: '1%',
                bottom: '4%',
                position: 'absolute',
                justifyContent: 'center',
                alignSelf: 'center',
                width: '50%',
                alignItems: 'center',
              }}>
              <Text style={{fontWeight: '600'}}>Apply</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </Portal>
  );
};

export default FilterByCategoryModel;
