import React, { useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';

import Basics from './subjects/basics'
import PanGestureHandler from './subjects/panGestureHandler'
import ScrollView from './subjects/scrollView'

const App = () => {

  return (
    <View style={styles.container}>
      <ScrollView />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center', 
    justifyContent: 'center',
  }
});

export default App;
