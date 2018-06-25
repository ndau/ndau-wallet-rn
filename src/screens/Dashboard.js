import React, { Component } from 'react';

import { StyleSheet, ScrollView, Text, SafeAreaView } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import ndauApi from '../api/NdauAPI';
// import AsyncStorageHelper from '../model/AsyncStorageHelper';

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
    // const user = await AsyncStorageHelper.isUserPresent();
    //TODO: since we do not ask for the password we cannot successfully
    //TODO: decrypt the user yet. Therefore we go through setup upon
    //TODO: every launch until that functionality is in
    // if (!user) {
    this.props.navigator.push({
      screen: 'ndau.SetupMain',
      title: 'Setup',
      backButtonHidden: true
    });
    // } else if (user.setupStep) {
    //   this.props.navigator.push({
    //     screen: user.setupStep,
    //     title: 'Setup',
    //     backButtonHidden: true
    //   });
    // }
  };

  render() {
    return (
      <SafeAreaView style={styles.safeContainer}>
        <ScrollView style={styles.container}>
          <CollapsiblePanel title="Panel with some dynamic stuff">
            <Text style={styles.panelText}>Target Price: {this.state.targetPrice}</Text>
          </CollapsiblePanel>
          <CollapsiblePanel title="A Panel with long content text">
            <Text style={styles.panelText}>
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
            <Text style={styles.panelText}>
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
            <Text style={styles.panelText}>Lorem ipsum dolor sit amet...</Text>
          </CollapsiblePanel>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

var styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#333333'
  },
  container: {
    flex: 1,
    backgroundColor: '#333333'
  },
  panelText: {
    color: '#ffffff',
    fontFamily: 'TitilliumWeb-Light'
  }
});
