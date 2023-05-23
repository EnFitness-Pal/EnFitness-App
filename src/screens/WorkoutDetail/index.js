import { FlatList, Keyboard, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import FastImage from 'react-native-fast-image'
import ButtonBack from '../../components/ButtonBack'
import { colors, heightScreen, regexMin, widthScreen } from '../../utility'
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import CardInfo from '../../components/CardInfo';
import { addWorkoutFav, deleteUserFav, getAllWorkoutFav } from '../../api/Favorites'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import { Button } from '@rneui/themed'
import Input from '../../components/Input'
import ReactNativeModal from 'react-native-modal'
import ButtonAdd from '../../components/Button'
import AnimatedLottieView from 'lottie-react-native'
import { getMets, trackingExercise } from '../../api/Tracking'
import { AxiosContext } from '../../context/AxiosContext'
const WorkoutDetail = ({ route, navigation }) => {
  const [activeSections, setActiveSections] = useState([]);
  const [loading, setLoading] = useState(false);
  const [favID, setFavID] = useState(null);
  const authContext = useContext(AuthContext);
  const [loadingModal, setLoadingModal] = useState(false);
  const [error, setError] = useState(false);
  const [checkFav, setCheckFav] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [minutes, setMinutes] = useState(null);
  const axiosContext = useContext(AxiosContext);
  const person = axiosContext?.person;


  const getWorkoutFav = async () => {
    setLoading(true)
    await getAllWorkoutFav(authContext?.userID,'')
      .then((res) => {
        res.data?.Workout.map((result) => {
          if (result?.Id === route.params?.item?.Id) {
            setCheckFav(true)
            setFavID(result?.UserFavoritesId)
            setLoading(false)
          }
        setLoading(false)
        })
      })
      .catch((err) => { 
        console.log(err);
        setLoading(false)
      })
  };
  const handleAddFav = async () => { 
    setLoading(true)
    await addWorkoutFav(authContext?.userID, route.params?.item?.Id)
      .then((res) => {
        setCheckFav(true)
        setLoading(false)
      })
      .catch((err) => { 
        console.log(err.response.data);
        setLoading(false)
      })
  }
  console.log(person);

  const handleRemoveFav = async () => { 
    setLoading(true)
    await deleteUserFav(favID)
      .then((res) => {
        setCheckFav(false);
        setLoading(false)
      })
      .catch((err) => { 
        console.log(err.response.data);
        setLoading(false);
      })
  }

    const TrackingWorkout = async (min) => { 
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
        // await trackingExercise(authContext?.userID, name, calo, min)
        //     .then((response) => {
        //         setOnSuccess(true);
        //         setLoadingModal(false);
        //     }).catch((error) => {
        //         console.log(error);
        //         console.log(error.response.data);
        //         setLoadingModal(false);
        //     });
        await getMets(
          route.params.item?.ExerciseName,
          min,
          person?.ActivityLevel === 0 ? 'Sedentary' :
          person?.ActivityLevel === 1 ? 'Lightly Active' :
          person?.ActivityLevel === 2 ? 'Moderately Active' :
          person?.ActivityLevel === 3 ? 'Very Active' :
          'Extremely Active',
          person?.Height,
          person?.Weight,
          person?.BodyFat,
          person?.Age,
          person?.Sex === true ? 'Male' : 'Female'
        )
        .then(async (response) => {
          const METs = response.data?.METs;
          console.log(METs);
          const calories = (person?.Weight * METs * min) / (60 * min);
          console.log(calories);
          await trackingExercise(authContext?.userID, route.params.item?.ExerciseName, Math.ceil(calories), min)
          .then(() => {
            setOnSuccess(true);
            setLoadingModal(false);
          })
          .catch((error) => {
            console.log(error);
            console.log(error.response.data);
            setLoadingModal(false);
          })
        })
    }
    };


  useFocusEffect(useCallback(()=> {
    getWorkoutFav();
    setTimeout(() => setLoading(false),1000)
  },[checkFav]))
  
    const renderVideo = ({ item, index }) => { 
        return (
            <Video
                source={{ uri: item }}
                style={styles.backgroundVideo}
                resizeMode="cover"
                repeat={true}
                muted={true}
                paused={true}
                controls={true}
                ignoreSilentSwitch={"obey"}
                playInBackground={true}
                playWhenInactive={true}
                />
        )
    }
    const [readmore, setReadmore] = React.useState(false)

    const SECTIONS = [
        {
        title: 'First',
        content: route.params.item?.VideoURL,
        },
        {
        title: 'Second',
        content: route.params.item?.Steps,
        },
    ];

    _renderHeader = (section) => {
      return (
        <CardInfo
          title={section.title == 'First' ? `Video : ${section.content?.length}` : "Steps"}
          styleContainer={{
            flex: 1,
            borderLeftColor: section.title == 'First' ? "#FF6000" : "#009FBD", 
            borderLeftWidth: 5,
            alignSelf: 'center',
          }}
        />
      );
    };

    _renderContent = (section) => { 
        if (section.title === 'First') {
        return (
        <View style={styles.containerVideo}>
            <Carousel
                data={section?.content}
                renderItem={renderVideo}
                sliderWidth={widthScreen}
                itemWidth={widthScreen * 0.9}
                loop={true}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                
            />
        </View>)
    } else {
    return (
    <View style={styles.containerContent}>
      <FlatList
        data={section?.content}
        keyExtractor={item => item}
        renderItem={({ item, index }) => { 
          return (
            <View style={{
              width: widthScreen * 0.9,
              height: heightScreen * 0.07,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: widthScreen * 0.05,
              marginTop: heightScreen * 0.05,
              marginVertical: heightScreen * 0.03,
            }}>
              <View style = {{ width: widthScreen * 0.1, height: heightScreen * 0.08}}>
                <Text style={{alignSelf:'center', color: colors.MAIN, fontSize: 12, fontFamily: "Poppins-Bold", fontWeight: "500"}}>Step</Text>
                      <Text numberOfLines={1} style={{ color: colors.MAIN, fontSize: 30, fontFamily: "Poppins-Bold", fontWeight: "bold", alignSelf: 'center' }}>{index}</Text>
              </View>
              <View style ={{justifyContent:'center', marginLeft:10,width:widthScreen * 0.75, height: heightScreen * 0.2}}>
                <Text style={{lineHeight: 18 ,color: colors.WHITE, fontSize: 14, fontFamily: "Poppins-Bold", fontWeight: "400"}}>{item}</Text>
              </View>
            </View>
          )
        }}
        scrollEnabled={false}
      />
    </View>
        )
    }    
    }

  return (
    <View style = {styles.container}>
        <SafeAreaView style = {styles.containerImg}>    
            <FastImage
            style={styles.containerHeader}
            source={{uri: route.params.item?.Thumbnail}}
            resizeMode={FastImage.resizeMode.cover}
              />
        <View style= {styles.statusbar}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name = 'chevron-back'
        />
        <View style = {{flexDirection:'row'}}>
        <Button
          // loading={loading}
          icon={{
              name: 'add',
              size: 28,
              color: 'white',
          }}
          radius={100}
          iconContainerStyle={{alignSelf: 'center', justifyContent: 'center', alignItems: 'center', width: widthScreen * 0.12, height: heightScreen * 0.0554}}
          loadingProps={{
            size: 'small',
            color: colors.MAIN,
          }}
          buttonStyle={{
            backgroundColor: colors.BACK,
            borderColor: 'transparent',
            borderWidth: 0,
            height: heightScreen * 0.0554,
          }}
          style={{ width: widthScreen * 0.12 }}
          size={'sm'}
          onPress={() => {
            setModalVisible(!isModalVisible)
          }}
        />
        <Button
          name = 'share-outline'
          buttonStyle = {{
            backgroundColor: colors.BACK, 
            height: heightScreen * 0.0554,
            width: widthScreen * 0.12,
            borderRadius: 30,
          }}
          icon={{
            name: checkFav? "ios-heart":'heart-outline',
            type: 'ionicon',
            color: colors.WHITE,
          }}
          iconContainerStyle={{
            height: heightScreen * 0.0554,
            width: widthScreen * 0.12,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          style={{ width: widthScreen * 0.12, marginLeft: widthScreen * 0.02 }}
          onPress={() => {
              if (checkFav) {
                handleRemoveFav()
              } else {
                handleAddFav()
              };
          }}
          loading={loading}
          />
        </View>
        </View>
        </SafeAreaView>
        <ScrollView style = {styles.container}>
        <View style={styles.containerBody}>
          <Text numberOfLines={1} style={styles.title}>{route.params.item?.ExerciseName}</Text>
          <Text style={styles.subtitle}>Difficulty: {route.params.item?.Difficulty}</Text>
            <Text 
                numberOfLines={readmore ? null : 5}
                style={styles.content}>
                {route.params.item?.Details}
            
            </Text>
            {route.params.item?.Details ?
             <Text onPress = {() => setReadmore(!readmore)} style = {styles.readmore}>{readmore? 'Read less' : 'Read more'}</Text>
                :   null}
            <View style = {styles.detail}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.05,
                }}>
                    <FontAwesome5
                        name='dumbbell' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Category: {route.params.item?.Category}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: heightScreen * 0.02,
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.065,
                }}>
                    <Ionicons
                        name='ios-body' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Force: {route.params.item?.Force ? route.params.item?.Force : 'None'}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: heightScreen * 0.02,
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.07,
                }}>
                    <FontAwesome5
                        name='fire-alt' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Grips: {route.params.item?.Grips ? route.params.item?.Grips: 'None'}</Text>
                </View>
            </View>
              </View>
            <View style = {{flex: 1}}>
                <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                      onChange={(sections) => {
                          setActiveSections(sections);

                      }}
                containerStyle={{ marginTop:heightScreen * 0.05, }}
                underlayColor='transparent'
                touchableComponent={TouchableOpacity}
                sectionContainerStyle={{paddingBottom:20}}
            />
            </View>
        </ScrollView>
        <ReactNativeModal 
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={800}
            isVisible={isModalVisible}>
        <View style={styles.modal}>
            {loadingModal ? <AnimatedLottieView
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  /> :
            <View>
            {onSuccess? null:<ButtonAdd
                title="X"
                stylesContainer={{width: widthScreen * 0.1, height: widthScreen * 0.1, backgroundColor: colors.BG, borderRadius: 20, alignSelf: 'flex-end'}}
                      onPress={() => {
                          setModalVisible(!isModalVisible);
                      }}
                />}
              <Text style = {styles.textTracking}>{onSuccess? "Tracking Successful!":"Enter the number of minutes."}</Text>
              {onSuccess?<AnimatedLottieView 
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
              <ButtonAdd
                stylesContainer={styles.buttonModalSuccess}
                title="Continue Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          setOnSuccess(false);
                          setModalVisible(!isModalVisible);

                      }} />
              :<ButtonAdd
                stylesContainer={styles.buttonModal}
                title="Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {TrackingWorkout(minutes)}} />}
                
                </View>}</View>
        </ReactNativeModal>
    </View>
  )
}

export default WorkoutDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerImg: {
        height: heightScreen * 0.4,
        width: widthScreen,
        borderRadius: 30,
    },
    statusbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: widthScreen * 0.05,
    },
    containerHeader: {
        borderRadius: 30,
        position: 'absolute',
        height: heightScreen * 0.4,
        width: widthScreen,
        backgroundColor: colors.BG,
        top: 0,
    },
    containerVideo: {
        marginVertical: heightScreen * 0.03,
    },
    backgroundVideo: {  
        marginLeft: widthScreen * 0.03,
        height: heightScreen * 0.23,
        width: widthScreen * 0.8,
        backgroundColor: colors.BG,
        borderRadius: 30,
    },
    containerBody: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        marginLeft : widthScreen * 0.05,
        marginTop: heightScreen * 0.02,
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: colors.WHITE,
    },
    subtitle: {
        marginLeft: widthScreen * 0.05,
        marginTop: heightScreen * 0.01,
        fontSize: 13,
        fontFamily: "Poppins-Bold",
        color: colors.MAIN,
    },
    detail: {
        flex: 1,
        backgroundColor: colors.SILVER,
        borderRadius: 30,
        marginTop: heightScreen * 0.02,
        padding: heightScreen * 0.015,
        marginHorizontal: widthScreen * 0.05,
        
    },
    content: {
        marginHorizontal: widthScreen * 0.05,
        textAlign: 'justify',
        fontFamily: "Poppins-Regular",
        color: colors.WHITE,
    },
    readmore: {
        // marginTop: heightScreen * 0.005,
        marginHorizontal: widthScreen * 0.05,
        textAlign: 'right',
        fontFamily: "Poppins-Regular",
        color: colors.MAIN,
        fontSize: 13,
    },
    containerContent: {
        flex: 1,
        backgroundColor: colors.BG,
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