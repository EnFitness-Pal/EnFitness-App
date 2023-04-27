import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { AuthContext } from '../../context/AuthContext';
import { getAllWorkoutFav } from '../../api/Favorites';
import WorkoutItem from '../../components/WorkoutItem';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';
import Button from '../../components/Button';
const WorkoutFav = ({navigation}) => {
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [buttonPress, setButtonPress] = useState('Beginner');
    const getWorkoutFav = async () => { 
        setLoading(true)
        await getAllWorkoutFav(authContext?.userID, buttonPress)
        .then((res) => {
            setData(res.data?.Workout);
            setLoading(false)
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        })
    }
    useFocusEffect(
        useCallback(() => {
            getWorkoutFav();
            setTimeout(() => setLoading(false),1000)
        }, [buttonPress, navigation]));
    return (
        <View style={styles.container}>
            <View style = {styles.containerFilter}>
                <Button
                    title={'Beginner'}
                    stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor:buttonPress === 'Beginner' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Beginner')}}
                />       
                <Button
                    title={'Intermediate'}
                    stylesContainer={{width:widthScreen * 0.28, height: heightScreen * 0.035, backgroundColor: buttonPress === 'Intermediate' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Intermediate')}}
                /> 
                <Button
                    title={'Advanced'}
                    stylesContainer={{width:widthScreen * 0.28,height: heightScreen * 0.035, backgroundColor: buttonPress === 'Advanced' ? colors.MAIN : colors.GRAYDARK}}
                    stylesTitle={{color: colors.WHITE, fontSize: 13, fontWeight: 'bold', textAlign: 'center'}}
                    onPress={() => {setButtonPress('Advanced')}}
                /> 
            </View>
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
                        <WorkoutItem item={item}/>
                    </View>
                )}
            />

            }
        </View>
    )
}

export default WorkoutFav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerFilter: {
        height: heightScreen * 0.035,
        width: widthScreen * 0.84,
        borderRadius: 32,
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: heightScreen * 0.02,
        backgroundColor: colors.GRAYDARK,
    },
    containerItem: {
        marginVertical: heightScreen * 0.012,
    }
})