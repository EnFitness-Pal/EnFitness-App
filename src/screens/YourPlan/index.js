import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import WorkoutPlanMain from '../../components/WorkoutPlanMain'
import MealPlanMain from '../../components/MealPlanMain'
import { useNavigation } from '@react-navigation/native'
import { AxiosContext } from '../../context/AxiosContext'
import { useSelector } from 'react-redux'

const YourPlan = () => {
    const navigation = useNavigation()
    const axiosContext = useContext(AxiosContext)
    const person = axiosContext.person;
    const theme = useSelector(state => state.state.theme)
  return (
    <SafeAreaView style = {theme == 'dark' ? styles.container: styles.containerlight}>
        <View>
            <Text style = {[styles.title, { color: theme == 'dark'? colors.WHITE: colors.GRAYDARK }]}>Your Plan</Text>
            <Text style = {[styles.textplan, { color: theme == 'dark'? colors.WHITE: colors.GRAYDARK }]}>Workout Plan</Text>
            <WorkoutPlanMain
                onPress={()=>navigation.navigate('PlanScreen')}
                calories = {Math.floor(person?.DailyCalories)}
            />
            <View style = {styles.seperator}/>
            <Text style = {[styles.textplan, {marginTop: heightScreen * 0.03, color: theme == 'dark'? colors.WHITE: colors.GRAYDARK }]}>Meal Plan</Text>
            <MealPlanMain
            kilo = {person?.Weight}
            onPress={()=>navigation.navigate('MealPlan')}
            />
        </View>
    </SafeAreaView>
  )
}

export default YourPlan

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor:colors.BG
    },
    containerlight: {
      flex: 1,
      backgroundColor: colors.WHITE,
  },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
        fontFamily: 'Poppins',
    },
    textplan:{
        fontSize: 18,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        color: colors.WHITE,
        marginLeft: widthScreen * 0.05,
        marginTop: heightScreen * 0.05
      },
      seperator: {
        height: 6,
        width: widthScreen,
        backgroundColor: colors.GRAYLIGHT,
        marginTop: heightScreen * 0.03,
      },
})