import * as React from 'react';
import { StyleSheet, Share } from 'react-native';
import { FAB } from 'react-native-paper';
import { lightgray, darkgray } from '../assets/color-codes';

const ShareButton = () => {
  const onShare = async () => {
    try {
      const result = await Share.share({
        message:
          'This is what we would be sharing-- text and/or links could go here (idk about images/videos)',
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };
  return (
    <FAB
      style={styles.share}
      icon="share-variant"
      color={darkgray}
      size={30}
      onPress={onShare}
    />
  );
};

const styles = StyleSheet.create({
  share: {
    alignSelf: 'flex-end',
    marginHorizontal: 8,
    marginBottom: 12,
    backgroundColor: lightgray,
  },
});

export default ShareButton;
