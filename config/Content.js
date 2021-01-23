import React from 'react';
import firestore from './firebase.js';
// import { useWindowDimensions } from 'react-native';

// const windowWidth = useWindowDimensions().width;
// const windowHeight = useWindowDimensions().height;

const defaultVal = {
  lessonNum: String(0),
  conversationNum: String(0),
  setLessonAndConversation: (lessonNum, conversationNum) => {
    this.setState({
      lessonNum: String(lessonNum),
      conversationNum: String(conversationNum),
    });
  },
  setLesson: (lessonNum) => {
    this.setState({
      lessonNum: String(lessonNum),
    });
    this.ref = firestore
      .collection('Lessons')
      .doc(String(lessonNum)) //Optimization here -> Ensure all inputs are already strings
      .get()
      .then((doc) => {
        if (doc.exists) {
          const lesson = doc.data();
          const conversationNum = lesson['Conversation Lesson is Linked To'];
          this.setState({
            conversationNum: String(conversationNum),
          });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such convo!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  },
  setConversation: (conversationNum) => {
    this.setState({
      conversationNum: String(conversationNum),
      lessonNum: String(0),
    });
  },
};
const MainContext = React.createContext(defaultVal);
export default MainContext;
