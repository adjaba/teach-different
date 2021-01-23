import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';

import firestore from '../config/firebase.js';
import ConversationTopBar from '../components/conversationTopBar';
import ShareButton from '../components/shareButton';
import TextToSpeechButton from '../components/textToSpeechButton';
import { white } from '../assets/color-codes';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Conversation3(props) {
  const { conversationNum } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    firestore
      .collection('Conversations')
      .doc(String(conversationNum))
      .get()
      .then((doc) => {
        if (doc.exists) {
          const conversation = doc.data();
          setState({
            paragraph: conversation['Big Idea'],
            quote: conversation.Quote,
            stepOne: conversation['Step One:  Claim'],
            stepTwo: conversation['Step Two:  Counterclaim'],
            stepThree: conversation['Step Three:  Essential Question'],
            speech:
              conversation.Quote +
              ',' +
              'Step 1: Claim,' +
              conversation['Step One:  Claim'] +
              '.' +
              'Step 2: Counterclaim,' +
              conversation['Step Two:  Counterclaim'] +
              '.' +
              'Step 3: Essential Question,' +
              conversation['Step Three:  Essential Question'],
            share:
              'Conversation: ' +
              conversation.Quote +
              ' ' +
              'Step 1: Claim,' +
              conversation['Step One:  Claim'] +
              ' ' +
              'Step 2: Counterclaim,' +
              conversation['Step Two:  Counterclaim'] +
              ' ' +
              'Step 3: Essential Question,' +
              conversation['Step Three:  Essential Question'],
          });
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
        <Text style={styles.quote}>{state.quote}</Text>
        <View style={[styles.step, styles.stepOne]}>
          <Text style={styles.stepTitle}>Step One: Claim</Text>
          <Text style={[styles.paragraph, { color: white }]}>
            {state.stepOne}
          </Text>
        </View>
        <View style={[styles.step, styles.stepTwo]}>
          <Text style={styles.stepTitle}>Step Two: Counterclaim</Text>
          {/* HAVE TO MANUALLY OVERRIDE COLOR TO WHITE!!*/}
          <Text style={[styles.paragraph, { color: white }]}>
            {state.stepTwo}
          </Text>
        </View>
        <View style={[styles.step, styles.stepThree]}>
          <Text style={styles.stepTitle}>Step Three: Essential Question</Text>
          <Text style={[styles.paragraph, { color: white }]}>
            {state.stepThree}
          </Text>
        </View>
        <TextToSpeechButton whatToSay={state.speech} />
        <ShareButton whatToShare={state.share} />
        {/* LET'S REMOVE THESE TEXTS AND MAYBE DELETE THE REST OF THE CODE*/}
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
