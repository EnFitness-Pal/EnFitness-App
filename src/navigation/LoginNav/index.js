import { ImageBackground, Keyboard, StyleSheet, Text, View, Animated, ActivityIndicator, TouchableOpacity, Platform } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import FastImage from 'react-native-fast-image'
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import { colors, heightScreen, widthScreen } from '../../utility';
import HeaderGetting from '../../components/HeaderGetting';
import { AuthContext } from '../../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotScreen from '../../screens/ForgotScreen';
import PagerView from 'react-native-pager-view';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const LoginNav = ({ route }) => {
  console.log(route?.params);
  const authContext = useContext(AuthContext);
  const navigation = useNavigation();
  const pagerViewRef = useRef('');
  const [index, setIndex] = useState();
  const headerMotion = useRef(new Animated.Value(0)).current;
  const animatedKeyBoard = (motion, value, duration) => {
    Animated.timing(
      motion,
      {
        toValue: value,
        duration: duration,
        speed: Platform.OS == 'ios' ? 60 : 50,
        useNativeDriver: false
                
      }
    ).start();
  }
    let heightKey = heightScreen * -0.3
    useEffect(()=> {
        const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
        const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
        const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
        animatedKeyBoard(headerMotion, heightKey, 400);

        })
        const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
            animatedKeyBoard(headerMotion, 0, 400);
        })
        return () => {
            showSubscription.remove()
            hideSubscription.remove();
        }
    }, []);
      
  return (
    <Animated.View
          style={[styles.container, { marginTop: headerMotion }]}>
    <FastImage
        source={index == 0 ? require('../../assets/images/imageauthop.png'):require('../../assets/images/imageauthop1.png')}
        transform={[{ scaleX: -1 }]}
        style = {[styles.image, {height: 425, width: 425}]}
          />
    <View style={styles.containerheader}>
        <Button
          title={'Sign in'}
          stylesContainer={[styles.buttonsignin, { borderBottomWidth: index == 0 ? 4 : 0 }]}
          stylesTitle={styles.textsignin}
          onPress={() => { pagerViewRef.current.setPage(0) }} />
        <Button 
            title={'Sign up'}
            stylesContainer={[styles.buttonsignup,  { borderBottomWidth: index == 1 ? 4 : 0}]} 
            stylesTitle={styles.textsignup}
          onPress={() => {
            navigation.navigate('SexScreen')
          }
          } />
            
    </View>
    <View style={[styles.triangle, { bottom: heightScreen * 0.38 }]} />      
    <View style ={styles.containerbody}>
        <PagerView 
            style={styles.pagerView} 
            initialPage={route?.params? 1:0} 
            onPageSelected={(e)=>{setIndex(e.nativeEvent.position)}}
            ref={pagerViewRef}
            scrollEnabled={false}
            >
        <View key="1" >
            <SignInScreen  />
        </View>
        <View key="2">
            <SignUpScreen data={route?.params}/>
        </View>
        </PagerView>
    </View>
    <View style = {styles.textcontainer}>
        <HeaderGetting
          title1={index == 0 ? 'Welcome Back,': 'Hello newbie,'}
          title2={index == 0 ? 'Login with your account': 'Enter your informations below or login with a other account'}
          stylesContainer={{alignItems: 'flex-start'}}
          stylesText={styles.text}
          stylesText1={styles.text1}
        />
      </View>
    </Animated.View>
  )
}

export default LoginNav

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
   containerheader: {
    flexDirection: 'row',
    position: 'absolute',
    marginTop: heightScreen * 0.05,
    marginLeft: widthScreen * 0.02
  },
  buttonsignin: {
    width: widthScreen * 0.15,
    borderRadius: 0,
    backgroundColor: 'transparent',
    borderBottomWidth:4,
    borderBottomColor: colors.MAIN,
    marginHorizontal: widthScreen * 0.04
  },
  buttonsignup: {
    width: widthScreen * 0.16,
    backgroundColor: 'transparent',
    borderRadius: 0,
    borderBottomWidth:4,
    borderBottomColor:  colors.MAIN,
  },
   textsignin: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textsignup: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  image: {
    width: 640,
    height: 425
  },
  pagerView: {
        flex: 1,
  },
  textcontainer: {
    position: 'absolute',
    marginTop: heightScreen * 0.25
  },
  text: {
    paddingHorizontal: widthScreen * 0.1,
    textAlign: 'left',
    fontWeight: 'bold',
    fontSize: 13,
    color: colors.GRAYLIGHT
  },
  text1: {
    textAlign: 'left',
    marginLeft: widthScreen * 0.1,
    fontSize: 36,
    color: colors.WHITE
  },
  triangle: {
        position:'absolute',
        width: 0,
        height: 0,
        backgroundColor: 'transparent',
        borderStyle: 'solid',
        borderTopWidth: 0,
        borderRightWidth: widthScreen,
        borderBottomWidth: heightScreen *0.15,
        borderTopColor: 'transparent',
        borderRightColor: 'transparent',
        borderBottomColor: colors.BG,
        borderLeftColor: 'transparent',
        marginBottom: heightScreen *0.095,
        transform: [{scaleX: -1}],
    },
    containerbody: {
        flex:1,
        width: widthScreen,
        backgroundColor: 'transparent',
  }
})