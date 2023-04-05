import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AxiosContext } from '../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, colors } from '../../utility';

const ProfileScreen = () => {
    const authContext = useContext(AuthContext);
  const { axiosInstance } = useContext(AxiosContext);
  const [data, setData] = React.useState();

  // const getAllAccount = async () => { 
  //       const accessToken = await AsyncStorage.getItem('AccessToken');
  //       console.log(accessToken);
  //       let config = {
  //           method: 'get',
  //           maxBodyLength: Infinity,
  //           url: `${baseURL}/api/account`,
  //           headers: {
  //               Authorization: `Bearer ${authContext.getAccessToken()}`,
  //           },
  //       };
  //       await axiosInstance
  //           .request(config)
  //           .then(response => {
  //             console.log('response', JSON.stringify(response?.data));
  //             setData(response?.data);
  //           })
  //           .catch(error => {
  //               console.log('error',error);
  //           });
  //   }


    useEffect(() => {
        // getAllAccount();

    },[])

  const { logout } = useContext(AuthContext)
  return (
    <View style = {styles.container}>
      <Text onPress={() => logout()}>Sign Out</Text>
    </View>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.BG,
  }
})