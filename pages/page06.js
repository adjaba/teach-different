import React, { useState } from 'react';
import {
  Dimensions,
  Text,
  View,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { CardViewWithImage } from 'react-native-simple-card-view';
import { createStackNavigator } from '@react-navigation/stack';
import ConversationMap from '../components/conversationMap.js';

//CSS stuff
import { stylesheet } from '../assets/styles.js';
import { white, blue } from '../assets/color-codes';

const windowHeight = Dimensions.get('window').width;
const windowWidth = Dimensions.get('window').width;

export default function CurriculumMap({ navigation }) {
  const Stack = createStackNavigator();

  return (
    <Stack.Navigator initialRouteName="Page06" headerMode="none">
      <Stack.Screen
        name="Page06"
        component={Page06}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="conversationMap"
        component={ConversationMap}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
}

function Page06({ navigation }) {
  const windowWidth = Dimensions.get('window').width;

  const [state] = useState({
    selfAwareness:
      'The ability to accurately recognize one’s own emotions, thoughts, and values and how they influence behavior. The ability to accurately assess one’s strengths and limitations, with a well- grounded sense of confidence, optimism, and a "growth mindset".',
    selfManagement:
      'The ability to successfully regulate one’s emotions, thoughts, and behaviors in different situations — effectively managing stress, controlling impulses, and motivating oneself. The ability to set and work toward personal and academic goals.',
    socialAwareness:
      'The ability to take the perspective of and empathize with others, including those from diverse backgrounds and cultures. The ability to understand social and ethical norms for behavior and to recognize family, school, and community resources and supports.',
    relationshipSkills:
      'The ability to establish and maintain healthy and rewarding relationships with diverse individuals and groups. The ability to communicate clearly, listen well, cooperate with others, resist inappropriate social pressure, negotiate conflict constructively, and seek and offer help when needed.',
    responsibleDecisionMaking:
      'The ability to make constructive choices about personal behavior and social interactions based on ethical standards, safety concerns, and social norms. The realistic evaluation of consequences of various actions, and a consideration of the well-being of oneself and others.',
  });

  // let customFonts = {
  //   Roboto: require('../assets/fonts/roboto-400.ttf'),
  //   RobotoSlab: require('../assets/fonts/roboto-slab-500.ttf'),
  // };

  const cardSize = 0.42 * windowWidth;
  const imageSize = 75;

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView contentStyle={styles.scrollContainer}>
        {/* <TouchableOpacity style={styles.MainPage} activeOpacity={0.5} /> */}
        <Text style={styles.title}>
          Social Emotional Learning Curriculum Map
      </Text>
        <Text style={styles.paragraph}>
          You can review the entire curriculum below. We’ve provided complimentary
          conversations for each core competency.
      </Text>
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            flexWrap: 'wrap',
            marginBottom: 12,
          }}>
          <CardViewWithImage
            height={cardSize}
            width={cardSize}
            source={require('../assets/selfA.png')}
            title={'Self-Awareness'}
            titleFontWeight={'normal'}
            titleFontFamily={'Roboto'}
            titleMargin={{ left: 10, right: 10 }}
            titleFontSize={17}
            imageWidth={imageSize}
            imageHeight={imageSize}
            onPress={() => {
              navigation.navigate('conversationMap', {
                topic: 'Self-Awareness',
                description: state.selfAwareness,
              });
            }}
            roundedImage={false}
            imageMargin={{ top: 10 }}
          />
          <CardViewWithImage
            height={cardSize}
            width={cardSize}
            source={require('../assets/SM.png')}
            title={'Self-Management'}
            titleFontWeight={'normal'}
            titleFontFamily={'Roboto'}
            titleMargin={{ left: 10, right: 10 }}
            titleFontSize={17}
            imageWidth={imageSize}
            imageHeight={imageSize}
            onPress={() => {
              navigation.navigate('conversationMap', {
                topic: 'Self-Management',
                description: state.selfManagement,
              });
            }}
            roundedImage={false}
            imageMargin={{ top: 10 }}
          />
          <CardViewWithImage
            height={cardSize}
            width={cardSize}
            source={require('../assets/SA.png')}
            title={'Social Awareness'}
            titleFontWeight={'normal'}
            titleFontFamily={'Roboto'}
            titleMargin={{ left: 10, right: 10 }}
            titleFontSize={17}
            imageWidth={imageSize}
            imageHeight={imageSize}
            onPress={() => {
              navigation.navigate('conversationMap', {
                topic: 'Social Awareness',
                description: state.socialAwareness,
              });
            }}
            roundedImage={false}
            imageMargin={{ top: 10 }}
          />
          <CardViewWithImage
            height={cardSize}
            width={cardSize}
            source={require('../assets/RS.png')}
            title={'Relationship Skills'}
            imageWidth={imageSize}
            imageHeight={imageSize}
            CardBackgroundColor="#F5CBB5"
            onPress={() => {
              navigation.navigate('conversationMap', {
                topic: 'Relationship Skills',
                description: state.relationshipSkills,
              });
            }}
            roundedImage={false}
            imageMargin={{ top: 10 }}
          />
          <CardViewWithImage
            height={cardSize}
            width={cardSize}
            source={require('../assets/RDM.png')}
            title={'Responsible Decision-Making'}
            imageWidth={imageSize}
            imageHeight={imageSize}
            onPress={() => {
              navigation.navigate('conversationMap', {
                topic: 'Responsible Decision-Making',
                description: state.responsibleDecisionMaking,
              });
            }}
            roundedImage={false}
            imageMargin={{ top: 10 }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
