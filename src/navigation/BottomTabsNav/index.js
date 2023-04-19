import React, { useContext, useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { colors, heightScreen } from '../../utility';
import ProfileScreen from '../../screens/ProfileScreen';
import InsigntScreen from '../../screens/InsigntScreen';
import TrackingScreen from '../../screens/TrackingScreen';
import HomeScreen from '../../screens/HomeScreen';
import { AuthContext } from '../../context/AuthContext';
import { getPerson } from '../../api/Person/GetPerson';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import IconBottom from '../../assets/fonts';
import FastImage from 'react-native-fast-image';
const Tab = createBottomTabNavigator();
const BottomTabsNav = () => {
    const [person, setPerson] = useState(null);
    const authContext = useContext(AuthContext);
    const getPersonStack = async () => {
        await getPerson(authContext?.userID)
            .then(res => {
                setPerson(res.data);
            })
            .catch(err => {
                console.log('err:', err);
            })
    }
    useEffect(() => { 
    getPersonStack();
    }, []);
    
  return (
    <Tab.Navigator 
        initialRouteName="Home"
        screenOptions={{
            tabBarShowLabel: false,
            tabBarStyle: {
                backgroundColor: colors.BG,
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
            name="TrackingScreen" 
            component={TrackingScreen} 
              options={{
                headerShown: false,
                tabBarIcon: ({ focused }) => (
                    <IconBottom
                        name='news-svgrepo-com'
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
        />
    </Tab.Navigator>
  )
}

export default BottomTabsNav

const styles = StyleSheet.create({})