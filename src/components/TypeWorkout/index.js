import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'

const TypeWorkout = ({item, onPress, stylesContainer}) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style={[styles.container, stylesContainer]}>
        <FastImage
            source={item?.image}
            style={{width: widthScreen * 0.17, height: heightScreen * 0.08, alignSelf:'center'}}
          />
        <Text style={styles.text}>{item?.label}</Text>
    </TouchableOpacity>
  )
}

export default TypeWorkout

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.22,
        height: heightScreen * 0.13,
        marginRight: widthScreen * 0.03,
        padding: heightScreen * 0.005,
        borderRadius: 20,
    },
    text: {
        fontSize: 13,
        fontWeight: '500',
        fontFamily: 'Poppins',
        textAlign: 'center',
        marginTop: heightScreen * 0.015,
        color: '#fff'
    },
    containerPress: {
        borderWidth: 2,
        padding: heightScreen * 0.005,
        borderRadius: 20,
        borderColor: '#fff',
    }
})