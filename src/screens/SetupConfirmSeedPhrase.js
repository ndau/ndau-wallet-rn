import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ScrollView,
  Text,
  Button,
  ProgressViewIOS,
  Platform,
  ProgressBarAndroid,
  SafeAreaView,
  TextInput,
  TouchableHighlight
} from 'react-native';

var _ = require('lodash');

const MAX_ERRORS = 4; // 4 strikes and you're out
const ROW_LENGTH = 3; // 3 items per row

class SetupConfirmSeedPhrase extends Component {
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
  }


  componentDidMount() {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
  };

  onPushAnother() {
    this.props.navigator.push({
      label: 'SetupTermsOfService',
      screen: 'ndau.SetupTermsOfService',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts,
        seedPhraseArray: this.props.seedPhraseArray
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      }
    });
  };

  onPushBack() {
    this.props.navigator.push({
      label: 'SetupGetRandom',
      screen: 'ndau.SetupGetRandom',
      passProps: {
        encryptionPassword: this.props.encryptionPassword,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles,
        iconsMap: this.props.iconsMap,
        numberOfAccounts: this.props.numberOfAccounts
      },
      navigatorStyle: {
        drawUnderTabBar: true,
        tabBarHidden: true,
        disabledBackGesture: true
      }
    });
  };

  render() {

    // chop the words into ROW_LENGTH-tuples
    const words = this.props.shuffledWords.reduce((arr, _, i, org) =>
      !(i % ROW_LENGTH) ? arr.concat([org.slice(i, i + ROW_LENGTH)]) : arr, []
    );

    // lookup table for highlights
    const selected = this.state.selected.reduce((arr, cur) => { arr[cur] = true; return arr; }, {})
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Confirm seed phrase</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={0.625}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                  <ProgressViewIOS progress={0.625} style={this.props.parentStyles.progress} />
                )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Demonstrate that you wrote the phrase down by tapping the words below in order.{' '}
              </Text>
            </View>
            <TextInput
              style={styles.textArea}
              value={this.state.selected.map((i) => this.props.shuffledWords[i]).join(' ')}
              placeholder=""
              placeholderTextColor="#333"
              multiline={true}
              numberOfLines={2}
              editable={false}
            />
            {this.state.inError ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  {this.state.mustRetry ?
                    'Please click the Back button to generate a new seed phrase. Write down your phrase instead of memorizing it, or you may lose access to your ndau.'
                    :
                    'Please enter the words in the correct order. De-select the last word to continue.'
                  }
                </Text>
              </View>
            ) : null}


            {words.map((row, rowIndex) => {
              return (<View key={rowIndex} style={styles.rowView}>
                {row.map((item, index) => {
                  const i = index + (row.length * rowIndex)
                  return <Word
                    key={i}
                    error={this.state.errorWord == i}
                    selected={selected[i]}
                    onPress={(event) => this.handleClick(i, event)}
                  >{item}</Word>
                })}
              </View>)
            })}
          </ScrollView>
          <View style={styles.footer}>
            <View style={styles.navButtonWrapper}>
              <Button
                color="#4d9678"
                onPress={() => this.onPushBack()}
                title="Back (resets phrase)"
                style={styles.navButtons}
              />
              <Button
                color="#4d9678"
                onPress={() => this.onPushAnother()}
                title="Next"
                disabled={!this.state.match}
                style={styles.navButtons}
              />
            </View>
          </View>
        </View>
      </SafeAreaView>
    );
  }


  checkMistakes() {
    const correctSoFar = this.props.shuffleMap.slice(0, this.state.selected.length)
    if (!_(this.state.selected).isEqual(correctSoFar)) {
      let errorCount = this.state.errorCount + 1;
      this.setState({
        inError: true,
        mustRetry: errorCount >= MAX_ERRORS,
        errorCount: errorCount,
        errorWord: this.state.selected[this.state.selected.length - 1]
      })
    } else {
      this.setState({
        inError: false,
        errorWord: null
      })
    }
  }

  checkDone() {
    if (_(this.state.selected).isEqual(this.props.shuffleMap)) {
      this.setState({ match: true });
    }
  }

  handleClick(index) {
    const item = this.props.shuffledWords[index];
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
    bgColor = '#ff0000';
  } else if (props.selected) {
    bgColor = '#0000ff'
  }

  return (
    <TouchableHighlight onPress={props.onPress}>
      <View
        style={{
          height: 40,
          width: 100,
          marginBottom: 10,
          marginTop: 10,
          backgroundColor: bgColor,
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1
        }}
      >
        <Text
          style={{
            color: '#ffffff',
            fontSize: 20
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
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,

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
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  navButtons: {
    width: '40%',
    marginLeft: 50,
    marginRight: 50
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
  errorText: {
    color: '#f75f4b',
    fontSize: 20
  },
  errorContainer: {
    backgroundColor: '#f5d8d1'
  },
  textArea: {
    height: 70,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  }
});

export default SetupConfirmSeedPhrase;
