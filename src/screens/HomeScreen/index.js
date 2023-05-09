import {Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import FastImage from 'react-native-fast-image'
import HeaderGetting from '../../components/HeaderGetting'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, heightScreen, regexMin, widthScreen } from '../../utility'
import TipsData from '../../assets/TipsData';
import FoodRecipe from '../../components/FoodRecipe';
import IconBottom from '../../assets/fonts'
import Carousel from 'react-native-snap-carousel';
import { getRandomRecipes } from '../../api/Recipes';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import WorkoutItem from '../../components/WorkoutItem';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Button from '../../components/Button';
import { getRandomWorkout } from '../../api/Workout';
import { AuthContext } from '../../context/AuthContext';
import { getPerson } from '../../api/Person';
import Exercise from '../../components/Exercise';
import Lottie from 'lottie-react-native';
import Modal from "react-native-modal";
import Input from '../../components/Input';
import { getExerciseAdmin, trackingExercise } from '../../api/Tracking';
import { useSelector } from 'react-redux';
import { AxiosContext } from '../../context/AxiosContext';
const HomeScreen = () => {
    const [time, setTime] = useState(new Date().getHours());
    const [loading, setLoading] = useState(true);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [minutes, setMinutes] = useState(null);
    const [dataex, setDataEx] = useState([]);
    const isFetching = useSelector((state) => state.favorite.isFetching);
    const theme = useSelector(state => state.state.theme);
    useEffect(() => {
        const intervalId = setInterval(() => {
        setTime(new Date().getHours());
        }, 1000);

        return () => clearInterval(intervalId);
    }, []);

    const getGreeting = () => {
        if (time >= 0 && time < 12) {
        return 'Good morning';
        } else if (time >= 12 && time < 18) {
        return 'Good afternoon';
        } else {
        return 'Good night';
        }
    };
    const date = new Date();
    const data = TipsData;
    const navigation = useNavigation();
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);
    const person = axiosContext?.person;
    const [isCheck, setIsCheck] = useState(false); 
    const [recipes, setRecipes] = useState([]);
    const [workouts, setWorkouts] = useState([]);
    const [buttonPress, setButtonPress] = useState('Beginner');
    const [itemEx, setItemEx] = useState(null);
    const [loadingEx, setLoadingEx] = useState(false);
    const [tip, setTip] = useState();
    const getRandomTip = (tips) => {
        const randomIndex = Math.floor(Math.random() * tips.length);
        return tips[randomIndex];
    }
    const renderRecipe = ({ item, index }) => {
        return (
            <FoodRecipe
                item={item} index={index} />
        )
    }
    const renderWorkout = ({ item, index }) => {
        return (
            <WorkoutItem
                item={item} index={index} />
        )
    }
    const renderExercise = ({ item, index }) => {
        return (
            <Exercise
                onPress={() => {
                    setItemEx(item);
                    setModalVisible(!isModalVisible)
                }} 
                item={item} index={index}
        
            />
        )
    }
    const getWorkout = async () => { 
        setLoading(true);
        await getRandomWorkout(1, buttonPress)
        .then((response) => { 
            setWorkouts(response?.data.Data); 
            setLoading(false);
        })
        .catch((error) => {
            console.log("error1", error);
            setLoading(false);
        })
    }


    const getTenRandomRecipes = async () => {
        setLoading(true);
        await getRandomRecipes(10)
            .then((response) => {
                setRecipes(response.data?.recipes);
                setLoading(false);
            })
            .catch((error) => {
                setLoading(false);
                console.log("error2", error);
            });
    }

    const getExercise = async () => { 
        setLoadingEx(true);
        await getExerciseAdmin()
        .then((response) => {
            setDataEx(response.data?.Data);
            setLoadingEx(false);
        })
        .catch((error) => {
            console.log("error3", error);
            setLoadingEx(false);
        })
    }

    const TrackingExercise = async (name,calo, min) => { 
        setLoadingModal(true);
        Keyboard.dismiss();
        if (!regexMin.test(min)) {
            setError('Please enter a valid minutes');
            setLoadingModal(false);
            return;
        } else if(min === null){
            setError('Please enter minutes');
            setLoadingModal(false);
            return;

        } else {
        await trackingExercise(authContext?.userID, name, calo, min)
            .then((response) => {
                setOnSuccess(true);
                setLoadingModal(false);
            }).catch((error) => { 
                console.log(error);
                console.log(error.response.data);
                setLoadingModal(false);
            });
    }
    };
    useEffect(() => {
        setLoading(true);
        getWorkout();
        setLoading(false);
     }, [buttonPress]);
    useEffect(() => {
        setLoading(true);
        getTenRandomRecipes();
        setLoading(false);
    }, []);
    useFocusEffect(
      useCallback(() => {
        getExercise();
        setTimeout(() => setLoadingEx(false),1000)
      }, [navigation]));
    useMemo(() => {
        const randomTip = getRandomTip(data);
        setTip(randomTip);
    }, [(date.toUTCString()).slice(0,12)]);
  return (
    <SafeAreaView style={theme == 'dark' ? styles.container: styles.containerlight}>
    {loading ? <Lottie
          source={require('../../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150, alignSelf: 'center', marginTop: heightScreen * 0.07 }}
        /> :
        <ScrollView
        
              >
        <View style={styles.containerHeader}>
            <View style = {{flexDirection:'row', justifyContent:'space-between', marginHorizontal:widthScreen * 0.03}}>
                <Text style={{
                    fontSize: 36,
                    marginLeft:10, 
                    color:colors.WHITE,
                    fontWeight: 'bold',
                    width: widthScreen * 0.6,
                }}>{'Hello' + ', ' + `${person?.FullName || ''}!`}
                </Text>
                <View style = {{flexDirection:'row', marginTop:heightScreen * 0.012, justifyContent:'space-between'}}>
                <TouchableOpacity onPress={()=> navigation.navigate('PremiumScreen')}>
                    <IconBottom name={'crown-svgrepo-com'} size={28} color={'orange'} style={{marginTop:-1}} />
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Bookmarks')}>
                    <Ionicons name={'ios-notifications'} size={25} color={colors.GRAYLIGHT} style={{marginHorizontal:widthScreen * 0.02}}/>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=> navigation.navigate('Bookmarks')}>
                    <Ionicons name={'ios-bookmark'} size={25} color={colors.GRAYLIGHT} />
                </TouchableOpacity>
                </View>
            </View>
        </View>
        <Text style={{flex:1, fontWeight: 'bold', fontSize:16, color:colors.GRAYLIGHT,  marginLeft: widthScreen * 0.07, marginTop:heightScreen * 0.01}}>{getGreeting()}</Text>
        <View style={styles.containerBody}>
            <View style ={styles.containerTitle}>
                <Text style={styles.texttitle}>TIPS OF THE DAY</Text>
                <Ionicons
                    name ={'ios-bulb-outline'}
                    size={25}
                    color={colors.MAIN}
                    style={styles.iconBulb}
                  />
                  <Text style={styles.textdate}>{(date.toUTCString()).slice(0,12)}</Text>
            </View>
              <Text style={styles.texttip}>{tip?.title.toUpperCase()}</Text>
            <ScrollView style ={styles.scrolltext}>
                  <Text
                      style={styles.text}
                  >{tip?.content}</Text>
                  </ScrollView>
            <View style ={styles.containerImg}>
            <FastImage
                source={{uri: tip?.image}}
                style = {styles.img}
                resizeMode={FastImage.resizeMode.cover}
                  
            />  
            </View>          
        </View>
        <View style = {styles.containerRecipes}>
        <View style = {styles.containerTitleRecipe}>
            <Text style = {styles.textTitle}>Dishes</Text>
            <Text 
                style = {styles.textmore}
                onPress={() => {navigation.navigate('FoodCategories')}}      
            >See all</Text>
          </View>
          <View style = {styles.containerSlider}>
            <Carousel
              data={recipes}
              renderItem={renderRecipe}
              sliderWidth={widthScreen}
              itemWidth={widthScreen * 0.5}
              loop={true}
            />
            </View>
          </View>
        <View style = {styles.containerWorkout}>
        <View style = {styles.containerTitleWorkout}>
            <Text style = {styles.textTitle}>Workout</Text>
            <Text 
                style = {styles.textmore}
                onPress={() => {navigation.navigate('WorkoutCategories')}}    
            >See all</Text>
          </View>
          <View style = {styles.containerSliderW}>
            <View style = {styles.containerFilter}>
                <Button
                    title={'Beginner'}
                    stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor:buttonPress === 'Beginner' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Beginner')}}
                />       
                <Button
                    title={'Intermediate'}
                    stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor: buttonPress === 'Intermediate' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Intermediate')}}
                /> 
                <Button
                    title={'Advanced'}
                    stylesContainer={{width:widthScreen * 0.28,height: heightScreen * 0.035, backgroundColor: buttonPress === 'Advanced' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Advanced')}}
                /> 
            </View>

            <Carousel
              data={workouts}
              renderItem={renderWorkout}
              sliderWidth={widthScreen}
              itemWidth={widthScreen * 0.85}
              loop={true}
            />
            </View>
          </View>
          <View style = {styles.containerExercise}>
            <View style = {styles.containerTitleRecipe}>
                <Text style = {styles.textTitle}>Exercise</Text>
                <Text 
                    style = {styles.textmore}
                    onPress={() => {navigation.navigate('ExerciseCategories')}}      
                >See all</Text>
            </View>
            <View style = {styles.containerExerciseSlider}>
            {loadingEx ? <Lottie
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  /> :<Carousel
                data={dataex}
                renderItem={renderExercise}
                sliderWidth={widthScreen}
                itemWidth={widthScreen * 0.88}
                loop={true}
                />}
            </View>
          </View>
        </ScrollView>}
        <Modal 
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={800}
            isVisible={isModalVisible}>
        <View style={styles.modal}>
            {loadingModal ? <Lottie
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  /> :
            <View>
            {onSuccess? null:<Button
                title="X"
                stylesContainer={{width: widthScreen * 0.1, height: widthScreen * 0.1, backgroundColor: colors.BG, borderRadius: 20, alignSelf: 'flex-end'}}
                      onPress={() => {
                          setItemEx(null);
                          setModalVisible(!isModalVisible);
                      }}
                />}
              <Text style = {styles.textTracking}>{onSuccess? "Tracking Successfull!":"Enter the number of minutes."}</Text>
              {onSuccess?<Lottie 
                source={require('../../assets/lottie/91001-success.json')} 
                autoPlay 
                loop ={false}
                duration={900}
                style={{height: 80, width: 80, marginVertical: heightScreen * 0.01, alignSelf: 'center'}}
              />
              :<Input
                placeholder="Minutes"
                placeholderTextColor={colors.GRAYLIGHT}
                keyboardType="numeric"
                onChangeText={(text) => setMinutes(text)}
                value={minutes}
                error={error}
                onFocus={() => setError('')}
                stylesContainer={{width: widthScreen * 0.4, alignSelf: 'center'}}
                  />}
              {onSuccess?
              <Button
                stylesContainer={styles.buttonModalSuccess}
                title="Continue Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          setItemEx(null);
                          setOnSuccess(false);
                          setModalVisible(!isModalVisible);

                      }} />
              :<Button
                stylesContainer={styles.buttonModal}
                title="Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          TrackingExercise(itemEx?.Name, Math.ceil(itemEx?.Calories), minutes);
                      }} />}
                
                </View>}</View>
        </Modal>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerlight: {
        flex: 1,
        backgroundColor: colors.WHITE,
    },
    containerHeader: {
        flex:1,
        justifyContent: 'center',
    },
    containerBody: {
        flex:1,
        // backgroundColor: "#8DAEA3",  
        marginTop:heightScreen * 0.025,
        width: widthScreen,
        height: heightScreen * 0.2,
        borderTopRightRadius: 90,
        borderBottomRightRadius: 90,
        padding: 15,
        paddingRight:120
    },
    img: {
        width: widthScreen * 0.26,
        height: widthScreen * 0.31,
        borderRadius: 100,
    },
    containerImg: {
        position: 'absolute',
        width: widthScreen * 0.28,
        height: widthScreen * 0.33,
        marginTop: heightScreen * 0.025,
        left: widthScreen * 0.7,
        alignSelf: 'flex-end',
        borderRadius: 100,
        borderColor: colors.MAIN,
        borderWidth: 4,
    },
    scrolltext: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texttitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.MAIN,
    },
    iconBulb:{
        bottom: 5,
        marginRight: widthScreen * 0.2,
    },
    textdate: {
        fontSize: 13,
        color: colors.MAIN,
        fontWeight: 'bold',
        right: widthScreen * 0.16,
    },
    texttip: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.WHITE,
        marginBottom: heightScreen * 0.01,
    },
    text: {
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: '600',
        lineHeight: 25,
        alignContent: 'flex-start',
        overflow: 'hidden',
    },
    containerRecipes: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    containerWorkout: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    containerTitleRecipe: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScreen * 0.03,
        marginHorizontal: widthScreen * 0.05,
    },
    containerTitleWorkout: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScreen * 0.03,
        marginHorizontal: widthScreen * 0.05,
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.WHITE,
    },
    textmore: {
        fontSize: 17,
        color: colors.MAIN,
        fontWeight: 'bold',
    },
    containerSlider: {
        flex: 1,
        marginRight:10,
        marginTop: heightScreen * 0.02,
        marginHorizontal: widthScreen * 0.04,
        borderRadius: 20,
    },
    containerSliderW: {
        flex: 1,
        marginTop: heightScreen * 0.02,
        borderRadius: 20,
        right: widthScreen * 0.035,
    },
    containerFilter: {
        height: heightScreen * 0.035,
        width: widthScreen * 0.84,
        borderRadius: 32,
        flexDirection: 'row',
        alignSelf: 'center',
        marginBottom: heightScreen * 0.02,
        marginLeft: heightScreen * 0.03,
        backgroundColor: colors.GRAYDARK,
    },
    containerExercise: {
        flex: 1,
        justifyContent: 'space-between',
    },
    containerExerciseSlider: {
        flex: 1,
        marginTop: heightScreen * 0.02,
        paddingBottom: heightScreen * 0.02,
    },
    modal: {
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BG,
    width: widthScreen * 0.7,
    height: heightScreen * 0.3,
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
    marginTop:heightScreen * 0.02,
    fontSize: 16,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    alignSelf: 'center',
    color: colors.MAIN,
  },
  buttonModal: {
    width: widthScreen * 0.3,
    height: heightScreen * 0.05,
    backgroundColor: colors.MAIN,
    borderRadius: 20,
    marginVertical: heightScreen * 0.03,
  },
  buttonModalSuccess: {
    width: widthScreen * 0.5,
    height: heightScreen * 0.05,
    backgroundColor: colors.MAIN,
    borderRadius: 20,
    marginVertical: heightScreen * 0.03, 
  }
})