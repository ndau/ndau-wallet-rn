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
import {ActivityIndicator, Appbar, Button, DataTable, Searchbar} from 'react-native-paper';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const DetailBlock = ({route}) => {
  const currentblock=route.params.val;
  const [total, setTotal] = React.useState();
  const [loading, setloading] = React.useState();
  const [highest, sethighest] = React.useState();
  const [searchQuery, setSearchQuery] = React.useState('');
  const [page, setPage] = React.useState(0);
  const numberOfItemsPerPageList = [2, 3, 4];
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const to = Math.min((page + 1) * numberOfItemsPerPage, highest);

  const datecal=(create)=>{
     const updated=Date.now()-new Date(create);
     let hours;
    const result= updated/60000;
    let seconds=updated/1000;
    hours= result/60;
  if(result<=0){
    return `${Math.floor(seconds)} sec ago`;
  }
    if(hours>=24){
      let day=hours/24;
      return `${Math.floor(day)} Days ago`;
    }
    else if(result.toPrecision(2) > 60){
    
     return `${Math.floor(hours)} hrs ago`;
    }
  
    else{
      return `${Math.floor(result.toPrecision(2))} min ago`;
    }
  }


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
      <Appbar.BackAction onPress={() => {navigation.goBack()}} />
        <ContentTitle title={'Detail Block'} style={{color: 'white'}} />
      </Appbar.Header>
      {loading?<ActivityIndicator style={{textAlign:"center"}}/>:
      <View style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
      
<Text style={{textAlign:"center",color:"#F89D1C",fontSize:20,textDecorationLine:"underline"}}>Overview</Text>
            <View
            style={{flexDirection:"row",alignItems:"center"}}
         >
          <Text style={{flex:2,color:"white",opacity:0.7, padding: 10}}>Block Height:</Text>
              <Text style={{ padding: 10,flex:5,color:"#FFFFFF",fontWeight:"bold"}}>{currentblock.header.height} </Text>
              
             
       
            </View>
            <View style={{height: 1, backgroundColor: 'white',opacity:0.5}} />
            <View
            style={{flexDirection:"row",alignItems:"center"}}
         >
          <Text style={{flex:2,color:"white",opacity:0.7, padding: 10}}>Timestamp:</Text>
            <Text style={{ padding: 10,flex:5,color:"#FFFFFF",fontWeight:"bold"}}>{datecal(currentblock.header.time)} </Text>
              
             
       
            </View>
            <View style={{height: 1, backgroundColor: 'white',opacity:0.5}} />
            <View
            style={{flexDirection:"row",alignItems:"center"}}
         >
          <Text style={{flex:2,color:"white",opacity:0.7, padding: 10}}>Transections:</Text>
              <Text style={{ padding: 10,flex:5,color:"#FFFFFF"}}>{currentblock.header.num_txs} Transections </Text>
              
              
          
       
            </View>
            <View style={{ height: 1, backgroundColor: 'white',opacity:0.5}} />   
          
            <View
            style={{flexDirection:"row",alignItems:"center",justifyContent:"center"}}
         >
          <Text style={{flex:2,color:"white",opacity:0.7, padding: 10}}>Hash:</Text>
              <Text style={{ padding: 10,flex:5,color:"#FFFFFF",fontWeight:"bold"}}>{currentblock.block_id.hash}  </Text>
              
              
          
       
            </View>
            <View style={{ height: 1, backgroundColor: 'white',opacity:0.5}} />   
      
 
      </View>}
    </View>
  );
};

export default DetailBlock;
