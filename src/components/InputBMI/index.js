import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'

const InputBMI = ({stylesContainer, stylesText,textTitle, textUnit, value, error, type, func}) => {
    const [editable, setEditable] = useState(false);
  return (
    <View style={{marginVertical: heightScreen * 0.015}}>
    <TouchableOpacity style = {[styles.container, stylesContainer]} 
        onPress={type == 'input'? ()=>setEditable(!editable): func}>
        <Text style={[styles.text, stylesText]}>{textTitle} {textUnit? `(${textUnit})`:null }</Text>
        <TextInput editable={editable} style={{padding:2,backgroundColor: editable && type == 'input'? colors.MAIN:null}}
            keyboardType='numeric'
            textContentType='telephoneNumber'
        >
            <Text style={[styles.text, stylesText]}>{value}</Text>
        </TextInput>
    </TouchableOpacity>
    {error? <Text style={{color: colors.WARNING, marginLeft:widthScreen * 0.07, marginTop:widthScreen * 0.015, fontWeight:'500'}}>{error}</Text>:null}
    </View>
  )
}

export default InputBMI

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.9,
        height: heightScreen * 0.058,
        backgroundColor: colors.GRAYICON,
        alignSelf: 'center',
        borderRadius: 15,
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: widthScreen * 0.03,
        flexDirection: 'row',
    },
    text: {
        fontSize: 15,
        fontWeight: 'bold',
        color: colors.WHITE,
    }
})