import { StatusBar, StyleSheet, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import InfoNavigation from '../infomation'
import AppStack from '../AppStack'
import { AuthContext } from '../../context/AuthContext'
import { NavigationContainer } from '@react-navigation/native'
import { colors } from '../../utility'
import Lottie from 'lottie-react-native';
import VerifyScreen from '../../screens/VerifyScreen'
import { useSelector } from 'react-redux'
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
    const theme = useSelector(state => state.state.theme);
    useEffect(()=>{
        if (theme === 'dark'){
            StatusBar.setBarStyle('light-content');
        } else {
            StatusBar.setBarStyle('dark-content');
        }
    },[theme])

    return (
        <NavigationContainer>
            {token?.RefreshToken ? <AppStack /> : <InfoNavigation />}
            {/* <AppStack /> */}
        </NavigationContainer>
    )
}

export default AppNavigation

const styles = StyleSheet.create({})