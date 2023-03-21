import {StyleSheet, View } from 'react-native'
import React from 'react'
import Slider from './src/components/Slider'
import { colors } from './src/utility'
import InfoNavigation from './src/navigation/infomation'
import { NavigationContainer } from '@react-navigation/native';
import GettingStarted from './src/screens/GettingStarted'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <View style={styles.container}>
      <NavigationContainer>
        <InfoNavigation /> 
      </NavigationContainer>
    </View>
  )
}

export default App

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG
  }
})