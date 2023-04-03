import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utility'
import Lottie from 'lottie-react-native';

const Loading = () => {
  return (
    <View style={{flex:1,justifyContent:'center', alignItems:'center', backgroundColor:colors.BG}}>
        <Lottie
            source={require('../../assets/lottie/Ejercicio.json')}
            autoPlay
            loop
            style={{width: 250, height: 250}}
            />
    </View>  
  )
}

export default Loading

const styles = StyleSheet.create({})