import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utility'

const InsigntScreen = () => {
  return (
    <View style = {styles.container}>
      <Text>InsigntScreen</Text>
    </View>
  )
}

export default InsigntScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.BG
    }
})