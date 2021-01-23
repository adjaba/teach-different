import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import firebase from '../config/firebase.js';

class HomeTop extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      usersFiltered: [],
    };
    this._setData = this._setData.bind(this);
  }

  _setData(doc) {
    if (doc.exists) {
      console.log('Document data:', doc.data());
      this.setState({ data: Object.values(doc.data()) });
    } else {
      // doc.data() will be undefined in this case
      console.log('No such document!');
    }
  }

  componentDidMount() {
    //Storage
    this.ref = firebase.firestore(Firebase).doc('TDData/Lessons');
    console.log(this.ref);

    firebase
      .firestore(Firebase)
      .collection('TDData')
      .doc('Lessons')
      .get()
      .then((doc) => this._setData(doc))
      .catch(function (error) {
        console.log('Error getting document:', error);
      });
  }
  searchUser = (text) => {
    this.setState({
      usersFiltered: this.state.data.filter((i) =>
        i['Primary Source'].toLowerCase().includes(text.toLowerCase()),
      ),
    });
  };

  componentWillUnmount() {
    //  this.ref.cancel()
  }
  render() {
    return (
      <SafeAreaView style={{ backgroundColor: '#4472C4' }}>
        <View style={{ height: 40 }} />
        <View style={styles.container}>
          <Text style={{ fontSize: 20, color: '#4472C4' }}>Search </Text>
          <View style={{ height: 10 }} />
          <TextInput
            style={{
              height: 20,
              width: 200,
              borderWidth: 1,
              borderColor: 'black',
            }}
            placeholder="Search"
            onChangeText={(text) => this.searchUser(text)}
          />
          <View style={{ height: 10 }} />
          <View style={styles.container2}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Page3')}>
              <Text style={{ fontSize: 20, color: '#4472C4' }}>
                Conversations{' '}
              </Text>
            </TouchableOpacity>
            <Text style={{ fontSize: 20, color: '#4472C4' }}>--</Text>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate('Page4')}>
              <Text style={{ fontSize: 20, color: '#4472C4' }}> Lessons</Text>
            </TouchableOpacity>
          </View>
        </View>
        <View style={styles.container3}>
          {this.state.usersFiltered.map((item) => {
            return MyComponent(item['Primary Source'], item.Theme);
          })}
        </View>
      </SafeAreaView>
    );
  }
}

export default HomeTop;

const MyComponent = (source, theme, image) => (
  <View style={{ padding: 5 }}>
    <Text style={styles.innerText}>
      {source} - {theme}{' '}
    </Text>
  </View>
);

const styles = StyleSheet.create({
  innerText: {
    color: 'white',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'center',
    height: 120,
    alignItems: 'center',
  },
  container2: {
    padding: 2,
    flexDirection: 'row',
  },
  container3: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
