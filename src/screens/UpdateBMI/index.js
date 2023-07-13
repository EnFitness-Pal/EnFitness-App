import { Alert, Animated, Keyboard, KeyboardAvoidingView, Platform, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { useSelector } from 'react-redux';
import ButtonBack from '../../components/ButtonBack';
import InputBMI from '../../components/InputBMI';
import { Button } from '@rneui/themed';
import DropDownPicker from 'react-native-dropdown-picker';
import Input from '../../components/Input';
import { AxiosContext } from '../../context/AxiosContext';
import { AuthContext } from '../../context/AuthContext';

const UpdateBMI = ({navigation}) => {
  const theme = useSelector(state => state.state.theme);
  const axiosContext = useContext(AxiosContext);
  const authContext = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGW, setOpenGW] = useState(false);
  const [openM, setOpenM] = useState(false);
  const [errors, setErrors] = useState(false);
  const [activity, setActivity] = useState([
    {label: 'Sedentary', value: 'sedentary'},
    { label: 'Lightly Active', value: 'lightlyactive' },
    { label: 'Moderately Active', value: 'moderatelyactive' },
    { label: 'Very Active', value: 'veryactive' },
    { label: 'Extremely Active', value: 'extremelyactive' },
  ]); 
  const [weightgoal, setWeightgoal] = useState([
    { label: 'Maintain Weight', value: 'maintainweight' },
    { label: 'Cutting', value: 'cutting' },
    { label: 'Bulking', value: 'bulking' },
  ])
  const [macronutrient, setMacronutrient] = useState([
    { label: 'Default', value: 'default' },
    { label: 'Moderate Carbohydrates', value: 'moderate' },
    { label: 'Lower Carbohydrates', value: 'lower' },
    { label: 'Higher Carbohydrates', value: 'higher' },
  ]);
  const [valueAc, setValueAc] = useState(
    axiosContext.person?.ActivityLevel == 0 ? 'sedentary' :
    axiosContext.person?.ActivityLevel == 1 ? 'lightlyactive' :
    axiosContext.person?.ActivityLevel == 2 ? 'moderatelyactive' :
    axiosContext.person?.ActivityLevel == 3 ? 'veryactive' :'extremelyactive');
  const [valueWg, setValueWg] = useState(
    axiosContext.person?.WeightGoal == 0 ? 'maintainweight' :
    axiosContext.person?.WeightGoal == 1 ? 'cutting' : 'bulking');
  const [valueM, setValueM] = useState(
    axiosContext.person?.MacroNutrients == 0 ? 'default' :
    axiosContext.person?.MacroNutrients == 1 ? 'moderate' :
    axiosContext.person?.MacroNutrients == 2 ? 'lower' : 'higher');
  const [edit, setEdit] = useState(false);
  const handleEdit = () => {
    setOpen(false);
    setOpenM(false);
    setOpenGW(false);
    setEdit(!edit);
  };
  const [inputs, setInputs] = useState({
    height: (axiosContext.person?.Height).toString(),
    weight: (axiosContext.person?.Weight).toString(),
    age: (axiosContext.person?.Age).toString(),
    bodyfat: (axiosContext.person?.BodyFat).toString(),
  });

  const handleOnchange = (text, input) => {
      setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleUpdate = async () => { 
    Keyboard.dismiss();
    setOpen(false);
    setOpenM(false);
    setOpenGW(false);
    let isValid = true;
    if (!inputs.height) {
      handleError('Height is a required field.', 'height');
      isValid = false;
    } else if(100 >= Number(inputs.height) || Number(inputs.height) >= 250) {
        handleError('Height must be between 100 and 170 cm.', 'height');
        isValid = false;
    }
    if (!inputs.weight) { 
      handleError('Weight is a required field.', 'weight');
      isValid = false;
    } else if(30 >= Number(inputs.weight) || Number(inputs.weight) >= 150) {
        handleError('Weight must be between 30 and 150 kg.', 'weight');
        isValid = false;
    }
    if (!inputs.age) { 
      handleError('Age is a required field.', 'age');
      isValid = false;
    } else if (15 >= Number(inputs.age) || Number(inputs.age) >= 100) {
        handleError('Age must be between 18 and 100 years.', 'age');
        isValid = false;
    }
    if (!inputs.bodyfat) { 
      handleError('Body Fat is a required field.', 'bodyfat');
      isValid = false;
    } else if (5 >= Number(inputs.bodyfat) || Number(inputs.bodyfat) >= 50) {
        handleError('Body Fat must be between 5 and 50 %.', 'bodyfat');
        isValid = false;
    }
    if (isValid) {
      setLoading(true);
      await axiosContext?.updatePerson(
        authContext?.userID,
        axiosContext?.person?.FullName,
        axiosContext?.person?.Avatar,
        inputs.age,
        axiosContext?.person?.Sex,
        axiosContext?.person?.Description,
        inputs.height,
        inputs.weight,
        inputs.bodyfat,
        valueAc == 'sedentary' ? 0 :
          valueAc == 'lightlyactive' ? 1 :
            valueAc == 'moderatelyactive' ? 2 :
              valueAc == 'veryactive' ? 3 : 4,
        valueWg == 'maintainweight' ? 0 :
          valueWg == 'cutting' ? 1 : 2,
        valueM == 'default' ? 0 :
          valueM == 'moderate' ? 1 :
            valueM == 'lower' ? 2 : 3,
      )
        .then(() => {
          setLoading(false);
          setEdit(!edit);
          Alert.alert(
            'BMI Updated!',
            'Your BMI has been updated successfully.'
          );
        })
        .catch((error) => {
          setLoading(false);
          setEdit(!edit);
          Alert.alert(
            'Error!',
            'Something went wrong. Please try again later.'
          );
        });
    }
  }
  return (
    <SafeAreaView style={theme == 'dark' ? styles.container : styles.containerlight} onTouchStart={() => {Keyboard.dismiss()}}>
      <KeyboardAvoidingView behavior='padding'>
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
        }}>Update BMI</Text>
        <ButtonBack
          onPress={handleEdit}
          name='pencil'
          styleButton={{backgroundColor: edit? colors.MAIN: colors.BACK}}
        />
      </View>
        <Input
          title={'Height (cm)'}
          value={inputs.height}
          keyboardType='numeric'
          onFocus={() => handleError(null,'height')}
          onChangeText={(text) => handleOnchange(text, 'height')}
          error={errors.height}
          stylesContainer={{ marginBottom:heightScreen * 0.025,alignSelf: 'center'}}
          stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
          editable={edit}
        />
        <Input
          title={'Weight (kg)'}
          value={inputs.weight}
          keyboardType='numeric'
          onFocus={() => handleError(null,'weight')}
          onChangeText={(text) => handleOnchange(text, 'weight')}
          error={errors.weight}
          stylesContainer={{marginBottom: heightScreen * 0.02, alignSelf: 'center'}}
          stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
          editable={edit}
          stylesErrorPointer={{marginTop:-5}}
          stylesErrorContainer={{marginTop:-5}}
        />
        <Input
          title={'Age'}
          value={inputs.age}
          keyboardType='numeric'
          onFocus={() => handleError(null,'age')}
          onChangeText={(text) => handleOnchange(text, 'age')}
          error={errors.age}
          stylesContainer={{marginBottom: heightScreen * 0.02, alignSelf: 'center'}}
          stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
          editable={edit}
          stylesErrorPointer={{marginTop:0}}
          stylesErrorContainer={{marginTop:0}}
        />
        <Input
          title={'Body Fat (%)'}
          value={inputs.bodyfat}
          keyboardType='numeric'
          onFocus={() => handleError(null,'bodyfat')}
          onChangeText={(text) => handleOnchange(text, 'bodyfat')}
          error={errors.bodyfat}
          stylesContainer={{marginBottom: heightScreen * 0.02, alignSelf: 'center'}}
          stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
          editable={edit}
          stylesErrorPointer={{marginTop:-5}}
          stylesErrorContainer={{marginTop:-5}}
        />
        <Text style={styles.titleAc}>Activity Level</Text>
        <DropDownPicker
          open={open}
          value={valueAc}
          items={activity}
          setOpen={setOpen}
          setValue={setValueAc}
          enableOnAndroid={true}
          dropDownDirection='TOP'
          style={[styles.dropdown, {backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE}]}
          containerStyle={{
            width: widthScreen * 0.85,
            alignSelf: 'center',
            height: heightScreen * 0.05,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
          }}
          textStyle={{marginLeft:2,fontSize: 17, fontWeight:'bold' , color: theme == 'dark' ? colors.WHITE : colors.BG}}
          listItemContainerStyle={{
            borderRadius: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            width: widthScreen * 0.85,
          }}
          arrowIconStyle={{
            tintColor: theme == 'dark' ? colors.WHITE : colors.BG,
          }}
          dropDownContainerStyle={{
            marginTop: heightScreen * 0.002,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
            borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
            borderWidth: 0.5,
          }}
          disabled={!edit}
          theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
        />
        <Text style={[styles.titleAc, {marginTop:heightScreen * 0.025}]}>Weight Goal</Text>
        <DropDownPicker
          open={openGW}
          value={valueWg}
          items={weightgoal}
          setOpen={setOpenGW}
          setValue={setValueWg}
          dropDownDirection='TOP'
          enableOnAndroid={true}
          style={[styles.dropdown, {backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE}]}
          containerStyle={{
            width: widthScreen * 0.85,
            alignSelf: 'center',
            height: heightScreen * 0.05,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
          }}
          textStyle={{marginLeft:2,fontSize: 17, fontWeight:'bold' , color: theme == 'dark' ? colors.WHITE : colors.BG}}
          listItemContainerStyle={{
            borderRadius: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            width: widthScreen * 0.85,
          }}
          arrowIconStyle={{
            tintColor: theme == 'dark' ? colors.WHITE : colors.BG,
          }}
          dropDownContainerStyle={{
            marginTop: heightScreen * 0.002,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
            borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
            borderWidth: 0.5,
          }}
          disabled={!edit}
          listMode = "SCROLLVIEW"
          theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
        />
        <Text style={[styles.titleAc, {marginTop:heightScreen * 0.025}]}>Macro Nutrients</Text>
        <DropDownPicker
          open={openM}
          value={valueM}
          items={macronutrient}
          setOpen={setOpenM}
          setValue={setValueM}
          enableOnAndroid={true}
          style={[styles.dropdown, {backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE}]}
          containerStyle={{
            width: widthScreen * 0.85,
            alignSelf: 'center',
            height: heightScreen * 0.05,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
          }}
          textStyle={{marginLeft:2,fontSize: 17, fontWeight:'bold' , color: theme == 'dark' ? colors.WHITE : colors.BG}}
          listItemContainerStyle={{
            borderRadius: 20,
            borderBottomWidth: 1,
            borderBottomColor: 'gray',
            width: widthScreen * 0.85,
          }}
          arrowIconStyle={{
            tintColor: theme == 'dark' ? colors.WHITE : colors.BG,
          }}
          dropDownContainerStyle={{
            marginTop: heightScreen * 0.002,
            backgroundColor: theme == 'dark' ? colors.BG : colors.WHITE,
            borderColor: theme == 'dark' ? colors.WHITE : colors.BG,
            borderWidth: 0.5,
          }}
          disabled={!edit}
          listMode = "SCROLLVIEW"
          theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
        />
        {edit?<Button
          title={'Update'}
          buttonStyle={{
            backgroundColor: colors.MAIN,
            height: heightScreen * 0.055,
            width: widthScreen * 0.8,
            alignSelf: 'center',
            borderRadius: 20,
            marginTop: heightScreen * 0.03,
          }}
          titleStyle={{
            fontSize: 20,
            fontWeight: 'bold',
          }}
          onPress={handleUpdate}
        />:null}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default UpdateBMI

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
    justifyContent: 'space-between',
    marginHorizontal: widthScreen * 0.05,
    marginBottom: heightScreen * 0.03,
  },
  containerInput: {
    marginVertical: widthScreen * 0.05,
    marginHorizontal: widthScreen * 0.05,
    width: widthScreen * 0.9,
  },
  titleAc: {
    fontWeight: 'bold',
    fontSize: 11,
    paddingLeft: widthScreen *0.02,
    marginVertical: heightScreen * 0.005,
    color: colors.MAIN,
    marginLeft: widthScreen * 0.085,
  },
  dropdown: {
    width: widthScreen * 0.85,
    alignSelf: 'center',
    borderWidth: 0,
    borderBottomWidth: 0.5,
    borderBottomColor: 'gray',
  },
})