import React, { Component } from 'react';

import { StyleSheet, TouchableOpacity, Text, Platform, NativeModules } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import Autocomplete from 'react-native-autocomplete-input';
import styleConstants from '../css/styleConstants';
import AppConstants from '../AppConstants';

const API = 'https://swapi.co/api';

class RecoveryDropdown extends Component {
  constructor(props) {
    super(props);

    this.state = {
      films: [ 'drift', 'drill', 'drink', 'drip', 'drive' ],
      query: '',
      list: []
    };
  }
  // componentDidMount() {
  //   fetch(`${API}/films/`).then((res) => res.json()).then((json) => {
  //     const { results: films } = json;
  //     console.log(`films: ${JSON.stringify(films)}`);
  //     this.setState({ films });
  //   });
  // }
  //TODO: we are going to have to write them somewhere...
  onPress(title) {
    console.log(`title selected is ${title}`);
    this.setState({ query: title, list: [] });
  }
  findFilm(query) {
    if (query === '') {
      return [];
    }

    const { films } = this.state;
    const regex = new RegExp(`${query.trim()}`, 'i');
    return films.filter((film) => film.search(regex) >= 0);
  }

  goGetTheData = async (query) => {
    if (query) {
      const words = await NativeModules.KeyaddrManager.keyaddrWordsFromPrefix(
        AppConstants.APP_LANGUAGE,
        query,
        3
      );
      console.log(`words are ${words}`);
      wordsArray = words.split(' ');
      this.setState({ list: wordsArray.length > 1 ? wordsArray : [] });
    }
  };

  getData = (query) => {
    console.log(`query: ${query}`);
    this.goGetTheData(query);
    // const comp = (a, b) => a.toLowerCase().trim() === b.toLowerCase().trim()

    // return films.length === 1 && comp(query, films[0]) ? [] : films;
    return this.state.list;
  };
  render() {
    const { query } = this.state;
    // const films = this.findFilm(query);

    return (
      <Autocomplete
        style={styles.mainStyle}
        autoCapitalize="none"
        autoCorrect={false}
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.containerStyle}
        data={this.getData(query)}
        // value={query}
        defaultValue={query}
        onChangeText={(text) => this.setState({ query: text })}
        listContainerStyle={styles.listContainerStyle}
        listStyle={styles.listContainerStyle}
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
    textAlign: 'center',
    zIndex: 1
  },
  autocompleteContainer: {
    ...Platform.select({
      ios: {
        // marginLeft: wp('1%'),
        // marginRight: wp('1%'),
        backgroundColor: styleConstants.APP_BACKGROUND_COLOR
      },
      android: {
        flex: 1,
        // left: 0,
        // position: 'absolute',
        // right: 0,
        // top: 0,
        // height: hp('5%'),
        // width: wp('31%'),
        zIndex: 1,
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
    width: wp('29%'),
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    paddingLeft: wp('1%')
  },
  listContainerStyle: {
    borderRadius: 6
    // height: hp('10%'),
    // backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    // zIndex: 1000
  },
  listStyle: {
    color: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  itemText: {
    color: '#ffffff',
    fontSize: 14,
    fontFamily: 'TitilliumWeb-Light',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
    // textAlign: 'center',
    // borderRadius: 6
  }
});

export default RecoveryDropdown;
