import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const CardEx = ({
    styleTitle,
    styleIcon,
    icon,
    styleContainer,
    item
}) => {
    const date = new Date(item?.TrackingDate);
    const options = { 
        hour: 'numeric', 
        minute: 'numeric',
        day: 'numeric',
        month: 'short',
        year: 'numeric',
        timeZone: 'UTC' 
    };
    const formattedDate = date.toLocaleString('en-US', options);
  return (
    <View style = {[styles.container, styleContainer]}>
        <View style = {{flexDirection: 'column'}}>
              <View style={{ flexDirection: 'row', justifyContent:'space-between', marginHorizontal:widthScreen * 0.05}}>
                  <Text style={[styles.title, styleTitle]}>{item?.ExerciseName}</Text>
                  <Text style={[styles.titledate]}>{formattedDate}</Text>
                </View>
            <View style = {{flexDirection: 'row', paddingTop:10, justifyContent:'space-between', marginHorizontal:widthScreen * 0.15}}>
                <View style = {{
                      backgroundColor: "#FFAC41",
                      width: widthScreen * 0.3,
                      height: heightScreen * 0.035,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      marginHorizontal:15,
                  }}>
                      <FontAwesome5
                          name="burn"
                          size={19}
                          color={colors.WHITE}
                      />
                      <Text
                        style = {{color:colors.WHITE, fontSize:13, fontWeight:'bold'}}
                      >{item?.Calories} {item?.ExerciseCalories} Calo</Text>

                </View>
                <View style = {{
                      backgroundColor: "#32407B",
                      width: widthScreen * 0.3,
                      height: heightScreen * 0.035,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                  }}>
                    <Ionicons
                          name="ios-play-circle-sharp"
                          size={20}
                        color={colors.WHITE}
                      />
                      <Text
                      style = {{color:colors.WHITE, fontSize:13, fontWeight:'bold'}}
                      > {item?.Minutes} Min</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default CardEx

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginVertical: heightScreen * 0.01,
        paddingHorizontal: heightScreen * 0.02,
        width: widthScreen * 0.95,
        height: heightScreen * 0.11,
        backgroundColor: colors.GRAYDARK,
        borderRadius: 10,
        shadowColor: colors.WHITE,
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        fontSize: 20,
        color: colors.GRAYLIGHT,
        fontWeight: 'bold',
        marginTop: heightScreen * 0.015,
    },
    icon: {
        // alignSelf: 'center',]
    marginTop: heightScreen * 0.015,
    },
    titledate: {
        fontSize: 14,
        color: "#03C988",
        fontWeight: 'bold',
        marginTop: heightScreen * 0.02,
    }
})