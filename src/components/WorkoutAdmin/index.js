import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'
import { Button } from '@rneui/themed'
import ButtonBack from '../ButtonBack'
import { useNavigation } from '@react-navigation/native'

const WorkoutAdmin = ({ item }) => {
  const navigation = useNavigation();
  let total = 0;
  const dayKeys = Object.keys(item).filter(key => key.startsWith('Day'));
  for (const key in item) {
    if (key.startsWith('Day')) {
      const dayObjects = item[key];
      const numberOfObjects = dayObjects.length;
      total += item[key].length;
    }
  }

  return (
    <TouchableOpacity style={styles.container}>
        <View style ={{flexDirection:'row',}}>
          <FastImage
              source={require('../../assets/typeworkout/barbell-gym.png')}
                style={{
                  width: widthScreen * 0.07,
                  height: widthScreen * 0.07,
                }}
          />
          <Text style = {{
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.02,
            marginTop: heightScreen * 0.005,
        }}>{total == 1 || total == 0 ? `${total} WORKOUT IN`: `${total} WORKOUTS IN`} {dayKeys.length == 1? `${dayKeys.length} DAY `: `${dayKeys.length} DAYS `} </Text>
        </View>
        <View style ={{flexDirection:'row', justifyContent:'space-between'}}>
        <View style ={{marginLeft:widthScreen * 0.03}}>
        <View style ={{flexDirection:'row', marginTop:heightScreen * 0.005}}>
          <FastImage
              source={require('../../assets/typeworkout/weight-com.png')}
                style={{
                    width: widthScreen * 0.05,
                    height: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.015,
                    marginTop: widthScreen * 0.01
                }}
          />
          <Text style = {{
            fontSize: 12,
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.02,
            marginTop: heightScreen * 0.005,
            }}>{item?.WeightGoal}</Text>
        </View>
        <View style ={{flexDirection:'row', marginTop:heightScreen * 0.005}}>
          <FastImage
              source={require('../../assets/typeworkout/body.png')}
                style={{
                    width: widthScreen * 0.05,
                    height: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.015,
                    marginTop: widthScreen * 0.01
                }}
          />
          <Text style = {{
            fontSize: 12,
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.02,
            marginTop: heightScreen * 0.005,
            }}>{item?.TypeWorkout}</Text>
        </View>
        <View style ={{flexDirection:'row', marginTop:heightScreen * 0.005}}>
          <FastImage
              source={require('../../assets/typeworkout/level.png')}
                style={{
                    width: widthScreen * 0.05,
                    height: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.015,
                    marginTop: widthScreen * 0.01
                }}
          />
          <Text style = {{
            fontSize: 12,
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.02,
            marginTop: heightScreen * 0.005,
            }}>{item?.FitnessLevel}</Text>
        </View>
        <View style ={{flexDirection:'row', marginTop:heightScreen * 0.005}}>
          <FastImage
              source={require('../../assets/typeworkout/activity.png')}
                style={{
                    width: widthScreen * 0.05,
                    height: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.015,
                    marginTop: widthScreen * 0.01
                }}
          />
          <Text style = {{
            fontSize: 12,
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.02,
            marginTop: heightScreen * 0.005,
          }}>{item?.ActivityLevel}</Text>
        </View>
        </View>
          <ButtonBack
              name='chevron-forward-outline'
              size={28}
              onPress={() => navigation.push("WorkoutPlanDetail", {
                item: item
              })}
              styleButton={{
                marginTop: heightScreen * 0.08,
                width: heightScreen * 0.05,
                height: heightScreen * 0.05,
                backgroundColor:colors.MAIN
              }}
          />
        </View>
    </TouchableOpacity>
  )
}

export default WorkoutAdmin

const styles = StyleSheet.create({
    container: {
        height: heightScreen * 0.2,
        width: widthScreen * 0.85,
        borderRadius: 20,
        borderWidth: 0.4,
        borderColor: colors.GRAYLIGHT,
        marginTop: heightScreen * 0.02,
        padding: widthScreen * 0.04,
    }
})