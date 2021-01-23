import React, { useState } from 'react';
import {
  Keyboard,
  KeyboardAvoidingView,
  Image,
  Platform,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import Constants from 'expo-constants';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-paper';

//Pages
import BottomTabBarNav from '../navigation/bottomTabBarNav';
import { firebase } from '../config/firebase';

//CSS stuff
import { blue, darkgray, gray, red, white } from '../assets/color-codes';

// sets whether the label in the button is uppercase or not
const uppercaseButton = false;

//logo path
const logo = require('../assets/logo-blue.png');

async function handleLogin(
  username,
  password,
  showResetPage,
  setErrorMesssage,
  setLoggingIn,
  setShowResetPage,
) {
  setLoggingIn(true);
  firebase
    .auth()
    .signInWithEmailAndPassword(username, password)
    .then(() => {
      setLoggingIn(false);
      setShowResetPage(0);
    })
    .catch(async function (fbError) {
      // Handle Errors here.
      try {
        let wpRes = await fetch(
          'https://teachdifferent.com/wp-json/jwt-auth/v1/token',
          {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              username: username,
              password: password,
            }),
          },
        );
        wpRes = await wpRes.json();
        if (wpRes.code) {
          if (wpRes.code == '[jwt_auth] empty_password') {
            setErrorMesssage('Password field blank');
          } else if (wpRes.code == '[jwt_auth] incorrect_password') {
            setErrorMesssage('Incorrect password.');
          } else if (wpRes.code == '[jwt_auth] empty_username') {
            setErrorMesssage('Username field blank');
          } else {
            setErrorMesssage('Unknown error, try again later.');
          }
        } else {
          if (fbError.code == 'auth/user-not-found') {
            firebase
              .auth()
              .createUserWithEmailAndPassword(username, password)
              .then(() => {
                setLoggingIn(false);
                setShowResetPage(0);
              })
              .catch(function (fbCreateError) {
                const errorCode = fbCreateError.code;
                const errorMessage = fbCreateError.message;
                if (errorCode == 'auth/weak-password') {
                  setErrorMesssage(
                    'Your current password will not work to sign in with the app. Set your password to 6+ characters and try again.',
                  );
                } else {
                  setErrorMesssage(errorMessage);
                }
                setLoggingIn(false);
                setShowResetPage(0);
                console.log(fbCreateError.code);
              });
          } else if (fbError.code == 'auth/wrong-password') {
            firebase
              .auth()
              .sendPasswordResetEmail(username)
              .then(() => {
                setLoggingIn(false);
                if (showResetPage) {
                  setShowResetPage(showResetPage == 1 ? 2 : 1);
                } else {
                  setShowResetPage(1);
                }
              });
          } else {
            console.log('Unknown FB error');
            console.log(fbError.code);
            setLoggingIn(false);
            setShowResetPage(0);
          }
        }
      } catch (e) {
        setErrorMesssage('Unknown error occurred, please try again later');
      }
    });
}

export default function Page1() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMesssage] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [showResetPage, setShowResetPage] = useState(0);

  if (firebase.auth().currentUser) {
    return <BottomTabBarNav />;
  }

  if (showResetPage) {
    var text;
    if (showResetPage == 1) {
      text =
        'A password reset email has been sent. Please click the link and enter your password, then click the button below.';
    } else {
      text =
        'The password you entered was wrong, so another password reset email has been sent. Please click the link and enter your password, then click the button below.';
    }
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.inner}>
          <SafeAreaView style={styles.imgWrapper}>
            <Image style={styles.img} source={logo} />
          </SafeAreaView>

          <View style={styles.inputWrapper}>
            <Text>{text}</Text>
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              color={blue}
              uppercase={uppercaseButton}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              loading={loggingIn}
              disabled={loggingIn}
              onPress={() =>
                handleLogin(
                  username,
                  password,
                  showResetPage,
                  setErrorMesssage,
                  setLoggingIn,
                  setShowResetPage,
                )
              }>
              Log in
              </Button>
          </View>
        </View>
      </SafeAreaView>
    );
  }
  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS == 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inner}>
          <View style={styles.imgWrapper}>
            <Image style={styles.img} source={logo} />
          </View>

          <View style={styles.inputWrapper}>
            <Input
              value={username}
              onChangeText={setUsername}
              placeholder="Email"
              autoCapitalize="none"
              inputContainerStyle={styles.input}
              inputStyle={styles.inputContent}
              placeholderTextColor={gray}
            />
            <Input
              value={password}
              onChangeText={setPassword}
              placeholder="Password"
              secureTextEntry={true}
              errorMessage={errorMessage}
              errorStyle={styles.error}
              inputContainerStyle={styles.input}
              inputStyle={styles.inputContent}
              placeholderTextColor={gray}
            />
          </View>
          <View style={styles.buttonWrapper}>
            <Button
              mode="contained"
              color={blue}
              uppercase={uppercaseButton}
              style={styles.button}
              labelStyle={styles.buttonLabel}
              loading={loggingIn}
              disabled={loggingIn}
              onPress={() =>
                handleLogin(
                  username,
                  password,
                  showResetPage,
                  setErrorMesssage,
                  setLoggingIn,
                  setShowResetPage,
                )
              }>
              Log in
              </Button>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 6,
    flexDirection: 'column',
    alignItems: 'center',
    backgroundColor: white,
    paddingTop: Constants.statusBarHeight,
  },
  inner: {
    flex: 5,
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 24,
  },
  imgWrapper: {
    flex: 1.5,
    justifyContent: 'flex-end',
  },
  img: {
    flex: 1.5,
    resizeMode: 'contain',
  },
  inputWrapper: {
    flex: 2,
    alignSelf: 'stretch',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: 24,
  },
  inputContent: {
    color: darkgray,
    fontFamily: 'Roboto',
  },
  input: {
    color: darkgray,
    borderColor: gray,
  },
  buttonWrapper: {
    flex: 1,
    alignSelf: 'stretch',
    justifyContent: 'center',
    marginHorizontal: 24,
  },
  button: {
    margin: 12,
  },
  buttonLabel: {
    fontFamily: 'Roboto',
    fontSize: 20,
    color: white,
  },
  error: {
    color: red,
  },
});
