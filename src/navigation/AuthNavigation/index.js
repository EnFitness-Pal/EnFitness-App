import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import LoginNavigation from '../Login'
import ForgotScreen from '../../screens/ForgotScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginNavigation} />
      <Stack.Screen options={{ headerShown: false }} name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})