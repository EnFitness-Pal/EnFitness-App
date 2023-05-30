import { ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getRecipeById } from '../../api/Recipes'
import { colors, heightScreen, widthScreen } from '../../utility'
import HTML from 'react-native-render-html';
const Nutritions = ({ route }) => {
  const [data, setData] = useState([])
  const getNutritions = async () => { 
    await getRecipeById(route.params.data?.id)
      .then((res) => {
        setData(res.data[0].nutrition.nutrients)
      })
      .catch((err) => { 
        console.log(err)
      })
  }
  useEffect(() => { 
    getNutritions() 
  }, [])
  return (
    <ScrollView style={styles.container}>
        <View style={{ 
          width: widthScreen * 0.3,
          height: widthScreen * 0.3,
          alignSelf: 'center',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: colors.MAIN,
          borderRadius: 15,
          shadowColor: colors.WHITE,
          shadowOffset: {
            width: 1,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
        }}>
        <Text style={{
          color: colors.GRAYDARK,
          fontSize: 36,
          fontFamily: "Roboto-Bold",
          fontWeight: "bold",
          marginBottom: widthScreen * 0.01
          }}>{data?.find(nutrient => nutrient.name === "Calories")?.amount.toFixed(0)}</Text>
          <Text style={{
          color: colors.GRAYDARK,
          fontSize: 17,
          fontFamily: "Roboto-Bold",
          fontWeight: "bold",
          }}>Calories/cal</Text>
        </View>
      <View style = {styles.containerNutrition}>
        <View style={{
          width: widthScreen * 0.25,
          height: widthScreen * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#A681BE',
          borderRadius: 15,
        }}>
          <Text style={{
            color: colors.WHITE,
            fontSize: 30,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>{data?.find(nutrient => nutrient.name === "Carbohydrates")?.amount.toFixed(0)}</Text>
          <Text style={{
            color: colors.WHITE,
            fontSize: 15,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>Carbs/{data?.find(nutrient => nutrient.name === "Carbohydrates")?.unit}</Text>
        </View>
        <View style={{
          width: widthScreen * 0.25,
          height: widthScreen * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#D2EC88',
          borderRadius: 15,
        }}>
          <Text style={{
            color: colors.GRAYDARK,
            fontSize: 30,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>{data?.find(nutrient => nutrient.name === "Fat")?.amount.toFixed(0)}</Text>
          <Text style={{
            color: colors.GRAYDARK,
            fontSize: 15,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>Fat/{data?.find(nutrient => nutrient.name === "Fat")?.unit}</Text>
        </View>
        <View style={{
          width: widthScreen * 0.25,
          height: widthScreen * 0.25,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#96AED0',
          borderRadius: 15,
        }}>
          <Text style={{
            color: colors.WHITE,
            fontSize: 30,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>{data?.find(nutrient => nutrient.name === "Protein")?.amount.toFixed(0)}</Text>
          <Text style={{
            color: colors.WHITE,
            fontSize: 15,
            fontFamily: "Roboto-Bold",
            fontWeight: "bold",
            marginBottom: widthScreen * 0.01
          }}>Protein/{data?.find(nutrient => nutrient.name === "Protein")?.unit}</Text>
        </View>
      </View>
      <Text style={{
        color: colors.MAIN,
        fontSize: 22,
        fontFamily: "Roboto-Bold",
        fontWeight: "500",
        marginLeft: widthScreen * 0.08,
        marginTop: heightScreen * 0.02,
      }}>Summary</Text>
      {/* <Text style={{
        color: colors.WHITE,
        fontSize: 16,
        fontFamily: "Roboto-Regular",
        fontWeight: "400",
        marginLeft: widthScreen * 0.08,

      }}>{route.params.data?.summary}</Text> */}
      <View>
        <HTML
          source={{ html: route.params.data?.summary }}
          contentWidth={widthScreen * 0.8}
          baseStyle={{
            fontSize: 16,
            color: colors.WHITE,
            fontFamily: "Roboto-Regular",
            fontWeight: "400",
            marginHorizontal: widthScreen * 0.09,
            lineHeight: 20,
            marginTop: heightScreen * 0.01,
            paddingBottom: heightScreen * 0.05,
          }}
        />
        </View>
    </ScrollView>
  )
}

export default Nutritions

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
    paddingTop: heightScreen * 0.03,
  },
  containerNutrition: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: heightScreen * 0.01,
    marginHorizontal: widthScreen * 0.08,
    
  }
})