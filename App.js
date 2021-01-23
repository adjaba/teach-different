import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

//Pages
import BottomTabBarNav from './navigation/bottomTabBarNav';
import Conversation from './navigation/lessonConvoNav';
import Page01 from './pages/page01';

import ContentProvider from './config/ContentProvider'

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer independent={true}>
      <ContentProvider>
        <Stack.Navigator initialRouteName="Login" headerMode="none">
          <Stack.Screen
            name="Login"
            component={Page01}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeTabBar"
            component={BottomTabBarNav}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Conversation"
            component={Conversation}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </ContentProvider>
    </NavigationContainer>
  );
}
