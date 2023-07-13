import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { SearchBar } from '@rneui/base';
import IconBottom from '../../assets/fonts';
import ButtonBack from '../../components/ButtonBack';
import Button from '../../components/Button';
import Lottie from 'lottie-react-native';
import WorkoutItem from '../../components/WorkoutItem';
import { getRandomWorkout, getWorkoutCategories } from '../../api/Workout';
import { AxiosContext } from '../../context/AxiosContext';
import ModalPre from '../../components/Modal';
import { useFocusEffect } from '@react-navigation/native';
import { AuthContext } from '../../context/AuthContext';
import { useSelector } from 'react-redux';

const WorkoutCategories = ({navigation}) => {
    const [data, setData] = useState([]);
    const axiosContext = useContext(AxiosContext);
    const authContext = useContext(AuthContext);
    const person  = axiosContext?.person;
    const [buttonPress, setButtonPress] = useState('Beginner');
    const [modalPre, setModalPre] = useState(false);
    const [search, setSearch] = useState("");
    const [newData, setNewData] = useState([]);
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false);

    const getWorkout = async (filter,page,setDataFunc) => {
        setLoading(true)
        await getRandomWorkout(page, filter)
        .then((response) => { 
            setDataFunc(response?.data.Data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const getWorkoutSearch = async (word, filter, page, setDataFunc) => {
        setLoading(true)
        await getWorkoutCategories(page,filter, word)
        .then((response) => { 
            setDataFunc(response?.data.Data);
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
            setLoading(false);
        })
    }

    const searchFilterFunction = (text) => {
        setLoading(true);
        getWorkoutSearch(text,buttonPress,1,setData)
    }

    useFocusEffect(
      useCallback(() => {
            axiosContext?.getPersonStack(authContext?.userID)
      }, [navigation]));

      useEffect(() => {
        getWorkout(buttonPress,1,setData);
      }, [buttonPress]);
      const handleLoadMore = () => {
        if (loading || data.length === 0) {
          return;
        }
        setPageNumber(prevPage => prevPage + 1);
      };
    const premium = useSelector((state) => state.premium.premium);
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <WorkoutItem
                    onPress={() => {
                        if (item?.IsPremium) {
                            if (person?.IsPremium === false || (premium?.ExpirationDate < new Date().toISOString())) {
                                setModalPre(true);
                                return;
                            } else if (person?.IsPremium === true && (premium?.ExpirationDate > new Date().toISOString())) {
                                navigation.push('WorkoutDetail', {
                                    item: item
                                })
                            }
                        }
                        else { 
                            navigation.push('WorkoutDetail', {
                                item: item
                            })
                        }
                }}
                        item={item} index={index} />
            </View>
        )
    }
    const renderFooter = () => {
        return (
            <Lottie
                source={require('../../assets/lottie/8707-loading.json')}
                autoPlay
                loop
                style={{width: widthScreen * 0.4, width: widthScreen * 0.4, alignSelf: 'center'}}
            />
        )
    }


    useEffect(() => {
        if (pageNumber !== 1) {
          if (search !== '') {
            setLoading(true);
            getWorkoutSearch(search, buttonPress, pageNumber, setNewData);
          } else {
            setLoading(true);
            getWorkout(buttonPress, pageNumber, setNewData);
          }
        }
      }, [pageNumber]);
    
      useEffect(() => {
        setData(prevItems => [...prevItems, ...newData]);
      }, [newData]);
return (
    <SafeAreaView style = {styles.container}>
    <View style = {styles.containerHeader}>
        <ButtonBack
            name='chevron-back'
            size={28}
            onPress={() => navigation.goBack()}
        />
        <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.1}}>Workout Categories</Text>
    </View>
    <View style = {styles.containerSearch}>
    <SearchBar
                placeholder="Search your workout..."
                onChangeText={(text)=> {
                    setSearch(text);
                    setPageNumber(1)
                    searchFilterFunction(search)
                }}
                // onSubmitEditing={()=>searchFilterFunction(search)}
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
                showLoading={loading}
                onEndEditing={() => { console.log('onEndEditing') }}

    />
    </View>
    <View style = {styles.containerFilter}>
        <Button
            title={'Beginner'}
            stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor:buttonPress === 'Beginner' ? colors.MAIN : colors.GRAYDARK}}
            stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
            onPress={() => {
                setButtonPress('Beginner');
                setPageNumber(1);
            }}
        />       
        <Button
            title={'Intermediate'}
            stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor: buttonPress === 'Intermediate' ? colors.MAIN : colors.GRAYDARK}}
            stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
            onPress={() => {
                setButtonPress('Intermediate')
                setPageNumber(1);
            }}
        /> 
        <Button
            title={'Advanced'}
            stylesContainer={{width:widthScreen * 0.28,height: heightScreen * 0.035, backgroundColor: buttonPress === 'Advanced' ? colors.MAIN : colors.GRAYDARK}}
            stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
            onPress={() => {
                setButtonPress('Advanced');
                setPageNumber(1);
            }}
    /> 
    </View>
    <View style={styles.containerBody}>
        <FlatList
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.35}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews={true}
            windowSize={10}
            updateCellsBatchingPeriod={10}
            
        />
    </View>
    <ModalPre
        onPressButton={() => {
                setModalPre(false);
                navigation.navigate('PremiumScreen');
            }
        }
        onPressIgnore={() => setModalPre(false)}
            isVisible={modalPre} />
    </SafeAreaView>
)
}

export default WorkoutCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerSearch: {
        marginTop: heightScreen * 0.02,
        marginHorizontal: widthScreen * 0.032,
    },
    containerHeader: {
        flexDirection: 'row',
        marginHorizontal: widthScreen * 0.05,
        alignItems: 'center',
    },
    containerFilter: {
        height: heightScreen * 0.035,
        width: widthScreen * 0.84,
        borderRadius: 32,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightScreen * 0.012,
        backgroundColor: colors.GRAYDARK,
    },
    containerBody: {
        flex: 1,
        marginTop: heightScreen * 0.02,
        alignItems: 'center',
    },
    containerItem: {
        marginVertical: heightScreen * 0.012,
    }
})