import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import HeaderGetting from '../../components/HeaderGetting'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, heightScreen, widthScreen } from '../../utility'
import TipsData from '../../assets/TipsData';

const HomeScreen = () => {
    const date = new Date();
    const data = TipsData;
    const tip = data[Math.floor(Math.random() * data.length)];
  return (
    <SafeAreaView style={styles.container}>
        <View style={styles.containerHeader}>
            <HeaderGetting
                  title1={'Hello' + ' ' + 'Gerard'+','}
                title2={'Good morning'}
                stylesText={{textAlign: 'left', fontWeight: 'bold', fontSize:16, marginRight: widthScreen * 0.48}}
                stylesText1={{ marginRight: widthScreen * 0.3, fontSize: 36, marginHorizontal: widthScreen * 0.04}}
            />
            <TouchableOpacity>
                  <Ionicons name={'ios-notifications'} size={25} color={colors.GRAYLIGHT} style={ styles.iconNoti} />
            </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
            <View style ={styles.containerTitle}>
                <Text style={styles.texttitle}>Tips OF THE DAY</Text>
                <Ionicons
                    name ={'ios-bulb-outline'}
                    size={25}
                    color={colors.MAIN}
                    style={styles.iconBulb}
                  />
                  <Text style={styles.textdate}>{(date.toUTCString()).slice(0,12)}</Text>
            </View>
              <Text style={styles.texttip}>{tip.title.toUpperCase()}</Text>
            <ScrollView style ={styles.scrolltext}>
                  <Text
                      style={styles.text}
                  >{tip.content}</Text>
            </ScrollView>              
        </View>

    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerHeader: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: colors.BG,
    },
    iconNoti: {
        marginTop: heightScreen * 0.03,
        marginRight: widthScreen * 0.1,
    },
    containerBody: {
        flex: 1,
        backgroundColor: colors.SILVER,
        width: widthScreen * 0.9,
        marginBottom: heightScreen * 0.45,
        bottom: heightScreen * 0.065,
        padding: 15,
        borderRadius: 20,
        alignSelf: 'center',
    },
    scrolltext: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texttitle: {
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.WHITE,
    },
    iconBulb:{
        bottom: 5,
        marginRight: widthScreen * 0.2,
    },
    textdate: {
        fontSize: 13,
        color: colors.MAIN,
        fontWeight: 'bold',
    },
    texttip: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.WHITE,
        alignSelf: 'center',
        marginBottom: heightScreen * 0.012,
    },
    text: {
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: '600',
        lineHeight: 20,
    }
})