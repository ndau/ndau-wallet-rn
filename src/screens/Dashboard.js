import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import cssStyles from '../css/styles';
import UserStore from '../model/UserStore';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(`rendering Dashboard`);
    const user = UserStore.getUser();

    if (Object.keys(user).length > 0) {
      console.debug(`user found is ${JSON.stringify(user, null, 2)}`);
      const { addresses, userId } = user;
      console.debug(`renders addresses: ${addresses}`);
      return addresses ? (
        <SafeAreaView style={cssStyles.safeContainer}>
          <StatusBar barStyle="light-content" backgroundColor="#1c2227" />
          <View style={cssStyles.dashboardTextContainer}>
            <Text style={cssStyles.dashboardTextLarge}>Wallet {userId}</Text>
          </View>
          <View style={cssStyles.dashboardTextContainer}>
            <Text style={cssStyles.dashboardTextVeryLarge}>501,026</Text>
          </View>
          <ScrollView style={cssStyles.container}>
            {addresses ? (
              addresses.map((address, index) => {
                const counter = index + 1;
                return (
                  <CollapsiblePanel
                    key={index}
                    index={index}
                    title={`Address ${counter}`}
                    address={address}
                  >
                    <Text style={cssStyles.text}>{address}</Text>
                    <Text style={cssStyles.text}>Something about lock</Text>
                    <Text style={cssStyles.text}>Some dates here</Text>
                    <Text style={cssStyles.text}>Where sending from</Text>
                  </CollapsiblePanel>
                );
              })
            ) : null}
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    } else {
      return <SafeAreaView style={cssStyles.safeContainer} />;
    }
  }
}

export default Dashboard;
