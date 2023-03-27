import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import LoginNavigation from '../Login'
import InfoNavigation from '../infomation'
import AppStack from '../AppStack'
import { AuthContext, AuthProvider } from '../../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '../../utility'
import AuthNavigation from '../AuthNavigation'

const AppNavigation = () => {
    const { loading, userToken } = useContext(AuthContext);
    console.log(userToken)
    if (loading) {
        return (
            <View style={{flex:1,justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator size="large" color={colors.MAIN} />
            </View>            
        )

    }
    
    return (
        <NavigationContainer>
            {userToken ? <AppStack /> : <AuthNavigation />}
            {/* <InfoNavigation /> */}
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})