import { StyleSheet, Text, View } from 'react-native'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const AppStack = () => {

  const { logout } = useContext(AuthContext)
  return (
    <View style = {styles.container}>
      <Text onPress={()=>logout()}>Sign Out</Text>
    </View>
  )
}

export default AppStack

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  }
})