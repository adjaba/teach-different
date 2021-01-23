import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';

import firestore from '../config/firebase.js';
import LessonTopBar from '../components/lessonTopBar';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//need to implement hyperlink to Conversation

export default function Lesson2(props) {
  const { lessonNum } = props;
  const [state, setState] = useState({});

  useEffect(() => {
    (async function lessonInfo() {
      firestore
        .collection('Lessons')
        .doc(String(lessonNum))
        .get()
        .then((doc) => {
          if (doc.exists) {
            const lesson = doc.data();
            setState({
              title: lesson['Primary Source'],
              subtitle: lesson.Theme,
              paragraph: lesson['Lesson Write Up'],
              level: lesson.Level,
              subject: lesson.Subject,
              author: lesson['Lesson Author'],
            });
          } else {
            // doc.data() will be undefined in this case
            console.log('No such document!');
          }
        })
        .catch(function (error) {
          console.log('Error getting document:', error);
        });
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LessonTopBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{state.title}</Text>
        <Text style={styles.subtitle}>{state.subtitle}</Text>
        <Text style={styles.paragraph}>{state.paragraph}</Text>
        <Text style={styles.paragraph}>
          <Text style={styles.labels}>Level: </Text>
          {state.level}
          {'\n'}
          <Text style={styles.labels}>Subject Area: </Text>
          {state.subject}
          {'\n'}
          <Text style={styles.labels}>Author: </Text>
          {state.author}
        </Text>
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
