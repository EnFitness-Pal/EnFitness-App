import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useLayoutEffect, useState } from 'react'
import HeaderGetting from '../../components/HeaderGetting'
import { colors, heightScreen, regexEmail, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import { useNavigation } from '@react-navigation/native'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'
import { forgot } from '../../api/Auth/Forgot'
import Loading from '../../components/Loading'

const ForgotScreen = ({ navigation }) => {
    const [loading, setLoading] = useState(false);
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
    const [errors, setErrors] = useState({});
    const [inputs, setInputs] = useState({
        email: '',
    });
  
  const handleForgot = () => { 
    if (!regexEmail.test(inputs.email)) {
      handleError('Invalid email', 'email');
      return;
    }
        setLoading(true);
        forgot(inputs.email)
            .then(res => {
              Alert.alert('Success', 'Please check your email to get new password.');
              navigation.push('Verify', {
                  email: inputs.email
                });
                setLoading(false);
            }
        ).catch(err => { 
                console.log('err:', err);
          if (err.response.status === 404) {
            Alert.alert('Error', 'Email not found. Please enter your email again.');
          } else {
            Alert.alert('Error', 'Please enter your email again.');
          }
                setLoading(false);
                
            })
  }
  if (loading) {
    return (
      <Loading/>
    )
  }
  
  
  return (
    <SafeAreaView style={styles.container}>
      <ButtonBack
        name={'chevron-back'}
        styleButton={{ marginLeft: widthScreen * 0.05 }}
        onPress={()=>{navigation.goBack()}} />
      <HeaderGetting
        title1={'Forgot Password?'}
        title2={'Enter your email address below to get new password.'}
        stylesText={{textAlign: 'left', marginLeft: widthScreen * 0.04, fontWeight: 'bold', fontSize:16}}
        stylesText1={{ marginRight: widthScreen * 0.2}}
        stylesContainer={{flex:1}}
      />
      <Input
        title={'Email'}
        placeholder={'Enter your email'}
        placeholderTextColor={colors.GRAYDARK}
        value={inputs.email}
        error={errors.email}
        onChangeText={(text) => handleOnchange(text, 'email')}
        onFocus={() => handleError(null, 'email')}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginVertical: heightScreen * 0.05}}
      />
      <Button
        title={'Send'}
        onPress={() => { handleForgot() }}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginBottom: heightScreen * 0.49}}
      />
    </SafeAreaView>
  )
}

export default ForgotScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  }
})