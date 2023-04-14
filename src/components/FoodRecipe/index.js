import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FastImage from 'react-native-fast-image'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
const FoodRecipe = ({
  item,
  index,
  colorBackground,
  onPress
}) => {

  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress = {() => navigation.push('RecipeDetails' , {
        item: item
      })}
      style={[styles.container, { backgroundColor: '#E7DCCD' }]}>
      <View style = {styles.containerIMG}>
        <FastImage
            source = {{uri: item?.image}}
            style = {{width: widthScreen * 0.42, height: widthScreen * 0.42, borderRadius: 100, left:widthScreen * 0.08}}
            resizeMode = {FastImage.resizeMode.cover}
        />
      </View> 
      <View
        style={styles.containerContent}>
        <Text numberOfLines={1} style ={styles.title}>{item?.title}</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          width: widthScreen * 0.35,
          marginLeft: widthScreen * 0.03,
          marginTop: heightScreen * 0.01
        }}>
          <Ionicons
            name="time-outline"
            size={15}
          />
          <Text style={{ color: colors.GRAYDARK, fontSize: 12, fontFamily: "Poppins-Bold", fontWeight: "400", right: 10 }}>{item?.readyInMinutes} min</Text>
          <Ionicons
            name="ios-happy-outline"
            size={15}
            style = {{marginLeft: widthScreen * 0.02, marginRight: -10}}
          />
          <Text style={{ color: colors.GRAYDARK, fontSize: 12, fontFamily: "Poppins-Bold", fontWeight: "400" }}>{item?.healthScore}%</Text>
        </View>
      </View>
    </TouchableOpacity>
  )
}

export default FoodRecipe

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.45,
        height: heightScreen * 0.3,
        borderRadius: 20,
        overflow: 'hidden',
    },
    containerIMG: {
        width: widthScreen * 0.5,
        height: heightScreen * 0.22,
        borderRadius: 20,
        overflow: 'hidden',
        padding: widthScreen * 0.04,
    },
    containerContent: {
        flexDirection: 'column',
        justifyContent: 'space-between',
        width: widthScreen * 0.5, 
        overflow: 'hidden',
    },
    title: {
        marginTop: widthScreen * 0.01,
        marginLeft: widthScreen * 0.03,
        width: widthScreen * 0.4,
        color: colors.GRAYDARK,
        fontSize: 14,
        alignSelf: 'flex-start',
        fontFamily: "Poppins-Bold",
        fontWeight: "600",
    }
})