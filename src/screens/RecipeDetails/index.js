import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  ScrollView
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react'
import FastImage from 'react-native-fast-image'
import { colors, heightScreen, widthScreen } from '../../utility'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonBack from '../../components/ButtonBack';
import Modal from "react-native-modal";
import Lottie from 'lottie-react-native'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ingredients from '../../components/Ingredients';
import Recipe from '../../components/Recipe';
import Nutritions from '../../components/Nutritions';
import { Button } from '@rneui/themed';
import { addTrackingRecipe, getRecipeById } from '../../api/Recipes';
import { AuthContext } from '../../context/AuthContext';

const Tab = createMaterialTopTabNavigator();
const RecipeDetails = ({ route }) => {
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [meal, setMeal] = useState(null);
  const navigation = useNavigation();
  const [isModalVisible, setModalVisible] = useState(false);
  const [time, setTime] = useState(new Date().getHours());

  useEffect(() => {
    const intervalId = setInterval(() => {
    setTime(new Date().getHours());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);
  const getGreeting = () => {
    if (time >= 0 && time < 12) {
      setMeal(0)
    } else if (time >= 12 && time < 18) {
      setMeal(1)
    } else {
      setMeal(2)
    }
  };
  useEffect(() => {
    getGreeting();
   }, [])
  const [data, setData] = useState([])
  const getNutritions = async () => { 
    await getRecipeById(route.params.item?.id)
      .then((res) => {
        setData(res.data[0]?.nutrition?.nutrients)
      })
      .catch((err) => { 
        console.log(err)
      })
  }
  useEffect(() => { 
    getNutritions()
  }, [])
  const TrackingFood = async () => {
    setLoading(true);
    await addTrackingRecipe(
      authContext?.userID,
      Number(meal),
      route.params.item?.title,
      data?.find(nutrient => nutrient.name === "Calories")?.amount.toFixed(0),
      data?.find(nutrient => nutrient.name === "Carbohydrates")?.amount.toFixed(0),
      data?.find(nutrient => nutrient.name === "Fat")?.amount.toFixed(0),
      data?.find(nutrient => nutrient.name === "Protein")?.amount.toFixed(0),
    ).then((res) => {
      console.log(res);
      setModalVisible(!isModalVisible);
      setLoading(false);
    })
      .catch((err) => { 
        setLoading(false);
        console.log(err.response.data)
      })

  }
  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.statusbar}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name = 'chevron-back'
        />
        <View style = {{flexDirection:'row'}}>
        <Button
          loading={loading}
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
          onPress={() => TrackingFood()}
        />
        <ButtonBack
          name='heart-outline'
          styleButton = {{marginLeft:heightScreen * 0.01}}
        />
        </View>
      </View>
    <View style = {styles.title}>
        <Text style={styles.titlename}>{route.params.item?.title}</Text>
        <View style={{
          flexDirection: "row",
          justifyContent: 'space-between',
          width: widthScreen * 0.35,
          alignItems: 'center',
          marginRight: widthScreen * 0.41,
          marginTop: heightScreen * 0.02
        }}>
          <Ionicons
            name="time-outline"
            size={20}
            color={colors.MAIN}
            style = {{marginHorizontal:5}}
          />
          <Text style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "400", marginRight:10}}>{route.params.item?.readyInMinutes} min</Text>
          <Ionicons
            name="ios-happy-outline"
            size={20}
            color={colors.MAIN}
            style = {{marginHorizontal:5}}
          />
            <Text style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "400", marginRight:10 }}>{route.params.item?.healthScore}%</Text>
            <Ionicons
            name="ios-body-outline"
            size={20}
            color={colors.MAIN}
            style = {{marginHorizontal:5}}
          />
          <Text style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "400", marginRight:10 }}>{route.params.item?.servings == 1 ? route.params.item?.servings + ' Person': route.params.item?.servings + " People"}</Text>
        </View>
        </View>
      <FastImage
        source={{ uri: route.params.item?.image }}
        resizeMode= {FastImage.resizeMode.cover}
          style={{
          width: widthScreen * 0.9,
          height: heightScreen * 0.28,
          alignSelf: 'center',
          marginTop: heightScreen * 0.03,
          borderRadius: 30
        }}
        />
        <View style={{ flex: 1, marginTop: 10, backgroundColor:colors.BG }}>
        <Tab.Navigator
          screenOptions={{
            tabBarLabelStyle: { fontSize: 15, fontFamily: "Poppins-Bold", fontWeight: "500", color: colors.WHITE, textTransform: 'none', },
            tabBarStyle: { backgroundColor: colors.BG, height: heightScreen * 0.05 },
            tabBarIndicatorStyle: { backgroundColor: colors.MAIN, height: heightScreen * 0.005, width: widthScreen * 0.07, marginLeft: widthScreen * 0.13, borderRadius: 10 },
            tabBarActiveTintColor: colors.MAIN,
            tabBarInactiveTintColor: colors.MAIN,
          }}
            >
            <Tab.Screen name="Ingredients" component={Ingredients} initialParams={{data: route.params.item}} />
            <Tab.Screen name="Recipe" component={Recipe} initialParams={{data: route.params.item}} />
            <Tab.Screen name="Nutritions" component={Nutritions} initialParams={{data: route.params.item}}/>
        </Tab.Navigator>
        </View>
          <Modal 
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={800}
            isVisible={isModalVisible}>
            <View style={styles.modal}>
              <Text style = {styles.textTracking}>Tracking Successfull!</Text>
              <Lottie 
                source={require('../../assets/lottie/91001-success.json')} 
                autoPlay 
                loop ={false}
                duration={900}
                style={{height: 80, width: 80, marginVertical: heightScreen * 0.01}}
              />
              <Button
                style={styles.buttonModal}
                title="Continue Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                onPress={() => setModalVisible(!isModalVisible)} />
            </View>
          </Modal>
    </SafeAreaView>
  )
}

export default RecipeDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    justifyContent: 'center',
  },
  statusbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthScreen * 0.05
  },
  title: {
    alignItems: 'center',
  },
  titlename: {
    textAlign: 'center',
    marginTop: heightScreen * 0.01,
    width: widthScreen * 0.7,
    fontSize: 20,
    fontFamily: 'Poppins-Bold',
    fontWeight: 'bold',
    color: colors.WHITE,
    lineHeight: 30,
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
    marginTop:heightScreen * 0.02,
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
  }
})