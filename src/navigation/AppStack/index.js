import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import RecipeDetails from '../../screens/RecipeDetails';
import WorkoutDetail from '../../screens/WorkoutDetail';
import BottomTabsNav from '../BottomTabsNav';
import WorkoutCategories from '../../screens/WorkoutCategories';
import FoodCategories from '../../screens/FoodCategories';
import Bookmarks from '../../screens/Bookmarks';
import ExerciseCategories from '../../screens/ExerciseCategories';
import UpdateProfile from '../../screens/UpdateProfile';
import UpdateBMI from '../../screens/UpdateBMI';
import ChangeGoal from '../../screens/ChangeGoal';
import Achievement from '../../screens/Achievement';
import Settings from '../../screens/Settings';
import ActivityLevel from '../../screens/ActivityLevel';
import WeightGoal from '../../screens/WeightGoal';
import MacroNutrients from '../../screens/MacroNutrients';
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
      }} />
      <Stack.Screen name="FoodCategories" component={FoodCategories} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="ExerciseCategories" component={ExerciseCategories} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="Bookmarks" component={Bookmarks} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="UpdateProfile" component={UpdateProfile} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="UpdateBMI" component={UpdateBMI} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="Settings" component={Settings} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="ChangeGoal" component={ChangeGoal} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="Achievement" component={Achievement} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="ActivityLevel" component={ActivityLevel} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="WeightGoal" component={WeightGoal} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="MacroNutrients" component={MacroNutrients} options={{
            headerShown: false,
      }} />
      </Stack.Navigator>
  
  )
}

export default AppStack

const styles = StyleSheet.create({})