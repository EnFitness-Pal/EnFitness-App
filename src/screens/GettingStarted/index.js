import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Slider from '../../components/Slider';

const GettingStarted = () => {
    return (
        <Stack.Screen name="GettingStarted" options={{ headerShown: false }} component={Slider} />
        
  )
}

export default GettingStarted

const styles = StyleSheet.create({})