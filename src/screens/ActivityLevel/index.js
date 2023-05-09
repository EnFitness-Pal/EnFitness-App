import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { colors, widthScreen } from '../../utility'
import ButtonUpdate from '../../components/ButtonUpdate'
import { useSelector } from 'react-redux'
import ButtonBack from '../../components/ButtonBack'

const ActivityLevel = ({navigation : {setParams}, route}) => {
  const theme = useSelector(state => state.state.theme);
  const [press, setPress] = useState(route.params.value);
  return (
    <SafeAreaView style = {theme == 'dark' ? styles.container: styles.containerlight}>
      <View style = {[styles.containerHeader]}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name='chevron-back'
        />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme == 'dark' ? colors.WHITE : colors.BG,
          alignSelf: 'center',
          marginLeft: widthScreen * 0.17,
        }}>Activity Level</Text>
      </View>
      <ButtonUpdate
        title='Sedentary'
        stylesContainer={{ borderWidth: press == 'Sedentary' ? 1 : null, borderColor: press == 'Sedentary' ? colors.MAIN : colors.WHITE }}
        stylesText={{ color: press == 'Sedentary' ? colors.MAIN : colors.WHITE }}
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget'
        onPress={() => {
          setParams({value: 'Sedentary'})
          setPress('Sedentary')
        }}
      />
      <ButtonUpdate
        title='Lightly Active'
        stylesContainer={{borderWidth:press =='Lightly Active' ? 1 : null,borderColor: press == 'Lightly Active'? colors.MAIN: colors.WHITE}}
        stylesText={{color: press == 'Lightly Active'? colors.MAIN: colors.WHITE}}
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget'
        onPress={() => setPress('Lightly Active')}
      />
      <ButtonUpdate
        title='Moderately Active'
        stylesContainer={{borderWidth:press =='Moderately Active'? 1 : null,borderColor: press == 'Moderately Active'? colors.MAIN: colors.WHITE}}
        stylesText={{color: press == 'Moderately Active'? colors.MAIN: colors.WHITE}}
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget'
        onPress={() => setPress('Moderately Active')}
      />
      <ButtonUpdate
        title='Very Active'
        stylesContainer={{borderWidth:press =='Very Active'?1:null,borderColor: press == 'Very Active'? colors.MAIN: colors.WHITE}}
        stylesText={{color: press == 'Very Active'? colors.MAIN: colors.WHITE}}
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget'
        onPress={() => setPress('Very Active')}
      />
      <ButtonUpdate
        title='Extremely Active'
        stylesContainer={{borderWidth:press =='Extremely Active'?1:null,borderColor: press == 'Extremely Active'? colors.MAIN: colors.WHITE}}
        stylesText={{color: press == 'Extremely Active'? colors.MAIN: colors.WHITE}}
        desc='Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec euismod, nisl eget'
        onPress={() => setPress('Extremely Active')}
      />
    </SafeAreaView>
  )
}

export default ActivityLevel

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:colors.BG
  },
  containerlight: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: widthScreen * 0.05,
    marginBottom: widthScreen * 0.05,
  },
})