import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { blue, white } from '../assets/color-codes';

import Page03 from '../pages/page03';
import Page04 from '../pages/page04';

const BrowseNav = createMaterialTopTabNavigator();

// let customFonts = {
//   Roboto: require('../assets/fonts/roboto-400.ttf'),
//   RobotoSlab: require('../assets/fonts/roboto-slab-500.ttf'),
// };

const windowHeight = Dimensions.get('window').height;

export default function Browse() {
  return (
    <BrowseNav.Navigator
      headerMode="None"
      tabBarOptions={{
        activeTintColor: white,
        style: styles.savedTopNav,
        labelStyle: styles.savedTopTab,
        alignItems: 'center',
        indicatorStyle: { backgroundColor: white, height: 3 },
        removeClippedSubviews: false,
      }}>
      <BrowseNav.Screen name="Lessons" component={Page03} />
      <BrowseNav.Screen name="Conversations" component={Page04} />
    </BrowseNav.Navigator>
  );
}

const styles = StyleSheet.create({
  savedTopNav: {
    backgroundColor: blue,
    justifyContent: 'center',
    height: 0.1125 * windowHeight,
    paddingTop: 15,
  },
  savedTopTab: {
    fontSize: 16,
    fontFamily: 'Roboto',
    color: white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
