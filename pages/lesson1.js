import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  Text,
  View,
} from 'react-native';

import firestore from '../config/firebase.js';
import LessonTopBar from '../components/lessonTopBar';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default function Lesson1(props) {
  const { lessonNum } = props;
  const [state, setState] = useState({ imageLink: null });

  useEffect(() => {
    (async function lessonInfo() {
      await firestore
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
              imageLink: lesson['Link to Picture'],
            });
            Image.getSize(
              this.state.imageLink,
              (width, height) => {
                setState({ width, height });
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
    })();
  }, []);

  return (
    <View style={styles.container}>
      <LessonTopBar />
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>{state.title}</Text>
        <Text style={styles.subtitle}>{state.subtitle}</Text>
        <Image
          source={{ uri: state.imageLink ? state.imageLink : '' }}
          style={styles.image}
        />
        <Text style={styles.paragraph}>{state.paragraph}</Text>
        {/* This is so hard to read lol is it possible to do paragraph spacing by parsing the data */}
      </ScrollView>
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
