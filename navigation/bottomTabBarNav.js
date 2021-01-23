import * as React from 'react';
import {StyleSheet} from 'react-native';

import Icon from 'react-native-vector-icons/FontAwesome';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {orange} from '../assets/color-codes';

import Page02 from '../pages/page02';
import Browse from '../navigation/BrowseNav';
import Explore from '../pages/page05';
import Featured from '../pages/page06';
import TD from './TDTabBar';

const Tab = createBottomTabNavigator();

export default function BottomTabBarNav() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      tabBarOptions={{
        activeTintColor: orange,
        style: styles.bottom,
      }}>
      <Tab.Screen
        name="Home"
        component={Page02}
        options={{
          tabBarLabel: 'Home',
          tabBarIcon: ({color, size}) => (
            <Icon name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Browse"
        component={Browse}
        options={{
          tabBarLabel: 'Browse',
          tabBarIcon: ({color, size}) => (
            <Icon name="search" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Explore"
        component={Explore}
        options={{
          tabBarLabel: 'Explore',
          tabBarIcon: ({color, size}) => (
            <Icon name="pencil" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="Featured"
        component={Featured}
        options={{
          tabBarLabel: 'Featured',
          tabBarIcon: ({color, size}) => (
            <Icon name="star" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TD"
        component={TD}
        options={{
          tabBarLabel: 'TD',
          tabBarIcon: ({color, size}) => (
            <Icon name="laptop" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({
  bottom: {
    paddingTop: 10,
    paddingBottom: 5,
  },
});
