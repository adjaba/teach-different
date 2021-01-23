import React from 'react';
import Content from './Content';
import firestore from './firebase.js';

export default class ContentProvider extends React.Component {
  state = {
    lessonNum: String(0),
    conversationNum: String(0),
    // windowWidth,
    // windowHeight,
  };

  render() {
    return (
      <Content.Provider
        value={{
          lessonNum: this.state.lessonNum,
          conversationNum: this.state.conversationNum,
          windowWidth: this.state.windowWidth,
          windowHeight: this.state.windowHeight,
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
                  const conversationNum =
                    lesson['Conversation Lesson is Linked To'];
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
        }}>
        {this.props.children}
      </Content.Provider>
    );
  }
}
