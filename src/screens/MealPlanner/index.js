import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import { Tooltip } from '@rneui/themed'
import FastImage from 'react-native-fast-image'
import Input from '../../components/Input'
import Button from '../../components/Button'
import { AxiosContext } from '../../context/AxiosContext'
import DropDownPicker from 'react-native-dropdown-picker'
import { useSelector } from 'react-redux'
import ModalPre from '../../components/Modal'
import { useFocusEffect } from '@react-navigation/native'
import { createMealPlan } from '../../api/Recipes'
import ReactNativeModal from 'react-native-modal'
import AnimatedLottieView from 'lottie-react-native'
import { AuthContext } from '../../context/AuthContext'
import { TriggerCountMeal } from '../../api/Auth/SignIn'

const MealPlanner = ({navigation}) => {
  const axiosContext = useContext(AxiosContext)
  const authContext = useContext(AuthContext)
  const person = axiosContext.person;
  const [dataPress, setDataPress] = useState(Math.floor(person.DailyCalories));
  const [dataPlan, setDataPlan] = useState([])
  const [dataDatePress, setDataDatePress] = useState('day');
  const [openCount, setOpenCount] = useState(false);
  const [isVisiblePre, setIsVisiblePre] = useState(false);
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const theme = useSelector(state => state.state.theme);
  const [exclude, setExclude] = useState('')
  const [diet, setDiet] = useState([
    { label: 'No Diet', value: 'nodiet' },
    { label: 'Lacto Vegetarian', value: 'lactovegetarian' },
    { label: 'Ovo Vegetarian', value: 'ovovegetarian' },
    { label: 'Paleo', value: 'paleo' },
    { label: 'Primal', value: 'primal' },
    { label: 'Pescetarian', value: 'pescetarian' },
    { label: 'Vegan', value: 'vegan' },
    { label: 'Vegetarian', value: 'vegetarian' },
    { label: 'Ketogenic', value: 'ketogenic' },
    { label: 'Whole 30', value: 'whole30' },
])
  const [value, setValue] = useState("nodiet");
  const [open, setOpen] = useState(false);
  const data = [
    {type: 500, name: '500'},
    {type: 1000, name: '1000'},
    {type: 2000, name: '2000'},
    {type: 2500, name: '2500'},
    {type: Math.floor(person?.DailyCalories), name: 'Current'},
  ];
  const dataDate = [
    {type: 'day', name: 'A Day'},
    {type: 'week', name: 'A Week'},
  ]

  const getCount = async () => {
    await axiosContext.getCount(authContext.userID)
    .then((res)=>{
        if (person?.IsPremium === false) {
            setCount(2 - res.data?.MealPlanCount)
        } else {
            setCount(10 - res.data?.MealPlanCount)
        }
    })
    .catch((err)=>{
        console.error(err)
    })
}

  useFocusEffect(
    useCallback(() => {
      getCount();
    }, []));

  const handleCreate = async () => {
    setLoading(true);
    setIsVisible(true);
      await createMealPlan(dataDatePress, dataPress, value, exclude)
      .then(async (response)=>{
        setDataPlan(response.data);
        await TriggerCountMeal(authContext.userID)
        .then((response) =>{
          setLoading(false);
          setIsVisible(false);
        })
        .catch((error) =>{
          console.log('errorCount', error);
          setLoading(false);
          setIsVisible(false);
        })
          navigation.push('MealPlanDetail', {
            item: response.data,
            dataDatePress: dataDatePress
          });
      })
      .catch((error) => {
        setLoading(false);
        setIsVisible(false);
      })
  }

  const renderItemCalories = ({item, index}) => {
    return (
      <View style = {{marginLeft: widthScreen * 0.03, marginTop:heightScreen * 0.02}}>
      <Button
          title={item?.name}
          stylesContainer={{
            width:widthScreen * 0.15, 
            height: heightScreen * 0.05, 
            backgroundColor:dataPress === item?.type? colors.MAIN:colors.BG, 
            borderRadius:10, 
            borderWidth:dataPress === item?.type ? 0:1,
            borderColor:dataPress === item?.type? null :colors.SILVER
          }}
          stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
          onPress = {()=> {
            setDataPress(item?.type)
          }}
      /> 
      </View>
    )
  }

  const renderItemDate = ({item, index}) => {
    return (
      <View style = {{marginLeft: widthScreen * 0.03, marginTop:heightScreen * 0.02}}>
      <Button
          title={item?.name}
          stylesContainer={{
            width:widthScreen * 0.43, 
            height: heightScreen * 0.05, 
            backgroundColor:dataDatePress === item?.type? colors.MAIN:colors.BG, 
            borderRadius:10, 
            borderWidth:dataDatePress === item?.type ? 0:1,
            borderColor:dataDatePress === item?.type? null :colors.SILVER
          }}
          stylesTitle={{color: colors.WHITE, fontSize: 16, fontWeight: 'bold', textAlign: 'center'}}
          onPress = {()=> {
            setDataDatePress(item?.type)
          }}
      /> 
      </View>
    )
  }

  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.containerHeader}>
          <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
          />
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center'}}>Create your meal plan</Text>
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
                source={require('../../assets/images/calories.png')}
                  style={{
                    width: widthScreen * 0.08,
                    height: widthScreen * 0.08,
                    marginTop: heightScreen * 0.031,
                    marginLeft: widthScreen * 0.04
                  }}
            />
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Poppins',
                marginTop: heightScreen * 0.038,
                marginLeft: widthScreen * 0.04,
                color: colors.WHITE
            }}>Target calories</Text>
        </View>
      <FlatList
        data={data}
        horizontal
        renderItem={renderItemCalories}
        style={{ alignSelf: 'center',}}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
      <View style = {{flexDirection:'row'}}>
        <FastImage
                source={require('../../assets/images/diet.png')}
                  style={{
                    width: widthScreen * 0.08,
                    height: widthScreen * 0.08,
                    marginTop: heightScreen * 0.04,
                    marginLeft: widthScreen * 0.04
                  }}
            />
              <Text style={{
                fontSize: 17,
                fontWeight: '600',
                fontFamily: 'Poppins',
                marginTop: heightScreen * 0.046,
                marginLeft: widthScreen * 0.04,
                color: colors.WHITE
            }}>Diet</Text>
        </View>
        <DropDownPicker
                open={open}
                value={value}
                items={diet}
                setOpen={setOpen}
                setValue={setValue}
                enableOnAndroid={true}
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
                    marginTop: heightScreen * 0.02,
                    backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
                    borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
                    borderWidth: 0.5,
                }}
                theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
                listMode='SCROLLVIEW'
            />
      <View style = {{flexDirection:'row'}}>
        <FastImage
                source={require('../../assets/images/exclude.png')}
                  style={{
                    width: widthScreen * 0.07,
                    height: widthScreen * 0.07,
                    marginTop: heightScreen * 0.063,
                    marginLeft: widthScreen * 0.04
                  }}
            />
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Poppins',
                marginTop: heightScreen * 0.066,
                marginLeft: widthScreen * 0.04,
                color: colors.WHITE
            }}>Exclude ingredients or allergens</Text>
        </View>
        <Input
          placeholder={'E.g shellfish, mustard'}
          stylesContainer={{alignSelf:'center'}}
          placeholderTextColor={colors.TEXTGRAY}
          stylesInput={{color: colors.WHITE}}
          onChangeText={(text) => setExclude(text)}
        />
      <View style = {{flexDirection:'row'}}>
        <FastImage
                source={require('../../assets/images/date.png')}
                  style={{
                    width: widthScreen * 0.07,
                    height: widthScreen * 0.07,
                    marginTop: heightScreen * 0.053,
                    marginLeft: widthScreen * 0.04
                  }}
            />
              <Text style={{
                fontSize: 16,
                fontWeight: '600',
                fontFamily: 'Poppins',
                marginTop: heightScreen * 0.056,
                marginLeft: widthScreen * 0.04,
                color: colors.WHITE
            }}>Time</Text>
        </View>
        <FlatList
        data={dataDate}
        horizontal
        renderItem={renderItemDate}
        style={{ alignSelf: 'center',}}
        showsHorizontalScrollIndicator={false}
        scrollEnabled={false}
      />
      {count == 0 ?<Button
          icon={'rocket1'}
          stylesIcon={{fontSize:20, color: colors.MAIN}}
          title={'Upgrade plan to continue'}
          stylesContainer={{backgroundColor: colors.SILVER, width: widthScreen * 0.8, height: heightScreen * 0.05,alignSelf: 'center', marginTop: heightScreen * 0.05}}
          stylesTitle={{fontSize:16,}}
          onPress={() => setIsVisiblePre(!isVisiblePre)}
      />:<Button
          title={'Create Meal Plan'}
          stylesContainer={{backgroundColor: colors.MAIN, width: widthScreen * 0.6, height: heightScreen * 0.05,alignSelf: 'center', marginTop: heightScreen * 0.05}}
          onPress={() => handleCreate()}
      />}
      </ScrollView>
      <ModalPre
        onPressButton={() => {
                setIsVisiblePre(false);
                navigation.navigate('PremiumScreen');
            }
        }
        onPressIgnore={() => setIsVisiblePre(false)}
        isVisible={isVisiblePre} />
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
    </SafeAreaView>
  )
}

export default MealPlanner

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor:colors.BG
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
  dropdown: {
    width: widthScreen * 0.85,
    alignSelf: 'center',
    borderWidth: 0,
    borderWidth: 0.5,
    marginTop: heightScreen * 0.02,
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