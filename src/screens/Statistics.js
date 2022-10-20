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

const Statistics = () => {
  const [total, setTotal] = React.useState();
  const [loading, setloading] = React.useState();
  const [highest, sethighest] = React.useState();
  const [PreviousHash,setPreviousHash]=React.useState([]);
  const [searchQuery, setSearchQuery] = React.useState('');
  const [last,setLast]=React.useState();
  const [oldPage,setOldPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [currentHash,setCurrentHash]=React.useState();
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const move = val => {
    navigation.navigate('DetailTransection', {val: val});
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
if(oldPage>page){
  
  axios.get('https://mainnet-0.ndau.tech:3030/block/current').then(val => {
    
    axios
      .get(
        `https://mainnet-0.ndau.tech:3030/transaction/before/${PreviousHash.length>0?PreviousHash[PreviousHash.length-1]:"start"}?limit=10`,
      )
      .then(res => {
      console.log(PreviousHash)
        setPreviousHash([...PreviousHash.slice(0,-1)]);


        console.log(res.data);
        setTotal(res.data.Txs);
        setCurrentHash(res.data.Txs[0].TxHash)
        sethighest(val.data.block_meta.header.total_txs);
        setLast(res.data.NextTxHash)
        setloading(false);

      });
    }); 
}
else{
    axios.get('https://mainnet-0.ndau.tech:3030/block/current').then(val => {
              axios
                .get(
                  `https://mainnet-0.ndau.tech:3030/transaction/before/${last?last:"start"}?limit=10`,
                )
                .then(res => {
                  console.log(res.data);
                  setTotal(res.data.Txs);
                  setPreviousHash([...PreviousHash,currentHash]);
         
                  setCurrentHash(res.data.Txs[0].TxHash)
                  sethighest(val.data.block_meta.header.total_txs);
                  setLast(res.data.NextTxHash)
                  setloading(false);
         
                });
              }); 
            
            }
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
        <ContentTitle title={'Top Statistics'} style={{color: 'white'}} />
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
                    width: '85%',
                    margin: 8,
                  }}>
                 
                  <View>
                    <TouchableOpacity onPress={() => move(item)}>
                      <Text
                        style={{
                          color: 'white',  
                          paddingRight:10,
                        
                        }}>
                  Top ETH Sender
                      </Text>
                      <Text style={{ color: '#F89D1C', opacity: 0.5}}>
                      0XD8D98E..A1EE8604
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View>
                  <Text style={{color:"#FFFFFF",opacity:0.5}}
               >
           Total ETH
                  </Text>
                  <Text style={{  color: '#FFFFFF',opacity:0.75}}
               >
           250,000
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
            )}
          />
          <DataTable style={{color: 'red'}}>
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
          </DataTable>
        </View>
      )}
    </View>
  );
};

export default Statistics;
