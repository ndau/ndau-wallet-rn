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
import bip39 from 'react-native-bip39';

class SetupConfirmTwelveWordPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      twelveWordPhraseFromSelection: '',
      textColor: '#ffffff',
      showErrorText: false,
      errorWord: '',
      errorCount: 0,
      selectedPhrase: '',
      match: false
    };
  }

  componentDidMount = () => {
    //add default props
    for (item in this.props.twelveWordPhraseArray) {
      this.setState({ [`${item}BackgroundColor`]: '#1c2227' });
    }
  };

  onPushAnother = () => {
    this.props.navigator.push({
      label: 'SetupTermsOfService',
      screen: 'ndau.SetupTermsOfService',
      passProps: {
        encryptionPassword: this.props.password,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles
      }
    });
  };

  pushBackToGetRandom = () => {
    this.props.navigator.push({
      label: 'SetupGetRandom',
      screen: 'ndau.SetupGetRandom',
      passProps: {
        encryptionPassword: this.props.password,
        userId: this.props.userId,
        parentStyles: this.props.parentStyles
      }
    });
  };

  disable;

  render() {
    const firstThree = this.props.twelveWordPhraseArray.slice(0, 3);
    const secondThree = this.props.twelveWordPhraseArray.slice(3, 6);
    const thirdThree = this.props.twelveWordPhraseArray.slice(6, 9);
    const fourthThree = this.props.twelveWordPhraseArray.slice(9, 12);
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Confirm twelve-word phrase</Text>
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
              value={this.state.twelveWordPhraseFromSelection}
              placeholder="Scribble area"
              placeholderTextColor="#333"
              multiline={true}
              numberOfLines={2}
            />
            {this.state.showErrorText ? this.state.errorCount < 3 ? (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  Please enter the words in the correct order. De-select the last word to continue.{' '}
                </Text>
              </View>
            ) : (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>
                  After four errors, you will have to generate a new twelve-word phrase. Write down
                  your phrase instead of memorizing it, or you may lose access to your ndau.{' '}
                </Text>
              </View>
            ) : null}
            <View style={styles.rowView}>
              {firstThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {secondThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {thirdThree.map((item, index) => {
                return this.showWord(index, item);
              })}
            </View>
            <View style={styles.rowView}>
              {fourthThree.map((item, index) => {
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

  shuffleArray(array) {
    var currentIndex = array.length,
      temporaryValue,
      randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }

  confirmPhraseOrder() {
    const twelveWordPhraseFromSelectionArray = this.state.twelveWordPhraseFromSelection.split(' ');
    if (
      this.props.twelveWordPhraseArray[twelveWordPhraseFromSelectionArray.length - 2] !==
      this.state.selectedPhrase
    ) {
      this.setState(
        {
          [`${this.state.selectedPhrase}BackgroundColor`]: '#ff0000',
          showErrorText: true,
          errorCount: this.state.errorCount + 1,
          errorWord: this.state.selectedPhrase
        },
        () => {
          console.log(`errorCount is now at ${this.state.errorCount}`);
          if (this.state.errorCount >= 4) {
            this.pushBackToGetRandom();
          }
        }
      );
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
      if (item === this.state.errorWord) {
        let newTWPFromSelection = this.state.twelveWordPhraseFromSelection.substring(
          0,
          this.state.twelveWordPhraseFromSelection.lastIndexOf(
            ' ',
            this.state.twelveWordPhraseFromSelection.length - 2
          )
        );
        this.setState(
          {
            twelveWordPhraseFromSelection: newTWPFromSelection + ' '
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
    } else if (this.state.twelveWordPhraseFromSelection.indexOf(item) !== -1) {
      return;
    } else {
      const newValue = this.state.twelveWordPhraseFromSelection + item;
      const newValueArray = newValue.split(' ');
      newValue += ' ';
      const match =
        JSON.stringify(this.props.twelveWordPhraseArray) == JSON.stringify(newValueArray);
      console.log(`phrase to match is: ${JSON.stringify(this.props.twelveWordPhraseArray)}`);
      console.log(`phrase entered by user is: ${JSON.stringify(newValueArray)}`);
      this.setState(
        {
          twelveWordPhraseFromSelection: newValue,
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

export default SetupConfirmTwelveWordPhrase;
