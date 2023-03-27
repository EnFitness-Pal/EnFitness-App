import { Image, ImageBackground, Keyboard, StyleSheet, Text, View, Animated, ActivityIndicator } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import SignInScreen from '../../screens/SignInScreen';
import SignUpScreen from '../../screens/SignUpScreen';
import { colors, heightScreen, widthScreen } from '../../utility';
import HeaderGetting from '../../components/HeaderGetting';
import { AuthContext } from '../../context/AuthContext';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ForgotScreen from '../../screens/ForgotScreen';
const Tab = createMaterialTopTabNavigator();
const Stack = createNativeStackNavigator();
const LoginNavigation = () => {
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
    let heightKey = index == 'SignIn' ? heightScreen * -0.3 : heightScreen * -0.35
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
    },[]);


  return (
    <Animated.View
      style={[styles.container, {marginTop: headerMotion}]}  >
      <Image
        source={index == 'SignIn'?require('../../assets/images/imageauthop.png'):require('../../assets/images/imageauthop1.png')}
        transform={[{ scaleX: -1 }]}
        style = {[styles.image, {height: index == 'SignIn'? 540: 425, width: index == 'SignIn'? 640:640}]}
      />

      <View style={[styles.triangle, { bottom: index == 'SignIn' ? heightScreen * 0.4 : heightScreen * 0.49 }]} />
      <Tab.Navigator
        screenListeners={(navigation) => setIndex(navigation.route.name)}
        screenOptions={{
          tabBarLabelStyle: {
            fontSize: 13,
            color: colors.WHITE,
            fontWeight: 'bold',
            textTransform: 'none',
            textAlign: 'center',
          },
          tabBarIndicatorContainerStyle: {
            // backgroundColor: 'transparent',
            // elevation: 0
          },
          tabBarIndicatorStyle: {
            backgroundColor: colors.MAIN,
            width: widthScreen * 0.13,
            marginLeft: widthScreen * 0.06,
            marginBottom:index == 'SignIn'? widthScreen * 1.068: widthScreen * 0.85,
            height: 3,
          },
          tabBarStyle: {
            width: widthScreen * 0.5,
            marginLeft: widthScreen * 0.05,
            marginTop: heightScreen * 0.05,
            backgroundColor: 'transparent',
            height: index == 'SignIn'? heightScreen * 0.55 : heightScreen * 0.45
          },
          swipeEnabled: false,
        }
      
      }
        style={{
          backgroundColor: 'transparent',
          // position: 'absolute',
        }}
    >
      <Tab.Screen name="SignIn" component={SignInScreen} options={{ tabBarLabel: 'Sign In'}} />
      <Tab.Screen name="SignUp" component={SignUpScreen} options={{ tabBarLabel: 'Sign Up'}}/>
      </Tab.Navigator>
      <View style = {styles.textcontainer}>
        <HeaderGetting
          title1={index == "SignUp"?'Hello Newbie,':'Welcome Back,'}
          title2={index == 'SignUp'?'Enter your information below or login with a other account.': 'Login with your account'}
          stylesContainer={{alignItems: 'flex-start'}}
          stylesText={styles.text}
          stylesText1={styles.text1}
        />
      </View>
      </Animated.View>
  )
}

export default LoginNavigation

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    position: 'absolute',
    right: -150,
    width: 640,
    height: 425
    
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
    position: 'absolute',
    borderStyle: 'solid',
    borderLeftWidth: widthScreen,
    borderBottomWidth: widthScreen * 0.3,
    borderLeftColor: 'transparent',
    borderBottomColor: colors.BG,
    overflow: 'hidden',
    transform: [{ rotate: '-deg' }],
    bottom: heightScreen * 0.49,
    clip: 'rect(0, ' + widthScreen * 0.7 + ', ' + widthScreen * 0.3 + ', 0)',
  },
})