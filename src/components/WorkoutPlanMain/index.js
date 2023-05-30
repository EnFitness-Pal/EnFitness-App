import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'

const WorkoutPlanMain = ({onPress, calories}) => {
  return (
    <TouchableOpacity 
    onPress={onPress}
    style = {styles.container}>
        <View style = {{flexDirection:'row'}}>
            <View style = {styles.containerText}>
                <Text style = {styles.title}>Create your</Text>
                <Text style = {styles.titleMain}>Workout Plan</Text>
                <View style={styles.containerWeight}>
                    <Text style = {styles.titleWeight}>Calories</Text>
                    <Text style = {styles.weight}>{calories} cal</Text>
                </View>
            </View>
        <FastImage
            source={require('../../assets/images/workoutplan.png')}
            style= {{width: widthScreen * 0.45, height:widthScreen * 0.45, borderRadius:100, marginTop: heightScreen * 0.023, marginLeft: widthScreen * 0.05}}
        />
        </View>
    </TouchableOpacity>
  )
}

export default WorkoutPlanMain

const styles = StyleSheet.create({
    container:{
        width:widthScreen * 0.9,
        height:heightScreen * 0.25,
        backgroundColor: '#E9FAB0',
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
        color: '#043635',
        fontWeight:'bold',
        width: widthScreen * 0.3,
    },
    containerWeight:{
        marginTop:heightScreen * 0.02,
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