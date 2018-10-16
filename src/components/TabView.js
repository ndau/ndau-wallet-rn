import React, { Component } from 'react';
import { createMaterialTopTabNavigator } from 'react-navigation';

class TabView extends Component {
  constructor(props) {
    super(props);
    
    this.mapNamesToTabs = {};

    props.children.forEach(child => {
      const name = child && child.props && child.props.name;
      if (name) {
        this.mapNamesToTabs[name] = child;
      }
    })
  }

  render() {
    const TabNavigator = createMaterialTopTabNavigator( 
      this.props.mapNamesToTabs 
    );

    return(
      <TabNavigator />
    );
  }
}

// TODO: override Material styles

export default TabView;