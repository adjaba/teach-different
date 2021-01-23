import * as React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { white, blue } from '../assets/color-codes';

import Page07 from '../pages/page07a';
import Page08 from '../pages/page08a';

const SavedTop = createMaterialTopTabNavigator();

// let customFonts = {
//   Roboto: require('../assets/fonts/roboto-400.ttf'),
//   RobotoSlab: require('../assets/fonts/roboto-slab-500.ttf'),
// };

const windowHeight = Dimensions.get('window').height;

export default function TD() {
  return (
    <SavedTop.Navigator
      sceneContainerStyle={{ backgroundColor: white }}
      tabBarOptions={{
        activeTintColor: white,
        style: styles.savedTopNav,
        labelStyle: styles.savedTopTab,
        alignItems: 'center',
        indicatorStyle: { backgroundColor: white, height: 3 },
        removeClippedSubviews: false,
      }}>
      <SavedTop.Screen name="Recents" component={Page07} />
      <SavedTop.Screen name="Favorites" component={Page08} />
    </SavedTop.Navigator>
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
