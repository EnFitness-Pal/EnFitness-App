import {FlatList, Keyboard, RefreshControl, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, regexMin, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import { SearchBar } from '@rneui/themed'
import IconBottom from '../../assets/fonts'
import Lottie from 'lottie-react-native';
import { getAllExercise } from '../../api/Exercise'
import Modal from 'react-native-modal';
import Exercise from '../../components/Exercise'
import { trackingExercise } from '../../api/Tracking'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { getPerson } from '../../api/Person/GetPerson'
import { AuthContext } from '../../context/AuthContext'


const ExerciseCategories = ({ navigation }) => {
  const [data, setData] = useState([]);
  const [dataEx,setDataEx] = useState([])
  const [loading, setLoading] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [loadingModal, setLoadingModal] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  const [onSuccess, setOnSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [itemEx, setItemEx] = useState(null);
  const [search, setSearch] = useState("");

  const searchFilterFunction = async (text) => {
        setSearch(text);
        setLoading(true);
        await getAllExercise(text)
            .then((response) => {
                setDataEx(response?.data?.Data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
             });
  }
  useEffect(() => { 
    console.log('effect');
    console.log('effect page number', pageNumber);
    getExercises();
    return () => { }
  }, [search]);

  const getExercises = async () => {
      setLoading(true);
       await getAllExercise(search)
          .then((response) => {
              setData(response.data?.Data);
              setLoading(false);
          })
          .catch((error) => {
              setLoading(false);
              console.log(error);
          });
  }


  const authContext = useContext(AuthContext);

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

  const renderItem = ({ item, index }) => { 
    return (
      <Exercise 
        item={item}
        index={index}
        onPress={() => {
          setItemEx(item);
          setModalVisible(!isModalVisible)
        }} />
    )
  };
  const renderFooter = () => {
    return (
          loading ?
            <Lottie
                source={require('../../assets/lottie/8707-loading.json')}
                autoPlay
                loop
                style={{width: widthScreen * 0.4, width: widthScreen * 0.4, alignSelf: 'center'}}
            />: null
        )
    }


  return (
    <SafeAreaView style = {styles.container}>
      <View style = {styles.containerHeader}>
          <ButtonBack
              name='chevron-back'
              size={28}
              onPress={() => navigation.goBack()}
          />
          <Text style = {{fontSize: 18, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.12}}>Exercise Categories</Text>
      </View>
      <View style = {styles.containerSearch}>
        <SearchBar
            placeholder="Search your favorites..."
            onChangeText={searchFilterFunction}
            // onChangeText={(text) => setSearch(text)}
            value={search}
            platform="ios"
            containerStyle={{
                backgroundColor: colors.BG,
                borderTopWidth: 0,
                borderBottomWidth: 0,
                height: heightScreen * 0.08,
        
            }}
            inputContainerStyle={{
                backgroundColor: colors.WHITE,
                height: heightScreen * 0.06,
                borderRadius: 20,
                // borderBottomLeftRadius: search !== ""? 0 : 20,
                // borderBottomRightRadius: search !== ""? 0 : 20,
            }}
            inputStyle={{
                fontSize: 16,
                color: colors.BG,
            }}
            searchIcon={() => {
                return (
                    <IconBottom
                        name='search'
                        size={28}
                        color={colors.MAIN}
                    />
                )
            }}
            autoFocus={true}
            showLoading={loading}
        />
      </View>
      <View style={styles.containerListItem}>
          <FlatList
            data={search === '' ? data : dataEx}
            // data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
          />
        </View>
          <Modal 
            animationIn="zoomIn"
            animationOut="zoomOut"
            animationInTiming={800}
            isVisible={isModalVisible}>
        <View style={styles.modal}>
            {loadingModal ? <Lottie
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
              {onSuccess?<Lottie 
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
    </SafeAreaView>
  )
}

export default ExerciseCategories

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors .BG,
  },
  containerHeader: {
    flexDirection: 'row',
    marginHorizontal: widthScreen * 0.05,
    alignItems: 'center',
  },
  containerSearch: {
    marginTop: heightScreen * 0.01,
    marginHorizontal: widthScreen * 0.04,
  },
  containerListItem: {
    flex:1,
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