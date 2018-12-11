import React, { Component } from 'react'

import {
  StyleSheet,
  TouchableOpacity,
  Text,
  Platform,
  NativeModules
} from 'react-native'
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen'
import Autocomplete from 'react-native-autocomplete-input'
import styleConstants from '../css/styleConstants'
import AppConstants from '../AppConstants'

class RecoveryDropdown extends Component {
  constructor (props) {
    super(props)

    this.state = {
      query: null,
      list: [],
      textColor: '#ffffff'
    }

    this.retrievedData = false
    this.autoCompleteRef = null
  }
  // TODO: we are going to have to write them somewhere...
  onPress (title) {
    console.log(`title selected is ${title}`)
    this.setState({ query: title, list: [] })
    this.props.addToRecoveryPhrase(title)
    this.props.setDisableArrows(false)
  }

  clearWord = () => {
    this.setState({ query: '', list: [] })
  }

  focus = () => {
    if (this.autoCompleteRef) {
      this.autoCompleteRef.focus()
    }
  }

  goGetTheData = async query => {
    if (query && !this.retrievedData) {
      const words = await NativeModules.KeyaddrManager.keyaddrWordsFromPrefix(
        AppConstants.APP_LANGUAGE,
        query,
        5
      )
      this.retrievedData = true
      const wordsArray = words.split(' ')

      console.log(`words; ${words} query: ${query}`)
      if (words === query) {
        this.props.setDisableArrows(false)
        this.setState({ list: [] })
        return
      } else if (wordsArray.indexOf(query) >= 0) {
        this.props.setDisableArrows(false)
      } else {
        this.props.setDisableArrows(true)
      }

      if (wordsArray[0] === '') {
        this.setState({ textColor: '#ff0000', list: [] })
        this.props.setAcquisitionError(true)
      } else {
        this.setState({ textColor: '#ffffff' })
        this.props.setAcquisitionError(false)
      }

      this.setState({
        list: wordsArray.length >= 0 ? wordsArray : []
      })
    }
  }

  getData = query => {
    this.goGetTheData(query)
    let dropdownValueIsPrinted = false
    if (
      this.state.list.length === 1 &&
      this.state.list[0] === this.state.query
    ) {
      dropdownValueIsPrinted = true
    }
    return dropdownValueIsPrinted ? [] : this.state.list
  }

  render () {
    const { query } = this.state
    const mainStyle = {
      backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
      color: this.state.textColor,
      fontSize: 20,
      fontFamily: 'TitilliumWeb-Regular',
      borderRadius: 3,
      zIndex: 1
    }

    return (
      <Autocomplete
        style={mainStyle}
        autoCapitalize='none'
        autoCorrect={false}
        autoFocus
        containerStyle={styles.autocompleteContainer}
        inputContainerStyle={styles.containerStyle}
        data={this.getData(query)}
        defaultValue={query || this.props.recoveryWord}
        onChangeText={text => {
          this.retrievedData = false
          this.setState({
            query: text,
            list: text === '' ? [] : this.state.list
          })
          this.props.addToRecoveryPhrase(text)
        }}
        listContainerStyle={styles.listContainerStyle}
        placeholderTextColor='#ffffff'
        renderItem={item => (
          <TouchableOpacity onPress={() => this.onPress(item)}>
            <Text style={styles.itemText}>{item}</Text>
          </TouchableOpacity>
        )}
        ref={input => {
          this.autoCompleteRef = input
        }}
        {...this.prop}
      />
    )
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1
  },
  autocompleteContainer: {
    ...Platform.select({
      ios: {
        backgroundColor: styleConstants.APP_BACKGROUND_COLOR
      },
      android: {
        flex: 1,
        borderRadius: 3
      }
    })
  },
  inputContainerStyle: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Regular',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR
  },
  containerStyle: {
    alignContent: 'center',
    justifyContent: 'center',
    borderRadius: 3,
    width: wp('53%'),
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        paddingLeft: wp('2%'),
        height: hp('6%')
      },
      android: {
        height: hp('7%')
      }
    })
  },
  listContainerStyle: {
    width: wp('53%')
  },
  itemText: {
    color: '#ffffff',
    fontSize: 20,
    fontFamily: 'TitilliumWeb-Light',
    backgroundColor: styleConstants.APP_BACKGROUND_COLOR,
    paddingLeft: wp('2%'),
    paddingTop: wp('2%'),
    paddingBottom: wp('2%')
  }
})

export default RecoveryDropdown
