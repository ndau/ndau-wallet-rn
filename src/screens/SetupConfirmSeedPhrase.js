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

class SetupConfirmSeedPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      seedPhraseFromSelection: '',
      textColor: '#ffffff',
      showErrorText: false,
      errorWord: '',
      errorCount: 0,
      selectedPhrase: '',
      match: false,
      firstThree: [],
      secondThree: [],
      thirdThree: [],
      fourthThree: []
    };
  }

  componentDidMount = () => {
    this.props.navigator.setStyle({
      drawUnderTabBar: true,
      tabBarHidden: true
    });
    //add default props
    for (item in this.props.seedPhraseArray) {
      this.setState({ [`${item}BackgroundColor`]: '#1c2227' });
    }

    //shuffle the deck
    let shuffledArray = this.shuffleArray(this.props.seedPhraseArray);
    this.setState({
      firstThree: shuffledArray.slice(0, 3),
      secondThree: shuffledArray.slice(3, 6),
      thirdThree: shuffledArray.slice(6, 9),
      fourthThree: shuffledArray.slice(9, 12)
    });
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupTermsOfService',
      screen: 'ndau.SetupTermsOfService',
      backButtonHidden: true,
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

  render() {
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
              style={{
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
              }}
              value={this.state.seedPhraseFromSelection}
              placeholder=""
              placeholderTextColor="#333"
              multiline={true}
              numberOfLines={2}
              editable={false}
            />
            {this.state.showErrorText ? this.state.errorCount < 4 ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Please enter the words in the correct order. De-select the last word to continue.{' '}
                </Text>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Please click the Back button to generate a new seed phrase. Write down your phrase
                  instead of memorizing it, or you may lose access to your ndau.{' '}
                </Text>
              </View>
            ) : null}
            <View style={styles.rowView}>
              {this.state.firstThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {this.state.secondThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {this.state.thirdThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {this.state.fourthThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
          </ScrollView>
          <View style={styles.footer}>
            <Button
              color="#4d9678"
              onPress={this.onPushAnother}
              title="Next"
              disabled={!this.state.match}
            />
          </View>
        </View>
      </SafeAreaView>
    );
  }

  // shuffleArray implements a Fisher-Yates shuffle algorithm;
  // walks through the array backwards once, exchanging each value
  // with a random element from the remainder of the array
  shuffleArray(b) {
    let a = b.slice();
    for (let i = a.length - 1; i >= 0; i--) {
      let r = Math.floor(Math.random() * i);
      // now swap r and i
      [ a[i], a[r] ] = [ a[r], a[i] ];
    }
    return a;
  }

  confirmPhraseOrder() {
    const seedPhraseFromSelectionArray = this.state.seedPhraseFromSelection.split(' ');
    if (
      this.props.seedPhraseArray[seedPhraseFromSelectionArray.length - 2] !==
      this.state.selectedPhrase
    ) {
      this.setState({
        [`${this.state.selectedPhrase}BackgroundColor`]: '#ff0000',
        showErrorText: true,
        errorCount: this.state.errorCount + 1,
        errorWord: this.state.selectedPhrase
      });
    } else {
      this.setState({
        [`${this.state.selectedPhrase}BackgroundColor`]: '#0000ff',
        showErrorText: false,
        errorWord: ''
      });
    }
  }

  handleClick(item) {
    if (this.state.showErrorText) {
      if (item === this.state.errorWord && this.state.errorCount < 4) {
        let newTWPFromSelection = this.state.seedPhraseFromSelection.substring(
          0,
          this.state.seedPhraseFromSelection.lastIndexOf(
            ' ',
            this.state.seedPhraseFromSelection.length - 2
          )
        );
        this.setState(
          {
            seedPhraseFromSelection: newTWPFromSelection + ' '
          },
          () => {
            this.setState({
              [`${this.state.selectedPhrase}BackgroundColor`]: '#1c2227',
              showErrorText: false,
              errorWord: '',
              selectedPhrase: ''
            });
            this.confirmPhraseOrder;
          }
        );
      } else {
        return;
      }
    } else if (this.state.seedPhraseFromSelection.indexOf(item) !== -1) {
      return;
    } else {
      const newValue = this.state.seedPhraseFromSelection + item;
      const newValueArray = newValue.split(' ');
      newValue += ' ';
      const match = _.isEqual(this.props.seedPhraseArray, newValueArray);
      this.setState(
        {
          seedPhraseFromSelection: newValue,
          selectedPhrase: item,
          match: match
        },
        this.confirmPhraseOrder
      );
    }
  }

  showWord(index, item) {
    return (
      <TouchableHighlight key={index} onPress={(event) => this.handleClick(item, event)}>
        <View
          style={{
            height: 40,
            width: 100,
            marginBottom: 10,
            marginTop: 10,
            backgroundColor: eval(`this.state.${item}BackgroundColor`)
          }}
        >
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              textAlign: 'center'
            }}
          >
            {item}
          </Text>
        </View>
      </TouchableHighlight>
    );
  }
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
    justifyContent: 'flex-end'
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
  }
});

export default SetupConfirmSeedPhrase;
