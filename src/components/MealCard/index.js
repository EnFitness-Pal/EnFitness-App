import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useMemo, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { getRecipeById } from '../../api/Recipes'
import { AxiosContext } from '../../context/AxiosContext'
import { addTrackingRecipe } from '../../api/Recipes'
import { AuthContext } from '../../context/AuthContext'

const MealCard = ({stylesContainer, image, title, serving, minutes, item}) => {
  const navigation = useNavigation();
  const [data,setData] = useState();
  const [type, setType] = useState(item?.Status);
  const getNutritions = async () => { 
    await getRecipeById(item?.SpoonAccularId)
      .then((res) => {
        setData(res.data[0])
      })
      .catch((err) => { 
        console.log(err)
      })
  }
  useMemo(() => {
    getNutritions();
  },[])  


  return (
    <TouchableOpacity 
      style={[styles.container, stylesContainer]}
      onPress = {() => navigation.push('RecipeDetails' , {
        item: data,
        type: item?.MealId
      })}
      >
      <FastImage
        source = {{uri: image}}
        style = {{width:widthScreen * 0.15, height:widthScreen * 0.15, borderRadius:widthScreen *  0.04}}
        resizeMode={FastImage.resizeMode.cover}
      />
      <View style = {{alignSelf:'center'}}>
        <Text numberOfLines={2} style={styles.title}>{title}</Text>
        <Text style={styles.details}>{serving} serving | {minutes} minutes</Text>
      </View>
      {type == 'success'?
      <View style={{alignSelf:'center', right: widthScreen * 0.1}} >
      <Ionicons name={'ios-checkmark-circle-outline'} size={35} color={'#1cc04e'}/>
      </View>:null
      }
    </TouchableOpacity>
  )
}

export default MealCard

const styles = StyleSheet.create({
    container:{
        flex:1,
        width:widthScreen * 0.8,
        flexDirection:'row',
        alignSelf:'center',
    },
    title:{
        width:widthScreen * 0.47,
        fontFamily:'Poppins',
        fontWeight:'500',
        fontSize:15,
        marginLeft: widthScreen * 0.03,
        color: colors.WHITE
    },
    details:{
        width:widthScreen * 0.6,
        fontFamily:'Poppins',
        fontWeight:'500',
        fontSize:14,
        marginLeft: widthScreen * 0.03,
        color: colors.WHITE,
    },
})