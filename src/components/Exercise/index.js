import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import FastImage from 'react-native-fast-image'
import { Button } from '@rneui/themed'
import { AuthContext } from '../../context/AuthContext'
import { addFav, deleteFav } from '../../redux/action/favorites/favRequests'
import { useDispatch, useSelector } from 'react-redux'

const Exercise = ({ item, index, onPress}) => {
    const [isCheck, setIsCheck] = useState(false);
    const [favID, setFavID] = useState(null);
    const authContext = useContext(AuthContext);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const favorites = useSelector((state) => state.favorite.favorite);
    const checkFav = () => { 
        favorites.forEach(element => {
            if(element?.Id === item?.Id) {
                setIsCheck(true);
                setFavID(element?.UserFavoritesId);
            }
        });
    }    

    const handleAddFav = async () => { 
        setLoading(true);
        await addFav(dispatch, authContext?.userID, item?.Id)
        .then((res) => {
            setIsCheck(true);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
            setLoading(false);
        });
    }

    const handleRemoveFav = async () => {
        setLoading(true);
        await deleteFav(dispatch,favID)
        .then(async (res) => {
            setIsCheck(false);
            setLoading(false);
        })
        .catch((err) => {
            setLoading(false);
        });
    }
    useEffect(() => {
        checkFav();
     }, [isCheck])
  return (
    <View style = {styles.container}>
        <View style = {styles.containerImage}>
            <FastImage
                style = {{height: heightScreen * 0.13, width: widthScreen * 0.25, borderRadius: 20}}
                source = {{uri: item?.Image}}
                resizeMode={FastImage.resizeMode.cover}
            />
        </View>
        <View style = {styles.containerBody}>
              <Text style={styles.title}>{ item?.Name }</Text>
              <Text style={styles.categories}>{item?.Categories}</Text>
            <View style = {styles.containerCalories}>
                  <Text style={styles.calories}>{item?.Calories} kcal/m</Text>
            </View>
        </View>
        <View style = {styles.containerButton}>
            <Button
                type = 'solid'
                buttonStyle = {{
                    backgroundColor: colors.MAIN,
                    borderRadius: 10,
                    height: widthScreen * 0.1,
                    width: widthScreen * 0.1,
                    marginVertical: heightScreen * 0.01,
                }}
                icon={{
                    name: 'add',
                    size: 30,
                    color: colors.WHITE,
                    type: 'material',
                }}
                iconContainerStyle={{
                    height: widthScreen * 0.1,
                    width: widthScreen * 0.1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                onPress={onPress}
                loadingProps={{ size: "small", color: colors.BG }}
              />
            <Button
                type = 'solid'
                buttonStyle = {{
                    backgroundColor: colors.MAIN,
                    borderRadius: 10,
                    height: widthScreen * 0.1,
                    width: widthScreen * 0.1,
                    marginHorizontal: heightScreen * 0.01,
                }}
                icon={{
                    name: isCheck? 'ios-heart': 'heart-outline',
                    size: 30,
                    color: colors.WHITE,
                    type: 'ionicon',
                }}
                iconContainerStyle={{
                    height: widthScreen * 0.1,
                    width: widthScreen * 0.1,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
                loading={loading}
                  onPress={() => {
                    if (isCheck) {
                        handleRemoveFav? handleRemoveFav(favID): null;
                    } else {
                        handleAddFav ? handleAddFav(item?.Id):null;
                    }
                }}
              />
        </View>
    </View>
  )
}

export default React.memo(Exercise)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#303030',
        height: heightScreen * 0.17,
        width: widthScreen * 0.9,
        borderRadius: 20,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginVertical: heightScreen * 0.01,
        alignSelf: 'center',
        padding: 15,

    },
    containerImage: {
        height: heightScreen * 0.15,
        width: widthScreen * 0.27,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    containerBody: {
        height: heightScreen * 0.15,
        width: widthScreen * 0.32,
        padding: 20,
        justifyContent: 'space-between',
        paddingVertical: heightScreen * 0.016,
    },
    title: {
        width: widthScreen * 0.4,
        fontSize: 15,
        fontFamily: 'Poppins-Bold',
        fontWeight: 'bold',
        color: colors.WHITE,
        lineHeight: 30,
    },
    categories: {
        fontSize: 13,
        width: widthScreen * 0.25,
        fontFamily: 'Poppins-Bold',
        fontWeight: '500',
        color: colors.WHITE,
        opacity: 0.5,
    },
    containerCalories: {
        height: heightScreen * 0.03,
        width: widthScreen * 0.25,
        backgroundColor: '#494949',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    calories: {
        fontSize: 12,
        fontFamily: 'Poppins-Medium',
        fontWeight: '700',
        color: colors.WHITE,
    },
    containerButton: {
        flexDirection: 'row',
        height: heightScreen * 0.05,
        width: widthScreen * 0.2,
        justifyContent: 'center',
        alignItems: 'center',
    }
})