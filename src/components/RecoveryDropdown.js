import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity, Text, Platform, NativeModules } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
import styleConstants from '../css/styleConstants';
import AppConstants from '../AppConstants';

class RecoveryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: null,
      list: []
    };

    this.retrievedData = false;
  }
  //TODO: we are going to have to write them somewhere...
  onPress(title) {
    console.log(`title selected is ${title}`);
    this.setState({ query: title, list: [] });
    this.props.addToRecoveryPhrase(title, this.props.index);
  }

  goGetTheData = async (query) => {
    if (query && !this.retrievedData) {
      const words = await NativeModules.KeyaddrManager.keyaddrWordsFromPrefix(
        AppConstants.APP_LANGUAGE,
        query,
        5
      );
      console.log(`words are ${words}`);
      this.retrievedData = true;
      wordsArray = words.split(' ');
      this.setState({
        list: wordsArray.length > 1 ? wordsArray : []
      });
    }
  };

  getData = (query) => {
    console.log(`query: ${query}`);
    this.goGetTheData(query);
    return this.state.list;
  };

  render() {
    const { query } = this.state;

    return (
      <Autocomplete
        style={styles.mainStyle}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.containerStyle}
        data={this.getData(query)}
        defaultValue={query}
        onChangeText={(text) => {
          this.retrievedData = false;
          this.setState({ query: text, list: text === '' ? [] : this.state.list });
        }}
        listContainerStyle={styles.listContainerStyle}
        placeholderTextColor="#ffffff"
        renderItem={(item) => (
          <TouchableOpacity onPress={() => this.onPress(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
      />
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  mainStyle: {
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    borderRadius: 6,
    zIndex: 1
  },
  autocompleteContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: styleConstants.APP_BACKGROUND_COLOR
      },
      android: {
        flex: 1,
        borderRadius: 6
      }
    })
  },
  inputContainerStyle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    height: hp('6%'),
    width: wp('60%'),
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    ...Platform.select({
      ios: {
        paddingLeft: wp('2%')
      }
    })
  },
  listContainerStyle: {
    width: wp('60%')
  },
  itemText: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Light',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    paddingLeft: wp('2%'),
    paddingTop: wp('2%'),
    paddingBottom: wp('2%')
  }
});

export default RecoveryDropdown;
