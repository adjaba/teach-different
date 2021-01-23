import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import firestore from '../config/firebase.js';
import Content from '../config/Content';
import ConversationTopBar from '../components/conversationTopBar';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Conversation1(props) {
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
            title: conversation.Author,
            subtitle: conversation.Theme,
            quote: conversation.Quote,
            imageLink: conversation.Picture,
          });
          Image.getSize(
            this.state.imageLink,
            (width, height) => {
              this.setState({ width, height });
            },
            (errorMsg) => {
              console.log(errorMsg);
            },
          );
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
        <Text style={styles.title}>{state.title}</Text>
        <Text style={styles.subtitle}>{state.subtitle}</Text>
        <Image
          source={{ uri: state.imageLink ? state.imageLink : null }}
          style={styles.image}
        />
        <Text style={styles.quote}>{state.quote}</Text>
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
