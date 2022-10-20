import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-paper-grid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {
  ActivityIndicator,
  Appbar,
  Button,
  DataTable,
  Searchbar,
} from 'react-native-paper';
import axios from 'axios';
import {useNavigation} from '@react-navigation/native';
import Icon from 'react-native-fontawesome-pro';
import {set} from 'react-native-reanimated';
import Data123 from '../dummyData.json';
const RichList = () => {
  const [total, setTotal] = React.useState();
  const [loading, setloading] = React.useState(true);
  const [highest, sethighest] = React.useState();
  const [data, setData] = React.useState([]);
  const [groups, setGroup] = React.useState([]);
  const [PreviousHash, setPreviousHash] = React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [last, setLast] = React.useState();
  const [oldPage, setOldPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];

  const [arr, setArr] = React.useState([]);
  const [currentHash, setCurrentHash] = React.useState();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const move = val => {
    // console.log(val[0])
    navigation.navigate('Account', {val: val[0]});
    // navigation.navigate('DetailTransection', {val: val});
  };
  const to = Math.min((page + 1) * numberOfItemsPerPage, highest);

  const datecal = create => {
    const updated = Date.now() - new Date(create);
    let hours;
    const result = updated / 60000;
    let seconds = updated / 1000;
    hours = result / 60;
    if (result <= 0) {
      return `${Math.floor(seconds)} sec ago`;
    }
    if (hours >= 24) {
      let day = hours / 24;
      return `${Math.floor(day)} Days ago`;
    } else if (result.toPrecision(2) > 59) {
      return `${Math.floor(hours)} hrs ago`;
    } else {
      return `${Math.floor(result.toPrecision(2))} min ago`;
    }
  };

  React.useEffect(() => {
    setloading(true);
    // setArr(Data123.hundredRichestAccounts)
    try {
      axios.get('http://backend.explorer1.ndau.tech/api/richlist').then(val => {
        //  console.log('rich list data',val.data)

        setArr(val.data);
        // setPage(0);
        setloading(false);

        const chunkSize = 10;
        const array = val.data;
        console.log('array', arr);
        const groups = array
          .map((e, i) => {
            return i % chunkSize === 0 ? array.slice(i, i + chunkSize) : null;
          })
          .filter(e => {
            return e;
          });
        setGroup(groups);
        setData(groups[page]);
        // splitArray(page);
      });
    } catch (e) {
      console.log('your error', e);
    }
  }, []);

  const splitArray = page => {
    setData(groups[page]);
    console.log(groups.length);
  };

  nextPage = page => {
    if (page >= 9) {
      console.log('no data');
    } else {
      splitArray(page + 1);
      setPage(page + 1);
    }
  };
  previousPage = () => {
    if (page == 0) {
      console.log('data');
    } else {
      splitArray(page - 1);
      setPage(page - 1);
    }
  };
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center'}}
    />
  );
  const ItemDivider = () => {
    return (
      <View
        style={{
          height: 1,
          width: '100%',
          backgroundColor: 'grey',
        }}
      />
    );
  };

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{flex: 1, backgroundColor: '#181F28'}}>
      <Appbar.Header style={{backgroundColor: '#181F28'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ContentTitle title={'Rich List'} style={{color: 'white'}} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator style={{textAlign: 'center'}} />
      ) : (
        <View style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
          <FlatList
            data={data}
            renderItem={({item, index}) => {
              return (
                <View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',

                      marginRight: 'auto',
                      justifyContent: 'space-between',
                      width: '95%',
                      margin: 8,
                    }}>
                    <Text
                      style={{
                        backgroundColor: '#012D5A',
                        padding: 10,
                        color: '#FFFFFF',
                        opacity: 0.5,
                      }}>
                      {index + 1 + page * 10}
                    </Text>
                    <View style={{justifyContent: 'center', paddingLeft: '4%'}}>
                      <TouchableOpacity onPress={() => move(item)}>
                        <Text
                          style={{
                            color: '#F89D1C',
                            paddingRight: 10,
                          }}>
                          {item[0].slice(0, 15) + '...'}
                        </Text>
                      </TouchableOpacity>
                    </View>
                    <View
                      style={{
                        paddingRight: '10%',
                        marginHorizontal: '5%',
                        justifyContent: 'center',
                      }}>
                      <Text style={{color: '#FFFFFF', opacity: 0.5}}>
                        {'blnc:' + item[1].balance}
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
              );
            }}
          />

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
                width: '40%',
                alignItems: 'center',
                justifyContent: 'space-around',
              }}>
              <Text>{`${page}1-${page * 10 + 10} of 100`}</Text>
              <TouchableOpacity
                style={{padding: '1%'}}
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
                style={{padding: '1%', marginLeft: '3%'}}
                onPress={() => {
                  nextPage(page);
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
          {/* <DataTable style={{color: 'red'}}>
            <DataTable.Pagination
              style={{backgroundColor: '#F89D1C', opacity: 0.9, color: 'red'}}
              page={page}
              numberOfPages={Math.ceil(highest / numberOfItemsPerPage)}
              onPageChange={pages => {setOldPage(page); setPage(pages)}}
              label={`${from + 1}-${to} of ${highest}`}
        
              numberOfItemsPerPage={numberOfItemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable> */}
        </View>
      )}
    </View>
  );
};

export default RichList;
