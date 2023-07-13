import { Alert, Keyboard, KeyboardAvoidingView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, heightScreen, regexEmail, regexPassword, widthScreen } from '../../utility'
import Input from '../../components/Input'
import ButtonBack from '../../components/ButtonBack'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'
import { useNavigation } from '@react-navigation/native'
import { signUp } from '../../api/Auth/SignUp'

const SignUpScreen = ({ data }) => {
    const navigation = useNavigation();
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        name: '',
        email: '',
        password: '',
        passwordAgain: '',
    });
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const {setLoading } = useContext(AuthContext);

    const handleSignUp = () => {
        Keyboard.dismiss();
        let isValid = true;
        if (!inputs.email) {
            handleError('Email is a required field.', 'email');
            isValid = false;
        } else if (!inputs.email.match(regexEmail)) {
            handleError('Email must be a valid email.', 'email');
            isValid = false;
        }

        if (!inputs.name) {
            handleError('Name is a required field.', 'name');
            isValid = false;
        } else if(inputs.name.length < 3) {
            handleError('Name must be at least 3 characters.', 'name');
            isValid = false;
        }

        if (!inputs.password) {
            handleError('Password is a required field.', 'password');
            isValid = false;
        } else if (!inputs.password.match(regexPassword)) {
            handleError('Password must be a valid password', 'password');
            isValid = false;
        }

        if (!inputs.passwordAgain) {
            handleError('Re-Password is a required field.', 'passwordAgain');
            isValid = false;
        } else if (inputs.passwordAgain !== inputs.password){
            handleError('Password confirmation must match password.', 'passwordAgain');
            isValid = false;
        }
        if (isValid) {
            setLoading(true);
            signUp(
                inputs.name,
                data?.age,
                data?.gender == 'male' ? true : false,
                data?.height,
                data?.weight,
                data?.BF,
                data?.baseline,
                data?.GW,
                data?.MN,
                inputs.email,
                inputs.password,
            ).then(res => {
                Alert.alert('Success', 'Please login to continue!');
                navigation.replace('Loging')
                setLoading(false);
            })
            .catch(err => {
                if (err.response.data.status === 500) {
                    Alert.alert('Register Error', err.response.data.detail);
                } else {
                    Alert.alert('Register Error', 'Try register again.');
                }
                console.log('err:', err);
                setLoading(false);
            })            
        }

        
     }


  return (
    <KeyboardAvoidingView style = {styles.container} behavior="padding">
    <ScrollView >
    <Input
        title="Full name"
        placeholder="Enter your full name"
        onFocus={() => handleError(null, 'name')}
        placeholderTextColor={colors.GRAYDARK}
        onChangeText={(text) => handleOnchange(text, 'name')}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.name}
    />
    <Input
        title="Email"
        placeholder="Enter your email"
        placeholderTextColor={colors.GRAYDARK}
        onFocus={() => handleError(null, 'email')}
        onChangeText={(text) => handleOnchange(text, 'email')}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.email}
    />
    <Input
        title="Password"
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor={colors.GRAYDARK}
        onFocus={() => handleError(null, 'password')}
        onChangeText={(text) => handleOnchange(text, 'password')}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.password}
    />
    <Input
        title="Password again"
        secureTextEntry
        placeholder="Enter your password"
        placeholderTextColor={colors.GRAYDARK}
        onFocus={() => handleError(null, 'passwordAgain')}
        onChangeText={(text) => handleOnchange(text, 'passwordAgain')}
        onSubmitEditing={Keyboard.dismiss}
        error={errors.passwordAgain}
        
    />
    <View style = {styles.button}>
        <ButtonBack name={'logo-apple'} styleButton={{marginVertical:heightScreen *0.03}}/>
        <ButtonBack name={'logo-google'} styleButton={{ marginHorizontal: widthScreen * 0.05}}/>
        <Button
            title={'Sign up'} 
            stylesContainer={{width:widthScreen*0.3, marginLeft:widthScreen * 0.2}}
            onPress = {()=> {handleSignUp()}}
        />
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