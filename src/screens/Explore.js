import React from 'react';
import {
  Animated,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import DropDownPicker from 'react-native-dropdown-picker';
import {Col, Row, Grid} from 'react-native-paper-grid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {Appbar, Button, Searchbar, Card} from 'react-native-paper';
import {useNavigation} from '@react-navigation/native';
import axios from 'axios';
import {DrawerActions} from '@react-navigation/native';
import { DrawerHeader } from '../components/drawer'
const Explore = () => {
  const [data, setData] = React.useState({});
  const [loading, setloading] = React.useState(true);
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(null);
  const [error,setError]=React.useState(false);
  const [items, setItems] = React.useState([
    {label: 'Rich List', value: 'Rich List'},
    // {label: 'Top Statistics', value: 'Top Statistics'},
  ]);

  React.useEffect(() => {
    setloading(true);
    console.log('mount')
    dataarray()
    axios.get('https://mainnet-0.ndau.tech:3030/price/current').then(res => {
      setData(res.data);
      setloading(false);
    });

    addusd();

    return ()=>{
      console.log('unmount')
    }
  },[]);




 

  const moveBy=(val)=>{
    if (val == 'Rich List') {
     
      navigation.navigate('RichList');
    }
    else if(val == 'Top Statistics'){
      navigation.navigate('Statistics');
     
    }
  }
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center'}}
    />
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query =>{ 
    
    setSearchQuery(query);
    if(query.length ==0)
    {
      console.log('empty,.....')
      setError(true)
    }
    else{
      setError(false)
    }
  
  };
  const navigation = useNavigation();
  const convertNapuToNdau = (napuAmount, humanize = true, decimals = 8) => {
    if (napuAmount === 0 || napuAmount) {
      const ndauAmount = napuAmount / 100000000;
      return humanize ? humanizeNumber(ndauAmount, decimals) : ndauAmount;
    }
  };
  const addusd = (num = 0) => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  };
  const price_at_unit = nunits_sold => {
    const phase_blocks = 10000;
    const sale_block = Math.floor(nunits_sold / 1000);

    if (sale_block <= phase_blocks * 1) {
      // price in phase 1 has 14 doublings, from a starting point of $1 to a finishing price
      // of $16384 at the ten-thousandth block (the one that starts at 999,900)
      var price1 = Math.pow(2.0, (sale_block * 14) / 9999);
      return price1;
    }

    // NOTE: this function replaces the elaborate spreadsheet model for phase 2 with a cubic approximation
    // function that was developed // from a curve fit of a few of the key points on the phase 2 and
    // phase 3 data. It is off by a little bit from the initially proposed curve but it's vastly easier to calculate.
    // The difference is a little bit high early in phase 2 (at worst, 13% high) and drifts to about
    // 5% low late in phase 2. It's generally slightly high in phase 3, peaking at 8%, but that's probably
    // a good thing as it makes the curve more s-like.
    // Note that phase 1 is exactly as originally proposed and the slope at entry of phase 2 is deliberately smooth.
    if (sale_block < phase_blocks * 3) {
      // determined by a cubic curvefit for phase 2 and 3
      // y = -41633 - 8.286618*x + 0.00167424*x^2 - 2.654015e-8*x^3
      const d = -2.654015e-8;
      const c = 0.00167424;
      const b = -8.286618;
      const a = -41633;
      var x = sale_block;

      var price2 = d * Math.pow(x, 3) + c * Math.pow(x, 2) + b * x + a;
      return price2;
    }

    // after the end of phase 3 we don't sell any more ndau so just return the final price
    return 500450.83;
  };

  const nextIssuePrice = data?.totalIssued
    ? price_at_unit(data?.totalIssued / 10 ** 8)
    : 0;

  const humanizeNumber = (number, decimals = 2, minimumDecimals = 0) => {
    if (number || number === 0) {
      const num = Math.abs(number);
      const scale = Math.pow(10, decimals);
      const numberFloat = Math.round(num * scale) / scale; // parseFloat(num).toFixed(decimals)
      let numberString = numberFloat.toLocaleString('fullwide', {
        useGrouping: true,
        minimumSignificantDigits: 1,
      });
      if (minimumDecimals && typeof minimumDecimals === 'number') {
        let decimalPlace = numberString.indexOf('.');
        if (decimalPlace === -1) {
          numberString += '.';
          decimalPlace = numberString.indexOf('.');
        }

        const decimalPlaces = numberString.slice(decimalPlace + 1).length;
        let remainingDecimalPlaces = minimumDecimals - decimalPlaces;
        while (remainingDecimalPlaces > 0) {
          numberString += '0';
          remainingDecimalPlaces -= 1;
        }
      }
      return numberString;
    }
  };

  // Returns the price of the next ndau given the number already 
  close=()=>{

    navigation.dispatch(DrawerActions.openDrawer())
  }

  const dataarray=()=>{
    const chunkSize = 10;
  const arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21];
  const groups = arr.map((e, i) => { 
       return i % chunkSize === 0 ? arr.slice(i, i + chunkSize) : null; 
  }).filter(e => { return e; });
  console.log(groups[0])
  }
  goToTransactions=(val)=>{
    console.log('value',val)

    axios
            .get(
              // `https://mainnet-1.ndau.tech:3030/account/account/${val}`,
              `https://mainnet-1.ndau.tech:3030/transaction/detail/${val}?node=mainnet`
            )
            .then(res => {
            
              if(res.data){
              console.log('data',res);
               navigation.navigate('DetailTransection',{val:res.data});
               setError(false)
            
              // setItems(res.data[val]?.validationKeys.map((val)=>({label:val.substring(0, 40)+'...' ,value:val.substring(0, 40) +'...' })))
              }
              else{
                console.log('empty')
                setError(true)
                //  navigation.navigate('DetailTransection',{val:res.data});

                // setEmpty(res.data[val]);
              }
              // setloading(false);
          
            }).catch((e)=>{
              console.log('error',e);
              setError(true)
              // setloading(false);
    // setError(true);
    
            });

    //  


  }

  return (
    <View style={{flex: 1, backgroundColor: '#181F28'}}>
          {/* <DrawerHeader {...this.props}>Dashboard</DrawerHeader> */}

      <Appbar.Header style={{backgroundColor: '#181F28'}}>
        <Appbar.Action icon="menu" onPress={() => close()} />
        <ContentTitle title={'Blockchain Explorer'} style={{color: 'white'}} />
      </Appbar.Header>
      
      <View style={{flex: 1}}>
        <ScrollView>
          <Grid>
            <View style={{alignItems: 'center', marginTop: 10}}>
              <Searchbar
                style={{
                  backgroundColor: '#1A283A',
                  border: '#395470',
                  opacity: 0.5,
                  color: '#FFFFFF',
                }}
                placeholder="Search"
                inputStyle={{color:'#ffff'}}
                iconColor="#FFFFFF"
                placeholderTextColor="#ffffff"
                onChangeText={onChangeSearch}
              onSubmitEditing={()=>{
                if(searchQuery.length==48)
                {
                  navigation.navigate('Account',{val:searchQuery});
                }
                else if(searchQuery.length==22)
                {
                    goToTransactions(searchQuery);
             
                }
                else{
                  setError(true)
                  // alert('Invalid Entery');
                }
              }}
                value={searchQuery}
              />
              {error && searchQuery.length !=0 ?  <Text style={{color:'red'}}>Invalid Entry</Text>:null}
            </View>
            
            <Row style={{marginTop: 5, alignItems: 'center'}}>
              <Col
                size={19}
                style={{
                  cursor: 'pointer',
                  backgroundColor: '#012D5A',
                  height: 80,
                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity onPress={() => navigation.navigate('Block')} style={{textAlign:"center",alignItems:"center"}}>
                  <Image source={require('./box.png')} />
                  <Text style={{color: '#F89D1C'}}>Block</Text>
                </TouchableOpacity>
              </Col>
              <Col size={1}></Col>
              <Col
                size={19}
                style={{
                  backgroundColor: '#012D5A',
                  height: 80,

                  borderRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <TouchableOpacity
                style={{alignItems:"center"}}
                  onPress={() =>
                   navigation.navigate('Transection')}>
                  <Image
                    source={require('./dollars.png')}
              
                  />
                  <Text style={{color: '#F89D1C', textAlign: 'center'}}>
                    Transaction
                  </Text>
                </TouchableOpacity>
              </Col>
            </Row>
            <Row style={{marginTop: 10}}>
              <Col size={1} style={{zIndex: 20000, position: 'relative'}}>
                <View style={{flexDirection: 'column', alignItems: 'center'}}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate('stats')}
                    style={{
                      width: '100%',

                      justifyContent: 'space-between',
                      flexDirection: 'row',
                      alignItems: 'center',
                      height: 40,
                    }}>
                    <DropDownPicker
                      autoScroll={false}
                      
                      theme="DARK"
                      onChangeValue={(value)=>moveBy(value)}
                      style={{
                        backgroundColor: '#012D5A',
                        color: '#FFFF',
                        paddingVertical: 20,

                        borderWidth: 0,
                        
                      }}
                  
                    
                      ArrowUpIconComponent={({style}) => (
                        <Image source={require('./stats.png')} />
                      )}
                      ArrowDownIconComponent={({style}) => (
                        <Image source={require('./stats.png')} />
                      )}
                      dropDownContainerStyle={{
                        backgroundColor: '#012D5A',
                      }}
                      placeholderStyle={{
                        color: '#F89D1C',
                      }}
                      listItemLabelStyle={{
                        color: '#ffff',
                      }}
                      
                      placeholder="Select "
                      open={open}
                      value={value}
                      items={items}
                      onSelectItem={(value)=>{
                        moveBy(value.value)
                        // console.log('value',value.value)
                      }}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                    />
                    {/* <Text style={{color: '#F89D1C'}}>Statistics</Text>
                    <Image source={require('./stats.png')} /> */}
                  </TouchableOpacity>
                </View>
              </Col>
            </Row>
            <Row
              style={{
                flex: 1,
                zIndex:-5,
                borderRadius: 10,
                backgroundColor: '#132A47',
                marginTop: 20,
              }}
              nopad>
              <Col
                style={{
                  // shadowOffset: {width: 20, height: 10},
                  shadowOpacity: 0.8,
                  shadowRadius: 2,
                  elevation: 5,

                }}>
                <Row style={{marginTop: 10}} nopad>
                  <Col size={1} nopad>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 20,
                        borderBottomWidth: 1,
                        borderColor: 'grey',
                      }}>
                      <Text style={{color: 'grey'}}>NDAU ISSUES</Text>

                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        {addusd(
                          humanizeNumber(
                            convertNapuToNdau(data?.totalIssued, 0),
                            0,
                          ),
                        )}
                      </Text>
                    </View>
                  </Col>
                  <Col size={1} nopad>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 20,
                        borderBottomWidth: 1,
                        borderLeftWidth: 1,
                        borderColor: 'grey',
                      }}>
                      <Text style={{color: 'grey',shadowColor:'red',shadowOpacity:0}}>NEXT ISSUED PRICE</Text>

                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        ${nextIssuePrice.toFixed(4)}
                      </Text>
                    </View>
                  </Col>
                </Row>
                <Row nopad style={{width: '100%'}}>
                  <Col size={1} nopad>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        padding: 20,

                        borderColor: 'grey',
                      }}>
                      <Text style={{color: 'grey'}}>SIB IN EFFECT</Text>

                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        {(data?.sib / 10000000000).toFixed(3)}%
                      </Text>
                    </View>
                  </Col>
                  <Col size={1} nopad>
                    <View
                      style={{
                        flexDirection: 'column',
                        alignItems: 'center',
                        paddingVertical: 20,
                        

                        borderLeftWidth: 1,
                        borderColor: 'grey',
                      }}>
                      <Text style={{color: 'grey',textAlign:'center'}}>NDAU IN CIRCULATION</Text>

                      <Text
                        style={{
                          color: '#ffffff',
                          fontSize: 16,
                          fontWeight: 'bold',
                        }}>
                        {' '}
                        {addusd(
                          humanizeNumber(
                            convertNapuToNdau(data?.totalNdau, 0),
                            0,
                          ),
                        )}
                      </Text>
                    </View>
                  </Col>
                </Row>
                <Row style={{marginTop: 10}}>
                  <Col style={{justifyContent: 'center', alignItems: 'center'}}>
                    <Image source={require('./Browser.png')} />
                    <Text style={{color: 'grey'}}>Current Market Price</Text>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      ${(data?.marketPrice / 10 ** 11).toFixed(3)}
                    </Text>
                  </Col>
                </Row>
                <View style={{flex: 1, marginTop: 5}} collapsable={false}>
                <WebView
                    style={{
                      height: 230,
                      
                      width: '95%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
          source={{
            
            html: `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=0.73">
                  </head>
                  <body>
                    <div class="nomics-ticker-widget" data-name="Ndau" data-base="XND" data-quote="USD"></div>
                    <script src="https://widget.nomics.com/embed.js"></script>
                  </body>
                  </html>`
          }}
        />
                  {/* <WebView
                    style={{
                      height: 230,
                      width: '95%',
                      marginLeft: 'auto',
                      marginRight: 'auto',
                    }}
                    javaScriptEnabled
                    nestedScrollEnabled
                    useWebKit={true}
                    allowUniversalAccessFromFileURLs
                    injectedJavaScript={` const script = document.createElement('script');

                    script.src = 'https://widget.nomics.com/embed.js';
                    script.async = true;
               
                
                   const h1=document.createElement('h1');
                
                   
                    document.body.appendChild(script);
                    console.log(document);
                    `}
                    domStorageEnabled={true}
                    onContentProcessDidTerminate={syntheticEvent => {
                      const {nativeEvent} = syntheticEvent;
                      console.log(
                        'Content process terminated, reloading',
                        nativeEvent,
                      );
                      this.refs.webview.reload();
                    }}
                    onMessage={event => {
                      console.log(event);
                    }}
                    onError={syntheticEvent => {
                      const {nativeEvent} = syntheticEvent;
                      console.log('WebView error: ', nativeEvent);
                    }}
                    androidLayerType={'hardware'}
                    startInLoadingState={true}
                    javaScriptEnabledAndroid={true}
                    allowFileAccessFromFileURLs
                    setBuiltInZoomControls={false}
                    originWhitelist={['*']}
                    mixedContentMode="compatibility"
                    source={{
                      html: `<!DOCTYPE html>
                  <html>
                  <head>
                    <meta name="viewport" content="width=device-width, initial-scale=0.73">
                  </head>
                  <body>
                  <div >
                    <div class="nomics-ticker-widget" data-name="Ndau" data-base="XND" data-quote="USD"></div>
                   
                    </div>
                  </body>
                  </html>`,
                    }}
                  /> */}
                </View>
              </Col>
            </Row>
          </Grid>
        </ScrollView>
      </View>
    </View>
  );
};

export default Explore;
const styles = StyleSheet.create({
  lineStyle: {
    borderWidth: 0.5,
    borderColor: 'black',
    margin: 10,
  },
});
