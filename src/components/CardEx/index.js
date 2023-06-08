import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Feather from 'react-native-vector-icons/Feather';
import moment from 'moment-timezone';
import { Swipeable } from 'react-native-gesture-handler';
const CardEx = ({
    styleTitle,
    styleIcon,
    icon,
    styleContainer,
    item
}) => {
const dateTimeString = item?.TrackingDate;
const dateTime = moment.utc(dateTimeString).tz('Asia/Ho_Chi_Minh');
const convertedDateTimeString = dateTime.format('h:mm A D MMM');

const rightSwipe = () => {
    return(
        <View>
            <TouchableOpacity style={styles.icondelete} onPress={()=>{}}>
                <Feather name='trash-2' color={'red'} size={40}/>
            </TouchableOpacity>
        </View>
    )
}


  return (
    <Swipeable
        renderRightActions={rightSwipe}
    >
    <View style = {[styles.container, styleContainer]}>
        <View style = {{flexDirection: 'column'}}>
              <View style={{ flexDirection: 'row', justifyContent:'space-between', marginHorizontal:widthScreen * 0.05}}>
                  <Text numberOfLines={1} style={[styles.title, styleTitle]}>{item?.ExerciseName}</Text>
                  <Text style={[styles.titledate]}>{convertedDateTimeString}</Text>
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
    </Swipeable>
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
        width: widthScreen * 0.6,
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
    },
    icondelete:{
        marginTop: heightScreen * 0.04,
        paddingLeft:widthScreen * 0.05,
        paddingRight:widthScreen * 0.01,
    },
})