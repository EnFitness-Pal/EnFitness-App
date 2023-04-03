// import { StyleSheet, Text, View } from 'react-native'
// import React, { useContext, useEffect } from 'react'
// import { AuthContext } from '../../context/AuthContext'
// import { AxiosContext } from '../../context/AxiosContext';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { baseURL } from '../../utility';

// const AppStack = () => {
//     const authContext = useContext(AuthContext);
//   const { axiosInstance } = useContext(AxiosContext);
//   const [data, setData] = React.useState();

//   const getAllAccount = async () => { 
//         const accessToken = await AsyncStorage.getItem('AccessToken');
//         console.log(accessToken);
//         let config = {
//             method: 'get',
//             maxBodyLength: Infinity,
//             url: `${baseURL}/api/account`,
//             headers: {
//                 Authorization: `Bearer ${authContext.getAccessToken()}`,
//             },
//         };
//         await axiosInstance
//             .request(config)
//             .then(response => {
//               console.log('response', JSON.stringify(response?.data));
//               setData(response?.data);
//             })
//             .catch(error => {
//                 console.log('error',error);
//             });
//     }


//     useEffect(() => {
//         getAllAccount();

//     },[])

//   const { logout } = useContext(AuthContext)
//   return (
//     <View style = {styles.container}>
//       <Text onPress={() => logout()}>Sign Out</Text>
//     </View>
//   )
// }

// export default AppStack

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#F5FCFF',
//   }
// })



  import React from 'react';
  import {
    Alert,
    Animated,
    StyleSheet,
    TouchableOpacity,
    View,
  } from 'react-native';
  import { CurvedBottomBar } from 'react-native-curved-bottom-bar';
  import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors } from '../../utility';
import HomeScreen from '../../screens/HomeScreen';

  const AppStack = () => {
    const _renderIcon = (routeName, selectedTab) => {
      let icon = '';

      switch (routeName) {
        case 'title1':
          icon = 'ios-home-outline';
          return (
            <Ionicons
              name={icon}
              size={25}
              color={routeName === selectedTab ? colors.MAIN : colors.GRAYLIGHT}
            />
          );
        case 'title2':
          icon = 'settings-outline';
          break;
        case 'title3':
          icon = 'settings-outline';
          break;
        case 'title4':
          icon = 'settings-outline';
          break;
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
            height={60}
            circleWidth={50}
            bgColor={colors.GRAYDARK}
            initialRouteName="title1"
            borderTopLeftRight
            screenOptions={{
              headerShown: false,
            }}
            renderCircle={({ selectedTab, navigate }) => (
              <Animated.View style={styles.btnCircle}>
                <TouchableOpacity
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                  }}
                  onPress={() => Alert.alert('Click Action')}>
                  <Ionicons name={'apps-sharp'} color="gray" size={25} />
                </TouchableOpacity>
              </Animated.View>
            )}
            tabBar={renderTabBar}>
            <CurvedBottomBar.Screen
              name="title1"
              position="LEFT"
              component={() => (
                <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />
              )}
            />
            <CurvedBottomBar.Screen
              name="title2"
              position="LEFT"
              options={{headerShown: false}}
              component={() => (
                <View style={{ backgroundColor: '#BFEFFF', flex: 1 }} />
              )}
            />
            <CurvedBottomBar.Screen
              name="title3"
              component={() => (
                <View style={{ backgroundColor: '#FFEBCD', flex: 1 }} />
              )}
              position="RIGHT"
            />
            <CurvedBottomBar.Screen
              name="title4"
              component={HomeScreen}
              position="RIGHT"
            />
          </CurvedBottomBar.Navigator>
    );
  };
  export default AppStack;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    button: {
      marginVertical: 5,
    },
    bottomBar: {},
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
    imgCircle: {
      width: 30,
      height: 30,
      tintColor: 'gray',
    },
    img: {
      width: 30,
      height: 30,
    },
  });