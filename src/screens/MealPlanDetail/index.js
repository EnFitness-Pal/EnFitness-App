import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button'
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'
import Accordion from 'react-native-collapsible/Accordion'
import CardDaysMeal from '../../components/CardDaysMeal'
import { dataMeal } from '../../assets/PlanData'
import CardMeal from '../../components/CardMeal'
import { getRecipesByIDs } from '../../api/Recipes'
import ModalGlobal from '../../components/ModalGlobal'

const MealPlanDetail = ({navigation, route}) => {
    const item = route.params.item;
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const [activeSections, setActiveSections] = useState([]);
    const [check, setCheck] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const [loading, setLoading] = useState(false);
    const [type, setType] = useState('');

    const handleCheck = async () => {
        await axiosContext.checkPlanMeal(authContext.userID)
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
    useEffect(() => {
        handleCheck();
    },[])

    const handleJoinPlanCurrent = async () => {
        setLoading(true);
        setType('loading');
        await axiosContext.deleteMealPlan(authContext.userID)
        .then(async (response)=>{
            if (response.data) {
                await axiosContext.createPlanMeal(authContext.userID, JSON.parse(renameDays(checkData(item)))?.week)
                    .then((respone) => {
                        setLoading(false);
                        setType('success')
                    })
                    .catch((err) => {
                        console.log(err);
                        setLoading(false);
                        setIsVisible(false)
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
            await axiosContext.createPlanMeal(authContext.userID, JSON.parse(renameDays(checkData(item)))?.week)
            .then((respone) => {
                setLoading(false);
                setType('success')
            })
            .catch((err) => {
                console.log(err);
                setLoading(false);
                setIsVisible(false)
            });            
        }

    }


    const checkData = (json) =>{
        if(route.params.dataDatePress == 'day'){
            var newJson = {
                "week": {
                  "monday": json
                }
              };
            return newJson
        } else {
            return json
        }
    }

    let total = 0;
    let carbs = 0;
    let fat = 0;
    let protein = 0;
    for (const key in JSON.parse(renameDays(checkData(item)))?.week) {
        total = total + JSON.parse(renameDays(checkData(item)))?.week?.[String(key)].nutrients.calories
        carbs = carbs +  JSON.parse(renameDays(checkData(item)))?.week?.[String(key)].nutrients.carbohydrates
        fat = fat + JSON.parse(renameDays(checkData(item)))?.week?.[String(key)].nutrients.fat
        protein = protein + JSON.parse(renameDays(checkData(item)))?.week?.[String(key)].nutrients.protein
        }

    function renameDays(jsonStr) {
        try {
          var jsonObj = jsonStr;
          if (!jsonObj?.week) {
            throw new Error('Missing "week" property');
          }
          var days = Object.keys(jsonObj?.week);
          var newJsonObj = { week: {} };
          for (var i = 0; i < days.length; i++) {
            var day = days[i];
            var newDay = "Day" + (i + 1);
            newJsonObj.week[newDay] = jsonObj?.week[day];
          }
          var newJsonStr = JSON.stringify(newJsonObj, null, 2);
      
          return newJsonStr;
        } catch (error) {
          console.error("Error:", error.message);
          return null;
        }
      }
    _renderHeader = (section) => {
        var totalReadyInMinutes = 0;
        for (var i = 0; i < JSON.parse(renameDays(checkData(item)))?.week?.[String(section)].meals.length; i++) {
        totalReadyInMinutes += JSON.parse(renameDays(checkData(item)))?.week?.[String(section)].meals[i].readyInMinutes;
        }

        const index = Object.keys(JSON.parse(renameDays(checkData(item)))?.week).findIndex(

            (item) =>
                item=== section
            );
        
        return (
            <CardDaysMeal 
                day={section.slice(3, 4)}
                minutes={totalReadyInMinutes}
                num={Math.floor(JSON.parse(renameDays(checkData(item)))?.week?.[String(section)].nutrients.calories)}
                onActive={activeSections[0] === index ? true : false}
            />
        );
        };
        _renderContent = (section) => {
            return (
                <FlatList
                data={JSON.parse(renameDays(checkData(item)))?.week?.[String(section)].meals}
                renderItem={({ item }) => <CardMeal
                    item={item}
                />}
                horizontal
                showsHorizontalScrollIndicator={false}
                keyExtractor={(item, index) => index}

                />
            );
          };
  return (
    <SafeAreaView style = {styles.container}>
      <ScrollView>
        <View style = {styles.containerHeader}>
                <ButtonBack
                    name='chevron-back'
                    size={28}
                    onPress={() => navigation.goBack()}
                />
                <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.27}}>Meal</Text>
        </View>
        <View style = {{flexDirection:'row'}}>
        <FastImage
            source={require('../../assets/images/meal-icon.png')}
            style={{width:widthScreen * 0.11, height:heightScreen * 0.05, marginTop:heightScreen * 0.05, marginLeft:widthScreen * 0.05}}
        />
          <Text style={styles.title}>Plan to make your health changing!</Text></View>
          <Text style={styles.subtitle}>Discover the magic of our carefully curated meal plan, crafted to fuel your body and enhance your overall well-being.</Text>
        <View style = {{flexDirection:'row', marginTop: heightScreen * 0.02, alignSelf:'center'}}>
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600'}}>Woohoo!</Text>
            <FastImage
                source={require('../../assets/typeworkout/rocket.png')}
                style={{width:widthScreen * 0.07, height:heightScreen * 0.03, marginLeft:widthScreen * 0.02}}
            />
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600', marginLeft:widthScreen * 0.02}}>Are you ready?</Text>
        </View>
        <Button
            title = {"Join a meal plan"}
            stylesContainer = {styles.button}
            stylesTitle={styles.titleButton}
            onPress = {handleJoinPlan}
            />
        <View style = {styles.containerTitlePlan}>
            <FastImage
                source={require('../../assets/images/chartCalories.png')}
                style={{width:widthScreen * 0.17, height:widthScreen * 0.17}}
            />
            <View style = {{alignSelf:'center'}}>
                <Text style = {{color:colors.WHITE, fontSize:17, fontFamily:'Poppins', fontWeight:'500'}}>
                    {Math.floor(total)} Calories in {Object.keys(JSON.parse(renameDays(checkData(item)))?.week).length == 1? `${Object.keys(JSON.parse(renameDays(checkData(item)))?.week).length} day`:`${Object.keys(JSON.parse(renameDays(checkData(item)))?.week).length} days` }</Text>
                <Text style = {{color:colors.WHITE, fontSize:15, fontFamily:'Poppins', fontWeight:'500'}}>{Math.floor(carbs)}g Carbs, {Math.floor(fat)}g Fat, {Math.floor(protein)}g Protein</Text>
            </View>
        </View>
        <View>
        <Accordion
            sections={Object.keys(JSON.parse(renameDays(checkData(item)))?.week)}
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
      </ScrollView>
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
    </SafeAreaView>
  )
}

export default MealPlanDetail

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: colors.BG
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
    },
    containerTitlePlan:{
        flexDirection:'row',
        marginTop:heightScreen * 0.03,
        marginHorizontal: widthScreen * 0.05,
    }
})