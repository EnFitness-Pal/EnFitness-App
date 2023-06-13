import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, heightScreen, widthScreen } from '../../utility';
import FeedCard from '../../components/FeedCard';
import { useSelector } from 'react-redux';
import { BottomSheet } from '@rneui/base';
import ButtonBack from '../../components/ButtonBack';
import { AuthContext } from '../../context/AuthContext';
import { getAllNewsFeed } from '../../api/NewsFeed';
import AnimatedLottieView from 'lottie-react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import { useFocusEffect } from '@react-navigation/native';

const NewsFeed = ({navigation}) => {
  const theme = useSelector(state => state.state.theme);
  const [isVisibleDot, setIsVisibleDot] = useState(false);
  const [loading, setLoading] = useState(false);
  const authContext = useContext(AuthContext);
  const [data, setData] = useState([]);
  const getAllFeeds = async () =>{
    setLoading(true);
    await getAllNewsFeed(authContext.userID, 1, 10)
    .then((response)=>{
      setData(response.data.Data);
      setLoading(false);
    })
    .catch((error) =>{
      console.log(error);
      setLoading(false);
    })
  }

  useFocusEffect(useCallback(()=> {
    getAllFeeds();
  },[]))


  const selectedLibrary = async () => {
    await launchImageLibrary({
      presentationStyle:'overFullScreen',
      mediaType: "mixed",
      selectionLimit: 2,
      formatAsMp4: true,
      assetRepresentationMode:'current'

    },(response)=>{
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        console.log('ImagePicker: ', response.assets);
        navigation.push('CreatePost', {
          data: response.assets,
        })

      }
    });

  }

  const renderItem = ({item}) => {
    return (
      <View>
        <FeedCard item={item} onPressDot={()=>setIsVisibleDot(true)}/>
      </View>
    )
  }
  return (
    <View style ={styles.container}>
      <View style = {styles.containerHeader}>
      <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
              styleButton={{marginTop:heightScreen * 0.044, backgroundColor:colors.GRAYDARK}}
          />
        <Text style = {styles.textHeader}>News Feed</Text>
        <TouchableOpacity onPress={selectedLibrary}>
        <Ionicons
          name='ios-camera-outline'
          size = {35}
          color={colors.WHITE}
          style={{marginTop:heightScreen * 0.05}}
        />
        </TouchableOpacity>
      </View>
      {loading?
      <AnimatedLottieView
      source={require('../../assets/lottie/97930-loading.json')}
      autoPlay
      loop
      style={{ width: heightScreen * 0.1, height: heightScreen * 0.1, alignSelf: 'center'}}
    /> 
      :
      <FlatList 
        data={data}
        renderItem={renderItem}
        style = {{paddingTop: heightScreen * 0.02}}
      />}
      <BottomSheet
      isVisible={isVisibleDot}
      containerStyle={styles.containerBottomSheet}
      backdropStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      modalProps={{ animationType: 'fade' }}
      onBackdropPress={() => setIsVisibleDot(false)}
      theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
    >
      <View style={[styles.bottomSheet, { backgroundColor: theme == 'dark'? colors.WHITE: colors.BACK}]}>
        <TouchableOpacity 
        onPress={()=>{
          setIsVisibleDot(false)}}
        style = {styles.buttonOptions}>
          <View style = {{backgroundColor:colors.GRAYDARK, padding:7, borderRadius:20}}>
          <Ionicons name='ios-person-circle-outline' size={28} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>See profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonOptions}
          onPress = {()=>{}}
        >
          <View style = {{backgroundColor:colors.GRAYDARK, padding:8, borderRadius:20}}>
          <Ionicons name='ios-images' size={26} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>Select Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonOptions}
          onPress = {() => setIsVisibleDot(false)}
        >
          <View style = {{backgroundColor:colors.GRAYDARK, padding:8, borderRadius:20}}>
          <Ionicons name='ios-caret-down-circle' size={26} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
    </View>
  )
}

export default NewsFeed

const styles = StyleSheet.create({
  container:{
    flex:1,
    backgroundColor:colors.BG
  },
  containerHeader:{
    flexDirection:'row',
    justifyContent:'space-between',
    paddingHorizontal:widthScreen * 0.05,
    height:heightScreen * 0.1,
    backgroundColor:colors.GRAYDARK
  },
  textHeader:{
    fontFamily:'Billabong',
    fontSize:35,
    color:colors.WHITE,
    marginTop:heightScreen * 0.05,
  },
  bottomSheet: {
    backgroundColor: colors.WHITE,
    height: heightScreen * 0.3,
    width: widthScreen,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: widthScreen * 0.08,
    paddingTop: widthScreen * 0.08,
  },
  buttonOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightScreen * 0.03,
  },
  textOptions: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: widthScreen * 0.04,
  },
  containerBottomSheet: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
    height: heightScreen,
    width: widthScreen,
    alignSelf: 'center',
  },
})