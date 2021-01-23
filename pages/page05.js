import * as React from 'react';
import { SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';

export default function Page05() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <WebView
        source={{
          uri: 'https://teach-different.web.app/',
        }}
        style={{ marginTop: 20 }}
      />
    </SafeAreaView>
  );
}
