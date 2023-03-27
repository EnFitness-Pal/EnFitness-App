import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, heightScreen, widthScreen } from '../../utility';

const Input = ({
    title,
    placeholder,
    onChangeText,
    secureTextEntry,
    stylesContainer,
    stylesTitle,
    stylesInput,
    onFocus = () => {},
    error,
    onSubmitEditing,
    multiline,
    onChangeValue,
    onEndEditing,
    placeholderTextColor,
    value,
    editable,
    icon, 
    styleIcon,
    ...props
}) => {

    let [state, setState] = useState(secureTextEntry);
    const [isFocused, setIsFocused] = useState(false);
    return (
        <View style={[ styles.container, stylesContainer]}>
            <Text 
            style={ [styles.title, stylesTitle]}
            >{title}</Text>

            <View>
            <TextInput
            style= {[styles.input, stylesInput, {borderBottomWidth:0.3,
            borderBottomColor: error
              ? 'red'
              : isFocused
              ? colors.MAIN
              : colors.GRAYLIGHT}]}
            placeholder={ placeholder }
            placeholderTextColor={placeholderTextColor}
            onChangeText={ onChangeText }
            autoCorrect={false}
            onFocus={() => {
            onFocus();
            setIsFocused(true);
            }}
            onBlur={() => setIsFocused(false)}
            secureTextEntry= {state}
            {...props}
            value={value}
            multiline = {multiline}
            editable={editable}
            onChangeValue={onChangeValue}
            onSubmitEditing = {onSubmitEditing}
            ></TextInput>
            <Text style={{color: "red", fontSize: 12, marginTop:heightScreen*0.005, paddingLeft:widthScreen*0.035}}>
            {error}
            </Text>
            {
                secureTextEntry ?
                <View
                style={styles.icon}>
                <TouchableOpacity 
                style={ {alignItems:"center"} }
                onPress= {() => setState(!state)}>
                    <Ionicons
                    name = {state ? "eye" : "eye-off"}
                    size = {25}
                    color = {colors.GRAYLIGHT}
                    ></Ionicons>
                </TouchableOpacity>
                </View> 
                :
                <></>
            }
            </View>
        </View>
    )
}

export default Input

const styles = StyleSheet.create({
        container: {
        height: heightScreen * 0.074,
        width: widthScreen * 0.83,
        justifyContent:'space-between',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 11,
        paddingLeft: widthScreen *0.02,
        marginVertical: heightScreen * 0.005,
        color: colors.MAIN
        
    },
    input: {
        height: heightScreen * 0.05,
        paddingLeft: widthScreen * 0.02,
        paddingRight: widthScreen * 0.12,
        fontSize: 17,
        fontWeight: 'bold',
        color: colors.GRAYLIGHT,
        backgroundColor:"transparent",
    },
    icon : {
        position:'absolute',
        right:widthScreen * 0.02,
        top:heightScreen*0.01
        
    }
})