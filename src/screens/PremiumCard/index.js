import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'

const PremiumCard = ({item, onPress}) => {
  return (
    <TouchableOpacity style = {styles.container} onPress={onPress}>
        <View style = {{borderWidth:1, borderColor: colors.MAIN, padding:3}}>
            <Text style = {styles.textTitle}>{item.title}</Text>
        </View>
        <Text style={styles.textPrice}>${item.price}</Text>
        {item.title !== 'Lifetime'?<Text style={styles.textPermonths}>${item.permonths}/month</Text>:null}
    </TouchableOpacity>
  )
}

export default PremiumCard

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.GRAYICON,
        width: widthScreen * 0.44,
        height: heightScreen * 0.26,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        borderWidth: 5,
        borderColor: colors.MAIN,
    },
    textTitle: {
        color: colors.MAIN,
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
    textPrice: {
        color: colors.WHITE,
        fontSize: 25,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
        marginVertical: heightScreen * 0.03,
    },
    textPermonths: {
        color: colors.GRAYLIGHT,
        fontSize: 16,
        fontFamily: 'Poppins',
        fontWeight: '600',
    }
})