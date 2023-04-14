import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import Ionicons from 'react-native-vector-icons/Ionicons';

const CardInfo = ({
  title,
  styleTitle,
  styleIcon,
  styleContainer,
  onActive,
}) => {
  return (
    <View style = {[styles.container, styleContainer]}>
      <Text style={[styles.title, styleTitle]}>{title}</Text>
      <Ionicons
        name={onActive ? "ios-caret-up" : "ios-caret-down"}
        size={30}
        color={colors.GRAYLIGHT}
        style={[styles.icon, styleIcon]}
      />
    </View>
  )
}

export default CardInfo

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: widthScreen,
    height: heightScreen * 0.06,
    paddingHorizontal: heightScreen * 0.01,
    borderRadius: 15,
    borderLeftWidth: 4,
    borderLeftColor: colors.MAIN,
    backgroundColor: colors.GRAYDARK,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.GRAYLIGHT,
    marginLeft: heightScreen * 0.02,
    marginTop: heightScreen * 0.015,
  },
  icon: {
    marginTop: heightScreen * 0.01,
  }
})