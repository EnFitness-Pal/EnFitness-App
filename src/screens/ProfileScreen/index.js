import { FlatList, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../context/AuthContext'
import { AxiosContext } from '../../context/AxiosContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { baseURL, colors, heightScreen, widthScreen } from '../../utility';
import { SafeAreaView } from 'react-native';
import FastImage from 'react-native-fast-image';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Button, Switch } from '@rneui/base';
import { useDispatch, useSelector } from 'react-redux';
import { setTheme } from '../../redux/features/state/stateSlice';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import CircularProgress from 'react-native-circular-progress-indicator';
import { getTotalTracking } from '../../api/Calories';
import AnimatedLottieView from 'lottie-react-native';
import { getRankingPerson } from '../../api/Ranking';
import ModalGlobal from '../../components/ModalGlobal';
import { restorePremiumAPI } from '../../api/Premium';



const ProfileScreen = ({route}) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getTotalTrackingStack = async () => { 
    setLoading(true)
    await getTotalTracking(authContext.userID, new Date()?.toISOString().split("T").shift())
      .then(res => {
        setData(res.data);
        setLoading(false)
      })
      .catch(err => { 
        console.log('err:', err);
        setLoading(false)
      })
  }
  const navigation = useNavigation();
  const theme = useSelector(state => state.state.theme);
  const [checked, setChecked] = useState(theme == 'dark' ? true : false);
  const dispatch = useDispatch();
  const authContext = useContext(AuthContext)
  const axiosContext = useContext(AxiosContext);
  const [rank, setRank] = useState('')
  const [point, setPoint] = useState(0)
  const [isVisible, setIsVisible] = useState(false);
  const [loadingModal, setLoadingModal] = useState(false);
  const [type, setType] = useState('hasPlan');
  const handleGetRank = async () =>{
    await getRankingPerson(authContext.userID)
    .then((response)=>{
        setRank(response.data.CurrentRank);
        setPoint(response.data.CurrentPoint);
    })
    .catch((error) =>{
      console.log('errorRank', error);
    })
  }

  const handleRestorePayment = async () =>{
      setLoadingModal(true);
      setType('loading');
      await restorePremiumAPI(authContext.userID)
      .then((response) =>{
        setLoadingModal(false);
        setType('success')
      })
      .catch((error) =>{
        console.log(error);
        setLoadingModal(false);
        setType('hasPlan');
        setIsVisible(false);
        Alert.alert('Error','Something went wrong!')
    })
  }

  const toggleSwitch = () => {
    setChecked(!checked);
    dispatch(setTheme(checked ? 'light' : 'dark'));
  };
  useFocusEffect(useCallback(()=> {
    getTotalTrackingStack();
    handleGetRank()
    setLoading(false)
  },[]))
  return (
    <ScrollView style={theme == 'dark' ? styles.container: styles.containerlight}>
      <Text style={[styles.title, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Profile</Text>
      {loading ?
        <AnimatedLottieView
          source={require('../../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150, alignSelf: 'center' }}
        />:
      <View style={styles.containerHeader}>
        <CircularProgress
          value={((data?.DailyCalories / (data?.SumCalories + data?.DailyCalories)) * 100) > 100 ?
            100 : (data?.DailyCalories / (data?.SumCalories + data?.DailyCalories)) * 100 ?
                  (data?.DailyCalories / (data?.SumCalories + data?.DailyCalories)) * 100 : 0}
          progressFormatter={(value) => {
            'worklet';
            if (value === 0) {
            return (value * data?.DailyCalories / 1)?.toFixed(0);               
            }
            else {
              return (value * data?.DailyCalories / value)?.toFixed(0);
            }

          }}
          radius={60}
          showProgressValue={false}
          activeStrokeColor={"#A77C06"}
          activeStrokeWidth={8}
          inActiveStrokeColor={theme == 'dark'? colors.GRAYDARK: colors.GRAYLIGHT}
          activeStrokeSecondaryColor={colors.MAIN}
          inActiveStrokeWidth={10}
          progressValueColor={colors.WHITE}
        />
          <FastImage
            style={{ height: widthScreen * 0.26, width: widthScreen * 0.26, borderRadius: 60, position: 'absolute', marginTop:10, marginLeft:10 }}
            source={{ uri: axiosContext.person?.Avatar }}
            resizeMode={FastImage.resizeMode.cover}
          />
        <View style = {styles.containerJoined}>
          <Text style={[styles.textJoined, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Joined</Text>
          <Text style={[styles.textDate, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>{axiosContext?.person?.EmailConfirmedAt}</Text>
        </View>
      </View>}
      <Text style={[styles.textName, { color: theme == 'dark' ? colors.WHITE : colors.BG }]}>{axiosContext?.person?.FullName}</Text>
      <View style={styles.containerBadges}>
        <FastImage
          source = {rank === 'Master' ? require('../../assets/rank/master.png'):
                    rank === 'Bronze' ? require('../../assets/rank/brozone.png'):
                    rank === 'Silver' ? require('../../assets/rank/silver.png') :
                    rank === 'Gold' ? require('../../assets/rank/gold.png') :
                    rank === 'Platinum' ? require('../../assets/rank/platinum.png'):
                    rank === 'Diamond' ? require('../../assets/rank/diamond.png'):
                    require('../../assets/rank/unranked.png')
        }
          resizeMode={FastImage.resizeMode.contain}
          style={{ height: widthScreen * 0.1, width: widthScreen * 0.1}}
        />
        <Text style={[styles.ranked, { color: theme == 'dark' ? colors.WHITE : colors.BG }]}>{rank}</Text>
        <Text style={[styles.dot, { color: theme == 'dark' ? colors.WHITE : colors.BG }]}>{'\u2B24'}</Text>
        <Text style={[styles.point, { color: theme == 'dark' ? colors.WHITE : colors.BG }]}>{point == 0 || point == 1? `${point} point`: `${point} points`}</Text>
      </View>
      <View style = {styles.seperator}/>
      <View style={styles.containerOptions}>
        <TouchableOpacity
          style={styles.containerOption}
          onPress={() => navigation.navigate('UpdateProfile')}
        >
          <Ionicons
            name='person'
            size={30}
            color={theme == 'dark'? colors.WHITE: colors.BG }
          />
          <Text style={[styles.textOption, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Edit Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerOption}
          onPress={() => navigation.navigate('UpdateBMI')}
        >
          <Ionicons
            name='ios-document-text'
            size={30}
            color={theme == 'dark'? colors.WHITE: colors.BG }
          />
          <Text style={[styles.textOption, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Update BMI</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.containerOption}
          onPress={() => navigation.navigate('Settings')}
        >
          <Ionicons
            name='ios-podium'
            size={30}
            color={theme == 'dark'? colors.WHITE: colors.BG }
          />
          <Text style={[styles.textOption, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Ranking</Text>
        </TouchableOpacity>
        <View style={styles.containerOption}>
          <Ionicons
            name='ios-eye'
            size={30}
            color={theme == 'dark'? colors.WHITE: colors.BG }
          />
          <Text style={[styles.textOption, {color: theme == 'dark'? colors.WHITE: colors.BG }]}>Dark Mode</Text>
          <Switch
            value={checked}
            onValueChange={toggleSwitch}
            style={{ marginLeft: widthScreen * 0.33 }}
            trackColor={{ true: colors.MAIN, false: colors.WHITE }}
          />
        </View>
      </View>
      <Text onPress={()=>setIsVisible(true)} style={styles.textRestore}>Restore payment</Text>
      <Button
        title='Logout'
        type='solid'
        containerStyle={{ marginTop: heightScreen * 0.05 }}
        buttonStyle={{
          backgroundColor: colors.MAIN,
          borderRadius: 20,
          height: heightScreen * 0.05,
          width: widthScreen * 0.8,
          alignSelf: 'center',
        }}
        titleStyle={{ fontSize: 15, fontWeight: 'bold' }}
        onPress={() => authContext.logout()}
      />
    {axiosContext.person.IsPremium?<ModalGlobal
            isVisible = {isVisible}
            type = {type}
            onPress={() => {
                setIsVisible(false);
                axiosContext.getPersonStack(authContext?.userID)
            }}
            onPressOK={handleRestorePayment}
            lottie={type == 'loading'? require('../../assets/lottie/97930-loading.json'): type == 'success'? require('../../assets/lottie/successplan.json'):require('../../assets/lottie/sure-person.json')}
            onPressCancel={()=> setIsVisible(false)}
            loop={loadingModal}
            stylesIcon={type == 'loading'? styles.loading : type == 'success'? null: styles.hasPlan}
            text={type == 'loading'? null: type == 'success'? "You've restored your payment!": "Do you want to restore your payment?"}
        />:
        <ModalGlobal
            isVisible = {isVisible}
            type = {'success'}
            onPress={() => {
                setIsVisible(false);
            }}
            lottie={require('../../assets/lottie/sure-person.json')}
            onPressCancel={()=> setIsVisible(false)}
            loop={loadingModal}
            stylesIcon={styles.icon}
            text={"You haven't payment to restore!"}
            stylesButton={styles.button}
        />
        }
    </ScrollView>
  )
}

export default ProfileScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  containerlight: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginTop: heightScreen * 0.05,
    alignSelf: 'center',
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthScreen * 0.1,
    marginTop: heightScreen * 0.03,
  },
  containerJoined: {
    justifyContent: 'center',
    marginHorizontal: widthScreen * 0.06,
  },
  textJoined: {
    fontSize: 15,
    fontWeight: 'bold',
    color: colors.GRAYLIGHT,
  },
  textDate: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginTop: heightScreen * 0.01,
  },
  textName: {
    fontSize: 36,
    fontWeight: 'bold',
    color: colors.WHITE,
    marginLeft: heightScreen * 0.04,
    marginTop: heightScreen * 0.02,
  },
  containerBadges: {
    flexDirection: 'row',
    marginTop: heightScreen * 0.02,
    marginHorizontal: widthScreen * 0.08,
  },
  seperator: {
    marginTop:heightScreen * 0.03,
    height: 0.5,
    width: widthScreen * 0.8,
    backgroundColor: colors.GRAYLIGHT,
    alignSelf: 'center',
  },
  containerOptions: {
    flex: 1,
    width: widthScreen * 0.8,
    marginTop: heightScreen * 0.03,
  },
  containerOption: {
    marginLeft: widthScreen * 0.08,
    flexDirection: 'row',
    marginVertical: heightScreen * 0.008,
    // justifyContent: 'space-between',
  },
  textOption: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: widthScreen * 0.04,
    alignSelf: 'center',
  },
  ranked:{
    alignSelf:'center',
    fontWeight:'700',
    fontSize: 20,
    color:'#FFFFFF',
    fontFamily:'Poppins',
    marginLeft: widthScreen * 0.03
  },
  dot:{
    alignSelf:'center',
    fontWeight:'700',
    fontSize: 10,
    color:'#FFFFFF',
    fontFamily:'Poppins',
    marginLeft: widthScreen * 0.03
  },
  point:{
    alignSelf:'center',
    fontWeight:'700',
    fontSize: 20,
    color:'#FFFFFF',
    fontFamily:'Poppins',
    marginLeft: widthScreen * 0.03
  },
  textRestore:{
    textDecorationLine:'underline',
    fontSize:16,
    color: colors.MAIN,
    fontWeight:'bold',
    fontFamily:'Poppins',
    alignSelf:'flex-end',
    marginRight: widthScreen * 0.05,
    marginTop: heightScreen * 0.02
},
  hasPlan: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.22,
    marginTop: heightScreen * 0.017
  },
  loading: {
    width: widthScreen * 0.22,
    height: heightScreen * 0.1,
    alignSelf: 'center',
    marginTop:heightScreen * 0.07
  },
  icon:{
    width: widthScreen * 0.3,
    height: heightScreen * 0.25,
    marginTop: heightScreen * 0.015,
  },
  button:{
    marginTop:heightScreen * 0.08
  }
})