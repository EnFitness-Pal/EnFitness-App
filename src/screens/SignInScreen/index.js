import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Input from '../../components/Input'
import ButtonBack from '../../components/ButtonBack'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'

const SignInScreen = ({ navigation }) => {
    const { login } = useContext(AuthContext);
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    return (
        <KeyboardAvoidingView style = {styles.container} behavior="padding">
        <ScrollView>
        <Input
            title="Email"
            placeholder="Enter your email"
            placeholderTextColor={colors.GRAYDARK}
            stylesContainer={{marginVertical: heightScreen*0.02}}
            value={inputs.email}
            onChangeText={(text) => handleOnchange(text, 'email')}
        />
        <Input
            title="Password"
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={colors.GRAYDARK}
            value={inputs.password}
            onChangeText={(text) => handleOnchange(text, 'password')}
        />
        <Text style = {styles.textforgot} onPress={() =>{navigation.navigate('Forgot')}}>Forgot password?</Text>
        <View style = {styles.button}>
            <ButtonBack name={'logo-apple'} styleButton={{marginVertical:heightScreen *0.03}}/>
            <ButtonBack name={'logo-google'} styleButton={{ marginHorizontal: widthScreen * 0.05}}/>
            <Button title={'Sign in'} onPress={()=>{login(inputs.email,inputs.password)}} stylesContainer={{width:widthScreen*0.3, marginLeft:widthScreen * 0.2}}/>
        </View>              
        </ScrollView>

        </KeyboardAvoidingView>
    )
}

export default SignInScreen

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
        alignSelf: 'flex-end',
        fontWeight: 'bold',
        marginVertical: heightScreen * 0.02,
        width: widthScreen * 0.39,
    }
})