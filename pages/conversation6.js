import React, { useEffect, useState } from 'react';
import firestore from '../config/firebase.js';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import * as WebBrowser from 'expo-web-browser';
import { Button } from 'react-native-paper';

import ConversationTopBar from '../components/conversationTopBar';

//CSS stuff
import { orange } from '../assets/color-codes';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Conversation6(props) {
  const { conversationNum } = props;
  const [state, setState] = useState({ fontsLoaded: true, result: null });

  _handlePressButtonAsync = async (formURL) => {
    let result = await WebBrowser.openBrowserAsync(state.assignment);
    setState({ ...state, result });
  };

  useEffect(() => {
    firestore
      .collection('Conversations')
      .doc(String(conversationNum))
      .get()
      .then((doc) => {
        if (doc.exists) {
          const conversation = doc.data();
          setState((s) => ({
            ...s,
            assignment: conversation['Student Assignment'],
          }));
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }, []);

  return (
    <View style={styles.container}>
      <ConversationTopBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Assignment</Text>
        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            color={orange}
            uppercase={false}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={() => this._handlePressButtonAsync(state.assignment)}>
            Copy Google Form
            </Button>
        </View>
        {/* LET'S REMOVE THESE TEXTS AND MAYBE DELETE THE REST OF THE CODE*/}
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
        {/* <View style={styles.background}>
                            <ConversationTopBar />
                            <View style={styles.content}>
                                <Text style={styles.title}>Storytelling</Text>
                                <Text style={styles.paragraph}> {this.state.text} </Text>
                            </View>
                        </View> */}
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
