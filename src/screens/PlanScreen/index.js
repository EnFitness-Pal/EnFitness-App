import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native'
import { colors, heightScreen, widthScreen } from '../../utility'
import CreatePlan from '../../components/CreatePlan'
import WorkoutPlanCard from '../../components/WorkoutPlanCard'
import Button from '../../components/Button'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { ScrollView } from 'react-native'
import FastImage from 'react-native-fast-image'
import WorkoutAdmin from '../../components/WorkoutAdmin'
import { planData } from '../../assets/PlanData'
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'
import AnimatedLottieView from 'lottie-react-native'
import ReactNativeModal from 'react-native-modal'
import { TriggerTrackingPoint, trackingExercise } from '../../api/Tracking'
import ButtonBack from '../../components/ButtonBack'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ModalRanking from '../../components/ModalRanking'

const PlanScreen = () => {
  const navigation = useNavigation();
  const axiosContext = useContext(AxiosContext)
  const authContext = useContext(AuthContext)
  const [day, setDay] = useState('Day1')
  const data = planData;
  const [loading, setLoading] = useState(false)
  const [dataArray, setDataArray] = useState([]);
  const [loadingTracking, setLoadingTracking] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [modalRank, setModalRank] = useState(false);
  const [dataRank, setDataRank] = useState([]);

  const handleGetDataArray = async () => {
      setLoading(true);
      await axiosContext.getPlan(authContext.userID)
      .then((response) =>{
          setDataArray(response.data)
          setLoading(false);
      })
      .catch((error) => {
          console.log(error);
          setLoading(false);
      });
  }

    for (let i = 1; i <= 7; i++) { 
      if (dataArray[`Day${i}`] === null) {
        delete dataArray[`Day${i}`];
      }
    }

  

  useFocusEffect(
      useCallback(() => {
        handleGetDataArray()
      }, [day])
  );
  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView>
        <View style = {{
          flexDirection: 'row',
          marginHorizontal: widthScreen * 0.05,
          alignItems: 'center'}}>
          <ButtonBack
            name={'chevron-back'}
            size={28}
            onPress={() => navigation.goBack()}
          />
          <Text style = {styles.title}>Workout Plan</Text>
        </View>
        <CreatePlan
          onPress={() => navigation.navigate('WorkoutPlanner')}
          text = {'Build a workout plan for your daily or week!'}
          image={require('../../assets/images/workout.png')}
        />
        <View style = {styles.seperator}/>
        <View style={styles.containerPlan}>
            <FastImage
                source={require('../../assets/typeworkout/plan.png')}
                  style={{
                    width: widthScreen * 0.06,
                    height: widthScreen * 0.06,
                    marginLeft: widthScreen * 0.04
                  }}
            />
            <Text style = {styles.textplan}>See your workout plan</Text>
        </View>
        {loading ? <AnimatedLottieView
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  />:
          dataArray.length !== 0?
          <>
          <View style={styles.containerDay}>
          <FlatList
            data={Object.keys(dataArray).filter(key => key.startsWith('Day'))}
            renderItem={({ item }) =><Button
                    title={item.replace('Day', 'Day ')}
                    stylesContainer={{
                      width: widthScreen * 0.18,
                      height: heightScreen * 0.035,
                      backgroundColor: day === item?colors.MAIN: colors.GRAYICON,
                      marginRight: widthScreen * 0.01,

                    }}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() =>setDay(item)}
                />   }
            horizontal
            showsHorizontalScrollIndicator={false}
            style = {{marginTop: heightScreen * 0.02, marginHorizontal: widthScreen * 0.05}}
          />
        </View>
        <View style = {{}}>
          <FlatList
            data={dataArray[day]}
            renderItem={({ item }) => <WorkoutPlanCard 
              item={item} 
              submitCountdown = {async ()=>{
                // setDataWorkout(item)
                setLoadingTracking(true);
                setIsVisible(true);
                await trackingExercise(authContext?.userID, item?.ExerciseName, Math.floor(Number(item?.TotalCalories) / Number(item?.Minutes)), Number(item?.Minutes))
                  .then(async (res) => { 
                      await TriggerTrackingPoint(authContext.userID, "true")
                      .then((response)=>{
                        setDataRank(response.data)
                        if (response.data.IsUpRank){
                          setLoadingTracking(false);
                          setIsVisible(false);
                          setTimeout(()=>setModalRank(true),1000)
                        }
                      })
                      .catch ((err)=>{
                        console.log(err.respone.data)
                      });
                      setLoadingTracking(false);
                    })
                  .catch((err) => { 
                    console.log('errorTrackingWK', err.response);
                    setLoadingTracking(false);
                  })
              }}/>}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
          </View>
        </>
        : <Text style = {styles.textwarn}>You don't have any workout plan!</Text>
        }
        <View style = {styles.seperator}/>
        <View style = {styles.containerPlan}>
          <FastImage
              source={require('../../assets/typeworkout/target.png')}
                style={{
                  width: widthScreen * 0.06,
                  height: widthScreen * 0.06,
                  marginLeft: widthScreen * 0.04
                }}
          />
            <Text style = {styles.textplan}>Join a workout plan</Text>
        </View>
        <View style = {[styles.containerPlan, {marginTop: heightScreen * 0.01, marginLeft:widthScreen * 0.02}]}>
            <Text style = {[styles.textplan,{fontSize:14, marginLeft: widthScreen * 0.05}]}>Recommended for you</Text>
        </View>
        <FlatList
          data={data}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => {
            return (
              <View style = {{marginLeft: heightScreen * 0.015}}>
              <WorkoutAdmin item={item}
               />
              </View>
            )
          }}
        />
      </ScrollView>
      <ReactNativeModal 
        animationIn="zoomIn"
        animationOut="zoomOut"
        animationInTiming={800}
        isVisible={isVisible}>
        {loadingTracking ?
        <View style={styles.modal}>
          <AnimatedLottieView 
            source={require('../../assets/lottie/97930-loading.json')} 
            autoPlay 
            loop
            style={{height: 50, width: 50, alignSelf:'center'}}
          />
        </View>
        : <View style={styles.modal}>
          <Text style = {styles.textTracking}>Tracking Successful!</Text>
          <AnimatedLottieView 
            source={require('../../assets/lottie/91001-success.json')} 
            autoPlay 
            loop ={false}
            duration={900}
            style={{height: 80, width: 80, marginVertical: heightScreen * 0.01}}
          />
          <Button
            stylesContainer={styles.buttonModal}
            title="Continue Tracking"
            titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
            onPress={() => setIsVisible(!isVisible)} />
        </View>}
      </ReactNativeModal>
      <ModalRanking isVisible={modalRank} onPressButton={()=> {
            setModalRank(!modalRank)}} item={dataRank}/>
    </SafeAreaView>
  )
}

export default PlanScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
        fontFamily: 'Poppins',
        marginLeft: widthScreen * 0.16
    },
    seperator: {
      height: 6,
      width: widthScreen,
      backgroundColor: colors.GRAYLIGHT,
      marginTop: heightScreen * 0.03,
    },
    containerPlan:{
      marginTop: heightScreen * 0.03,
      flexDirection: 'row',
    },
    textplan:{
      fontSize: 18,
      fontFamily: 'Poppins',
      fontWeight: 'bold',
      color: colors.WHITE,
      marginLeft: widthScreen * 0.02,
    },
    containerDay:{
      height: heightScreen * 0.07,
    },
  modal: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BG,
    width: widthScreen * 0.8,
    height: heightScreen * 0.35,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textTracking: {
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: colors.MAIN,
  },
  buttonModal: {
    width: widthScreen * 0.6,
    height: heightScreen * 0.05,
    backgroundColor: colors.MAIN,
    borderRadius: 20,
    marginVertical: heightScreen * 0.02,
    marginTop: heightScreen * 0.05
  },
  textwarn:{
    marginTop: heightScreen * 0.03,
    alignSelf:'center',
    fontSize: 16,
    fontFamily:'Poppins',
    color:colors.WHITE,
    fontWeight:'600'
  }
})