import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';
import { Card } from 'react-native-paper';

import firestore from '../config/firebase.js';
import ConversationTopBar from '../components/conversationTopBar';
import ShareButton from '../components/shareButton';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

const title = 'Videos';
const videoTitle1 = 'Conversation Video';
const videoTitle2 = 'Student Video';

export default function Conversation4(props) {
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
            conversationVideo: conversation['Teacher Video'],
            studentVideo: conversation['Student Video'],
            share:
              'Conversation: ' +
              'Student Video' +
              ': ' +
              conversation['Student Video'],
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
        <Text style={styles.title}>{title}</Text>

        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>{videoTitle1}</Text>
          <WebView
            containerStyle={styles.video}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            source={{
              html: `
        <video width="100%" height="100%" controls>
            <source src=${state.conversationVideo} type="video/mp4">
        </video>
        `,
            }}
          />
        </View>

        <View style={styles.videoCard}>
          <Text style={styles.videoTitle}>{videoTitle2}</Text>
          <WebView
            containerStyle={styles.video}
            javaScriptEnabled={true}
            domStorageEnabled={true}
            mediaPlaybackRequiresUserAction={true}
            source={{
              html: `
        <video width="100%" height="100%" controls>
            <source src=${state.studentVideo} type="video/mp4">
        </video>
        `,
            }}
          />
        </View>

        <ShareButton whatToShare={state.share} />
        {/* LET'S REMOVE THESE TEXTS AND MAYBE DELETE THE REST OF THE CODE*/}
        <Text> {'\n'} </Text>
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
