import { Alert, Animated, Keyboard, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux';
import { colors, heightScreen, widthScreen } from '../../utility';
import ButtonBack from '../../components/ButtonBack';
import FastImage from 'react-native-fast-image';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Input from '../../components/Input';
import DropDownPicker from 'react-native-dropdown-picker';
import { BottomSheet, Button } from '@rneui/base';
import { AuthContext } from '../../context/AuthContext';
import { AxiosContext } from '../../context/AxiosContext';
import ImagePicker from 'react-native-image-crop-picker'
import storage from '@react-native-firebase/storage'
import ReactNativeModal from 'react-native-modal';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const UpdateProfile = ({ navigation }) => {
  const headerMotion = useRef(new Animated.Value(0)).current;
  const theme = useSelector(state => state.state.theme);
  const authContext = useContext(AuthContext);
  const axiosContext = useContext(AxiosContext);
  const [loading, setLoading] = useState(false);
  const [isVisible, setVisible] = useState(false);
  const [isVisibleModal,setVisibleModal] = useState(false);
  const [isVisibleImage, setIsVisibleImage] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [transferred, setTransferred] = useState(0);
  const [gender, setGender] = useState([
    {label: 'Male', value: 'male'},
    {label: 'Female', value: 'female'}
  ]); 
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(axiosContext?.person?.Sex == true ? 'male' : 'female');
  const [edit, setEdit] = useState(false);
  const [errors, setErrors] = useState({});
  const [image, setImage] = useState(null);
  const [inputs, setInputs] = useState({
    image: axiosContext?.person?.Avatar,
    name: axiosContext?.person?.FullName,
    email: axiosContext?.person?.EmailAddress,
    description: axiosContext?.person?.Description,
  });


  const handleOnchange = (text, input) => {
      setInputs(prevState => ({...prevState, [input]: text}));
  };
  const handleError = (error, input) => {
      setErrors(prevState => ({...prevState, [input]: error}));
  };

  const handleEdit = () => { 
    setEdit(!edit);
  }


  const uploadImage = async () => {
    const uploadUri = image;
    let filename = uploadUri.substring(uploadUri.lastIndexOf('/') + 1);
    const extension = filename.split('.').pop(); 
    const name = filename.split('.').slice(0, -1).join('.');
    filename = name + Date.now() + '.' + extension;
    setUploading(true);
    setTransferred(0);
    const storageRef = storage().ref(`avatars/${filename}`);
    const task = storageRef.putFile(uploadUri);

    task.on('state_changed', (taskSnapshot) => {
      console.log(
        `${taskSnapshot.bytesTransferred} transferred out of ${taskSnapshot.totalBytes}`,
      );

      setTransferred(
        Math.round(taskSnapshot.bytesTransferred / taskSnapshot.totalBytes) *
          100,
      );
    });

    try {
      await task;

      const url = await storageRef.getDownloadURL();

      setUploading(false);
      setImage(null);
      return url;

    } catch (e) {
      console.log(e);
      return null;
    }

  };

  const handleChoosePhoto = () => { 
    setVisible(true);
  };

  const handleUpdate = async () => { 
    Keyboard.dismiss();
    let isValid = true;
    if (!inputs.name) {
      handleError('Name is a required field.', 'name');
      isValid = false;
    } else if(inputs.name.length < 3) {
        handleError('Name must be at least 3 characters.', 'name');
        isValid = false;
    }
    if (!inputs.description) {
        handleError('Description is a required field.', 'description');
        isValid = false;
    } else if(inputs.description.length < 3) {
        handleError('Description must be at least 3 characters.', 'description');
        isValid = false;
    }
    if (isValid) {
      if (image == null) {
        setLoading(true);
        await axiosContext?.updatePerson(
          authContext?.userID,
          inputs.name,
          axiosContext?.person?.Avatar,
          axiosContext?.person?.Age,
          value == "male" ? true : false,
          inputs.description,
          axiosContext?.person?.Height,
          axiosContext?.person?.Weight,
          axiosContext?.person?.BodyFat,
          axiosContext?.person?.ActivityLevel,
          axiosContext?.person?.WeightGoal,
          axiosContext?.person?.MacroNutrients,
        ).then((response) => {
          setLoading(false);
          setEdit(!edit);
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
          );
        }).catch((error) => {
          console.log(error);
          setLoading(false);
          setEdit(!edit);
          Alert.alert(
            'Error!',
            'Something went wrong. Please try again later.'
          );
        });
      }
      else {
        setVisibleModal(true)
        setLoading(true)
        const imageUrl = await uploadImage();
        await axiosContext?.updatePerson(
          authContext?.userID,
          inputs.name,
          imageUrl,
          axiosContext?.person?.Age,
          value == "male" ? true : false,
          inputs.description,
          axiosContext?.person?.Height,
          axiosContext?.person?.Weight,
          axiosContext?.person?.BodyFat,
          axiosContext?.person?.ActivityLevel,
          axiosContext?.person?.WeightGoal,
          axiosContext?.person?.MacroNutrients,      
        )
        .then((response) => {
          setVisibleModal(false);
          setLoading(false);
          setEdit(!edit);
          Alert.alert(
            'Profile Updated!',
            'Your profile has been updated successfully.'
          );
        })
        .catch((error) => {
          console.log(error);
          setEdit(!edit);
          setVisibleModal(false);
          setLoading(false);
          Alert.alert(
            'Error!',
            'Something went wrong. Please try again later.'
          );
        });
      }

    }
  };
  console.log(isVisibleImage)
  const animatedKeyBoard = (motion, value, duration) => {
    Animated.timing(
          motion,
          {
              toValue:value,
              duration: duration,
              speed: Platform.OS == 'ios'? 60 : 50,
              useNativeDriver:false
              
          }
      ).start();
  }
  // hanlde to avoid view when showing key board
  useEffect(()=> {
      const SHOW_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow'
      const HIDE_KEYBOARD_EVENT = Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide'
      const showSubscription = Keyboard.addListener(SHOW_KEYBOARD_EVENT,() =>{
          animatedKeyBoard(headerMotion, heightScreen * -0.27, 400);
      })
      const hideSubscription = Keyboard.addListener(HIDE_KEYBOARD_EVENT, () => {
          animatedKeyBoard(headerMotion, 0, 400);
      })
      return () => {
          showSubscription.remove()
          hideSubscription.remove();
      }
      
  },[]);

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then((image) => {
      console.log(image);
      const imageUri = image.path;
      setImage(imageUri);
      setInputs({...inputs, image: imageUri});
      setVisible(false)
      axiosContext?.getPersonStack(authContext?.userID);
    });
  };

  return (
    <SafeAreaView style = {theme == 'dark' ? styles.container: styles.containerlight} onTouchStart={()=>setOpen(false)}>
    <ScrollView>
      <Animated.View style = {[styles.containerHeader, {marginTop: headerMotion}]}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name='chevron-back'
        />
        <Text style={{
          fontSize: 20,
          fontWeight: 'bold',
          color: theme == 'dark' ? colors.WHITE : colors.BG,
          alignSelf: 'center',
        }}>Update Profile</Text>
        <ButtonBack
          onPress={handleEdit}
          name='pencil'
          styleButton={{backgroundColor: edit? colors.MAIN: colors.BACK}}
        />
      </Animated.View>
    <View style = {[styles.containerImage]}>
      <FastImage
        style={{height: widthScreen * 0.26, width: widthScreen * 0.26, borderRadius: 60,}}
        source={{uri: inputs?.image}}
        />        
      {edit?<TouchableOpacity onPress={handleChoosePhoto} style={styles.buttonCamera}>
        <Ionicons 
          name='camera-outline' 
          color={'white'}
          size={20} 
        />
      </TouchableOpacity>:null}
    </View>
    <Text
        numberOfLines={1}
        style={[styles.titleName,
        { color: theme == 'dark' ? colors.WHITE : colors.BG }]}
      >{inputs.name}</Text>
    <View style = {styles.containerInput}>
      <Input
        title={'Full Name'}
        placeholder='Name'
        value={inputs.name}
        onFocus={() => handleError(null,'name')}
        onChangeText={(text) => handleOnchange(text, 'name')}
        error={errors.name}
        stylesContainer={{ alignSelf: 'center'}}
        stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
        editable={edit}
        stylesErrorPointer={{marginTop:-5}}
        stylesErrorContainer={{marginTop:-5}}
        />
      <Input
        title={'Email'}
        placeholder='Email'
        value={inputs.email}
        onFocus={() => handleError(null,'email')}
        onChangeText={(text) => handleOnchange(text, 'email')}
        error={errors.email}
        stylesContainer={{marginVertical: heightScreen * 0.02 ,alignSelf: 'center'}}
        stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG }}
        editable={false}
        />
        <Text style={styles.titleGender}>Gender</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={gender}
          setOpen={setOpen}
          setValue={setValue}
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
        <Input
          title={'Description'}
          placeholder='Description'
          value={inputs.description}
          onFocus={() => handleError(null,'description')}
          onChangeText={(text) => handleOnchange(text, 'description')}
          error={errors.description}
          stylesContainer={{marginVertical: heightScreen * 0.025 ,alignSelf: 'center'}}
          stylesInput={{ color: theme == 'dark' ? colors.WHITE : colors.BG, }}
          editable={edit}
          stylesErrorPointer={{marginTop:-5}}
          stylesErrorContainer={{marginTop:-5}}
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
    </View>
    </ScrollView>
    <BottomSheet
      isVisible={isVisible}
      containerStyle={styles.containerBottomSheet}
      backdropStyle={{ backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)' }}
      modalProps={{ animationType: 'fade' }}
      onBackdropPress={() => setVisible(false)}
      theme={theme == 'dark' ? 'DARK' : 'LIGHT'}
    >
      <View style={[styles.bottomSheet, { backgroundColor: theme == 'dark'? colors.WHITE: colors.BACK}]}>
        <TouchableOpacity 
        onPress={()=>{
          setVisible(false);
          setIsVisibleImage(true)}}
        style = {styles.buttonOptions}>
          <View style = {{backgroundColor:colors.GRAYDARK, padding:7, borderRadius:20}}>
          <Ionicons name='ios-person-circle-outline' size={28} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>See profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonOptions}
          onPress = {choosePhotoFromLibrary}
        >
          <View style = {{backgroundColor:colors.GRAYDARK, padding:8, borderRadius:20}}>
          <Ionicons name='ios-images' size={26} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>Select Profile Picture</Text>
        </TouchableOpacity>
        <TouchableOpacity style = {styles.buttonOptions}
          onPress = {() => setVisible(false)}
        >
          <View style = {{backgroundColor:colors.GRAYDARK, padding:8, borderRadius:20}}>
          <Ionicons name='ios-caret-down-circle' size={26} color={colors.WHITE} />
          </View>
          <Text style = {styles.textOptions}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </BottomSheet>
    <ReactNativeModal
      isVisible = {isVisibleModal}
    >
      <View style = {styles.modalSuccess}>
      <AnimatedCircularProgress
        rotation={0}
        size={120}
        width={10}
        lineCap="round"
        fill={transferred}
        tintColor="#1CD760"
        children={() => {
          return (
            <View style = {styles.containerLoading}>
            <Text style={styles.textLoading}>{transferred}%</Text>
            <Text style = {styles.textLoad}>Loading</Text>
            </View>
          )
        }}
        onAnimationComplete={() => console.log('onAnimationComplete')}
        backgroundColor={colors.BACK} />
      </View>
    </ReactNativeModal>
    <ReactNativeModal
      isVisible={isVisibleImage}
    >
      <View style = {styles.containerModalImage}>
        <TouchableOpacity
          onPress={() => setIsVisibleImage(!isVisibleImage)}
        >
        <Ionicons
          name={'ios-close-circle'}
          size={28}
          color={colors.WHITE}
          style = {{marginTop:heightScreen * 0.07, marginLeft:widthScreen * 0.9}}
        />
        </TouchableOpacity> 
        <FastImage
          source={{uri: inputs?.image}}
          style={{flex: 1, marginBottom:heightScreen * 0.07}}
          resizeMode={FastImage.resizeMode.contain}
        />
      </View>
    </ReactNativeModal>
    </SafeAreaView>
  )
}

export default UpdateProfile

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  containerlight: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  containerHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: widthScreen * 0.05,
  },
  containerImage: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: widthScreen * 0.1,
  },
  buttonCamera: {
    backgroundColor: colors.MAIN,
    width: widthScreen * 0.07,
    height: heightScreen * 0.033,
    borderRadius: 20,
    marginTop: -10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  titleName: {
    fontSize: 25,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: heightScreen * 0.02,
  },
  containerInput: {
    marginTop: heightScreen * 0.02,
  },
  titleGender: {
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
  bottomSheet: {
    backgroundColor: colors.WHITE,
    height: heightScreen * 0.3,
    width: widthScreen,
    alignSelf: 'center',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingLeft: widthScreen * 0.08,
    paddingTop: widthScreen * 0.08,
  },
  buttonOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: heightScreen * 0.03,
  },
  textOptions: {
    fontSize: 18,
    fontWeight: '500',
    marginLeft: widthScreen * 0.04,
  },
  containerBottomSheet: {
    backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)',
    height: heightScreen,
    width: widthScreen,
    alignSelf: 'center',
  },
  modalSuccess: {
    height: heightScreen * 0.3,
    width: widthScreen * 0.7,
    backgroundColor: colors.BG,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius:20
  },
  textLoading: {
    fontSize: 22,
    fontWeight: '600',
    color: '#1CD760'
  },
  containerLoading: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  textLoad: {
    marginTop:5,
    fontSize: 14,
    fontWeight: '600',
    color: '#1CD760'
  },
  containerModalImage:{
    width: widthScreen,
    height: heightScreen,
    right:widthScreen * 0.05,
    backgroundColor:colors.BG,
  }
})