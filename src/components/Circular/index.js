import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import CircularProgress from 'react-native-circular-progress-indicator'

const Circular = ({
    value,
    date,
    progressFormatter
}) => {
  return (
    <View style = {styles.container}>
        <CircularProgress
            value={value}
            activeStrokeWidth={6}
            inActiveStrokeColor={colors.GRAYDARK}
            progressFormatter={progressFormatter}
            radius={20}
            activeStrokeColor={colors.MAIN}
            showProgressValue={false}
          />
          <Text style={styles.textdate}>{date}</Text>
    </View>
  )
}

export default Circular

const styles = StyleSheet.create({
    container: {
        width: widthScreen * 0.11,
        height: widthScreen * 0.15,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: widthScreen * 0.005
    },
    textdate: {
        marginTop: heightScreen * 0.005,
        fontSize: 11,
        fontFamily: 'Poppins-Medium',
        fontWeight: '600',
        color: colors.WHITE,
    }
})