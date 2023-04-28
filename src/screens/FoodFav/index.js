import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import { useDispatch, useSelector } from 'react-redux';
import { getAllFoodFav } from '../../redux/action/favorites/foodRequests';
import { AuthContext } from '../../context/AuthContext';
import { getRecipesByIDs } from '../../api/Recipes';
import FoodRecipe from '../../components/FoodRecipe';
import { SafeAreaView } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AnimatedLottieView from 'lottie-react-native';

const FoodFav = ({navigation}) => {
  const authContext = useContext(AuthContext);
  const dispatch = useDispatch();
  const foodIds = useSelector((state) => state.food.foodIds);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const getAllFood = async () => { 
    setLoading(true);
    await getAllFoodFav(dispatch, authContext?.userID);
    setLoading(false);
  }

  useFocusEffect(
    useCallback(() => { 
    getAllFood();
    setTimeout(() => setLoading(false), 1000)
  }, [navigation]));

  const renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <FoodRecipe
                    item={item} index={index} />
            </View>
        )
    }

  return (
    <SafeAreaView style = {styles.container}>
    <View style={[styles.containerBody,{ marginHorizontal: foodIds?.length !== 1 ? 0: widthScreen * 0.05, alignItems: foodIds?.length !== 1 ? 'center': null}]}>
    {loading ? <AnimatedLottieView
          source={require('../../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150, alignSelf: 'center', marginTop: heightScreen * 0.07 }}
        /> :
          <FlatList
            numColumns={2}
            data={foodIds}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            maxToRenderPerBatch={10}
            windowSize={10}
            updateCellsBatchingPeriod={10}
            
        />}
    </View>
    </SafeAreaView>
  )
}

export default FoodFav

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerBody: {
        flex: 1,
        marginTop: heightScreen * 0.02,
    },
    containerItem: {
        marginVertical: heightScreen * 0.012,
        marginHorizontal: widthScreen * 0.015,
    },
})