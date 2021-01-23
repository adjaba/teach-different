import React from 'react';
import {
  Dimensions,
  ImageBackground,
  Keyboard,
  SafeAreaView,
  Text,
  TextInput,
  View,
} from 'react-native';
// or any pure javascript modules available in npm
import { Button } from 'react-native-paper';
import { blue, orange, gray } from '../assets/color-codes';
import firestore from '../config/firebase.js';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;
export default class Page2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageLink: '',
      question: '',
      lessonNum: 0,
      conversationNum: 0,
    };
  }

  componentDidMount() {
    firestore
      .collection('Lessons')
      .where('Public?', '==', 1)
      .orderBy('Number', 'desc')
      .limit(1)
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((lesson) => {
          const lessonNum = String(lesson.data().Number);
          const conversationNum = String(lesson.data()[
            'Conversation Lesson is Linked To'
          ]);
          this.setState({ lessonNum, conversationNum });
        });
      })
      .then(() => {
        firestore
          .collection('Conversations')
          .doc(this.state.conversationNum)
          .get()
          .then((doc) => {
            if (doc.exists) {
              var conversation = doc.data();
              this.setState({
                question: conversation['Step Three:  Essential Question'],
                imageLink: conversation.Picture,
              });
            } else {
              // doc.data() will be undefined in this case
              console.log('No such document!');
            }
          });
      })
      .catch(function (error) {
        console.warn('Error getting documents: ', error);
      });
  }

  render() {
    return (
      <View style={[styles.container, styles.alignItemsContent]}>
        <View style={styles.topBar}>
          <SafeAreaView style={styles.container} backgroundColor={blue}>
            <View style={styles.filterSection}>
              <View style={styles.filter}>
                <TextInput
                  style={styles.textInput}
                  placeholder="Search"
                  placeholderTextColor={gray}
                  onFocus={() => {
                    Keyboard.dismiss();
                    this.props.navigation.navigate('Browse');
                    // navigation.navigate("Browse", {searchIsFocused: true});
                  }}
                />
              </View>

              <View style={styles.filter}>
                {/* Get rid of the placeholder text below*/}
                <Text>"Choose Level - Any, Secondary, etc."</Text>
                {/* Picker goes here! */}
              </View>
            </View>
          </SafeAreaView>
        </View>
        <View style={styles.topWrapper}>
          <View style={styles.container}>
            <ImageBackground
              source={{ uri: this.state.imageLink ? this.state.imageLink : null }}
              style={styles.imageBackground}>
              <View style={styles.overlay}>
                <View style={styles.headerWrapper}>
                  <Text style={styles.dashboardHeader}>{this.state.question}</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>

        <View style={styles.buttonWrapper}>
          <Button
            mode="contained"
            color={orange}
            uppercase={false}
            style={styles.button}
            labelStyle={styles.buttonLabel}
            onPress={() => {
              this.props.navigation.navigate('Conversation', {
                lessonNum: this.state.lessonNum,
                conversationNum: this.state.conversationNum,
              });
            }}>
            Start the Conversation
          </Button>
        </View>
      </View>
    )
  };
}

const styles = stylesheet(windowHeight, windowWidth);
