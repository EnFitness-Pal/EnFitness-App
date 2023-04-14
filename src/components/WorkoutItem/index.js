import {StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { colors, heightScreen, widthScreen } from '../../utility'
import { useNavigation } from '@react-navigation/native';
const WorkoutItem = ({ item }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress = {() => navigation.push('WorkoutDetail' , {
        item: item
      })}
      style={styles.container}>
        <FastImage
        source={{
          uri: item?.Thumbnail,
          crop: {height: 100}
        }}
          resizeMode={FastImage.resizeMode.stretch}
          style={styles.image}
        />
        <View style = {styles.containerTitle}>
            <Text numberOfLines={1} style = {styles.title}>{item?.ExerciseName}</Text>
        <View style = {styles.containerSubtitle}>
            <View style = {styles.containersubSubtitle}>
                <Text style={styles.subtitle}>Category: { item?.Category}</Text>
            </View>
            {
              item?.IsPremium === true ? <View style = {styles.premium}>
            <Text style={styles.titlepremium}>PRO</Text>
            </View> : null
            }
         </View>   
        </View>
    </TouchableOpacity>
  )
}

export default WorkoutItem

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.85,
        height: heightScreen * 0.197,
        backgroundColor: colors.SILVER,
        borderRadius: 16,
        // 375 //812
    },
    image: {
        width: widthScreen * 0.85,
        height: heightScreen * 0.197,
        borderRadius: 16,
        overflow: "hidden"
    },
    title: {
        width: widthScreen * 0.7,
        fontSize: 17,
        fontFamily: "Poppins",
        fontWeight: "500",
        color: colors.WHITE,
        marginTop: heightScreen * 0.01,
        marginLeft: widthScreen * 0.03,
    },
    containerTitle: {
        position: 'absolute',
        marginTop: heightScreen * 0.12
    },
    containersubSubtitle: {
      height: heightScreen * 0.02,
      borderLeftWidth: 3,
      borderLeftColor: colors.MAIN,
      marginLeft: widthScreen * 0.03,
    },
    containerSubtitle:{
      width: widthScreen * 0.8,
      flexDirection: "row",
      justifyContent: 'space-between',
      alignSelf: 'center',
    },
    subtitle:{
      fontSize: 13,
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: colors.GRAYLIGHT,
      marginLeft: widthScreen * 0.02,
    },
    premium: {
      width: widthScreen * 0.1,
      height: heightScreen * 0.02,
      backgroundColor: colors.MAIN,
      borderRadius: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    titlepremium: {
      fontSize: 10,
      fontFamily: "Poppins",
      fontWeight: "bold",
      color: colors.WHITE,
    }
})