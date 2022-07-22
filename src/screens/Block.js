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

const Block = () => {
  const [total, setTotal] = React.useState();
  const [loading, setloading] = React.useState();
  const [highest, sethighest] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const move = val => {
    navigation.navigate('DetailBlock', {val: val});
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
    } else if (result.toPrecision(2) > 60) {
      return `${Math.floor(hours)} hrs ago`;
    } else {
      return `${Math.floor(result.toPrecision(2))} min ago`;
    }
  };

  React.useEffect(() => {
    setloading(true);
    axios.get('https://mainnet-0.ndau.tech:3030/block/current').then(val => {
      let blockBefore = val.data.block_meta.header.height - page * 10;
      if (blockBefore < 86) blockBefore = 86;
      axios
        .get(
          `https://mainnet-0.ndau.tech:3030/block/before/${blockBefore}?limit=10&filter=noempty`,
        )
        .then(res => {
          setTotal(res.data.block_metas);
          console.log(res.data.block_metas[0].header.height);
          sethighest(val.data.block_meta.header.height);
          setloading(false);
        });
    });
  }, [page]);
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
        <ContentTitle title={'Latest Block'} style={{color: 'white'}} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator style={{textAlign: 'center'}} />
      ) : (
        <View style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
          <FlatList
            data={total}
            renderItem={({item}) => (
              <View>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',

                    marginRight: 'auto',
                    justifyContent: 'space-between',
                    width: '80%',
                    margin: 8,
                  }}>
                  <Text
                    style={{
                      backgroundColor: '#012D5A',
                      padding: 10,
                      color: '#FFFFFF',
                      opacity: 0.5,
                    }}>
                    {' '}
                    BK
                  </Text>
                  <View>
                    <TouchableOpacity onPress={() => move(item)}>
                      <Text
                        style={{
                          color: '#F89D1C',
                          textDecorationLine: 'underline',
                        }}>
                        {item.header.height}
                      </Text>
                      <Text style={{color: 'white', opacity: 0.5}}>
                        {datecal(item.header.time)}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{color: '#F89D1C', textDecorationLine: 'underline'}}>
                    {item.header.num_txs} txns
                  </Text>
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
            )}
          />
          <DataTable style={{color: 'red'}}>
            <DataTable.Pagination
              style={{backgroundColor: '#F89D1C', opacity: 0.9, color: 'red'}}
              page={page}
              numberOfPages={Math.ceil(highest / numberOfItemsPerPage)}
              onPageChange={page => setPage(page)}
              label={`${from + 1}-${to} of ${highest}`}
              showFastPaginationControls
              numberOfItemsPerPage={numberOfItemsPerPage}
              onItemsPerPageChange={onItemsPerPageChange}
              selectPageDropdownLabel={'Rows per page'}
            />
          </DataTable>
        </View>
      )}
    </View>
  );
};

export default Block;
