import { FlatList, Keyboard, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useMemo, useState } from 'react'
import { colors, heightScreen, regexMin, widthScreen } from '../../utility'
import { AuthContext } from '../../context/AuthContext';
import { useFocusEffect } from '@react-navigation/native';
import { getAllExerciseFav } from '../../api/Favorites';
import Exercise from '../../components/Exercise';
import AnimatedLottieView from 'lottie-react-native';
import Modal from 'react-native-modal';
import Button from '../../components/Button';
import Input from '../../components/Input';
import { trackingExercise } from '../../api/Tracking';

const ExerciseFav = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [itemEx, setItemEx] = useState(null);
    const [loadingModal, setLoadingModal] = useState(false);
    const [isModalVisible, setModalVisible] = useState(false);
    const [onSuccess, setOnSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [minutes, setMinutes] = useState(null);    

    const getExerciseFav = async () => {
        setLoading(true);
        await getAllExerciseFav(authContext?.userID)
          .then((res) => {
            setData(res.data?.Exercise);
            setLoading(false);
        })
        .catch((err) => { 
            console.log(err.response.data);
            setLoading(false);
        })
    }
    const TrackingExercise = async (name,calo, min) => { 
        setLoadingModal(true);
        Keyboard.dismiss();
        if (!regexMin.test(min)) {
            setError('Please enter a valid minutes');
            setLoadingModal(false);
            return;
        } else if(min === null){
            setError('Please enter minutes');
            setLoadingModal(false);
            return;

        } else {
        await trackingExercise(authContext?.userID, name, calo, min)
            .then((response) => {
                setOnSuccess(true);
                setLoadingModal(false);
            }).catch((error) => { 
                console.log(error);
                console.log(error.response.data);
                setLoadingModal(false);
            });
    }
    };  
  
    useFocusEffect(
      useCallback(() => {
          getExerciseFav();
          setTimeout(() => setLoading(false),1000)
      }, [navigation]));
  
  return (
    <View style={styles.container}>
      {loading?
          <AnimatedLottieView
              source={require('../../assets/lottie/8707-loading.json')}
              autoPlay
              loop
              style={{ alignSelf: 'center', height: 150, width: 150 }}    
          /> :
          <FlatList
          showsVerticalScrollIndicator={false}
          style={{ marginTop:20, alignSelf: 'center' }}
          data={data}
          renderItem={({ item, index }) => (
              <View style={styles.containerItem}>
                  <Exercise item={item}
                      onPress={() => {
                        setItemEx(item);
                        setModalVisible(!isModalVisible)
                      }}
                />
              </View>
          )}
      />

      }
        <Modal 
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={800}
            isVisible={isModalVisible}>
        <View style={styles.modal}>
            {loadingModal ? <AnimatedLottieView
                source={require('../../assets/lottie/97930-loading.json')}
                autoPlay
                loop
                style={{ width: 50, height: 50, alignSelf: 'center' }}
                  /> :
            <View>
            {onSuccess? null:<Button
                title="X"
                stylesContainer={{width: widthScreen * 0.1, height: widthScreen * 0.1, backgroundColor: colors.BG, borderRadius: 20, alignSelf: 'flex-end'}}
                      onPress={() => {
                          setItemEx(null);
                          setModalVisible(!isModalVisible);
                      }}
                />}
              <Text style = {styles.textTracking}>{onSuccess? "Tracking Successfull!":"Enter the number of minutes."}</Text>
              {onSuccess?<AnimatedLottieView 
                source={require('../../assets/lottie/91001-success.json')} 
                autoPlay 
                loop ={false}
                duration={900}
                style={{height: 80, width: 80, marginVertical: heightScreen * 0.01, alignSelf: 'center'}}
              />
              :<Input
                placeholder="Minutes"
                placeholderTextColor={colors.GRAYLIGHT}
                keyboardType="numeric"
                onChangeText={(text) => setMinutes(text)}
                value={minutes}
                error={error}
                onFocus={() => setError('')}
                stylesContainer={{width: widthScreen * 0.4, alignSelf: 'center'}}
                  />}
              {onSuccess?
              <Button
                stylesContainer={styles.buttonModalSuccess}
                title="Continue Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          setItemEx(null);
                          setOnSuccess(false);
                          setModalVisible(!isModalVisible);

                      }} />
              :<Button
                stylesContainer={styles.buttonModal}
                title="Tracking"
                type="solid"
                buttonStyle={{
                  backgroundColor: colors.MAIN,
                  borderRadius: 20
                }}
                titleStyle={{fontFamily: 'Poppins-Bold', fontSize: 15, fontWeight: 'bold'}}
                      onPress={() => {
                          TrackingExercise(itemEx?.Name, Math.ceil(itemEx?.Calories), minutes);
                      }} />}
                
                </View>}</View>
        </Modal>
    </View>
  )
}

export default ExerciseFav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
  },
    containerItem: {
      marginVertical: heightScreen * 0.012,
  },
    modal: {
      alignSelf: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.BG,
      width: widthScreen * 0.7,
      height: heightScreen * 0.3,
      borderRadius: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    textTracking: {
      marginTop:heightScreen * 0.02,
      fontSize: 16,
      fontFamily: 'Poppins-Bold',
      fontWeight: 'bold',
      alignSelf: 'center',
      color: colors.MAIN,
    },
    buttonModal: {
      width: widthScreen * 0.3,
      height: heightScreen * 0.05,
      backgroundColor: colors.MAIN,
      borderRadius: 20,
      marginVertical: heightScreen * 0.03,
    },
    buttonModalSuccess: {
      width: widthScreen * 0.5,
      height: heightScreen * 0.05,
      backgroundColor: colors.MAIN,
      borderRadius: 20,
      marginVertical: heightScreen * 0.03, 
    }
})