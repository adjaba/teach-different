import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';

import firestore from '../config/firebase.js';
import ConversationTopBar from '../components/conversationTopBar';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Conversation2(props) {
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
        <Text style={styles.paragraph}>{state.paragraph}</Text>
        {/* LET'S REMOVE THESE TEXTS AND MAYBE DELETE THE REST OF THE CODE*/}
        <Text> {'\n'} </Text>
        <Text> {'\n'} </Text>
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
