import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import HeaderGetting from '../../components/HeaderGetting';
import { colors, heightScreen, regexPassword, widthScreen } from '../../utility';
import ButtonBack from '../../components/ButtonBack';
import Input from '../../components/Input';
import Button from '../../components/Button';
import Loading from '../../components/Loading';
import { confirm } from '../../api/Auth/Forgot';

const ConfirmPass = ({ route, navigation }) => {
    console.log('route:', route.params.code);
    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const [inputs, setInputs] = useState({
        password: '',
        rePassword: '',
    });
    const handleOnchange = (text, input) => {
        setInputs(prevState => ({...prevState, [input]: text}));
    };
    const handleError = (error, input) => {
        setErrors(prevState => ({...prevState, [input]: error}));
    };
  const handleConfirm = () => { 
    if (inputs.password !== inputs.rePassword) {
      handleError('Password not match', 'rePassword');
      return;
    }
    if (!regexPassword.test(inputs.password)) { 
      handleError('Password must contain at least 1 uppercase, 1 lowercase, 1 number, 1 special character', 'password');
      return;
    }
    if (inputs.rePassword.length < 8) {
      handleError('Password must be at least 6 characters', 'rePassword');
      return;
    }
    setLoading(true);
    confirm(route.params.code, inputs.password, inputs.rePassword)
        .then(res => {
          Alert.alert('Success', 'Please login with your new password.');
          console.log('res:', res.data);
          navigation.push('Login');
          setLoading(false);
        }
    ).catch(err => { 
            console.log('err:', err);
            Alert.alert('Error', 'Please check your password again.');
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
        title1={'Forgot Password'}
        title2={'Enter your new password to reset your password.'}
        stylesText={{textAlign: 'left', marginLeft: widthScreen * 0.04, fontWeight: 'bold', fontSize:16}}
        stylesText1={{ marginRight: widthScreen * 0.2 }}
      />
      <Input
        title={'New Password'}
        placeholder={'Enter your new password'}
        secureTextEntry
        value={inputs.password}
        onChangeText={(text) => handleOnchange(text, 'password')}
        onFocus={() => handleError(null, 'password')}
        error={errors.password}
        placeholderTextColor={colors.GRAYDARK}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginVertical: heightScreen * 0.02}}
      />
      <Input
        title={'Re Password'}
        placeholder={'Enter your retype password'}
        secureTextEntry
        value={inputs.rePassword}
        onChangeText={(text) => handleOnchange(text, 'rePassword')}
        onFocus={() => handleError(null, 'rePassword')}
        error={errors.rePassword}
        placeholderTextColor={colors.GRAYDARK}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginBottom: heightScreen * 0.03}}
      />
      <Button
        title={'Reset'}
        onPress={() => { handleConfirm(); }}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginBottom: heightScreen * 0.49}}
      />
    </SafeAreaView>
  )
}

export default ConfirmPass

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG
  },

})