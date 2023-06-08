import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { ScrollView } from 'react-native'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import FastImage from 'react-native-fast-image'
import {Slider} from '@miblanchard/react-native-slider';
import Button from '../../components/Button'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'
import TypeWorkout from '../../components/TypeWorkout'
import { createPlanGPT } from '../../api/Plan'
import ReactNativeModal from 'react-native-modal'
import ModalPre from '../../components/Modal';
import AnimatedLottieView from 'lottie-react-native'
import { AuthContext } from '../../context/AuthContext'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Tooltip } from '@rneui/themed'
import { AxiosContext } from '../../context/AxiosContext'
import { useFocusEffect } from '@react-navigation/native'

const WorkoutPlanner = ({ navigation }) => {
    const authContext = useContext(AuthContext)
    const axiosContext = useContext(AxiosContext)
    const person = axiosContext?.person;
    const theme = useSelector(state => state.state.theme);
    const [buttonPress, setButtonPress] = useState('Beginner');
    const [open, setOpen] = useState(false);
    const [openCount, setOpenCount] = useState(false);
    const [count, setCount] = useState(0);
    const [openAL, setOpenAL] = useState(false);
    const [type, setType] = useState('Full Body');
    const [day, setDay] = useState('1');
    const [loading, setLoading] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [isVisiblePre, setIsVisiblePre] = useState(false);
    const [weightgoal, setWeightgoal] = useState([
        { label: 'Maintain Weight', value: 'maintainweight' },
        { label: 'Cutting', value: 'cutting' },
        { label: 'Bulking', value: 'bulking' },
    ])
    const [activity, setActivity] = useState([
        {label: 'Sedentary', value: 'sedentary'},
        { label: 'Lightly Active', value: 'lightlyactive' },
        { label: 'Moderately Active', value: 'moderatelyactive' },
        { label: 'Very Active', value: 'veryactive' },
        { label: 'Extremely Active', value: 'extremelyactive' },
    ]); 

    const [value, setValue] = useState("maintainweight");
    const [valueAL, setValueAL] = useState("sedentary");

    const workouttype = [
        {
            label: 'Full Body',
            image: require('../../assets/typeworkout/body.png'),
        },
        {
            label: 'Cardio',
            image: require('../../assets/typeworkout/cardio.png'),
        },
        {
            label: 'Strength',
            image: require('../../assets/typeworkout/strength.png'),
        },
        {
            label: 'Yoga',
            image: require('../../assets/typeworkout/yoga.png'),
        },
        {
            label: 'Stretching',
            image: require('../../assets/typeworkout/stretching.png'),
        }
    ]

    const getCount = async () => {
        await axiosContext.getCount(authContext.userID)
        .then((res)=>{
            if (person?.IsPremium === false) {
                setCount(2 - res.data?.WorkoutCount)
            } else {
                setCount(10 - res.data?.WorkoutCount)
            }
        })
        .catch((err)=>{
            console.error(err)
        })
    }

    const handleCreate = async () => {
        setLoading(true);
        setIsVisible(true);
        try {
          const res = await createPlanGPT(authContext.userID, value, type, buttonPress, valueAL, Number(day));
          setLoading(false);
          setIsVisible(false);
          let dataGenerate = await {
            "WeightGoal": value === 'maintainweight' ? "Maintain Weight" : value === 'cutting' ? "Cutting" : "Bulking",
            "TypeWorkout": type,
            "FitnessLevel": buttonPress,
            "ActivityLevel": valueAL === 'sedentary' ?
              "Sedentary" : valueAL === 'lightlyactive' ?
                "Lightly Active" : valueAL === 'moderatelyactive' ?
                  "Moderately Active" : valueAL === 'veryactive' ?
                    "Very Active" : "Extremely Active",
            ...res.data
          };
          console.log("dataGenerate", dataGenerate);
          navigation.push('WorkoutPlanDetail', {
            item: dataGenerate
          });
        } catch (err) {
          console.log(err);
        }
      };
    useFocusEffect(
      useCallback(() => {
        getCount();
      }, []));

  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.containerHeader}>
            <ButtonBack
                name='chevron-back'
                size={28}
                onPress={() => navigation.goBack()}
            />
            <Text style = {{fontSize: 18, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center'}}>Create your workout plan</Text>
            <Tooltip
                popover={<Text style={{color:colors.WHITE, fontWeight:"600"}}>{count == 1 || count == 0? `You have ${count || 0} turn`: `You have ${count || 0} turns`}</Text>}
                visible={openCount}
                onOpen={() => setOpenCount(true)}
                onClose={() => setOpenCount(false)}
                withOverlay={false}
                closeOnlyOnBackdropPress={true}
                backgroundColor={colors.SILVER}         
                height={heightScreen*0.04}
                width={widthScreen*0.6}
                >
                <MaterialIcons name="notification-important" color={colors.MAIN} size={30}/>
            </Tooltip>
        </View>
        <View style = {styles.seperator}/>
        <ScrollView>
            <View style = {{flexDirection:'row'}}>
                <FastImage
                    source={require('../../assets/rewards/achievement12.png')}
                      style={{
                        width: widthScreen * 0.08,
                        height: widthScreen * 0.08,
                        marginTop: heightScreen * 0.04,
                        marginLeft: widthScreen * 0.04
                      }}
                />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    marginTop: heightScreen * 0.043,
                    marginLeft: widthScreen * 0.04,
                    color: colors.WHITE
                    
                }}>What is your workout level?</Text>
            </View>
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
            <View style = {{flexDirection:'row'}}>
                <FastImage
                    source={require('../../assets/rewards/achievement5.png')}
                      style={{
                        width: widthScreen * 0.08,
                        height: widthScreen * 0.08,
                        marginTop: heightScreen * 0.04,
                        marginLeft: widthScreen * 0.04
                      }}
                />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    marginTop: heightScreen * 0.043,
                    marginLeft: widthScreen * 0.04,
                    color: colors.WHITE,
                    marginBottom: heightScreen * 0.02
                    
                }}>What is your fitness goal?</Text>
            </View>
            <DropDownPicker
                open={open}
                value={value}
                items={weightgoal}
                setOpen={setOpen}
                setValue={setValue}
                enableOnAndroid={true}
                dropDownDirection='TOP'
                  style={[styles.dropdown, {
                      backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                      borderColor: open? colors.MAIN:"gray",
                  }]}
                containerStyle={{
                    width: widthScreen * 0.85,
                    alignSelf: 'center',
                    height: heightScreen * 0.05,
                    backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                }}
                textStyle={{marginLeft:2,fontSize: 17, fontWeight:'bold' , color: theme == 'dark' ? colors.WHITE : colors.BG}}
                listItemContainerStyle={{
                    borderRadius: 20,
                    borderBottomWidth: 1,
                    borderBottomColor:'gray',
                    width: widthScreen * 0.85,
                }}
                arrowIconStyle={{
                    tintColor: theme == 'dark' ? colors.WHITE : colors.BG,
                }}
                dropDownContainerStyle={{
                    marginTop: heightScreen * 0.002,
                    backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                    borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
                    borderWidth: 0.5,
                }}
                theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
                listMode='SCROLLVIEW'
            />
            <View style = {{flexDirection:'row'}}>
                <FastImage
                    source={require('../../assets/rewards/achievement5.png')}
                      style={{
                        width: widthScreen * 0.08,
                        height: widthScreen * 0.08,
                        marginTop: heightScreen * 0.04,
                        marginLeft: widthScreen * 0.04
                      }}
                />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    marginTop: heightScreen * 0.045,
                    marginLeft: widthScreen * 0.04,
                    color: colors.WHITE,
                    marginBottom: heightScreen * 0.02
                    
                }}>What type of workout do you prefer?</Text>
            </View>
            <FlatList
                data={workouttype}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                renderItem={({item}) => <TypeWorkout item={item} 
                    stylesContainer={{
                        borderWidth: item.label == type ? 2:0,
                        borderColor: item.label == type ? colors.MAIN: null,
                    }}
                    onPress={() => {setType(item.label)}}
                />}
                style={{
                    marginTop: heightScreen * 0.01,
                    marginHorizontal: widthScreen * 0.04,
                }}
            />
            <View style = {{flexDirection:'row'}}>
                <FastImage
                    source={require('../../assets/rewards/achievement5.png')}
                      style={{
                        width: widthScreen * 0.08,
                        height: widthScreen * 0.08,
                        marginTop: heightScreen * 0.04,
                        marginLeft: widthScreen * 0.04
                      }}
                />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    marginTop: heightScreen * 0.043,
                    marginLeft: widthScreen * 0.04,
                    color: colors.WHITE,
                    marginBottom: heightScreen * 0.02
                    
                }}>What is your activity level?</Text>
            </View>
            <DropDownPicker
                open={openAL}
                value={valueAL}
                items={activity}
                setOpen={setOpenAL}
                setValue={setValueAL}
                enableOnAndroid={true}
                dropDownDirection='TOP'
                  style={[styles.dropdown, {
                      backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                      borderColor: openAL? colors.MAIN:"gray",
                  }]}
                containerStyle={{
                    width: widthScreen * 0.85,
                    alignSelf: 'center',
                    height: heightScreen * 0.05,
                    backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                }}
                textStyle={{marginLeft:2,fontSize: 17, fontWeight:'bold' , color: theme == 'dark' ? colors.WHITE : colors.BG}}
                listItemContainerStyle={{
                    borderRadius: 20,
                    borderBottomWidth: 1,
                    borderBottomColor:'gray',
                    width: widthScreen * 0.85,
                }}
                arrowIconStyle={{
                    tintColor: theme == 'dark' ? colors.WHITE : colors.BG,
                }}
                dropDownContainerStyle={{
                    marginTop: heightScreen * 0.002,
                    backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                    borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
                    borderWidth: 0.5,
                }}
                theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
                listMode='SCROLLVIEW'
            />
            <View style = {{flexDirection:'row',marginHorizontal: widthScreen * 0.04, width:widthScreen * 0.8}}>
                <FastImage
                    source={require('../../assets/rewards/achievement8.png')}
                      style={{
                        width: widthScreen * 0.08,
                        height: widthScreen * 0.08,
                        marginTop: heightScreen * 0.04,
                        // marginLeft: widthScreen * 0.04
                      }}
                />
                  <Text style={{
                    fontSize: 16,
                    fontWeight: '500',
                    fontFamily: 'Poppins',
                    marginTop: heightScreen * 0.043,
                    marginLeft: widthScreen * 0.04,
                    color: colors.WHITE,
                    marginBottom: heightScreen * 0.02
                    
                }}>How many days should the workout plan cover?</Text>
            </View> 
              <Text style = {styles.day}>{day == 1? `${day} Day`: `${day} Days`}</Text>
            <Slider
                value={day}
                animateTransitions
                animationType='timing'
                minimumValue={1}
                maximumValue={7}
                step={1}
                thumbTintColor={colors.MAIN}
                sliderValue={1}
                trackMarks={[1,2,3,4,5,6,7]}
                onValueChange={(value) => setDay(value)}
                maximumTrackStyle={{backgroundColor: colors.GRAYLIGHT}}
                minimumTrackStyle={{backgroundColor: colors.MAIN}}
                containerStyle={{width: widthScreen * 0.85, alignSelf: 'center'}}
            />
            {count == 0 ?<Button
                icon={'rocket1'}
                stylesIcon={{fontSize:20, color: colors.MAIN}}
                title={'Upgrade plan to continue'}
                stylesContainer={{backgroundColor: colors.SILVER, width: widthScreen * 0.8, height: heightScreen * 0.05,alignSelf: 'center', marginTop: heightScreen * 0.03}}
                stylesTitle={{fontSize:16,}}
                onPress={() => setIsVisiblePre(!isVisiblePre)}
            />:<Button
                title={'Create Workout Plan'}
                stylesContainer={{backgroundColor: colors.MAIN, width: widthScreen * 0.6, height: heightScreen * 0.05,alignSelf: 'center', marginTop: heightScreen * 0.03}}
                onPress={() => handleCreate()}
            />}
        </ScrollView>
    <ReactNativeModal
      isVisible = {isVisible}
    >
      <View style = {styles.modalSuccess}>
        <AnimatedLottieView
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                    /> 
      </View>
    </ReactNativeModal>
    <ModalPre
        onPressButton={() => {
                setIsVisiblePre(false);
                navigation.navigate('PremiumScreen');
            }
        }
        onPressIgnore={() => setIsVisiblePre(false)}
        isVisible={isVisiblePre} />
    </SafeAreaView>
  )
}

export default WorkoutPlanner

const styles = StyleSheet.create({
    container: {
        flex: 1,
      backgroundColor: colors.BG,  
    },
    containerHeader: {
        flexDirection: 'row',
        marginHorizontal: widthScreen * 0.05,
        alignItems: 'center',
        justifyContent:'space-between'
    },
    seperator: {
      height: 0.5,
      width: widthScreen,
      backgroundColor: colors.GRAYLIGHT,
      marginTop: heightScreen * 0.01,
    },
    containerFilter: {
        height: heightScreen * 0.035,
        width: widthScreen * 0.84,
        borderRadius: 32,
        flexDirection: 'row',
        alignSelf: 'center',
        backgroundColor: colors.GRAYDARK,
        marginTop: heightScreen * 0.02,
    },
    dropdown: {
        width: widthScreen * 0.85,
        alignSelf: 'center',
        borderWidth: 0,
        borderBottomWidth: 0.5,
    },
    day: {
        fontSize: 16,
        fontWeight: '500',
        fontFamily: 'Poppins',
        alignSelf: 'center',
        color: colors.WHITE,
    },
  modalSuccess: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.7,
    backgroundColor: colors.BG,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20
  },
})