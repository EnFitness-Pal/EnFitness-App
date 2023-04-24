import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'
import { Button } from '@rneui/themed'

const Exercise = ({item, index, onPress, loading}) => {
  return (
    <View style = {styles.container}>
        <View style = {styles.containerImage}>
            <FastImage
                style = {{height: heightScreen * 0.13, width: widthScreen * 0.25, borderRadius: 20}}
                source = {{uri: item?.Image}}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
        <View style = {styles.containerBody}>
              <Text style={styles.title}>{ item?.Name }</Text>
              <Text style={styles.categories}>{item?.Categories}</Text>
            <View style = {styles.containerCalories}>
                  <Text style={styles.calories}>{item?.Calories} cal/m</Text>
            </View>
        </View>
        <View style = {styles.containerButton}>
            <Button
                type = 'solid'
                buttonStyle = {{
                    backgroundColor: colors.MAIN,
                    borderRadius: 30,
                    height: widthScreen * 0.15,
                    width: widthScreen * 0.15,
                }}
                icon={{
                    name: 'add',
                    size: 30,
                    color: colors.WHITE,
                    type: 'material',
                }}
                onPress={onPress}
                loadingProps={{ size: "small", color: colors.BG }}
              />
        </View>
    </View>
  )
}

export default Exercise

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        height: heightScreen * 0.17,
        width: widthScreen * 0.9,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: heightScreen * 0.01,
        alignSelf: 'center',
        padding: 15,

    },
    containerImage: {
        height: heightScreen * 0.15,
        width: widthScreen * 0.27,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBody: {
        height: heightScreen * 0.15,
        width: widthScreen * 0.32,
        padding: 20,
        justifyContent: 'space-between',
        paddingVertical: heightScreen * 0.016,
    },
    title: {
        width: widthScreen * 0.4,
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        color: colors.WHITE,
        lineHeight: 30,
    },
    categories: {
        fontSize: 13,
        width: widthScreen * 0.25,
        fontFamily: 'Poppins-Bold',
        fontWeight: '500',
        color: colors.WHITE,
        opacity: 0.5,
    },
    containerCalories: {
        height: heightScreen * 0.03,
        width: widthScreen * 0.25,
        backgroundColor: '#494949',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calories: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        fontWeight: '700',
        color: colors.WHITE,
    },
    containerButton: {
        height: heightScreen * 0.05,
        width: widthScreen * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})