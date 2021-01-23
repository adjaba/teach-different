import * as React from 'react';
import { StyleSheet } from 'react-native';
import { FAB } from 'react-native-paper';
import { lightgray, darkgray } from '../assets/color-codes';

const TextToSpeechButton = () => {
  const onSpeech = () => {
    console.log('text to speech pressed');
  };
  return (
    <FAB
      style={styles.button}
      icon="text-to-speech"
      color={darkgray}
      size={30}
      onPress={onSpeech}
    />
  );
};

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-end',
    marginHorizontal: 8,
    marginBottom: 12,
    backgroundColor: lightgray,
  },
});

export default TextToSpeechButton;
