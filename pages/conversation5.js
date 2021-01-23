import React, { useEffect, useState } from 'react';
import firestore from '../config/firebase.js';
import { Dimensions, ScrollView, Text, View } from 'react-native';

import Unorderedlist from 'react-native-unordered-list';
import ConversationTopBar from '../components/conversationTopBar';
import ShareButton from '../components/shareButton';
import TextToSpeechButton from '../components/textToSpeechButton';
import { black } from '../assets/color-codes';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Conversation5(props) {
  // state = {
  //   text: '',
  //   global_number: 2, //_retrieveConvoNumber(),
  // }
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
            text: conversation.Storytelling,
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

  const elements = state.text
    ? state.text
      .split('; ')
      .filter((word) => word.length > 0)
      .map((x) => (
        <Unorderedlist
          bulletUnicode={0x2043}
          color={black}
          style={styles.bullets}>
          <Text style={styles.bulletPoints}>{x}</Text>
        </Unorderedlist>
      ))
    : [];
  return (
    <View style={styles.container}>
      <ConversationTopBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Storytelling</Text>
        {elements}
        <TextToSpeechButton />
        <ShareButton />
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
