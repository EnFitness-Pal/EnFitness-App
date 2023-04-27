import { ActivityIndicator, FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { SearchBar } from '@rneui/base';
import IconBottom from '../../assets/fonts';
import ButtonBack from '../../components/ButtonBack';
import Button from '../../components/Button';
import Lottie from 'lottie-react-native';
import WorkoutItem from '../../components/WorkoutItem';
import { getRandomWorkout, getWorkoutCategories } from '../../api/Workout';

const WorkoutCategories = ({navigation}) => {
    const [data, setData] = useState([]);
    const [buttonPress, setButtonPress] = useState('Beginner');
    const [search, setSearch] = useState("");
    const [itemSearch, setItemSearch] = useState(0);
    const [pageNumber, setPageNumber] = useState(1)
    const [loading, setLoading] = useState(false);
    const searchFilterFunction = (text) => {
        setSearch(text);
        setData([]);
        setLoading(true);
        setPageNumber(1);
        getWorkoutCategories(1, buttonPress, text)
            .then((response) => {
                console.log('TotalRecords', response?.data.TotalRecords)
                setData(response?.data.Data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
             });
    }

    const getWorkout = async () => { 
        await getRandomWorkout(pageNumber, buttonPress)
        .then((response) => { 
            setData(data.concat(response?.data.Data));
            setLoading(false);
        })
        .catch((error) => {
            console.log(error);
        })
    }
    useEffect(() => {
        console.log('effect');
        console.log('effect page number', pageNumber);    
        setLoading(true);
        if (search === "") {
            getWorkout();
        } else { 
            getWorkoutCategories(pageNumber, buttonPress, search)
            .then((response) => {
                setData(data.concat(response?.data.Data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
             });    
        }
    }, [buttonPress, pageNumber]);
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <WorkoutItem
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
    const handleLoadMore = () => { 
        console.log('handleLoadMore');
        setPageNumber(pageNumber + 1);
        setLoading(true);
        getWorkout();
    }

    const handleLoadMoreSearch = () => { 
        console.log('handleLoadMoreSearch');
        setPageNumber(pageNumber + 1);
        setLoading(true);
        getWorkoutCategories(pageNumber, buttonPress, search)
            .then((response) => {
                setData(data.concat(response?.data.Data));
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
             });
    }
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
                onChangeText={searchFilterFunction}
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
                setData([]);
            }}
        />       
        <Button
            title={'Intermediate'}
            stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor: buttonPress === 'Intermediate' ? colors.MAIN : colors.GRAYDARK}}
            stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
            onPress={() => {
                setButtonPress('Intermediate')
                setPageNumber(1);
                setData([]);
            }}
        /> 
        <Button
            title={'Advanced'}
            stylesContainer={{width:widthScreen * 0.28,height: heightScreen * 0.035, backgroundColor: buttonPress === 'Advanced' ? colors.MAIN : colors.GRAYDARK}}
            stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
            onPress={() => {
                setButtonPress('Advanced');
                setPageNumber(1);
                setData([]);
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
            onEndReached={search === ''? handleLoadMore : handleLoadMoreSearch}
            onEndReachedThreshold={0.1}
            maxToRenderPerBatch={10}
            initialNumToRender={10}
            removeClippedSubviews={true}
            windowSize={10}
            updateCellsBatchingPeriod={10}
            
        />
    </View>
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