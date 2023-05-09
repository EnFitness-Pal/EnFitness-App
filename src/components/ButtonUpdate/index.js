import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, widthScreen } from '../../utility'

const ButtonUpdate = ({ stylesContainer,stylesText, title, desc, onPress }) => {
  return (
    <TouchableOpacity 
        onPress={onPress}
        style = {[styles.container, stylesContainer]} >
      <Text style={[styles.textTitle, stylesText]}>{title}</Text>
      <Text style={styles.textDesc}>{desc}</Text>
    </TouchableOpacity>
  )
}

export default ButtonUpdate

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.BACK,
        width: widthScreen * 0.64,
        padding:widthScreen * 0.04,
        alignSelf: 'center',
        borderRadius: 40,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: widthScreen * 0.05,
    },
    textTitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.WHITE,
        marginBottom: widthScreen * 0.02,
    },
    textDesc: {
        fontSize: 15,
        fontWeight: '500',
        color: colors.GRAYLIGHT,
    }
})