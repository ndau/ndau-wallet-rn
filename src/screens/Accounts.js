import React from 'react';
import {
  Animated,
  FlatList,
  Image,
  Text,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import pLimit from 'p-limit';
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
import moment from 'moment';
import {getAccount} from '../helpers/AccountHistoryHelper';

const Account = ({route}) => {
  const [total, setTotal] = React.useState();
  const val=route?.params?.val?route?.params?.val:'ndapcbexsq2zh9i7m2ze3rqr5wzp8fb2jvqw2zsh5nufbct5';
  const [accounts,setAccounts]=React.useState({});
  const [loading, setloading] = React.useState(true);
  const [highest, sethighest] = React.useState();

  const [page, setPage] = React.useState(0);

  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(10);
  const from = page * numberOfItemsPerPage;
  const navigation = useNavigation();
  const to = Math.min((page + 1) * numberOfItemsPerPage, highest);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [error,setError]=React.useState(false);
  const [empty,setEmpty]=React.useState(true);
  const [items, setItems] = React.useState([
   
  ]);

 

 

  React.useEffect(() => {
    setloading(true);

getAccount(val)
        .then(res => {

          setloading(true);
          if(res){
         
          setAccounts(res);
          console.log('data',res);
        
          setItems(res.validationKeys.map((val)=>({label:val.substring(0, 40)+'...' ,value:val.substring(0, 40) +'...' })))
          }
          else{
          
            setEmpty(res);
          }
          setloading(false);
      
        }).catch((e)=>{
          console.log('error...',e)
          // console.log('error');
          setloading(false);
setError(true);

        });
       
 
  }, []);
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center'}}
    />
  );


  return (
    <View style={{flex: 1, backgroundColor: '#181F28'}}>
      <Appbar.Header style={{backgroundColor: '#181F28'}}>
        <Appbar.BackAction
          onPress={() => {
            navigation.goBack();
          }}
        />
        <ContentTitle title={'Account'} style={{color: 'white'}} />
      </Appbar.Header>
      {loading  ? (
        <ActivityIndicator style={{textAlign: 'center'}} />
      ) :error?(<View style={{flex:1,alignItems:'center',justifyContent:'center'}}>
        <Text style={{color:'white'}}>Ops Nothing was Found </Text>
        </View>):!empty?<View style={{flex:1,alignItems:'center',justifyContent:'center'}}><Text style={{color:'white'}}>This account currently has no transactions on the blockchain.</Text></View>:(

        <ScrollView style={{backgroundColor: '#132A47', flex: 1, borderRadius: 20}}>
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
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '2%'}}>
              Account:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
        {val}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '2%'}}>
            Address:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
            {val}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Balance:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
         
                         
         {accounts.balance}  

                          
                      
    
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Currency Seat Date:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
        
         {moment(accounts?.currencySeatDate).format("MMMM DD YYYY,h:mm:ss a")}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: '3%'}}>
            Delegation Node:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
       {accounts?.delegationNode}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Last EAI Update:

            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
                
              {}
               
         {moment(accounts.lastEAIUpdate).format("MMMM DD YYYY,h:mm:ss a")}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Last WAA Update:

            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
        
            {moment(accounts.lastWAAUpdate).format("MMMM DD YYYY,h:mm:ss a")}
            </Text>
          </View>

          

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Sequence:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
          {accounts.sequence}
            </Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7,  padding: '3%'}}>
            Recourse Settings:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
           Period:{accounts?.recourseSettings?.period}
            </Text>
          </View>

          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: '3%'}}>
            Transactions:

            </Text>
            <Text  onPress={()=>{navigation.navigate('AllTransations',{address:val})}}
              style={{
                flex: 5,
                color: '#F89D1C',
                fontWeight: 'bold',
                textDecorationLine: 'underline',   
                           }}>
        
        View All
              </Text>
          </View>
          <View style={{flexDirection: 'row',paddingVertical:'5%', alignItems: 'center'}}>
           

            <DropDownPicker
                    autoScroll={false}
                    theme="DARK"
                    // onChangeValue={(value)=>moveBy(value)}
                      style={{
                        backgroundColor: '#132A47',
                        color: '#ffff',
                        flex:2,

                        paddingVertical: '2%',
                        borderWidth: 0,
                      
                      }}
                      
                selectedItemLabelStyle={{color:'green',}}
               
                      dropDownContainerStyle={{
                        backgroundColor: '#012D5A',
                        paddingVertical:10
                      }}
                      
                      placeholderStyle={{
                        color: "grey",
                        fontWeight: "bold"
                      }}
                      listItemLabelStyle={{
                        color: '#FFFF',
                      }}
                      placeholder="View Validation Keys "
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                    />

          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={{flex: 2, color: 'white', opacity: 0.7, padding: 10}}>
            Weighted Average Age:
            </Text>
            <Text
              style={{
                padding: 10,
                flex: 5,
                color: '#FFFFFF',
                fontWeight: 'bold',
              }}>
         
{accounts.weightedAverageAge}
            </Text>
          </View>
          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />

          <View style={{height: 1, backgroundColor: 'white', opacity: 0.5}} />
        </ScrollView>
      )}
    </View>
  );
};

export default Account;
