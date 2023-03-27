import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import HeaderGetting from '../../../components/HeaderGetting'
import WheelPicker from 'react-native-wheely'
import ButtonBack from '../../../components/ButtonBack'
import Button from '../../../components/Button'
import { useNavigation } from '@react-navigation/native'
import { colors, heightScreen, widthScreen } from '../../../utility'

const GWScreen = ({ route }) => {
  const GWdata = [];
  const w = route.params.weight
  for (i = w - 30; i <= w + 30; i++) {
    GWdata.push(i.toString());
  }
  const [GW, setGW] = useState(route.params.weight + 10);
  const navigation = useNavigation()
  const handleNext = () => {
    navigation.push('BFScreen', {
      ...route.params,
      GW: GW,
    })
  }
  console.log(GW)
  return (
  <SafeAreaView style={styles.container}>
      <HeaderGetting
        title1={"What's your goal weight?"}
        title2={'This help us create your personalized plan.'}
        stylesText={{ paddingHorizontal: widthScreen * 0.15 }}
        stylesContainer={{flex:1}}
      />
      <View style = {styles.containerHeight}>
      <WheelPicker
        selectedIndex={GW-20}
        containerStyle={{backgroundColor: colors.BG, width: widthScreen *  0.4, alignSelf: 'center'}}
        itemTextStyle={styles.itemstyle}
        selectedIndicatorStyle={styles.selected}
        itemHeight={70}
        options={GWdata}
        onChange={(data) =>setGW(data+20)}
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
      <Text style = {styles.textcm}>kg</Text>
    </SafeAreaView>
  )
}

export default GWScreen

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
  containerHeight: {
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
  },
  textcm:{
    position: 'absolute',
    color: colors.WHITE,
    fontSize: 15,
    fontWeight: '400',
    marginTop: heightScreen * 0.495,
    left: widthScreen * 0.64,
  }
})