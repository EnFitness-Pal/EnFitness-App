import { Alert, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { KeycodeInput } from 'react-native-keycode'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import HeaderGetting from '../../components/HeaderGetting'
import Button from '../../components/Button'
import { forgot, verify } from '../../api/Auth/Forgot'
import Loading from '../../components/Loading'

const VerifyScreen = ({ navigation, route }) => {
    const [code, setCode] = useState(null);
    const [timer, setTimer] = useState(60);
    const [tryAgain, setTryAgain] = useState(false);
    const [loading, setLoading] = useState(false);
    const regex = /^\d{6}$/;
  const handleCode = async () => {
    if (!regex.test(code.toString()) || code === null) {
      Alert.alert('Error', 'Please fill all your code')
      return
    }
    setTryAgain(false);
    setLoading(true);
    await verify(code)
      .then(res => {
        if (res.data === true) {
          Alert.alert('Success', 'Please confirm new password.');
          console.log('res:', res);
          setLoading(false);
          navigation.push('ConfirmPass', {
            code: code
          })
        }
        else {
          Alert.alert('Error', 'Please check your code again.');
          setLoading(false);
        }
        console.log('res:', res.data);
      }).catch(err => {
        console.log('err:', err);
        Alert.alert('Error', 'Please check your code again.');
        setLoading(false);
                
      })
  }
  

    useEffect(() => { 
      const interval = setInterval(() => {
        setTimer(timer - 1);
      }, 1000);
      if (timer === 0) { 
        setTryAgain(true);
      }
      return () => clearInterval(interval);
    })
  
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
      <KeycodeInput
        style={{ alignSelf: 'center', marginHorizontal: widthScreen * 0.05, marginVertical: heightScreen * 0.05 }}
        length={6}
        textColor={colors.WHITE}
        tintColor={colors.MAIN}
        keyboardType={'numeric'}
        numeric={true}
        autoCapitalize={'none'}
        autoFocus={true}
        returnKeyType={'done'}
        onComplete={(code) => { setCode(code) }}
        onChange={(code) => { setCode(code) }}
      />
      {
        tryAgain ?
          <View style = {styles.containerVerify}>
              <Text style={styles.texttime}>You don't have a code, </Text>
            <Text onPress={() => {
              forgot(route.params.email);
              setTryAgain(false);
              setTimer(60);
            }
            } style={styles.textsend}>Send</Text>
          </View>
 :
        <Text style={styles.texttime}>You don't have a code, Resend code in {timer}</Text> 
      }

      <Button
        title={'Send'}
        onPress={() => { handleCode() }}
        stylesContainer={{ alignSelf:'center',marginHorizontal: widthScreen * 0.05, marginBottom: heightScreen * 0.45}}
      />
    </SafeAreaView>
  )
}

export default VerifyScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  texttime: {
    color: colors.MAIN,
    alignSelf: 'center',
    marginVertical: heightScreen * 0.01
  },
  containerVerify: {
    flexDirection: 'row',
    alignSelf: 'center',
    marginVertical: widthScreen * 0.01,
  },
  textsend: {
    color: colors.MAIN,
    alignSelf: 'center',
    marginVertical: heightScreen * 0.01,
    fontWeight: 'bold',
    fontSize: 15
  }
})