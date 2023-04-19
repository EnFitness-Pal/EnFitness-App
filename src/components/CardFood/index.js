import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const CardFood = ({
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
              <View style={{ flexDirection: 'row', justifyContent:'space-between'}}>
                  <Text numberOfLines={1} style={[styles.title, styleTitle]}>{item?.ProductName}</Text>
                  <Text style={[styles.titledate]}>{formattedDate}</Text>
            </View>
            <View style = {{flexDirection: 'row', paddingTop:10, alignSelf:'center'}}>
                <View style = {{
                      backgroundColor: "#FFAC41",
                      width: widthScreen * 0.2,
                      height: heightScreen * 0.035,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      justifyContent:'center',
                  }}>
                      <Text
                        style = {{color:colors.WHITE, fontSize:13, fontWeight:'bold'}}
                      >{item?.Calories} Calo</Text>

                </View>
                <View style = {{
                      backgroundColor: "#e80043",
                      width: widthScreen * 0.2,
                      height: heightScreen * 0.035,
                      marginHorizontal:heightScreen * 0.005,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                      justifyContent:'center',
                  }}>
                      <Text
                        style={{ color: colors.WHITE, fontSize: 13, fontWeight: 'bold', alignSelf: 'center' }}
                      >{item?.Carbs} Carbs</Text>
                </View>
                <View style = {{
                      backgroundColor: "#3b84e5", 
                      width: widthScreen * 0.2,
                      height: heightScreen * 0.035,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                  }}>
                    <Text
                      style = {{color:colors.WHITE, fontSize:11, fontWeight:'bold'}}
                      >{item?.Protein} Protein</Text>
                </View>
                <View style = {{
                      backgroundColor: "#31b556",
                      width: widthScreen * 0.2,
                      height: heightScreen * 0.035,
                      marginHorizontal:heightScreen * 0.005,
                      borderRadius: 15,
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexDirection: 'row',
                  }}>
                    <Text
                      style = {{color:colors.WHITE, fontSize:13, fontWeight:'bold'}}
                      >{item?.Fat} Fat</Text>
                </View>
            </View>
        </View>
    </View>
  )
}

export default CardFood

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
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
        width: widthScreen * 0.45,
        fontSize: 18,
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