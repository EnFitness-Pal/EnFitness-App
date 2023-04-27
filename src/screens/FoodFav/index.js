import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors } from '../../utility'

const FoodFav = () => {
  return (
    <View style={styles.container}>
      <Text>FoodFav</Text>
    </View>
  )
}

export default FoodFav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    }
})