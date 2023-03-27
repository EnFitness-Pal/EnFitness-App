import { Image, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { colors, heightScreen, widthScreen } from '../../utility'
import Input from '../../components/Input'
import ButtonBack from '../../components/ButtonBack'
import Button from '../../components/Button'

const SignUpScreen = () => {
  return (
    <KeyboardAvoidingView style = {styles.container} behavior="padding">
    <ScrollView >
    <Input
        title="Full name"
        placeholder="Enter your full name"
        placeholderTextColor={colors.GRAYDARK}
    />
    <Input
        title="Email"
        placeholder="Enter your email"
        placeholderTextColor={colors.GRAYDARK}
    />
    <Input
        title="Address"
        placeholder="Enter your full name"
        placeholderTextColor={colors.GRAYDARK}
    />
    <Input
        title="Password"
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor={colors.GRAYDARK}
    />
    <Input
        title="Password again"
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor={colors.GRAYDARK}
    />
    <View style = {styles.button}>
        <ButtonBack name={'logo-apple'} styleButton={{marginVertical:heightScreen *0.03}}/>
        <ButtonBack name={'logo-google'} styleButton={{ marginHorizontal: widthScreen * 0.05}}/>
        <Button title={'Sign up'} stylesContainer={{width:widthScreen*0.3, marginLeft:widthScreen * 0.2}}/>
    </View>              
    </ScrollView>

    </KeyboardAvoidingView>
  )
}

export default SignUpScreen

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: colors.BG,
        alignItems: 'center',
        justifyContent: 'center',
    },
    button: {
        flex: 1,
        flexDirection: 'row',
        // justifyContent:'space-between',
        alignItems: 'center',
    },
    textforgot: {
        fontSize: 15,
        color: colors.MAIN,
        textAlign: 'right',
        fontWeight: 'bold',
        marginVertical: heightScreen * 0.02,
    }
})