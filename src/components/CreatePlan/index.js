import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'
import Button from '../Button'

const CreatePlan = ({onPress}) => {
  return (
    <View style = {styles.container}>
        <View>
            <FastImage
                source={require('../../assets/rewards/achievement4.png')}
                style={{
                    width: widthScreen * 0.25,
                    height: widthScreen * 0.25,
                }}
            />
        </View>
        <View>
            <Text style = {styles.title}>
                Build a plan workout for your daily or week!
            </Text>
            <Button
                title = "Let's go"
                stylesContainer = {styles.button}
                stylesTitle={styles.titleButton}
                onPress = {onPress}
              />
        </View>
    </View>
  )
}

export default CreatePlan

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.9,
        height: heightScreen * 0.15,
        backgroundColor: colors.BG,
        borderRadius: 20,
        alignSelf: 'center',
        borderWidth: 0.4,
        borderColor: colors.GRAYLIGHT,
        marginTop: heightScreen * 0.03,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: heightScreen * 0.015,
        paddingHorizontal: widthScreen * 0.05,
    },
    title: {
        fontSize: 16,
        fontFamily: 'Poppins-Bold',
        color: colors.WHITE,
        width: widthScreen * 0.5,
    },
    button: {
        width: widthScreen * 0.5,
        height: heightScreen * 0.042,
        marginTop: heightScreen * 0.015,
    },
    titleButton: {
        fontSize: 17,
    },
})