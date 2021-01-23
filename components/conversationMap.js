import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import firestore from '../config/firebase.js';
import { Appbar } from 'react-native-paper';
import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;

export default function conversationMap({ route, navigation }) {
  const { topic, description } = route.params;

  const [state, setState] = useState({ data: [] });

  useEffect(() => {
    firestore
      .collection('Conversations')
      .where('SEL Competency I', '==', topic)
      .where('Included In 40-Week Curriculum?', '==', 1)
      .where('Public?', '==', 1)
      .orderBy('Number', 'desc')
      .limit(10)
      .get()
      .then((querySnapshot) => {
        const data = querySnapshot.docs.map((doc) => doc.data());
        setState({ data });
      })
      .catch(function (error) {
        console.log('Error getting documents: ', error);
      });
  }, []);

  const MyComponent = (author, theme, quote, picture, conversationNum) => (
    <View style={styles.card}>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Conversation', {
            lessonNum: 0,
            conversationNum: conversationNum,
          });
        }}>
        <View>
          <Text style={styles.subtitle}>
            {author} - {theme}{' '}
          </Text>
          <Text style={styles.caption}>{quote} </Text>
        </View>
        <Image style={styles.cardImage} source={{ uri: picture }} />
      </TouchableOpacity>
    </View>
  );

  // Get the download URL
  return (
    <View style={styles.container}>
      <Appbar.Header style={styles.appBar}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Content
          title={topic}
          titleStyle={styles.conversationMapTitle}
        />
      </Appbar.Header>
      <Text style={styles.paragraph}>{description}</Text>
      <FlatList
        data={state.data}
        keyExtractor={(item) => item.Number}
        //ItemSeparatorComponent={() => {return <View style={{margin:10}} />}}
        renderItem={({ item }) =>
          MyComponent(
            item.Author,
            item.Theme,
            item.Quote,
            item.Picture,
            item.Number
          )
        }
      />
    </View>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
