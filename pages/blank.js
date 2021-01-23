import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Constants from 'expo-constants';
//Font stuff
import { useFonts } from 'expo-font';
import AppLoading from 'expo-app-loading';

//CSS stuff
import { white } from '../assets/color-codes';

// sets whether the label in the button is uppercase or not
const uppercaseButton = false;

//logo path
const logo = require('../assets/logo-blue.png');

function Blank() {
  // let [fontsLoaded] = useFonts({
  //   Roboto: require('../assets/fonts/roboto-400.ttf'),
  //   RobotoSlab: require('../assets/fonts/roboto-slab-500.ttf'),
  // });
  // console.log(fontsLoaded);
  /*   if (!fontsLoaded) {
      //because idk what else to do here
      return <AppLoading />;
    }else{ */
  return (
    <View style={styles.container}>
      <Image style={styles.img} source={logo ? logo : null} />
      <Text style={styles.heading}>Dev bad</Text>
    </View>
  );
}
//}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: white,
    padding: 48,
    paddingTop: Constants.statusBarHeight + 48,
  },
  img: {
    flex: 1,
    margin: 24,
    resizeMode: 'contain',
  },
  heading: {
    flex: 1,
    margin: 24,
    fontSize: 24,
    fontFamily: 'RobotoSlab',
  },
});

export default Blank;
