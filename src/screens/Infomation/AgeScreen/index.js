import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import ButtonBack from '../../../components/ButtonBack'
import { colors, heightScreen, widthScreen } from '../../../utility'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderGetting from '../../../components/HeaderGetting'
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native'
import WheelPicker from 'react-native-wheely';

const AgeScreen = ({route}) => {
  const agedata = [];
  for (let i = 15; i <= 60; i++) {
    agedata.push(i.toString());
  }
  const [age, setAge] = useState(22);
  const navigation = useNavigation()
  const handleNext = () => {
    navigation.push('WeightScreen', {
      ...route.params,
      age: age,
    })
  }
  return (
    <SafeAreaView style={styles.container}>
      <HeaderGetting
        title1={'How old are you?'}
        title2={'This help us create your personalized plan.'}
        stylesText={{ paddingHorizontal: widthScreen * 0.15 }}
        stylesContainer={{flex:1}}
      />
      <View style = {styles.containerAge}>
      <WheelPicker
        selectedIndex={age-15}
        containerStyle={{backgroundColor: colors.BG, width: widthScreen *  0.3, alignSelf: 'center'}}
        itemTextStyle={styles.itemstyle}
        selectedIndicatorStyle={styles.selected}
        itemHeight={70}
        options={agedata}
        onChange={(data) =>setAge(data+15)}
      />
      </View>
      <View style={styles.containerbutton}>
        <ButtonBack
        name = {'chevron-back'}
        styleButton={styles.buttonback}
        onPress = {()=>{navigation.goBack()}}
      />
      <Button
        stylesContainer={styles.button}
        title={'Next'}
        icon = 'right'
        stylesTitle={{color:colors.WHITE}}
        stylesIcon={{ fontSize: 20, color: colors.WHITE }}
        onPress={handleNext}
      />        
      </View>
    </SafeAreaView>
  )
}

export default AgeScreen

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
  containerAge: {
    height: heightScreen * 0.5,
    width: widthScreen * 0.2,
    marginVertical: heightScreen * 0.12
  },
  itemstyle: {
    color: colors.WHITE,
    fontSize: 60,
    fontWeight: 'bold',
    alignSelf:'center'
  },
  selected: {
    backgroundColor: colors.BG,
    borderRadius: 0,
    borderTopWidth: 5,
    borderBottomWidth: 5,
    borderTopColor: colors.MAIN,
    borderBottomColor: colors.MAIN
  }
})