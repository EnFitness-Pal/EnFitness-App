import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const GoalScreen = ({ route }) => {
  console.log(route.params)
  return (
    <View>
      <Text>index</Text>
    </View>
  )
}

export default GoalScreen

const styles = StyleSheet.create({})