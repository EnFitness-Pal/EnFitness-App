import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native'
import { colors, heightScreen, widthScreen } from '../../utility'
import CreatePlan from '../../components/CreatePlan'
import WorkoutPlanCard from '../../components/WorkoutPlanCard'
import Button from '../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import WorkoutAdmin from '../../components/WorkoutAdmin'
import { planData } from '../../assets/PlanData'

const PlanScreen = () => {
  const navigation = useNavigation();
  const [day, setDay] = useState('Day1')
  const data = planData;

  const dataArray = 

  {
    "Day1": [
      {
        "Exercise Name": "Brisk Walking",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 400,
        "Minutes": 20,
        "Total Calories": 400
      },
      {
        "Exercise Name": "Bench Step-Ups",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 175,
        "Minutes": 10,
        "Total Calories": 875
      },
      {
        "Exercise Name": "Stationary Bicycle",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 600,
        "Minutes": 20,
        "Total Calories": 600
      },
      {
        "Exercise Name": "Jogging",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 600,
        "Minutes": 20,
        "Total Calories": 600
      }
    ],
    "Day2": [
      {
        "Exercise Name": "Step-Ups on Box",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 150,
        "Minutes": 10,
        "Total Calories": 750
      },
      {
        "Exercise Name": "Elliptical Machine",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 800,
        "Minutes": 20,
        "Total Calories": 800
      },
      {
        "Exercise Name": "Jumping Jacks",
        "Sets": 5,
        "Reps": 20,
        "Calories Per Exercise": 75,
        "Minutes": 10,
        "Total Calories": 375
      },
      {
        "Exercise Name": "Bicycling",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 700,
        "Minutes": 20,
        "Total Calories": 700
      }
    ],
    "Day3": [
      {
        "Exercise Name": "Calf Raises",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 100,
        "Minutes": 10,
        "Total Calories": 500
      },
      {
        "Exercise Name": "Stair Climbing",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 700,
        "Minutes": 20,
        "Total Calories": 700
      },
      {
        "Exercise Name": "High-Knee Running in Place",
        "Sets": 5,
        "Reps": 20,
        "Calories Per Exercise": 150,
        "Minutes": 10,
        "Total Calories": 750
      },
      {
        "Exercise Name": "Rowing Machine",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 600,
        "Minutes": 20,
        "Total Calories": 600
      }
    ],
    "Day4": [
      {
        "Exercise Name": "Jump Rope",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 100,
        "Minutes": 10,
        "Total Calories": 500
      },
      {
        "Exercise Name": "Treadmill Jogging",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 700,
        "Minutes": 20,
        "Total Calories": 700
      },
      {
        "Exercise Name": "Side Step-Ups",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 175,
        "Minutes": 10,
        "Total Calories": 875
      },
      {
        "Exercise Name": "Elliptical Machine",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 800,
        "Minutes": 20,
        "Total Calories": 800
      }
    ],
    "Day5": [
      {
        "Exercise Name": "Seated Bicycle",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 500,
        "Minutes": 20,
        "Total Calories": 500
      },
      {
        "Exercise Name": "Touchdowns",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 150,
        "Minutes": 10,
        "Total Calories": 750
      },
      {
        "Exercise Name": "Skaters",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 200,
        "Minutes": 10,
        "Total Calories": 1000
      },
      {
        "Exercise Name": "Jogging",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 600,
        "Minutes": 20,
        "Total Calories": 600
      }
    ],
    "Day6": [
      {
        "Exercise Name": "Tuck Jumps",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 250,
        "Minutes": 5,
        "Total Calories": 1250
      },
      {
        "Exercise Name": "Mountain Climbers",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 150,
        "Minutes": 10,
        "Total Calories": 750
      },
      {
        "Exercise Name": "Elliptical Machine",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 800,
        "Minutes": 20,
        "Total Calories": 800
      },
      {
        "Exercise Name": "Jumping Jacks",
        "Sets": 5,
        "Reps": 20,
        "Calories Per Exercise": 75,
        "Minutes": 10,
        "Total Calories": 375
      }
    ],
    "Day7": [
      {
        "Exercise Name": "Stationary Bike",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 600,
        "Minutes": 20,
        "Total Calories": 600
      },
      {
        "Exercise Name": "Bench Step-Ups",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 175,
        "Minutes": 10,
        "Total Calories": 875
      },
      {
        "Exercise Name": "Lunges",
        "Sets": 5,
        "Reps": 10,
        "Calories Per Exercise": 200,
        "Minutes": 10,
        "Total Calories": 1000
      },
      {
        "Exercise Name": "Brisk Walking",
        "Sets": 1,
        "Reps": 1,
        "Calories Per Exercise": 400,
        "Minutes": 20,
        "Total Calories": 400
      }
    ]
    }

  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView>
        <Text style = {styles.title}>My Plan</Text>
        <CreatePlan
          onPress={() => navigation.navigate('WorkoutPlanner')}
        />
        <View style = {styles.seperator}/>
        <View style={styles.containerPlan}>
            <FastImage
                source={require('../../assets/typeworkout/plan.png')}
                  style={{
                    width: widthScreen * 0.06,
                    height: widthScreen * 0.06,
                    marginLeft: widthScreen * 0.04
                  }}
            />
            <Text style = {styles.textplan}>See your workout plan</Text>
        </View>
        <View style={styles.containerDay}>
          <FlatList
            data={Object.keys(dataArray)}
            renderItem={({ item }) =><Button
                    title={item.replace('Day', 'Day ')}
                    stylesContainer={{
                      width: widthScreen * 0.18,
                      height: heightScreen * 0.035,
                      backgroundColor: day === item?colors.MAIN: colors.GRAYICON,
                      marginRight: widthScreen * 0.01,

                    }}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() =>setDay(item)}
                />   }
            horizontal
            showsHorizontalScrollIndicator={false}
            style = {{marginTop: heightScreen * 0.02, marginHorizontal: widthScreen * 0.05}}
          />
        </View>
        <View style = {{}}>
          <FlatList
            data={dataArray[day]}
            renderItem={({ item }) => <WorkoutPlanCard item={item} />}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          </View>
        <View style = {styles.seperator}/>
        <View style = {styles.containerPlan}>
          <FastImage
              source={require('../../assets/typeworkout/target.png')}
                style={{
                  width: widthScreen * 0.06,
                  height: widthScreen * 0.06,
                  marginLeft: widthScreen * 0.04
                }}
          />
            <Text style = {styles.textplan}>Join a workout plan</Text>
        </View>
        <View style = {[styles.containerPlan, {marginTop: heightScreen * 0.01, marginLeft:widthScreen * 0.02}]}>
            <Text style = {[styles.textplan,{fontSize:14, marginLeft: widthScreen * 0.05}]}>Recommended for you</Text>
        </View>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style = {{marginLeft: heightScreen * 0.015}}>
              <WorkoutAdmin item={item}
               />
              </View>
            )
          }}
        />
      </ScrollView>
    </SafeAreaView>
  )
}

export default PlanScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
        fontFamily: 'Poppins',
    },
    seperator: {
      height: 6,
      width: widthScreen,
      backgroundColor: colors.GRAYLIGHT,
      marginTop: heightScreen * 0.03,
    },
    containerPlan:{
      marginTop: heightScreen * 0.03,
      flexDirection: 'row',
    },
    textplan:{
      fontSize: 18,
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: colors.WHITE,
      marginLeft: widthScreen * 0.02,
    },
    containerDay:{
      height: heightScreen * 0.07,
    }
})