import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Modal from 'react-native-modal';
import { colors, heightScreen, widthScreen } from '../../utility';
import Button from '../Button';

const ModalPre = ({isVisible, stylesContainer, onPressButton, onPressIgnore}) => {
  return (
    <Modal
          isVisible={isVisible}
          animationIn="slideInUp"
          animationOut="slideOutDown"
          
      >
    <View style = {[styles.container, stylesContainer]}>
      <View style = {styles.containerTitle}>
        <Text style = {styles.title}>
            Upgrade to Premium to unlock all features, view all your stats and get rid of ads!
        </Text>
        </View>
        <Button
            onPress = {onPressButton}
            title = 'Upgrade'
            stylesContainer = {styles.button}
        />
        <Text 
            onPress = {onPressIgnore}
            style = {styles.ignore}>Ignore</Text>
    </View>
    </Modal>
  )
}

export default ModalPre

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.7,
        height: heightScreen * 0.32,
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
    containerTitle: {
        width: widthScreen * 0.7,
        height: heightScreen * 0.18,
        borderTopEndRadius: 20,
        borderTopStartRadius: 20,
        borderBottomEndRadius: 5,
        borderBottomStartRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.MAIN,
        shadowColor: "#FFF",
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
        padding: widthScreen * 0.05,
        fontWeight: '600',
    },
    button: {
        width: widthScreen * 0.35,
        height: heightScreen * 0.05,
        marginTop: heightScreen * 0.02,
    },
    ignore: {
        color: colors.WHITE,
        fontSize: 16,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
        padding: widthScreen * 0.04,
        textDecorationLine: 'underline',
    }
})