import React, { useState } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { Appbar } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { blue, white } from '../assets/color-codes';

export default function ConversationTopBar() {
  const navigation = useNavigation();

  const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';

  const getFavoriteStatus = () => {
    // Get whether this conversation is a favorite or not, returns boolean
    return false;
  };

  const useToggle = (initialState) => {
    const [isToggled, setIsToggled] = useState(initialState);
    const [icon, changeIcon] = useState(
      initialState ? 'heart-fill' : 'heart-outline',
    );

    const toggle = React.useCallback(() => {
      setIsToggled((state) => !state);
      changeIcon();
    }, [setIsToggled]);
    return [isToggled, toggle, icon];
  };

  const [state, setState] = useState({
    saved: getFavoriteStatus(),
  });

  const save = () => {
    setState({ saved: true });
  };

  const unSave = () => {
    setState({ saved: false });
  };

  const toggleFavorite = () => {
    // deal with the favorites everywhere else
  };

  const openOutline = () => {
    console.log('outline opened');
  };

  return (
    <>
      <Appbar.Header style={styles.container}>
        <Appbar.BackAction onPress={() => navigation.goBack()} />
        <Appbar.Action
          icon="menu"
          onPress={() => {
            openOutline();
          }}
        />
        <Appbar.Content title="Conversation" titleStyle={styles.title} />
        <Appbar.Action
          icon={state.saved ? 'heart' : 'heart-outline'}
          onPress={() => {
            console.log('pressed');
            if (state.saved) {
              unSave();
            } else {
              save();
            }
            toggleFavorite();
          }}
        />
      </Appbar.Header>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: blue,
  },
  title: {
    color: white,
    fontSize: 24,
    fontFamily: 'Roboto',
  },
});
