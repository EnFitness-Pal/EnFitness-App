import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderGetting from '../../../components/HeaderGetting'
import { colors, widthScreen } from '../../../utility'
import ButtonBack from '../../../components/ButtonBack'
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { RulerPicker } from 'react-native-ruler-picker';

const BFScreen = ({ route }) => {
  const navigation = useNavigation();
  // const handleNext = () => {
  //   navigation.push('HeightScreen', {
  //     ...route.params,
  //     BF: BF
  //   })
  // }
  const [BF, setBF] = useState(10);
  return (
    <SafeAreaView style = {styles.container}>
      <HeaderGetting
        title1={"What's your body fat?"}
        title2={'This help us create your personalized plan.'}
        stylesText={{ paddingHorizontal: widthScreen * 0.1 }}
        stylesContainer={{flex:1}}
      />
      <RulerPicker
        min={0}
        max={100}
        step={0.01}
        indicatorColor={colors.MAIN}
        shortStepColor={colors.MAIN}
        longStepColor={colors.MAIN}
        valueTextStyle={{color: colors.WHITE, fontSize:60}}
        unitTextStyle={{color: colors.WHITE, fontSize:15}}
        fractionDigits={2}
        initialValue={10}
        onValueChange={(number) => setBF(number)}
        onValueChangeEnd={(number) => setBF(number)}
        unit="%"
    />
      <View style={styles.containerbutton}>
      <ButtonBack
        styleButton={styles.buttonback}
        onPress = {()=>{navigation.goBack()}}
      />
      <Button
        stylesContainer={styles.button}
        title={'Next'}
        icon = 'right'
        stylesTitle={{color:colors.WHITE}}
        stylesIcon={{ fontSize: 20, color: colors.WHITE }}
        onPress={()=>{}}
      />        
      </View>
    </SafeAreaView>
  )
}

export default BFScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: colors.BG,
    flexDirection: 'column',
  },
  containerbutton: {
    flexDirection: 'row',
    // marginTop: heightScreen * 0.25,
    marginHorizontal:10,
  },
  buttonback: {
    marginHorizontal:widthScreen * 0.2
  },
  button: {
    width: widthScreen * 0.35,
    marginHorizontal:widthScreen * 0.2
  },
})