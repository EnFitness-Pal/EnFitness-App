import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons'

const WorkoutPlanCard = ({item, index}) => {
  return (
    <View style={styles.container}>
        <View style = {styles.header}>
            <View style = {styles.minutes}>
                <Text style = {{ fontSize:35, fontFamily:'Poppins-Bold', color:colors.BG, marginTop:10 }}>{item?.Minutes}</Text>
                <Text style = {{fontSize:15, fontFamily:'Poppins', color:colors.BG, fontWeight:'500'}}>Minutes</Text>
            </View>
            <TouchableOpacity style = {styles.icon}>
                  <Ionicons name="md-play-outline" size={35} color={colors.BG} style={{marginLeft:heightScreen * 0.02}} />
            </TouchableOpacity>
        </View>
        <View style= {styles.containerTitle}>
        <Text
            numberOfLines={2}
              style={styles.texttitle}>{item?.["Exercise Name"]}</Text>   
        </View>
        <View style = {styles.containerReps}>
            <Text style = {styles.textReps}>
            {item?.Sets} Sets
            </Text>
        </View>
        <View style = {[styles.containerReps, {marginTop: heightScreen * 0.005, width: widthScreen * 0.25}]}>
            <Text style = {styles.textReps}>
            {item?.Reps} Reps
            </Text>
        </View>
        <View style = {styles.calories}>
              <Text style={styles.textcalories}>{item?.["Total Calories"]} calories</Text>
        </View>
    </View>
  )
}

export default WorkoutPlanCard

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.4,
        height: heightScreen * 0.27,
        backgroundColor: '#FCFBF4',
        borderRadius: 20,
        borderWidth: 1,
        borderColor: colors.GRAYLIGHT,
        marginRight: widthScreen * 0.03,
        marginTop: heightScreen * 0.03,
        alignItems: 'center',
        padding: heightScreen * 0.005,
    },
    header: {
        width: widthScreen * 0.3,
        height: heightScreen * 0.08,
        flexDirection: 'row',
    },
    minutes: {
        width: widthScreen * 0.17,
        height: heightScreen * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        width: widthScreen * 0.13,
        height: heightScreen * 0.07,
        alignItems: 'center',
        justifyContent: 'center',
    },
    containerReps: {
        width: widthScreen * 0.2,
        height: heightScreen * 0.03,
        // alignSelf: 'flex-start',
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 2,
        borderColor: colors.BG,
        marginTop: heightScreen * 0.01,
    },
    textReps: {
        fontSize: 13,
        fontFamily: 'Poppins',
        fontWeight: '500',
    },
    containerTitle: {
      height: heightScreen * 0.06,
      width: widthScreen * 0.35, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    texttitle: {
        fontSize: 15,
        fontFamily: 'Poppins',
        fontWeight: '500',
        alignSelf: 'flex-start',
        marginLeft: widthScreen * 0.02,
        width: widthScreen * 0.35,
        marginTop: heightScreen * 0.01,
    },
    calories: {
        width: widthScreen * 0.3,
        height: heightScreen * 0.032,
        borderWidth: 2,
        borderColor: colors.BG,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        // alignSelf: 'flex-start',
        marginTop: heightScreen * 0.005,
    },
    textcalories: {
        fontSize: 13,
        fontFamily: 'Poppins',
        fontWeight: "500",
        // color: colors.BG,
    }
})