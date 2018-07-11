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
  Picker,
  PickerIOS,
  SafeAreaView
} from 'react-native';

class SetupEAINode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      node: ''
    };
  }

  onPopToRoot = () => {
    this.props.navigator.popToRoot();
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <View style={styles.container}>
          <ScrollView style={styles.contentContainer}>
            <View>
              <Text style={this.props.parentStyles.wizardText}>Select a node</Text>
            </View>
            <View>
              {Platform.OS === 'android' ? (
                <ProgressBarAndroid
                  styleAttr="Horizontal"
                  progress={1}
                  style={this.props.parentStyles.progress}
                  indeterminate={false}
                />
              ) : (
                <ProgressViewIOS progress={1} style={this.props.parentStyles.progress} />
              )}
            </View>
            <View>
              <Text style={this.props.parentStyles.wizardText}>
                In order to earn your Ecosystem Alignment Incentive (EAI) you must delegate your
                ndau to a node. Please select the default node for your accounts. You will be able
                to change this later.
              </Text>
            </View>
            {Platform.OS === 'android' ? (
              <Picker
                selectedValue={this.state.node}
                style={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({ node: itemValue })}
              >
                <Picker.Item label="Node A" value="nodeA" />
                <Picker.Item label="Node B" value="nodeB" />
              </Picker>
            ) : (
              <PickerIOS
                selectedValue={this.state.node}
                itemStyle={styles.picker}
                onValueChange={(itemValue, itemIndex) => this.setState({ node: itemValue })}
              >
                <PickerIOS.Item label="Node A" value="nodeA" />
                <PickerIOS.Item label="Node B" value="nodeB" />
              </PickerIOS>
            )}
          </ScrollView>
          <View style={styles.footer}>
            <Button color="#4d9678" onPress={this.onPopToRoot} title="Select and finish" />
          </View>
        </View>
      </SafeAreaView>
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
  button: {
    marginTop: 0
  },
  text: {
    color: '#ffffff',
    fontSize: 22,
    fontFamily: 'TitilliumWeb-Regular'
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
  picker: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#ffffff'
  },
  checkbox: { flex: 1, padding: 10 }
});

export default SetupEAINode;
