import React from 'react';
import {Animated, FlatList, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-paper-grid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {Appbar, Button, DataTable, Searchbar} from 'react-native-paper';
import axios from 'axios';

const Block = () => {
  const [total, setTotal] = React.useState();
  const [loading, setloading] = React.useState();
  const [highest, sethighest] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;

  const to = Math.min((page + 1) * numberOfItemsPerPage, highest);

  React.useEffect(() => {
    axios.get('https://mainnet-0.ndau.tech:3030/block/current').then(val =>
      axios
        .get(
          `https://mainnet-0.ndau.tech:3030/block/before/${
            val.data.block_meta.header.height - ((page ) * 10)
          }?limit=10&filter=noempty`
        )
        .then(res => {
          setTotal(res.data.block_metas);
          console.log(res.data.block_metas[0].header.height);
          sethighest(val.data.block_meta.header.height);
          setloading(false);
        }),
    );
  },[page]);
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
          width: "100%",
          backgroundColor: "#181F28",
        }}
      />
    );
  }
 
  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{flex: 1, backgroundColor: '#181F28'}}>
      <Appbar.Header style={{backgroundColor: '#181F28'}}>
      <Appbar.Action icon="menu" onPress={() => this.close()} />
        <ContentTitle title={'Blockchain Explorer'} style={{color: 'white'}} />
      </Appbar.Header>
      <View style={{backgroundColor:"#132A47",flex:1,borderRadius:20}}>
      <Text style={{color: '#ffffff', fontSize: 20, textAlign: 'center'}}>
        Block
      </Text>
      <FlatList
        data={total}
        ItemSeparatorComponent={ItemDivider}
        renderItem={({item}) => <View style={{display:"flex",flexDirection:"row",marginLeft:"auto",marginRight:"auto", justifyContent:"space-between",width:"80%"}}><Text> BK</Text><Text style={{color:"#F89D1C"}}>{item.header.height}</Text><Text style={{color:"#F89D1C"}}>{item.header.num_txs}</Text></View>}
      />
      <DataTable>
        <DataTable.Pagination
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
    </View>
  );
};

export default Block;
