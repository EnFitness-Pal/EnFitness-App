import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'

const MealPlanMain = ({onPress,kilo}) => {
  return (
    <TouchableOpacity 
    onPress =  {onPress}
    style = {styles.container}>
        <View style = {{flexDirection:'row'}}>
            <View style = {styles.containerText}>
                <Text style = {styles.title}>Create your</Text>
                <Text style = {styles.titleMain}>Meal Plan</Text>
                <View style={styles.containerWeight}>
                    <Text style = {styles.titleWeight}>Weight</Text>
                    <Text style = {styles.weight}>{kilo} kg</Text>
                </View>
            </View>
        <FastImage
            source={require('../../assets/images/mealplan1.png')}
            style= {{width: widthScreen * 0.45, height:widthScreen * 0.45, borderRadius:100, marginTop: heightScreen * 0.019, marginLeft: widthScreen * 0.05}}
        />
        </View>
    </TouchableOpacity>
  )
}

export default MealPlanMain

const styles = StyleSheet.create({
    container:{
        width:widthScreen * 0.9,
        height:heightScreen * 0.25,
        // backgroundColor: '#E9FAB0',
        backgroundColor:'#E7DCCD',
        alignSelf:'center',
        marginTop:heightScreen * 0.02,
        borderRadius: 20,
        shadowColor: colors.BG,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    containerText:{
        marginLeft:widthScreen * 0.05,
        marginTop: heightScreen * 0.04
    },
    title:{
        fontSize:18,
        fontFamily:'Poppins',
        color: colors.SILVER
    },
    titleMain:{
        fontSize:25,
        fontFamily:'Poppins',
        color: colors.GRAYDARK,
        fontWeight:'bold',
    },
    containerWeight:{
        marginTop:heightScreen * 0.035,
        marginLeft:widthScreen * 0.02,
        alignItems:'center', 
        justifyContent:'center',
        borderRadius:15,
        width: widthScreen * 0.27,
        backgroundColor:colors.WHITE
    },
    titleWeight:{
        fontSize:15,
        fontFamily:'Poppins',
        color: colors.SILVER,
        fontWeight:'500',
    },
    weight:{
        fontSize:17,
        fontWeight:'600',
        fontFamily:'Poppins',
        color: colors.GRAYDARK,
    }
})