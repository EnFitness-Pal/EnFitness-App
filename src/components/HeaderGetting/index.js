import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'

const HeaderGetting = ({title1, title2}) => {
  return (
    <View style = { styles.container }>
        <Text style = { styles.text1 }>{title1}</Text>
        <Text style = { styles.text2 }>{title2}</Text>
    </View>
  )
}

export default HeaderGetting

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    text1: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        color: colors.WHITE,
        paddingVertical: heightScreen * 0.02,
    },
    text2: {
        fontSize: 16,
        textAlign: 'center',
        color: colors.TEXTGRAY,
        paddingHorizontal: widthScreen * 0.2,
    },
})