import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import ReactNativeModal from 'react-native-modal'
import { colors, heightScreen, widthScreen } from '../../utility'
import AnimatedLottieView from 'lottie-react-native'
import Button from '../Button'

const ModalGlobal = ({loop, isVisible,stylesContainer, text, lottie,onPress, stylesButton, type, onPressCancel, onPressOK, stylesIcon}) => {
  return (
    <ReactNativeModal
        isVisible={isVisible}
        animationIn="slideInUp"
        animationOut="slideOutDown"
    >
    <View style = {[styles.container, stylesContainer]}>
        <View style = {styles.containerTitle}>
            {text? <Text style={styles.title}>{text}</Text> :null}
            <AnimatedLottieView
                loop={loop}
                source={lottie}
                autoPlay
                style={[{width:widthScreen * 0.75, height:widthScreen * 0.75, alignSelf: 'center', bottom:20}, stylesIcon]}
            />
            {type === 'success' ? <Button
                title = {'Back to continue'}
                stylesContainer = {[styles.button, stylesButton]}
                stylesTitle={styles.titleButton}
                onPress = {onPress}
            />: type === 'hasPlan'?<View style = {{flexDirection:'row', marginHorizontal:widthScreen * 0.03, justifyContent:'space-between', marginTop:heightScreen * 0.1}}>
            <Button
                title = {'Yes, sure!'}
                stylesContainer = {[styles.button, {width: widthScreen * 0.3, backgroundColor: colors.WARNING}]}
                stylesTitle={styles.titleButton}
                onPress = {onPressOK}
            />
            <Button
                title = {'Cancel'}
                stylesContainer = {[styles.button, {width: widthScreen * 0.3, backgroundColor:colors.BACK}]}
                stylesTitle={styles.titleButton}
                onPress = {onPressCancel}
            />
            </View>: null
            }
        </View>
    </View>
    </ReactNativeModal>
  )
}

export default ModalGlobal

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.8,
        height: heightScreen * 0.42,
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
        width: widthScreen * 0.7,
        fontSize: 20,
        color: colors.WHITE,
        textAlign: 'center',
        alignSelf:'center',
        fontWeight: 'bold',
        fontFamily: 'Poppins',
        marginTop: heightScreen * 0.05
    },
    button: {
        width: widthScreen * 0.65,
        height: heightScreen * 0.055,
        bottom:heightScreen * 0.13
    },
    titleButton: {
        fontSize: 20,
        fontWeight:'700'
    },
})