import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView
} from 'react-native';
import React, { useEffect } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonBack from '../../components/ButtonBack';
import PagerView from 'react-native-pager-view';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import Ingredients from '../../components/Ingredients';
import Recipe from '../../components/Recipe';
import Nutritions from '../../components/Nutritions';

const Tab = createMaterialTopTabNavigator();
const RecipeDetails = ({ route }) => {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.container}>
      <View style= {styles.statusbar}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name = 'chevron-back'
        />
        <ButtonBack
          name='heart-outline'
        />
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
          <Text style={{ color: colors.WHITE, fontSize: 16, fontFamily: "Poppins-Bold", fontWeight: "400", marginRight:10 }}>{route.params.item?.servings} Person</Text>
        </View>
        </View>
      <Image
        source={{ uri: route.params.item?.image }}
        resizeMode= 'cover'
          style={{
          width: widthScreen * 0.9,
          height: heightScreen * 0.28,
          alignSelf: 'center',
          marginTop: heightScreen * 0.03,
          borderRadius: 30
        }}
        />
        <View style={{ flex: 1, marginTop: 10 }}>
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
    </SafeAreaView>
  )
}

export default RecipeDetails

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
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
    
  }
})