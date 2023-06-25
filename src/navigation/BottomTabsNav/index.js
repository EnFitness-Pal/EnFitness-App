import React, { useCallback, useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { colors, heightScreen } from '../../utility';
import ProfileScreen from '../../screens/ProfileScreen';
import InsigntScreen from '../../screens/InsigntScreen';
import HomeScreen from '../../screens/HomeScreen';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconBottom from '../../assets/fonts';
import Ionicons from 'react-native-vector-icons/Ionicons'
import FastImage from 'react-native-fast-image';
import { useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { AxiosContext } from '../../context/AxiosContext';
import { AuthContext } from '../../context/AuthContext';
import YourPlan from '../../screens/YourPlan';
import NewsFeed from '../../screens/NewsFeed';
const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
    const [loading, setLoading] = useState(false);
    const authContext = useContext(AuthContext);
    const theme = useSelector(state => state.state.theme);
    const axiosContext = useContext(AxiosContext);


    const person = axiosContext?.person;
    useFocusEffect(useCallback(() => {
        setLoading(true)
        axiosContext?.getPersonStack(authContext?.userID);
        setLoading(false)
    }, []))
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                borderTopWidth: 0.17,
                elevation: 0,
                height: heightScreen * 0.1,
                paddingTop: heightScreen * 0.02,
            }
            
        }}    
    >
        <Tab.Screen 
            name="Home"
            component={HomeScreen}
            options={{ 
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <IconBottom
                        name='home-vector-svgrepo-com'
                        size={28}
                        color={focused ? colors.MAIN : colors.GRAYICON}
                    />
                )
                
            }}
        />
        <Tab.Screen 
            name="YourPlan" 
            component={YourPlan} 
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <IconBottom
                        name='task'
                        size={28}
                        color={focused ? colors.MAIN : colors.GRAYICON}
                    />
                )
            
            }}    
        />
        <Tab.Screen 
            name="InsigntScreen"
            component={InsigntScreen} 
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <IconBottom
                        name='chart-colum-svgrepo-com'
                        size={28}
                        color={focused ? colors.MAIN : colors.GRAYICON}
                    />
                )
              }}
        />
        <Tab.Screen 
            name="NewsFeed"
            component={NewsFeed} 
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <Ionicons
                        name='ios-newspaper'
                        size={28}
                        color={focused ? colors.MAIN : colors.GRAYICON}
                    />
                )
              }}
        />
        <Tab.Screen 
            name="ProfileScreen" 
            component={ProfileScreen} 
            options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <View style={{
                        borderWidth: 2.5,
                        borderColor: focused ? colors.MAIN : colors.GRAYICON,
                        borderRadius: 30,
                        padding:2
                    }}>
                        <FastImage
                        source={{ uri: person?.Avatar }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                            padding: heightScreen * 0.02,
                            borderRadius: 15,
                        }}
                        />  
                    </View>
                )   
            }}
            initialParams={{person: person}}
        />
    </Tab.Navigator>
  )
}

export default BottomTabsNav

const styles = StyleSheet.create({})