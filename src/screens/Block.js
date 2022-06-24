import React from 'react';
import {Animated, Image, Text, TouchableOpacity, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {Col, Row, Grid} from 'react-native-paper-grid';
import {SafeAreaView} from 'react-native-safe-area-context';
import {WebView} from 'react-native-webview';
import {Appbar, Button, Searchbar} from 'react-native-paper';

const Block = () => {
  const ContentTitle = ({title, style}) => (
    <Appbar.Content
      title={<Text style={style}> {title} </Text>}
      style={{alignItems: 'center'}}
    />
  );
  const [searchQuery, setSearchQuery] = React.useState('');

  const onChangeSearch = query => setSearchQuery(query);
  return (
    <View style={{flex: 1, backgroundColor: '#181F28'}}>
      <Appbar.Header style={{backgroundColor: '#181F28'}}>
        <Appbar.Action icon="close" onPress={() => this.close()} />
        <ContentTitle title={'Blockchain Explorer'} style={{color: 'white'}} />
      </Appbar.Header>
     <Text style={{color:"#ffffff",fontSize:20,textAlign:"center"}}>Block</Text>
      
    </View>
  );
};

export default Block;
