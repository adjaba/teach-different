import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Keyboard,
  KeyboardAvoidingView,
  SafeAreaView,
  Text,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import AlphabetSectionList from 'react-native-alphabet-sectionlist';
import DropDownPicker from 'react-native-dropdown-picker';
// import { Picker } from '@react-native-picker/picker';

import firestore from '../config/firebase.js';

import { white, black, blue, gray } from '../assets/color-codes';
import { stylesheet } from '../assets/styles.js';
import { alphabeticalOrder, cleanText } from '../components/filterData';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

//console.warn(windowHeight, windowWidth); - 896 x 414 on standard iphone 11
//  For some reason, we NEED to specify widths/heights for almost all components
//  Specify these in terms of the overall window height + width
//  May be possible to use flex as well
export default function Page3({ navigation }) {
  const [data, setData] = useState([]);
  const [filtered, setState] = useState([]);

  useEffect(() => {
    // Storage
    firestore
      .collection('Lessons')
      .where('Public?', '==', 1)
      .orderBy('Primary Source', 'asc')
      .get()
      .then((querySnapshot) => {
        const dataArray = querySnapshot.docs
          .map((doc) => {
            const newLessonData = {
              title: [doc.data()['Primary Source'], doc.data().Theme].join(
                ' - ',
              ),
              lessonNum: String(doc.data().Number),
              conversationNum: String(
                doc.data()['Conversation Lesson is Linked To'],
              ),
            };
            return newLessonData;
          })
          .sort(alphabeticalOrder);
        setData(dataArray);
        setState(dataArray);
      })
      .catch(function (error) {
        console.warn('Error getting documents: ', error);
      });
  }, []);

  const searchUser = (text) => {
    setState(
      data.filter((item) =>
        item.title.toLowerCase().includes(text.toLowerCase()),
      ),
    );
  };

  const convertList = (inputList) => {
    const outputObject = inputList.reduce(
      (output, item) => (
        (output[cleanText(item.title)[0].toUpperCase()] =
          output[cleanText(item.title)[0].toUpperCase()] || []).push(item),
        output
      ),
      {},
    );
    return outputObject;
  };

  const ListItem = (item) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={() => {
        navigation.navigate('Conversation', {
          lessonNum: item.lessonNum,
          conversationNum: item.conversationNum,
        });
      }}>
      <Text style={styles.innerText}> {item.title} </Text>
    </TouchableOpacity>
  );

  return (
    <KeyboardAvoidingView
      style={styles.container}
      // the Android ver still gets pushed up by the keyboard halp
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <SafeAreaView style={styles.container}>
          <View style={styles.filterSection}>
            <View style={styles.filter}>
              <TextInput
                style={styles.textInput}
                placeholder="Search"
                placeholderTextColor={gray}
                onChangeText={(text) => searchUser(text)}
                // I tried this on expo and it doesn't work? the keyboard pops up but the input field isnt focused
                autoFocus={true}
              />
            </View>

            <View style={styles.filter}>
              {/* Get rid of the placeholder text below*/}
              {/* <Text>"Choose Level - Any, Secondary, etc."</Text> */}
              {/* Picker goes here! */}

              {/* <Text style={styles.baseText}>Search </Text> */}

              {/* <DropDownPicker
                items={[
                  { label: 'Secondary English/Language Arts', value: 'usa', hidden: true },
                  { label: 'Secondary Social Studies', value: 'uk' },
                  { label: 'Elementary English/Language Arts', value: 'france' },
                  { label: 'Elementary Social Studies', value: 'india' },
                ]}
                defaultValue={this.state.country}
                containerStyle={{ width: 250, height: 30 }}
                style={{ backgroundColor: '#fafafa' }}
                itemStyle={{
                  justifyContent: 'flex-start'
                }}
                dropDownStyle={{ backgroundColor: '#fafafa' }}
                onChangeItem={item => this.setState({
                  country: item.value
                })}
              /> */}
            </View>
          </View>

          <View style={styles.alphabetListStyle}>
            <AlphabetSectionList
              data={convertList(filtered)}
              sectionHeaderTextStyle={styles.sectionHeader}
              renderItem={({ item }) => {
                return ListItem(item);
              }}
            />
          </View>
        </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = stylesheet(windowHeight, windowWidth);
