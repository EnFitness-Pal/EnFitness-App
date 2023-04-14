import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AxiosContext } from '../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, colors } from '../../utility';

const ProfileScreen = () => {

  const { logout } = useContext(AuthContext)
  return (
    <View style = {styles.container}>
      <Text onPress={() => logout()}>Sign Out</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  }
})