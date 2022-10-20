import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

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

const DetailTransection = ({route}) => {
  const [total, setTotal] = React.useState();
  const val=route.params.val;
  const [loading, setloading] = React.useState();
  const [highest, sethighest] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const to = Math.min((page + 1) * numberOfItemsPerPage, highest);

//   React.useEffect(() => {
//     setloading(true);
   
//       axios
//         .get(
//           // `https://mainnet-1.ndau.tech:3030/account/account/${val}`,
//           `https://mainnet-1.ndau.tech:3030/transaction/detail/${val}?node=mainnet`
//         )
//         .then(res => {
        
//           if(res.data[val]){
         
//           setAccounts(res.data[val]);
//           console.log('data',res.data[val]);
        
//           setItems(res.data[val]?.validationKeys.map((val)=>({label:val.substring(0, 40)+'...' ,value:val.substring(0, 40) +'...' })))
//           }
//           else{
          
//             setEmpty(res.data[val]);
//           }
//           setloading(false);
      
//         }).catch((e)=>{
//           console.log('error');
//           setloading(false);
// setError(true);

//         });
 
//   }, []);
  
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
        <ContentTitle title={'Detail Transaction'} style={{color: 'white'}} />
      </Appbar.Header>
      {loading ? (
        <ActivityIndicator style={{textAlign: 'center'}} />
      ) : val ===null? (<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
      <Text style={{color:'white'}}>Ops Nothing was Found </Text>
      </View>):(
        <View style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
          <Text
            style={{
              textAlign: 'center',
              color: '#F89D1C',
              fontSize: 20,
              textDecorationLine: 'underline',
            }}>
            Overview
          </Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Transaction Hash:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
         {val.TxHash}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Type:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
                 {val.TxType}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Timestamp:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
             {datecal(val.Timestamp)}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Block Height:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
            {val.BlockHeight}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Fee:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
           {(val.Fee/100000000).toFixed(3)}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              Sib:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
               {val.SIB}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
              offset:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
            {val.TxOffset}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
             Hash:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
            {val.TxHash}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
             Market_price:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
            ${(val.TxData.market_price/100000000000).toFixed(2)}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
             Signatures:
            </Text>
            {val.TxData.signatures.map((valu,id)=>
           
            <Text
            key={id}
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
          
               {valu}
    
            </Text>
          )}
          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
             Sequence:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
             {val.TxData.sequence}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />

          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
        </View>
      )}
    </View>
  );
};

export default DetailTransection;
