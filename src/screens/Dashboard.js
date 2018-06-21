import React, { Component } from 'react';

import { StyleSheet, ScrollView, Text, FlatList } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import ndauApi from '../api/NdauAPI';

export default class Dashboard extends Component {
  state = {
    targetPrice: 0
  };

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
  }

  render() {
    return (
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
            aenean cum, leo metus. Vel lectus id blandit massa, habitasse cum eget. Mi aliquet lacus
            mauris a nullam, montes magna nunc, porta vestibulum proin laoreet, ut vitae eros, non
            nullam. Lacus ac. Sapien tempor egestas curabitur, id molestie molestie.
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
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333333'
  },
  panelText: {
    color: '#fff',
    fontFamily: 'TitilliumWeb-Light'
  }
});
