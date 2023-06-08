import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import CreatePlan from '../../components/CreatePlan'
import FastImage from 'react-native-fast-image'
import Timeline from 'react-native-timeline-flatlist'
import MealCard from '../../components/MealCard'
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'
import { useFocusEffect } from '@react-navigation/native'
import Button from '../../components/Button'
import AnimatedLottieView from 'lottie-react-native'

const MealPlan = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const axiosContext = useContext(AxiosContext);
    const [loading, setLoading] = useState(false);
    const [dataArray, setDataArray] = useState([]);
    const [day, setDay] = useState('Day1')
    const handleGetData = async () => {
        setLoading(true);
        await axiosContext.getPlanMeal(authContext.userID)
        .then((response) =>{
            setDataArray(response.data)
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        });
    }
    useFocusEffect(
        useCallback(() => {
          handleGetData()
        }, [day])
    );
    for (let i = 1; i <= 7; i++) { 
        if (dataArray[`Day${i}`] === null) {
          delete dataArray[`Day${i}`];
        }
      }
      console.log(dataArray);
    
    const renderDetail = (rowData, sectionID, rowID) =>{
        console.log(rowData);
            return (
                <View style = {{flex:1}}>
                    <Text style={styles.titlePlan}>{rowData?.title}</Text>
                    <MealCard
                        title={rowData?.TitleMeal}
                        image={`https://spoonacular.com/recipeImages/${rowData?.SpoonAccularId}-556x370.${rowData?.ImageType}`}
                        serving={rowData?.Servings}
                        minutes={rowData?.ReadyInMinutes}
                        stylesContainer={{marginTop: heightScreen * 0.02, marginRight:widthScreen * 0.04}}
                        item={rowData}
                        
                    />
                </View>
            )
        }
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
            <Text style = {styles.title}>Meal Plan</Text>
            </View>
            <CreatePlan
                onPress={() => navigation.navigate('MealPlanner')}
                text = {'Build a meal plan for your daily or week!'}
                image={require('../../assets/images/mealplan.png')}
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
            <Text style = {styles.textplan}>See your meal plan</Text>
        </View>
        {loading ? <AnimatedLottieView
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  />:
        dataArray?.length !== 0?
        <>
        <View>
        <View style={styles.containerDay}>
          <FlatList
            data={Object.keys(dataArray)}
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
        <View style = {styles.containerTitlePlan}>
            <FastImage
                source={require('../../assets/images/chartCalories.png')}
                style={{width:widthScreen * 0.17, height:widthScreen * 0.17}}
            />
            <View style = {{alignSelf:'center'}}>
                <Text style = {{color:colors.WHITE, fontSize:17, fontFamily:'Poppins', fontWeight:'500'}}>
                    {Math.floor(dataArray?.[day]?.Calories)} Calories</Text>
                <Text style = {{color:colors.WHITE, fontSize:15, fontFamily:'Poppins', fontWeight:'500'}}>{Math.floor(dataArray?.[day]?.Carbohydrates)}g Carbs, {Math.floor(dataArray?.[day]?.Fat)}g Fat, {Math.floor(dataArray?.[day]?.Protein)}g Protein</Text>
            </View>
        </View>
        <View>
        <Timeline
            data={dataArray?.[day]?.MealPlan}
            isUsingFlatlist={false}
            showTime={false}
            style={{marginTop:heightScreen * 0.02, left: widthScreen * 0.05}}
            lineColor={colors.SILVER}
            circleSize={heightScreen *  0.04}
            lineWidth={3}
            innerCircle={'icon'}
            renderDetail={renderDetail}
            renderFullLine={true}
        />
        </View>
        </View></>:<Text style = {styles.textwarn}>You don't have any workout plan!</Text>}
        </ScrollView>
    </SafeAreaView>
  )
}

export default MealPlan

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
        marginLeft: widthScreen * 0.21
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
    titlePlan:{
        fontSize:18,
        fontWeight:'bold',
        fontFamily:'Poppins',
        color: colors.WHITE,
        marginLeft:widthScreen * 0.02,
        bottom:widthScreen * 0.015,
    },
    containerDay:{
        height: heightScreen * 0.07,
      },
      containerTitlePlan:{
        flexDirection:'row',
        marginTop:heightScreen * 0.01,
        marginHorizontal: widthScreen * 0.02,
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