import * as React from 'react';
import { Dimensions, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import firebase from 'firebase';
import firestore from '../config/firebase.js';
import { FlatList } from 'react-native-gesture-handler';
import { SafeAreaView } from 'react-native-safe-area-context';

import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;

export default class Page08 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      editMode: false,
      edMode: (item, index) => (
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={() => this.removeFavorite(index)}
            color={this.color()}>
            <Text style={{ fontSize: 20 }}>{item[0][1]}, theme</Text>
          </Button>
        </View>
      ),
      navMode: (item) => (
        <View style={{ alignItems: 'center' }}>
          <Button
            onPress={() => console.log('0')} // navigate to lessson itself
            color="#E07A0C">
            <Text style={{ fontSize: 20 }}>
              {
                //have some sort of map functions that gets lesson index and maps it to its corresponding
                //lesson name and theme
              }
              {item[0][1]}, theme
            </Text>
          </Button>
        </View>
      ),
    };
  }

  componentDidMount() {
    const username = this.props.username;
    const user = firestore.collection('Users').doc(username);
    user
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ data: doc.data().favorites });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  //specifies color of buttons
  color() {
    if (!this.state.editMode) {
      return '#E07A0C';
    } else {
      return '#B33529';
    }
  }

  removeFavorite(index) {
    const username = this.props.username;
    const user = firestore.collection('Users').doc(username);
    //gets rid of value on firebase
    user.update({
      favorites: firebase.firestore.FieldValue.arrayRemove(
        this.state.data[index],
      ),
    });
    this.setState({
      //gets rid of value locally
      data: this.state.data.filter(function (value, arrIndex) {
        return index !== arrIndex;
      }),
    });
  }

  render() {
    var display = '';
    if (this.state.data.length > 0) {
      //not in edit mode
      if (!this.state.editMode) {
        display = (
          <FlatList
            keyExtractor={(index) => index.toString()}
            data={this.state.data}
            renderItem={({ item }) => this.state.navMode(item)}
          />
        );
      }
      //in edit mode
      else {
        display = (
          <FlatList
            keyExtractor={(index) => index.toString()}
            data={this.state.data}
            renderItem={({ item, index }) => this.state.edMode(item, index)}
          />
        );
      }
    } else {
      display = (
        <View style={{ alignItems: 'center' }}>
          <Text style={{ color: '#E07A0C', fontSize: 15 }}>NO FAVORITES</Text>
        </View>
      );
    }

    return (
      <SafeAreaView contentContainerStyle={styles.container}>
        <Button
          color="#B33529"
          onPress={() => this.setState({ editMode: !this.state.editMode })}>
          {' '}
          Edit Favorites{' '}
        </Button>
        {display}
      </SafeAreaView>
    );
  }
}

const styles = stylesheet(windowHeight, windowWidth);
