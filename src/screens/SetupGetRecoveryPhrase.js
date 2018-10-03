import React, { Component } from 'react';
import { PixelRatio, View, ScrollView, Text, NativeModules } from 'react-native';
import groupIntoRows from '../helpers/groupIntoRows';
import CommonButton from '../components/CommonButton';
import RNExitApp from 'react-native-exit-app';
import cssStyles from '../css/styles';
import { SafeAreaView } from 'react-navigation';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp
} from 'react-native-responsive-screen';
import RecoveryDropdown from '../components/RecoveryDropdown';
import Carousel from 'react-native-looped-carousel';

var _ = require('lodash');

const DEFAULT_ROW_LENGTH = 3; // 3 items per row

class SetupGetRecoveryPhrase extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recoveryPhrase: [ '', '', '', '', '', '', '', '', '', '', '', '' ],
      size: { width: wp('20%'), height: hp('30%') }
    };

    this.boxWidth = '30%';
    this.boxHeight = '18%';
    this.rowLength = DEFAULT_ROW_LENGTH;
    // if someone has cranked up the font use 1 row instead
    console.log(`PixelRatio.getFontScale is ${PixelRatio.getFontScale()}`);
    if (PixelRatio.getFontScale() > 2) {
      this.rowLength = 1;
      this.boxWidth = '100%';
      this.boxHeight = '30%';
      console.log(`boxWidth: ${this.boxWidth} and boxHeight: ${this.boxHeight}`);
    }
  }

  componentDidMount = () => {};

  showExitApp() {
    Alert.alert(
      '',
      `Problem occurred validating the phrase, please contact Oneiro.`,
      [
        {
          text: 'Exit app',
          onPress: () => {
            RNExitApp.exitApp();
          }
        }
      ],
      { cancelable: false }
    );
  }

  verify = () => {};

  _onLayoutDidChange = (e) => {
    const layout = e.nativeEvent.layout;
    this.setState({ size: { width: layout.width, height: layout.height } });
  };

  render() {
    // chop the words into DEFAULT_ROW_LENGTH-tuples
    const words = groupIntoRows(this.state.recoveryPhrase, this.rowLength);
    const styles = {
      rowTextView: {
        height: hp(this.boxHeight),
        width: wp(this.boxWidth)
      }
    };

    let count = 1;

    const pages = generatePages(3, this.state.size);

    return (
      <SafeAreaView style={cssStyles.safeContainer}>
        <View style={cssStyles.container}>
          <ScrollView style={cssStyles.contentContainer}>
            <View style={{ marginBottom: 10 }}>
              <Text style={cssStyles.wizardText}>
                To verify your account please verify your twelve-word recovery phrase below. Start
                typing, then pick the correct suggestion.
              </Text>
            </View>
            <View style={{ flex: 1 }} onLayout={this._onLayoutDidChange}>
              <Carousel
                style={this.state.size}
                leftArrowText={'＜'}
                leftArrowStyle={{ color: 'white', fontSize: 22, margin: 20 }}
                rightArrowText={'＞'}
                rightArrowStyle={{ color: 'white', fontSize: 22, margin: 20 }}
                pageInfo
                arrows
                isLooped={false}
                autoplay={false}
                onAnimateNextPage={(p) => console.log(p)}
              >
                {pages}
              </Carousel>
            </View>
            {/* {words.map((row, rowIndex) => {
              return (
                <View key={rowIndex} style={cssStyles.rowView}>
                  {row.map((item, index) => {
                    return (
                      <View key={index} style={styles.rowTextView}>
                        <Text
                          style={{
                            color: '#ffffff',
                            fontSize: 20,
                            fontFamily: 'TitilliumWeb-Regular',
                            textAlign: 'center',
                            paddingBottom: 0,
                            marginBottom: 0,
                            height: hp('5%')
                          }}
                        >
                          {count++}.
                        </Text>
                        <RecoveryDropdown />
                      </View>
                    );
                  })}
                </View>
              );
            })} */}
          </ScrollView>
          <View style={styles.footer}>
            <CommonButton onPress={this.verify} title="Verify" />
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const colors = [
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548',
  '#9E9E9E',
  '#607D8B'
];

const generateRandomColorsArray = (length) =>
  Array.from(Array(length)).map(() => colors[Math.floor(Math.random() * colors.length)]);

const generatePages = (length, size) =>
  generateRandomColorsArray(length).map((color, i) => (
    <View style={[ { backgroundColor: color }, size ]} key={i}>
      <Text style={{ fontSize: 22 }}>{i}</Text>
    </View>
  ));

export default SetupGetRecoveryPhrase;
