import React, { Component } from 'react';
import { SafeAreaView } from 'react-navigation';
import { ScrollView, View, Text, StatusBar } from 'react-native';
import CollapsiblePanel from '../components/CollapsiblePanel';
import cssStyles from '../css/styles';
import AsyncStorageHelper from '../model/AsyncStorageHelper';
import styles from '../css/styles';

class Dashboard extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render = async () => {
    console.log(`rendering Dashboard`);
    const user = await AsyncStorageHelper.getCurrentUser();

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
            <Text style={cssStyles.dashboardTextVeryLarge}>501,026 NDU</Text>
          </View>
          <View style={cssStyles.dashboardOuterRowContainer}>
            <View style={cssStyles.dashboardRowContainer}>
              <Text style={cssStyles.dashboardTextSmallGreen}>8,267,316.00</Text>
              <Text style={cssStyles.dashboardTextSmallWhiteMiddle}>
                USD<Text style={styles.asterisks}>**</Text>
              </Text>
              <Text style={cssStyles.dashboardTextSmallWhiteEnd}>at current price</Text>
            </View>
            <View style={cssStyles.dashboardRowContainer}>
              <Text style={cssStyles.dashboardTextSmallGreen}>644,591.00</Text>
              <Text style={cssStyles.dashboardTextSmallWhiteMiddle}>
                USD<Text style={styles.asterisks}>**</Text>
              </Text>
              <Text style={cssStyles.dashboardTextSmallWhiteEnd}>your cost basis</Text>
            </View>
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
            <View style={cssStyles.dashboardRowContainerCenter}>
              <Text style={styles.asterisks}>**</Text>
              <Text style={cssStyles.dashboardTextVerySmallWhite}>
                The estimated value of ndau in US dollars can be calculated using the Target Price
                at which new ndau have most recently been issued. The value shown here is calculated
                using that method as of the issue price on DATE HERE. The Axiom Foundation bears no
                responsibility or liability for the calculation of that estimated value, or for
                decisions based on that estimated value.
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <SafeAreaView style={cssStyles.safeContainer} />
      );
    } else {
      return <SafeAreaView style={cssStyles.safeContainer} />;
    }
  };
}

export default Dashboard;
