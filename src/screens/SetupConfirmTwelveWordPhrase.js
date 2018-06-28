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
      twelveWordPhraseFromEntropy: '',
      twelveWordPhraseFromEntropyArray: [],
      twelveWordPhraseFromSelection: '',
      textColor: '#ffffff'
    };
  }

  componentDidMount = () => {
    // defaults to BIP39 English word list
    // uses HEX strings for entropy
    const mnemonic = bip39.entropyToMnemonic(this.props.entropy);

    this.setState({
      twelveWordPhraseFromEntropy: mnemonic,
      twelveWordPhraseFromEntropyArray: mnemonic ? this.shuffleArray(mnemonic.split(' ')) : []
    });
    console.log(`here is the mnemonic: ${mnemonic}`);
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

  render() {
    const firstThree = this.state.twelveWordPhraseFromEntropyArray.slice(0, 3);
    const secondThree = this.state.twelveWordPhraseFromEntropyArray.slice(3, 6);
    const thirdThree = this.state.twelveWordPhraseFromEntropyArray.slice(6, 9);
    const fourthThree = this.state.twelveWordPhraseFromEntropyArray.slice(9, 12);
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
              // onChangeText={(twelveWordPhraseFromSelection) =>
              //   this.setState({
              //     twelveWordPhraseFromSelection
              //   })}
              value={this.state.twelveWordPhraseFromSelection}
              placeholder="Scribble area"
              placeholderTextColor="#333"
              multiline={true}
              numberOfLines={2}
            />
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                Please enter the words in the correct order. De-select the last word to continue.{' '}
              </Text>
            </View>
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
            <Button color="#4d9678" onPress={this.onPushAnother} title="Next" />
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

  handleClick(item) {
    const newValue = this.state.twelveWordPhraseFromSelection + item + ' ';
    this.setState({ twelveWordPhraseFromSelection: newValue });
  }

  showWord(index, item) {
    return (
      <View key={index} style={styles.rowTextView}>
        <TouchableHighlight onPress={(event) => this.handleClick(item, event)}>
          <Text
            style={{
              color: '#ffffff',
              fontSize: 20,
              textAlign: 'center'
            }}
          >
            {item}
          </Text>
        </TouchableHighlight>
      </View>
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
  rowTextView: {
    height: 40,
    width: 100,
    marginBottom: 10,
    marginTop: 10
  }
});

export default SetupConfirmTwelveWordPhrase;
