import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import HeaderGetting from '../../components/HeaderGetting'
import Ionicons from 'react-native-vector-icons/Ionicons';
import { colors, heightScreen, widthScreen } from '../../utility'
import TipsData from '../../assets/TipsData';
import FoodRecipe from '../../components/FoodRecipe';
import Carousel from 'react-native-snap-carousel';
import { getRandomRecipes } from '../../api/Recipes';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
    const date = new Date();
    const data = TipsData;
    const navigation = useNavigation();
    const [recipes, setRecipes] = useState([]);
    const [loading, setLoading] = useState(true);
    const tip = data[Math.floor(Math.random() * data.length)];
    const renderItem = ({ item, index }) => {
        return (
            <FoodRecipe
                item={item} index={index} />
        )
    }
    const getTenRandomRecipes = async () => {
        setLoading(true);
        await getRandomRecipes(10)
            .then((response) => {
                setLoading(false);
                setRecipes(response.data.recipes);
            })
            .catch((error) => { 
                setLoading(false);
                console.log(error);
            });
     }
    useEffect(() => { 
        getTenRandomRecipes();
    }, []);

  return (
    <SafeAreaView style={styles.container}>
        <ScrollView>
        <View style={styles.containerHeader}>
            <HeaderGetting
                  title1={'Hello' + ', ' + 'Gerard'}
                title2={'Good morning'}
                stylesText={{textAlign: 'left', fontWeight: 'bold', fontSize:16, marginRight: widthScreen * 0.48}}
                stylesText1={{ marginRight: widthScreen * 0.3, fontSize: 36, marginHorizontal: widthScreen * 0.04}}
            />
            <TouchableOpacity>
                  <Ionicons name={'ios-notifications'} size={25} color={colors.GRAYLIGHT} style={ styles.iconNoti} />
            </TouchableOpacity>
        </View>
        <View style={styles.containerBody}>
            <View style ={styles.containerTitle}>
                <Text style={styles.texttitle}>TIPS OF THE DAY</Text>
                <Ionicons
                    name ={'ios-bulb-outline'}
                    size={25}
                    color={colors.MAIN}
                    style={styles.iconBulb}
                  />
                  <Text style={styles.textdate}>{(date.toUTCString()).slice(0,12)}</Text>
            </View>
              <Text style={styles.texttip}>{tip.title.toUpperCase()}</Text>
            <ScrollView style ={styles.scrolltext}>
                  <Text
                      style={styles.text}
                  >{tip.content}</Text>
                  </ScrollView>
            <View style ={styles.containerImg}>
            <Image
                source={{uri: tip.image}}
                style = {styles.img}
                resizeMode='cover'
                  
            />  
            </View>          
        </View>
        <View style = {styles.containerRecipes}>
        <View style = {styles.containerTitleRecipe}>
            <Text style = {styles.textTitle}>Recipes</Text>
            <Text 
                style = {styles.textmore}
                onPress={() => {}}    
            >See all</Text>
          </View>
          <View style = {styles.containerSlider}>
            <Carousel
              data={recipes}
              renderItem={renderItem}
              sliderWidth={widthScreen}
              itemWidth={widthScreen * 0.5}
              loop={true}
            />
            </View>
          </View>
        </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerHeader: {
        flexDirection: 'row',
        backgroundColor: colors.BG,
    },
    iconNoti: {
        marginTop: heightScreen * 0.03,
        marginRight: widthScreen * 0.1,
    },
    containerBody: {
        backgroundColor: colors.SILVER,
        marginTop:heightScreen * 0.03,
        width: widthScreen,
        height: heightScreen * 0.2,
        borderTopRightRadius: 90,
        borderBottomRightRadius: 90,
        padding: 15,
        paddingRight:120
    },
    img: {
        width: widthScreen * 0.26,
        height: widthScreen * 0.31,
        borderRadius: 100,
    },
    containerImg: {
        position: 'absolute',
        width: widthScreen * 0.28,
        height: widthScreen * 0.33,
        marginTop: heightScreen * 0.025,
        left: widthScreen * 0.68,
        alignSelf: 'flex-end',
        borderRadius: 100,
        borderColor: colors.MAIN,
        borderWidth: 4,
    },
    scrolltext: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    containerTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    texttitle: {
        fontSize: 14,
        fontWeight: 'bold',
        color: colors.MAIN,
    },
    iconBulb:{
        bottom: 5,
        marginRight: widthScreen * 0.2,
    },
    textdate: {
        fontSize: 13,
        color: colors.MAIN,
        fontWeight: 'bold',
        right: widthScreen * 0.16,
    },
    texttip: {
        fontSize: 13,
        fontWeight: 'bold',
        color: colors.WHITE,
        marginBottom: heightScreen * 0.01,
        marginTop:heightScreen * 0.01,
    },
    text: {
        fontSize: 15,
        color: colors.WHITE,
        fontWeight: '600',
        lineHeight: 25,
        alignContent: 'flex-start',
        overflow: 'hidden',
    },
    containerRecipes: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
    },
    containerTitleRecipe: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: heightScreen * 0.03,
        marginHorizontal: widthScreen * 0.05,
    },
    textTitle: {
        fontSize: 22,
        fontWeight: 'bold',
        color: colors.WHITE,
    },
    textmore: {
        fontSize: 17,
        color: colors.MAIN,
        fontWeight: 'bold',
    },
    containerSlider: {
        flex: 1,
        marginRight:10,
        marginTop: heightScreen * 0.02,
        marginHorizontal: widthScreen * 0.04,
        borderRadius: 20,
    }
})