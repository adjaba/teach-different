import React, { useEffect, useState } from 'react';
import Conversation6 from '../pages/conversation6';
import Conversation5 from '../pages/conversation5';
import Conversation4 from '../pages/conversation4';
import Conversation3 from '../pages/conversation3';
import Conversation2 from '../pages/conversation2';
import Conversation1 from '../pages/conversation1';
import Lesson2 from '../pages/lesson2';
import Lesson1 from '../pages/lesson1';
import Progress from '../components/progressBar.js';

import {
  Dimensions,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

export default function LessonConvo({ route, navigation, props }) {
  const { lessonNum, conversationNum } = route.params;
  const [sliderState, setSliderState] = useState({ currentPage: 0 });
  const [numPages, setNumPages] = useState(8);
  const { width, height } = Dimensions.get('window');

  const setSliderPage = (event: any) => {
    const { currentPage } = sliderState;
    const { x } = event.nativeEvent.contentOffset;
    const indexOfNextScreen = Math.floor(x / width);
    if (indexOfNextScreen !== currentPage) {
      setSliderState({
        ...sliderState,
        currentPage: indexOfNextScreen,
      });
    }
  };

  useEffect(() => {
    lessonNum != 0 ? setNumPages(8) : setNumPages(6);
  }, []);

  const { currentPage: pageIndex } = sliderState;
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView style={{ flex: 1 }}>
        <ScrollView
          style={{ flex: 1 }}
          horizontal={true}
          scrollEventThrottle={16}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={true}
          onScroll={(event: any) => {
            setSliderPage(event);
          }}>
          <View style={{ width, height }}>
            <Conversation1 conversationNum={conversationNum}/>
          </View>
          <View style={{ width, height }}>
            <Conversation2 conversationNum={conversationNum}/>
          </View>
          <View style={{ width, height }}>
            <Conversation3 conversationNum={conversationNum}/>
          </View>
          <View style={{ width, height }}>
            <Conversation4 conversationNum={conversationNum}/>
          </View>
          <View style={{ width, height }}>
            <Conversation5 conversationNum={conversationNum}/>
          </View>
          <View style={{ width, height }}>
            <Conversation6 conversationNum={conversationNum}/>
          </View>
          {lessonNum != 0 && (
            <>
              <View style={{ width, height }}>
                <Lesson1 lessonNum={lessonNum}/>
              </View>
              <View style={{ width, height }}>
                <Lesson2 lessonNum={lessonNum}/>
              </View>
            </>
          )}
        </ScrollView>
        <View style={styles.paginationWrapper}>
          {Array.from(Array(numPages).keys()).map((key, index) => (
            <View
              style={[
                styles.paginationDots,
                { opacity: pageIndex === index ? 1 : 0.2 },
              ]}
              key={index}
            />
          ))}
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  paragraph: {
    fontSize: 17,
  },
  paginationWrapper: {
    position: 'absolute',
    bottom: 10,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  paginationDots: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#0898A0',
    marginLeft: 25,
  },
});
