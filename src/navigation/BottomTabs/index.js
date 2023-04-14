import React, { useContext, useEffect, useState } from 'react';
import {
  Alert,
  Animated,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { colors, heightScreen } from '../../utility';
import ProfileScreen from '../../screens/ProfileScreen';
import InsigntScreen from '../../screens/InsigntScreen';
import TrackingScreen from '../../screens/TrackingScreen';
import HomeScreen from '../../screens/HomeScreen';
import WorkoutScreen from '../../screens/WorkoutScreen';
import { AuthContext } from '../../context/AuthContext';
import { getPerson } from '../../api/Person/GetPerson';
import RecipeDetails from '../../screens/RecipeDetails';
import FastImage from 'react-native-fast-image'

const BottomTabs = () => {
    const authContext = useContext(AuthContext);
    const [person, setPerson] = useState();
    const getPersonStack = async () => {
        await getPerson(authContext.userID)
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
    const _renderIcon = (routeName, selectedTab) => {
      let icon = '';
      switch (routeName) {
        case 'title1':
          icon = 'ios-home';
        return (
            <Ionicons
              name={icon}
              size={28}
              color={routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT}
            />
          );
        case 'title2':
          icon = 'ios-grid-outline';
        return (
            <Ionicons
              name={icon}
              size={28}
              color={routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT}
            />
          );
        case 'title3':
          icon = 'newspaper';
        return (
            <MaterialCommunityIcons
              name={icon}
              size={30}
              color={routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT}
            />
          );
        case 'title4':
          icon = 'ios-person';
        return (
          <View style={{
            borderWidth: 2.5,
            borderColor: routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT,
            borderRadius: 30,
            padding:2
          }}>
            <FastImage
              source={{ uri: person?.Avatar }}
              resizeMode={FastImage.resizeMode.cover}
              style={{
                padding: 18,
                borderRadius: 15,
              }}
            />  
          </View>
          );
      }

    };
    const renderTabBar = ({ routeName, selectedTab, navigate }) => {
      return (
        <TouchableOpacity
          onPress={() => navigate(routeName)}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          {_renderIcon(routeName, selectedTab)}
        </TouchableOpacity>
      );
    };

    return (
        <CurvedBottomBar.Navigator
            style={styles.bottomBar}
            strokeWidth={0.5}
            strokeColor={colors.BG}
            height={70}
            circleWidth={50}
            bgColor={colors.GRAYDARK}
            initialRouteName="title1"
            borderTopLeftRight
            
            screenOptions={{
              headerShown: false,
            }}
            
            renderCircle={({ selectedTab,routeName, navigate }) => (
              <Animated.View style={styles.btnCircle}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: 60,
                    height: 60,
                    borderRadius:20,
                  }}
                  onPress={() => {
                    navigate(routeName);
                  }}
                >
                  <Ionicons name={'ios-stats-chart'} color={routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT} size={27} />
                </TouchableOpacity>
              </Animated.View>
            )}
            tabBar={renderTabBar}>
            <CurvedBottomBar.Screen
              name="title1"
              position="LEFT"
              component={HomeScreen}
            />
            <CurvedBottomBar.Screen
              name="title2"
              position="LEFT"
              options={{headerShown: false}}
              component={TrackingScreen}
            />
            <CurvedBottomBar.Screen
              name="title0"
              component={InsigntScreen}
              position="CIRCLE"
            />
            <CurvedBottomBar.Screen
              name="title3"
              component={WorkoutScreen}
              position="RIGHT"
            />
            <CurvedBottomBar.Screen
              name="title4"
              component={ProfileScreen}
              position="RIGHT"
            />
          </CurvedBottomBar.Navigator>
    );
  };
  export default BottomTabs;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      marginVertical: 5,
    },
    bottomBar: {
      paddingBottom: heightScreen * 0.012,
    },
    btnCircle: {
      width: 60,
      height: 60,
      borderRadius: 35,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor:colors.GRAYDARK,
      padding: 10,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 0.5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 1.41,
      elevation: 1,
      bottom: 30,
    },
  });