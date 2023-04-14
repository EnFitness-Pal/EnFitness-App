import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import BottomTabs from '../BottomTabs';
import RecipeDetails from '../../screens/RecipeDetails';
import WorkoutDetail from '../../screens/WorkoutDetail';
import BottomTabsNav from '../BottomTabsNav';
import WorkoutCategories from '../../screens/WorkoutCategories';
const Stack = createNativeStackNavigator();
const AppStack = () => {
  return (
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTabs"
          component={BottomTabsNav}
          options={{ headerShown: false }}
        />
      <Stack.Screen name="RecipeDetails" component={RecipeDetails} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="WorkoutDetail" component={WorkoutDetail} options={{
            headerShown: false,
        }}/>
      <Stack.Screen name="WorkoutCategories" component={WorkoutCategories} options={{
            headerShown: false,
      }}/>
      </Stack.Navigator>
  )
}

export default AppStack

const styles = StyleSheet.create({})