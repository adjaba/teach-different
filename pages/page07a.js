import * as React from 'react';
import { Dimensions, FlatList, Text, View } from 'react-native';
import { Button } from 'react-native-paper';
import firestore from '../config/firebase.js';
import { SafeAreaView } from 'react-native-safe-area-context';

import { stylesheet } from '../assets/styles.js';

const windowHeight = Dimensions.get('window').height;
const windowWidth = Dimensions.get('window').width;
export default class Page07 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    const username = this.props.username;
    const user = firestore.collection('Users').doc(username);
    user
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.setState({ data: doc.data().recents });
        } else {
          // doc.data() will be undefined in this case
          console.log('No such document!');
        }
      })
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }

  render() {
    const username = this.props.username;
    const user = firestore.collection('Users').doc(username);
    var display = '';
    if (this.state.data.length > 0) {
      display = (
        <FlatList
          keyExtractor={(item, index) => index.toString()}
          data={this.state.data}
          renderItem={({ item }) => Recents(item)}
        />
      );
    } else {
      display = (
        <Text style={{ color: '#E07A0C', fontSize: 15, alignSelf: 'center' }}>
          NO RECENTS
        </Text>
      );
    }
    return (
      <SafeAreaView style={styles.container}>
        <Button
          color="#B33529"
          onPress={() => {
            this.setState({ data: [] });
            user.update({ recents: [] });
          }} // update firebase to clear recents
        >
          {' '}
          Clear Recents{' '}
        </Button>
        {display}
      </SafeAreaView>
    );
  }
}

// function BottomNav() {} ?

const Recents = (item) => (
  <View>
    <Button
      onPress={() => console.log('hi')} //navigate to lesson/conversation
      color="#E07A0C">
      <Text style={{ fontSize: 20 }}>{item[0][1]}, theme</Text>
    </Button>
    <Text style={{ color: '#E07A0C', fontSize: 15 }}>
      {'\n'} {/*item[0][2].toString()*/}
    </Text>
    <Text> {'\n'} </Text>
  </View>
);

const styles = stylesheet(windowHeight, windowWidth);
