import {Text, TouchableOpacity, StyleSheet } from 'react-native'
import { colors, heightScreen, widthScreen } from '../../utility'
import AntDesign from 'react-native-vector-icons/AntDesign'
import React from 'react'
const Button = ({
    onPress, 
    title,
    stylesContainer,
    stylesTitle,
    stylesIcon,
    icon,
    
}) => {
return (
      <TouchableOpacity 
        onPress={onPress}
        style= {[styles.container, stylesContainer]}
        >
        <Text 
        style= {[styles.title, stylesTitle]}
        >{title}</Text>
        {
        icon? <AntDesign
        style= {[styles.icon, stylesIcon]}
        name = {icon}>
        </AntDesign>:<></>
       }
      </TouchableOpacity>
  )
}
export default Button;

const styles = StyleSheet.create({
    container: {
        width:widthScreen * 0.8,
        height:heightScreen * 0.06,
        flexDirection:'row',
        alignSelf:'center',
        borderRadius: 20,
        backgroundColor: colors.MAIN,
        alignItems: 'center',
        justifyContent:"center",
        
    },
    icon: {
        left: widthScreen * 0.03
    },
    title: {
        fontSize: 20,
        fontWeight: '600',
        alignSelf: 'center',
        color: "white",
    },
});