import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { colors, heightScreen, widthScreen } from '../../utility';
import Button from '../Button';
import FastImage from 'react-native-fast-image';

const ModalRanking = ({isVisible, stylesContainer, onPressButton, item}) => {
  return (
    <Modal
          isVisible={isVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
      >
    <View style = {[styles.container, stylesContainer]}>
        <FastImage
            source = {item?.TierName === 'Master' ? require('../../assets/rank/master.png'):
            item?.TierName === 'Bronze' ? require('../../assets/rank/brozone.png'):
            item?.TierName === 'Silver' ? require('../../assets/rank/silver.png') :
            item?.TierName === 'Gold' ? require('../../assets/rank/gold.png') :
            item?.TierName === 'Platinum' ? require('../../assets/rank/platinum.png'):
            item?.TierName === 'Diamond' ? require('../../assets/rank/diamond.png'):
            require('../../assets/rank/unranked.png')
            }
            resizeMode={FastImage.resizeMode.contain}
            style = {styles.image}
        />
      <View style = {styles.containerTitle}>
        <Text style = {styles.title}>
            Rank up!
        </Text>
        <Text style = {styles.title}>
            Congratulations on reaching the {item?.TierName} rank!
        </Text>
        </View>
        <Button
            onPress = {onPressButton}
            title = 'Continue to tracking'
            stylesContainer = {styles.button}
        />
    </View>
    </Modal>
  )
}

export default ModalRanking

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.8,
        height: heightScreen * 0.4,
        alignSelf: 'center',
        alignItems: 'center',
        backgroundColor: colors.BG,
        borderRadius: 20,
        shadowColor: "#000",
        shadowOffset: {
        width: 0,
        height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    title: {
        color: colors.WHITE,
        fontSize: 18,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        fontWeight: '600',
        width: widthScreen * 0.7,
        bottom:heightScreen * 0.02
    },
    button: {
        width: widthScreen * 0.55,
        height: heightScreen * 0.05,
    },
    image:{
        width: widthScreen * 0.45,
        height: widthScreen * 0.45,
        marginTop: heightScreen * 0.01
    }
})