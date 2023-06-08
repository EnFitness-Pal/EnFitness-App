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
import Achievement from '../../screens/Achievement';
import Settings from '../../screens/Settings';
import PremiumScreen from '../../screens/PremiumScreen';
import WorkoutPlanner from '../../screens/WorkoutPlanner';
import License from '../../screens/License';
import WorkoutPlanDetail from '../../screens/WorkoutPlanDetail';
import PlanScreen from '../../screens/PlanScreen';
import MealPlan from '../../screens/MealPlan';
import MealPlanner from '../../screens/MealPlanner';
import MealPlanDetail from '../../screens/MealPlanDetail';
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
      <Stack.Screen name="Achievement" component={Achievement} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="PremiumScreen" component={PremiumScreen} options={{
            headerShown: false,
      }} />
      <Stack.Screen name="WorkoutPlanner" component={WorkoutPlanner} options={{
            headerShown: false,
      }} />  
      <Stack.Screen name="License" component={License} options={{
            headerShown: false,
      }} />  
      <Stack.Screen name="WorkoutPlanDetail" component={WorkoutPlanDetail} options={{
            headerShown: false,
      }} /> 
      <Stack.Screen name="PlanScreen" component={PlanScreen} options={{
            headerShown: false,
      }} /> 
      <Stack.Screen name="MealPlan" component={MealPlan} options={{
            headerShown: false,
      }} /> 
      <Stack.Screen name="MealPlanner" component={MealPlanner} options={{
            headerShown: false,
      }} /> 
      <Stack.Screen name="MealPlanDetail" component={MealPlanDetail} options={{
            headerShown: false,
      }} /> 
      </Stack.Navigator>
  
  )
}

export default AppStack

const styles = StyleSheet.create({})