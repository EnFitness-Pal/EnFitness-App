import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import FoodFav from '../FoodFav'
import WorkoutFav from '../WorkoutFav'
import ExerciseFav from '../ExerciseFav'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs'
const Tab = createMaterialTopTabNavigator();
const Bookmarks = ({navigation}) => {
  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.containerHeader}>
          <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
          />
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.18}}>My Bookmark</Text>
      </View>
      <View style={{ flex: 1, marginTop: 10, backgroundColor:colors.BG }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 15, fontFamily: "Poppins-Bold", fontWeight: "500", color: colors.WHITE, textTransform: 'none', },
            tabBarStyle: { backgroundColor: colors.BG, height: heightScreen * 0.05 },
            tabBarIndicatorStyle: { backgroundColor: colors.MAIN, height: heightScreen * 0.005, width: widthScreen * 0.07, marginLeft: widthScreen * 0.13, borderRadius: 10 },
            tabBarActiveTintColor: colors.MAIN,
            tabBarInactiveTintColor: colors.MAIN,
          }}
            >
            <Tab.Screen name="Dishes" component={FoodFav} />
            <Tab.Screen name="Workout" component={WorkoutFav} />
            <Tab.Screen name="Exercise" component={ExerciseFav} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  )
}

export default Bookmarks

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: widthScreen * 0.05,
    alignItems: 'center',
  },
})