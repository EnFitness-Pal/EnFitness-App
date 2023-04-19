import { FlatList, RefreshControl, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import { useNavigation } from '@react-navigation/native'
import { SearchBar } from '@rneui/themed'
import Lottie from 'lottie-react-native';
import IconBottom from '../../assets/fonts'
import FoodRecipe from '../../components/FoodRecipe'
import { getRandomRecipes, getRecipeById, getRecipesBySearch } from '../../api/Recipes'

const FoodCategories = () => {
    const navigation = useNavigation();
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [refreshControl, setRefreshControl] = useState(false);
    const [loadingitem, setLoadingItem] = useState(false);
    let [search, setSearch] = useState("");
    let [itemSearch, setItemSearch] = useState([]);
    const getTenRandomRecipes = async () => {
        setRefreshControl(true);
        setLoading(true);
        await getRandomRecipes(10)
            .then((response) => {
                setData(data.concat(response.data?.recipes));
                setRefreshControl(false);
                setLoading(false);
            })
            .catch((error) => {
                setRefreshControl(false);
                setLoading(false);
                console.log(error);
            });
    }
    const getItemSearch = async (searchText) => { 
        setSearch(searchText);
        setLoadingItem(true);
        await getRecipesBySearch(searchText)
            .then((response) => {
                setLoadingItem(false);
                setItemSearch(response?.data);
            })
            .catch((error) => {
                setLoadingItem(false);
                console.log(error);
             })
    }
    const getResultSearch = async (id) => { 
        setLoading(false);
        await getRecipeById(id)
            .then((response) => {
                setData(response?.data);
                setLoading(false);
            })
            .catch((error) => { 
                console.log(error);
            })
    }
    const renderItem = ({ item, index }) => {
        return (
            <View style={styles.containerItem}>
                <FoodRecipe
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
        setLoading(true);
        getTenRandomRecipes();
    }
    useEffect(() => {
        getTenRandomRecipes();
     }, []);
  return (
    <SafeAreaView style = {styles.container}>
        <View style = {styles.containerHeader}>
            <ButtonBack
                name='chevron-back'
                size={28}
                onPress={() => navigation.goBack()}
            />
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.15}}>Food Categories</Text>
        </View>
    <View style = {styles.containerSearch}>
        <SearchBar
            placeholder="Search your food..."
            onChangeText={getItemSearch}
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
                borderBottomLeftRadius: search !== ""? 0 : 20,
                borderBottomRightRadius: search !== ""? 0 : 20,
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
                  onCancel={() => { console.log('abc')}}
            autoFocus={true}
            showLoading={loadingitem}
        />
        { (search !== "") &&
        (<View style={styles.containerListSearch}>
            <FlatList
                data={itemSearch}
                renderItem={({item}) => (
                    <TouchableOpacity onPress={() => {
                        getResultSearch(item?.id);
                        setSearch("");
                    }}>
                        <Text numberOfLines={1} style={styles.itemSearch}>{item?.title}</Text>
                    </TouchableOpacity>
                )}
                keyExtractor={(item, index) => index.toString()}
                showsVerticalScrollIndicator={false}
                
            />
        </View>)
        }
    </View>
    <View style={styles.containerBody}>
        <FlatList
            numColumns={2}
            data={data}
            renderItem={renderItem}
            keyExtractor={(item, index) => index.toString()}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={renderFooter}
            onEndReached={handleLoadMore}
            onEndReachedThreshold={0.1}
            refreshControl={
                <RefreshControl
                    refreshing={refreshControl}
                    onRefresh={getTenRandomRecipes}
                    progressBackgroundColor={colors.MAIN}
                    tintColor={colors.MAIN}
                />
            }
            
        />
    </View>
    </SafeAreaView>
  )
}

export default FoodCategories

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerHeader: {
        flexDirection: 'row',
        marginHorizontal: widthScreen * 0.05,
        alignItems: 'center',
    },
    containerSearch: {
        zIndex: 1,
        marginTop: heightScreen * 0.02,
        marginHorizontal: widthScreen * 0.032,
    },
    containerBody: {
        flex: 1,
        marginTop: heightScreen * 0.02,
        alignItems: 'center',
    },
    containerItem: {
        marginVertical: heightScreen * 0.012,
        marginHorizontal: widthScreen * 0.015,
    },
    itemSearch: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: heightScreen * 0.02,
        // color: colors.WHITE,
    },
    containerListSearch: {
        flex: 1,
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        padding: 15,
        marginLeft: widthScreen * 0.02,
        width: widthScreen * 0.745,
        marginTop: heightScreen * 0.071,
        position: 'absolute',
        backgroundColor: colors.WHITE,
    }
})