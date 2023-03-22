import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useState } from 'react';
import HeaderGetting from '../../../components/HeaderGetting';
import  Ionicons  from 'react-native-vector-icons/Ionicons';
import Button from '../../../components/Button';
import { colors, heightScreen, widthScreen } from '../../../utility';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context';

const SexScreen = () => {

  const [gender, setGender] = useState('');
  const handleGenderSelection = (selectedGender) => {
    setGender(selectedGender);
  };
  const handleNext = () => {
    if (gender === '')
    {
      Alert.alert('Select a gender', 'Please select a gender to continue!');
    }
    else {
      navigation.push('AgeScreen', {
              gender:gender,
            })
    }
  }
  const navigation = useNavigation();
  return (
    <SafeAreaView
     style = {styles.container}>
      <HeaderGetting
        title1={'Tell us about yourself!'}
        title2={'To give you a better experience we need to know your gender.'}
      />
      <View style = {styles.containerbody}>
        <TouchableOpacity
          style={[styles.buttongender, {backgroundColor: gender === 'male' ? colors.MAIN : colors.GRAYDARK}]}
          onPress={() => handleGenderSelection('male')}>
          <Ionicons
            name='male'
            size={65}
            color={gender === 'male' ? colors.WHITE : colors.TEXTGRAY}
            style =  {styles.icon}
          />
          <Text
            style={[styles.text, { color: gender === 'male' ? colors.WHITE : colors.TEXTGRAY }]}>
            Male
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.buttongender, { backgroundColor: gender === 'female' ? colors.MAIN : colors.GRAYDARK }]}
          onPress={() => handleGenderSelection('female')}>
          <Ionicons
            name='female'
            size={65}
            color={gender === 'female' ? colors.WHITE : colors.TEXTGRAY}
            style =  {styles.icon}
          />
          <Text style={[styles.text, { color: gender === 'female' ? colors.WHITE : colors.TEXTGRAY }]}>
            Female</Text>
        </TouchableOpacity>        
      </View>

      <Button
        stylesContainer={styles.button}
        title={'Next'}
        icon = 'right'
        stylesTitle={{color:colors.WHITE}}
        stylesIcon={{ fontSize: 20, color: colors.WHITE }}
        onPress={handleNext}
        />
    </SafeAreaView>
  )
}

export default SexScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    backgroundColor: colors.BG,
  },
  containerbody: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: colors.BG,
  },
  button: {
    width: widthScreen * 0.35,
    marginRight: widthScreen * 0.05,
    alignSelf: 'flex-end',
  },
  buttongender: {
    width: heightScreen * 0.17,
    height: heightScreen * 0.17,
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: heightScreen * 0.02,
    borderRadius: 100,
    backgroundColor: colors.GRAYDARK,
    shadowColor: colors.GRAYLIGHT,
    shadowOffset: {
        width: 0,
        height: heightScreen * 0.001,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 3,
  },
  text: {
    color: colors.WHITE,
    fontSize: 20,
    fontWeight: '500',
  },
})