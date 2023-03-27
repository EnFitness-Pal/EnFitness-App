import {ImageBackground, SafeAreaView, StatusBar, StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Slider from './src/components/Slider'
import { colors } from './src/utility'
import InfoNavigation from './src/navigation/infomation'
import { NavigationContainer } from '@react-navigation/native';
import GettingStarted from './src/screens/GettingStarted'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNavigation from './src/navigation/Login'
import { AuthProvider } from './src/context/AuthContext'
import AppStack from './src/navigation/AppStack'
import AppNavigation from './src/navigation/AppNavigation'
StatusBar.setBarStyle('dark-content');
const Stack = createNativeStackNavigator();
const App = () => {

  return (
    <View style={styles.container}>
      <AuthProvider>
        <AppNavigation />
      </AuthProvider>
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