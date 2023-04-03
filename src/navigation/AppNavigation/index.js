import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import InfoNavigation from '../infomation'
import AppStack from '../AppStack'
import { AuthContext, AuthProvider } from '../../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '../../utility'
import AuthNavigation from '../AuthNavigation'
import LoginNav from '../LoginNav'
import Lottie from 'lottie-react-native';

const AppNavigation = () => {
    const { loading, token } = useContext(AuthContext);
    if (loading) {
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
    
    return (
        <NavigationContainer>
            {token?.RefreshToken ? <AppStack /> : <InfoNavigation />}
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})