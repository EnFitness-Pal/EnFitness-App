import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ForgotScreen from '../../screens/ForgotScreen'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginNav from '../LoginNav';

const Stack = createNativeStackNavigator();
const AuthNavigation = () => {
  const [flag, setFlag] = React.useState(false);
  return (
    <Stack.Navigator>
      <Stack.Screen options={{ headerShown: false}} name="Login" component={LoginNav} />
      <Stack.Screen options={{ headerShown: false }} name="Forgot" component={ForgotScreen} />
    </Stack.Navigator>
  )
}

export default AuthNavigation

const styles = StyleSheet.create({})