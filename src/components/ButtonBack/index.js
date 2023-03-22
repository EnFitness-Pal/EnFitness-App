import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { colors, heightScreen, widthScreen } from '../../utility'

const ButtonBack = ({
    styleButton,
    onPress,

}) => {
  return (
    <TouchableOpacity
          onPress={onPress}
          style = {[styles.container, styleButton]}
      >
          <Ionicons name="chevron-back" size={24} color={colors.WHITE} />
    </TouchableOpacity>
  )
}

export default ButtonBack

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BACK,
        height: heightScreen * 0.0554,
        width: widthScreen * 0.12,
        borderRadius: 30
    }
})