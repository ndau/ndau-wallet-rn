import React, { Component } from 'react';

import { StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import ndauApi from '../api/NdauAPI';

export default class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      targetPrice: 0,
      user: {}
    };
  }

  componentDidMount() {
    ndauApi
      .getTargetPrice()
      .then((targetPrice) => {
        this.setState({
          targetPrice: targetPrice
        });
      })
      .catch((error) => {
        console.error(error);
      });

    this.showSetupIfNeeded();
  }

  showSetupIfNeeded = async (user) => {
    this.props.navigator.push({
      screen: 'ndau.SetupMain',
      title: 'Setup',
      backButtonHidden: true,
      passProps: { parentStyles: styles }
    });
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.container}>
          <CollapsiblePanel title="Panel with some dynamic stuff">
            <Text style={styles.text}>Target Price: {this.state.targetPrice}</Text>
          </CollapsiblePanel>
          <CollapsiblePanel title="A Panel with long content text">
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, ut vestibulum massa. Porttitor sed dis quis turpis ipsum
              est. Cursus mauris mattis nec in turpis quis, proin risus netus massa suspendisse nunc
              vitae, ut suspendisse sociosqu nulla, lobortis turpis amet dui vestibulum quis, sem
              ornare purus diam orci. Condimentum nulla euismod. Lacinia non exercitationem felis
              aenean cum, leo metus. Vel lectus id blandit massa, habitasse cum eget. Mi aliquet
              lacus mauris a nullam, montes magna nunc, porta vestibulum proin laoreet, ut vitae
              eros, non nullam. Lacus ac. Sapien tempor egestas curabitur, id molestie molestie.
            </Text>
          </CollapsiblePanel>
          <CollapsiblePanel title="A Panel with long content text as well">
            <Text style={styles.text}>
              Lorem ipsum dolor sit amet, elit fermentum fringilla ac porta, rhoncus vulputate
              pellentesque pellentesque semper, turpis in turpis leo lobortis tellus. Velit eu arcu
              dignissim suspendisse, sit nec a viverra dui vel in. Nibh elit dui justo nibh, tortor
              sodales iaculis est risus at urna. Etiam purus diam dignissim duis felis id, fusce
              vehicula per vel vestibulum aenean etiam, ultrices non, tristique nunc dolor, ante ut
              quam dignissim dolor sapien nonummy. Tellus molestie erat, vestibulum malesuada, vitae
              accumsan, ac urna varius integer nunc, nibh ac dapibus ac enim praesent ultricies.
            </Text>
          </CollapsiblePanel>
          <CollapsiblePanel title="Another Panel">
            <Text style={styles.text}>Lorem ipsum dolor sit amet...</Text>
          </CollapsiblePanel>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  container: {
    flex: 1,
    backgroundColor: '#1c2227'
  },
  text: {
    color: '#ffffff',
    fontSize: 16,
    fontFamily: 'TitilliumWeb-Light'
  },
  textInput: {
    height: 45,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 10,
    marginTop: 10,
    paddingLeft: 10,
    color: '#000000',
    backgroundColor: '#ffffff',
    fontSize: 18,
    fontFamily: 'TitilliumWeb-Regular'
  },
  button: {
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: '#4d9678',
    backgroundColor: '#4d9678',
    borderRadius: 3,
    fontFamily: 'TitilliumWeb-Light',
    margin: '0.5%',
    padding: '2px',
    borderRadius: 3
  },
  wizardText: {
    color: '#ffffff',
    fontSize: 20
  },
  progress: {
    paddingTop: 8,
    paddingBottom: 8
  }
});
