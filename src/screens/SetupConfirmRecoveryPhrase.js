import React, { Component } from 'react';
import {
  PixelRatio,
  StyleSheet,
  View,
  ScrollView,
  Text,
  TextInput,
  TouchableHighlight
} from 'react-native';
import { SafeAreaView } from 'react-navigation';
import groupIntoRows from '../helpers/groupIntoRows';
import ErrorPanel from '../components/ErrorPanel';
import CommonButton from '../components/CommonButton';
import Stepper from '../components/Stepper';
import cssStyles from '../css/styles';
import SetupStore from '../model/SetupStore';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';

var _ = require('lodash');

const MAX_ERRORS = 4; // 4 strikes and you're out
const ROW_LENGTH = 3; // 3 items per row

let boxWidth = '30%';
let boxHeight = '10%';

class SetupConfirmRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      textColor: '#ffffff',
      inError: false,
      mustRetry: false,
      errorCount: 0,
      match: false,
      selected: []
    };

    // chop the words into ROW_LENGTH-tuples
    this.rowLength = ROW_LENGTH;
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1;
      boxWidth = '100%';
      boxHeight = '17%';
    }
  }

  showNextSetup = () => {
    this.props.navigation.navigate('SetupTermsOfService');
  };

  pushBack = () => {
    this.props.navigation.navigate('SetupGetRandom');
  };

  render() {
    const shuffledWords = SetupStore.getShuffledWords();
    const words = groupIntoRows(shuffledWords, this.rowLength);

    // lookup table for word highlights
    const selected = this.state.selected.reduce((arr, cur) => {
      arr[cur] = true;
      return arr;
    }, {});

    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={styles.contentContainer}>
            <Stepper screenNumber={7} />
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                Demonstrate that you wrote the phrase down by tapping the words below in order.{' '}
              </Text>
            </View>
            {/* <TextInput
              style={styles.textArea}
              value={this.state.selected.map((i) => shuffledWords[i]).join(' ')}
              placeholder=""
              placeholderTextColor="#333"
              multiline={true}
              numberOfLines={2}
              editable={false}
              selectTextOnFocus={false}
              caretHidden={true}
            /> */}
            {this.state.inError ? (
              <ErrorPanel
                errorText={
                  this.state.mustRetry ? (
                    'Please click the Back button to generate a new recovery phrase. Write down your phrase instead of memorizing it, or you may lose access to your ndau.'
                  ) : (
                    'Please enter the words in the correct order. De-select the last word to continue.'
                  )
                }
              />
            ) : null}

            {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={styles.rowView}>
                  {row.map((item, index) => {
                    const i = index + row.length * rowIndex;
                    return (
                      <Word
                        key={i}
                        error={this.state.errorWord == i}
                        selected={selected[i]}
                        onPress={(event) => this.handleClick(i, event)}
                      >
                        {item}
                      </Word>
                    );
                  })}
                </View>
              );
            })}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.navButtonWrapper}>
              <CommonButton onPress={() => this.pushBack()} title="Back (resets phrase)" />
            </View>
            <View style={styles.navButtonWrapper}>
              <CommonButton
                onPress={() => this.showNextSetup()}
                title="Next"
                disabled={!this.state.match}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  checkMistakes() {
    const correctSoFar = SetupStore.getShuffledMap().slice(0, this.state.selected.length);
    if (!_(this.state.selected).isEqual(correctSoFar)) {
      let errorCount = this.state.errorCount + 1;
      this.setState({
        inError: true,
        mustRetry: errorCount >= MAX_ERRORS,
        errorCount: errorCount,
        errorWord: this.state.selected[this.state.selected.length - 1]
      });
    } else {
      this.setState({
        inError: false,
        errorWord: null
      });
    }
  }

  checkDone() {
    if (_(this.state.selected).isEqual(SetupStore.getShuffledMap())) {
      this.setState({ match: true });
    }
  }

  handleClick(index) {
    const selected = this.state.selected.slice();
    const foundIndex = selected.indexOf(index);
    if (foundIndex !== -1) {
      // already selected item was clicked
      selected.splice(foundIndex, 1);
      this.setState({ selected }, this.afterClick);
    } else if (!this.state.inError) {
      selected.push(index);
      this.setState({ selected }, this.afterClick);
    }
  }
  afterClick() {
    this.checkMistakes();
    this.checkDone();
  }
}

function Word(props) {
  let bgColor = 'transparent';
  if (props.error) {
    bgColor = '#f05123';
  } else if (props.selected) {
    bgColor = '#4e957a';
  }

  return (
    <TouchableHighlight onPress={props.onPress}>
      <View
        style={{
          height: hp(boxHeight),
          width: wp(boxWidth),
          marginBottom: wp('1%'),
          marginTop: wp('1%'),
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          borderRadius: 6
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20,
            fontFamily: 'TitilliumWeb-Regular',
            textAlign: 'center'
          }}
        >
          {props.children}
        </Text>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  contentContainer: {
    flex: 1 // pushes the footer to the end of the screen
  },
  footer: {
    justifyContent: 'flex-end',
    display: 'flex'
  },
  navButtonWrapper: {
    // flexDirection: 'center',
    justifyContent: 'space-between',
    marginTop: hp('2%')
  },
  navButtons: {
    width: wp('40%')
  },
  progress: {
    paddingTop: 30,
    paddingBottom: 30
  },
  rowView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  textArea: {
    height: hp('100%'),
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: hp('1%'),
    marginTop: hp('1%'),
    paddingLeft: wp('1%'),
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

export default SetupConfirmRecoveryPhrase;
