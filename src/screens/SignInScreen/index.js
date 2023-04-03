import { KeyboardAvoidingView, SafeAreaView, StyleSheet, Text, View, ScrollView, TouchableOpacity, Keyboard } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Input from '../../components/Input'
import ButtonBack from '../../components/ButtonBack'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'

const SignInScreen = () => {
    const navigation = useNavigation();
    const { login } = useContext(AuthContext);
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        email: '',
        password: ''
    });
    const regexEmail = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const handleLogin = () => { 
        Keyboard.dismiss();
        if (inputs.email.length === 0) {
            handleError('Please fill email fields', 'email');
        } else if (inputs.password.length === 0) {
            handleError('Please fill password fields', 'password');
        } 
        
        else if (!regexEmail.test(inputs.email)) {
            handleError('Please enter a valid email', 'email');
        } else {
            login(inputs.email, inputs.password);
        }
    }
    return (
        <KeyboardAvoidingView style = {styles.container} behavior="padding">
        <ScrollView>
        <Input
            title="Email"
            placeholder="Enter your email"
            placeholderTextColor={colors.GRAYDARK}
            stylesContainer={{marginVertical: heightScreen*0.02}}
            onFocus={() => handleError(null, 'email')}
            value={inputs.email}
            onChangeText={(text) => handleOnchange(text, 'email')}
            error={errors.email}
        />
        <Input
            title="Password"
            secureTextEntry
            placeholder="Enter your password"
            placeholderTextColor={colors.GRAYDARK}
            onFocus={() => handleError(null, 'password')}
            value={inputs.password}
            onChangeText={(text) => handleOnchange(text, 'password')}
            error={errors.password}
        />
        <Text style = {styles.textforgot} onPress={() =>{navigation.navigate('Forgot')}}>Forgot password?</Text>
        <View style = {styles.button}>
            <ButtonBack name={'logo-apple'} styleButton={{marginVertical:heightScreen *0.03}}/>
            <ButtonBack name={'logo-google'} styleButton={{ marginHorizontal: widthScreen * 0.05}}/>
            <Button title={'Sign in'} onPress={handleLogin} stylesContainer={{width:widthScreen*0.3, marginLeft:widthScreen * 0.2}}/>
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