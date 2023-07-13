import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons'
import { AxiosContext } from '../../context/AxiosContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const WorkoutPlanCard = ({ item, index, submitCountdown, isVisibleButton}) => {
    const [isCounting, setIsCounting] = useState(item?.Status === 'working'?true:false);
    const [countdown, setCountdown] = useState(item?.Minutes * 60);
    const axiosContext = useContext(AxiosContext)
    const [type, setType] = useState(
        item?.Status === 'none'?'play':
        item?.Status === 'done'? 'submit':
        item?.Status === 'working'? 'pause':
        item?.Status === 'running'? 'playafterpause':
        item?.Status === 'success'? 'success':"play"
    );

    const test = async () => {
        const TimeRemaining  =  await AsyncStorage.getItem(`TimeRemaining${item?.Id}`);
        const TimeCurrent = await AsyncStorage.getItem(`TimeCurrent${item?.Id}`);
        if(type === 'play'){
            await AsyncStorage.removeItem(`TimeRemaining${item?.Id}`);
            await AsyncStorage.removeItem(`TimeCurrent${item?.Id}`);
        }

        if (TimeCurrent !== null){
            setCountdown(parseInt(TimeCurrent) - 1)
        }
        if (TimeRemaining !== null && TimeCurrent !== null) {
            const elapsedTime = Date.now() - parseInt(TimeRemaining);
                const remaining = TimeCurrent - elapsedTime/1000;
                setCountdown(Math.floor(remaining));
        } else if (TimeRemaining !== null && TimeCurrent == null){
            const elapsedTime = Date.now() - parseInt(TimeRemaining);
                const remainingCD = countdown - elapsedTime/1000;
                setCountdown(Math.floor(remainingCD));
        }
    }

    useEffect(()=>{
        test()
    },[])



    useEffect(() => {
        if (isCounting && countdown > 0) {

        const timer = setInterval(() => {
            setCountdown((prevCountdown) => prevCountdown - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
        }
        else if (countdown == 0) {
            setIsCounting(false);
            axiosContext.updateStatusPlan(item?.Id,"done")
            .then(async (response)=>{
                await AsyncStorage.removeItem(`TimeCurrent${item?.Id}`);
                await AsyncStorage.removeItem(`TimeRemaining${item?.Id}`);
              })
              .catch((err)=>{
                console.log(err)
              })
            setType('submit')
        }
    }, [isCounting, countdown]);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    };

    const playCountdown = async () => {
        await axiosContext.updateStatusPlan(item?.Id,"working")
        .then(async(respone)=>{
          await AsyncStorage.removeItem(`TimeCurrent${item?.Id}`);
          await AsyncStorage.setItem(`TimeRemaining${item?.Id}`, Date.now().toString())
          setType('pause')
          setIsCounting(true);
        })
        .catch((err)=>{
          console.log(err.respone.data)
        })
    };

    const updateStatusSuccess = async () => {
        await axiosContext.updateStatusPlan(item?.Id,"success")
        .then((respone)=>{
        })
        .catch((err)=>{
          console.log(err.respone.data)
        })
      }

    const PlayAfterPauseCountdown = async () => {
        await axiosContext.updateStatusPlan(item?.Id,"working")
        .then(async(respone)=>{
        //   await AsyncStorage.removeItem(`TimeCurrent${item?.Id}`);
          await AsyncStorage.setItem(`TimeRemaining${item?.Id}`, Date.now().toString())
          setType('pause')
          setIsCounting(true);
        })
        .catch((err)=>{
          console.log(err.respone.data)
        })

        setType('pause')
        setIsCounting(true)
    };
    const pauseCountdown = async () => {
        await axiosContext.updateStatusPlan(item?.Id,"running")
        .then(async(respone)=>{
          await AsyncStorage.removeItem(`TimeRemaining${item?.Id}`);
          await AsyncStorage.setItem(`TimeCurrent${item?.Id}`, countdown.toString());
          setType('playafterpause')
          setIsCounting(false)
        })
        .catch((err)=>{
          console.log(err.respone.data)
        })
    };
    return (
    <View style={styles.container}>
        <View style = {styles.header}>
            <View style = {styles.minutes}>
            {type == 'play'?
            <Text style = {{ fontSize:35, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{item?.Minutes}</Text>:
            type == 'pause'?
            <Text style = {{ fontSize:25, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{countdown > 0 ?formatTime(countdown): formatTime(0)}</Text>:
            type == 'playafterpause'?
            <Text style = {{ fontSize:25, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{countdown > 0 ?formatTime(countdown): formatTime(0)}</Text>:
            type == 'submit'?
            <Text style = {{ fontSize:25, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{formatTime(0)}</Text>:
            type == 'success'?
            <Text style = {{ fontSize:35, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{item?.Minutes}</Text>:null
            }
                <Text style = {{fontSize:15, fontFamily:'Poppins', color:colors.BG, fontWeight:'500'}}>Minutes</Text>
            </View>
            {isVisibleButton? null 
            :type == 'play' ?
            <TouchableOpacity style = {styles.icon} onPress ={playCountdown}>
                  <Ionicons name={'ios-play-outline'} size={35} color={colors.BG} style={{marginLeft:heightScreen * 0.02}} />
            </TouchableOpacity>:
            type == 'playafterpause'? 
            <TouchableOpacity style = {styles.icon} onPress ={PlayAfterPauseCountdown}>
                  <Ionicons name={'ios-play-outline'} size={35} color={colors.BG} style={{marginLeft:heightScreen * 0.02}} />
            </TouchableOpacity>:
            type == 'pause'? 
            <TouchableOpacity style = {styles.icon} onPress ={pauseCountdown}>
                  <Ionicons name={'ios-pause-outline'} size={35} color={colors.BG} style={{marginLeft:heightScreen * 0.02}} />
            </TouchableOpacity>:
            type == 'submit'?
            <TouchableOpacity style = {styles.icon} onPress ={()=>{
                submitCountdown();
                updateStatusSuccess();
                setType('success')
            }}>
                <Ionicons name={'ios-add-circle-outline'} size={38} color={colors.MAIN} style={{marginLeft:heightScreen * 0.02}} />
            </TouchableOpacity>:
            type == 'success'?
            <View style = {styles.icon}>
                  <Ionicons name={'ios-checkmark-circle-outline'} size={35} color={'#138636'} style={{marginLeft:heightScreen * 0.02}} />
            </View>:null
            }
        </View>
        <View style= {styles.containerTitle}>
        <Text
            numberOfLines={2}
              style={styles.texttitle}>{item?.ExerciseName}</Text>   
        </View>
        <View style = {styles.containerReps}>
            <Text style = {styles.textReps}>
            {item?.Sets} Sets
            </Text>
        </View>
        <View style = {[styles.containerReps, {marginTop: heightScreen * 0.005, width: widthScreen * 0.25}]}>
            <Text style = {styles.textReps}>
            {item?.Reps} Reps
            </Text>
        </View>
        <View style = {styles.calories}>
              <Text style={styles.textcalories}>{item?.TotalCalories} calories</Text>
        </View>
    </View>
  )
}

export default WorkoutPlanCard

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.4,
        height: heightScreen * 0.27,
        backgroundColor: '#FCFBF4',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.GRAYLIGHT,
        marginRight: widthScreen * 0.03,
        marginTop: heightScreen * 0.03,
        alignItems: 'center',
        padding: heightScreen * 0.005,
    },
    header: {
        width: widthScreen * 0.35,
        height: heightScreen * 0.08,
        flexDirection: 'row',
    },
    minutes: {
        width: widthScreen * 0.19,
        height: heightScreen * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        // width: widthScreen * 0.23,
        height: heightScreen * 0.08,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerReps: {
        width: widthScreen * 0.2,
        height: heightScreen * 0.03,
        // alignSelf: 'flex-start',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.BG,
        marginTop: heightScreen * 0.01,
    },
    textReps: {
        fontSize: 13,
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    containerTitle: {
      height: heightScreen * 0.06,
      width: widthScreen * 0.35, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    texttitle: {
        fontSize: 15,
        fontFamily: 'Poppins',
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: widthScreen * 0.02,
        width: widthScreen * 0.35,
        marginTop: heightScreen * 0.01,
    },
    calories: {
        width: widthScreen * 0.3,
        height: heightScreen * 0.032,
        borderWidth: 2,
        borderColor: colors.BG,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'flex-start',
        marginTop: heightScreen * 0.005,
    },
    textcalories: {
        fontSize: 13,
        fontFamily: 'Poppins',
        fontWeight: "500",
        // color: colors.BG,
    }
})