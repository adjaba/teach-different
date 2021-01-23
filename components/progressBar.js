import * as React from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
// import { ProgressBar, Button } from 'react-native-paper';
import Slider from '@react-native-community/slider';
// import { NavigationContainer } from '@react-navigation/native';
// import { white, lightgray, blue, blueTransparent50, orange, orangedarker, red, gray, darkgray, black } from '../assets/color-codes'

// import Page15 from '../pages/page17'
// import Page13 from '../pages/page13'
// import Page11 from '../pages/page11'

export default class Progress extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      progress: 1,
    };
    this.updateNavigation = this.updateNavigation.bind(this);
  }

  updateNavigation(view) {
    //Update view function
    this.setState({ currentView: view });
  }

  render() {
    const windowWidth = Dimensions.get('window').width;
    // const windowHeight = Dimensions.get('window').height;
    // const { currentView } = this.state;
    return (
      <View>
        <Text style={styles.text}>
          {this.state.progress} of {this.props.total}{' '}
        </Text>
        <Slider
          value={this.state.progress}
          style={{ width: windowWidth, height: 20 }}
          minimumValue={1}
          maximumValue={this.props.total}
          step={1}
          minimumTrackTintColor={orange}
          maximumTrackTintColor={orange}
          thumbTintColor={orange}
          onValueChange={(newValue) => {
            this.setState({ progress: newValue });
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'right',
  },
});
