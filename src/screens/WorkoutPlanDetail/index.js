import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import CardDays from '../../components/CardDays'
import Accordion from 'react-native-collapsible/Accordion';
import WorkoutPlanCard from '../../components/WorkoutPlanCard'
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button'
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'
import ModalGlobal from '../../components/ModalGlobal'

const WorkoutPlanDetail = ({ route, navigation }) => {
    const axiosContext = useContext(AxiosContext)
    const authContext = useContext(AuthContext)
    const [activeSections, setActiveSections] = useState([]);
    const [isVisible, setIsVisible] = useState(false);
    const [type, setType] = useState('');
    const [check, setCheck] = useState(false);
    const item = route.params.item
    const [loading, setLoading] = useState(false);
    const handleCheck = async () => {
        await axiosContext.checkPlan(authContext.userID)
        .then((response) =>{
            if (response.data) {
                setCheck(true)
            } else {
                setCheck(false)
            }
        })
        .catch((error) => {
            console.log(error);
            setCheck(false);
        });
    }

    const handleJoinPlanCurrent = async () => {
        setLoading(true);
        setType('loading');
        await axiosContext.deletePlan(authContext.userID)
        .then(async (response)=>{
            if (response.data) {
                await axiosContext.createPlan(authContext.userID, item)
                    .then((respone) => {
                        setLoading(false);
                        setType('success')
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                    });     
            }
        })
        .catch((error) => {
            console.log(error);
        });
    }

    const handleJoinPlan = async () => {
        setLoading(true);
        setType('loading')
        setIsVisible(true)
        if (check) {
            setType('hasPlan');
            setLoading(false);
        }
        else {
            await axiosContext.createPlan(authContext.userID, item)
            .then((respone) => {
                setLoading(false);
                setType('success')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
            });            
        }

    }
    useEffect(() => {
        handleCheck();
    },[])

    let total = 0;
    const dayKeys = Object.keys(item).filter(key => key.startsWith('Day'));
    for (const key in item) {
    if (key.startsWith('Day')) {
      const dayObjects = item[key];
      total += item[key].length;
    }
    }

    _renderHeader = (section) => {
    const index = dayKeys.findIndex(

        (item) =>
            item=== section
        );
        let totalMinutes = 0;
        for (let i = 0; i < item[section].length; i++) {
            totalMinutes += Number(item[section][i].Minutes);
        }
    return (
        <CardDays 
            day={section.slice(3, 4)}
            numworkout={item[section].length}
            minutes={totalMinutes}
            onActive={activeSections[0] === index ? true : false}
        />
    );
    };
    _renderContent = (section) => {
    return (
        <FlatList
        data={item[section]}
        renderItem={({ item }) => <WorkoutPlanCard 
        isVisibleButton
        item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginLeft:widthScreen * 0.05}}
        />
    );
  };

    
  return (
    <SafeAreaView style = {styles.container}>
        <ScrollView style = {{paddingBottom: 10}}>
        <View style = {styles.containerHeader}>
            <ButtonBack
                name='chevron-back'
                size={28}
                onPress={() => navigation.goBack()}
            />
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.23}}>Workout</Text>
        </View>
        <View style = {{flexDirection:'row'}}>
        <FastImage
            source={require('../../assets/typeworkout/exercise.png')}
            style={{width:widthScreen * 0.1, height:heightScreen * 0.05, marginTop:heightScreen * 0.05, marginLeft:widthScreen * 0.05}}
        />
          <Text style={styles.title}>Plan to make your health changing!</Text></View>
          <Text style={styles.subtitle}>Our workout plan designed to help you achieve your fitness goals and transform your body and mind.</Text>
        <View style = {{flexDirection:'row', marginTop: heightScreen * 0.02, alignSelf:'center'}}>
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600'}}>Woohoo!</Text>
            <FastImage
                source={require('../../assets/typeworkout/rocket.png')}
                style={{width:widthScreen * 0.07, height:heightScreen * 0.03, marginLeft:widthScreen * 0.02}}
            />
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600', marginLeft:widthScreen * 0.02}}>Are you ready?</Text>
        </View>
        <Button
            title = {"Join a workout plan"}
            stylesContainer = {styles.button}
            stylesTitle={styles.titleButton}
            onPress = {handleJoinPlan}
            />
        <View style = {styles.containerBody}>
          <Text style = {{
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.05,
            marginTop: heightScreen * 0.04,
            fontSize:15
        }}>{total ===1 ? `${total} WORKOUT`: `${total} WORKOUTS`} IN {dayKeys.length === 1? `${dayKeys.length} DAY`: `${dayKeys.length} DAYS`}</Text>
        <View>
        <Accordion
            sections={dayKeys}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={(sections) => {setActiveSections(sections)}}
            containerStyle={{ marginTop:heightScreen * 0.01 }}
            underlayColor='transparent'
            touchableComponent={TouchableOpacity}
            sectionContainerStyle={{ marginTop:heightScreen * 0.01}}
        />
        </View>
        </View>
        <ModalGlobal
            isVisible = {isVisible}
            type = {type}
            onPress={() => {
                setIsVisible(false);
                navigation.goBack();
            }}
            onPressOK={handleJoinPlanCurrent}
            lottie={type == 'loading'? require('../../assets/lottie/97930-loading.json'): type == 'success'? require('../../assets/lottie/successplan.json'):require('../../assets/lottie/sure-person.json')}
            onPressCancel={()=> setIsVisible(false)}
            loop={loading}
            stylesIcon={type == 'loading'? styles.loading : type == 'success'? null: styles.hasPlan}
            text={type == 'loading'? null: type == 'success'? "Amazing! You've joined this plan. Just do it!!!": "Do you want to leave your current plan?"}
        />
    </ScrollView>
    </SafeAreaView>
  )
}

export default WorkoutPlanDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerHeader: {
        flexDirection: 'row',
        marginHorizontal: widthScreen * 0.05,
        alignItems: 'center',
    },
    title: {
        fontSize: 23,
        fontFamily: 'Poppins-Bold',
        color: colors.WHITE,
        marginTop: heightScreen * 0.035,
        marginLeft: widthScreen * 0.05,
        width: widthScreen * 0.8
    },
    subtitle: {
        marginLeft: widthScreen * 0.05,
        color: colors.GRAYLIGHT,
        marginTop: heightScreen * 0.02,
        fontSize: 16.5,
        fontFamily: 'Poppins'
    },
    button: {
        width: widthScreen * 0.9,
        height: heightScreen * 0.055,
        marginTop: heightScreen * 0.02,
    },
    titleButton: {
        fontSize: 20,
        fontWeight:'700'
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
    }
})