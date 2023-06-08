import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons'
import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
const CardDaysMeal = ({ day, num, minutes, onActive }) => {
  return (
    <View style = {[styles.container]}>
        <View style = {styles.containerDay}>
        <Text style={{alignSelf:'center', color: colors.MAIN, fontSize: 15, fontFamily: "Poppins-Bold", fontWeight: "600"}}>Day</Text>
        <Text numberOfLines={1} style={{color: colors.MAIN, fontSize: 33, fontFamily: "Poppins-Bold", fontWeight: "bold", alignSelf:'center'}}>{day}</Text>
        </View>
        <View style={styles.containerDetail}>
            <View style = {{flexDirection:'row'}}>
                <MaterialIcons
                    name='local-fire-department'
                    size={20}
                    color={colors.SILVER}
                />
                <Text style={styles.textnum}>
                    {num} calories
                </Text>
            </View>
            <View style = {{flexDirection:'row', marginTop: heightScreen * 0.005,}}>
                <MaterialCommunityIcons
                    name='clock'
                    size={20}
                    color={colors.SILVER}
                />
                <Text style={styles.textmin}>
                    {minutes} minutes
                </Text>
            </View>
          </View>
        <Ionicons
            name={onActive ? "ios-caret-up" : "ios-caret-down"}
            size={35}
            style={styles.arrow}
            color={colors.SILVER}
        />
    </View>
  )
}

export default CardDaysMeal

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        marginTop: heightScreen * 0.012,
        width: widthScreen * 0.91,
        height: heightScreen * 0.08,
        backgroundColor: "#FCFBF4",
        borderRadius: 10,
        alignSelf: 'center',
    },
    containerDay: {
        width: widthScreen * 0.2,
        height: heightScreen * 0.05,
        borderRightWidth: 1,
        borderColor: colors.GRAYLIGHT,
        justifyContent: 'center',
        marginTop: heightScreen * 0.015,
    },
    containerDetail: {
        height: heightScreen * 0.05,
        marginTop: heightScreen * 0.012,
        marginLeft: widthScreen * 0.05
    },
    textnum: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '500',
        marginLeft:widthScreen * 0.015
    },
    textmin: {
        fontFamily: 'Poppins',
        fontSize: 15,
        fontWeight: '500', 
        marginLeft:widthScreen * 0.015
    },
    arrow: {
        alignSelf: 'center',
        marginLeft: heightScreen * 0.1
    }
})