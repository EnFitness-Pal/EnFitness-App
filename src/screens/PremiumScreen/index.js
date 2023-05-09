import { ActivityIndicator, ImageBackground, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { colors, heightScreen, widthScreen } from '../../utility'
import { ScrollView } from 'react-native'
import ButtonBack from '../../components/ButtonBack'
import AnimatedLottieView from 'lottie-react-native'
import PremiumCard from '../PremiumCard'
import Carousel from 'react-native-snap-carousel';
import Modal from 'react-native-modal';
import WebView from 'react-native-webview';
import Feather from 'react-native-vector-icons/Feather'
const PremiumScreen = ({navigation}) => {
    const theme = useSelector(state => state.state.theme);
    const [itemPre, setItemPre] = useState([]);
    const [showGateway, setShowGateway] = useState(false);
    const [prog, setProg] = useState(false);
    const [progClr, setProgClr] = useState('#000');
    // const [data, setData] = useState();
    const datapre = [
        {
            id: 1,
            title: '3 months',
            price: '8.99',
            permonths: '2.99',
        },
        {
            id: 2,
            title: '6 months',
            price: '15.99',
            permonths: '2.66',
        },
        {
            id: 3,
            title: '12 months',
            price: '29.99',
            permonths: '2.49',
        },
        {
            id: 4,
            title: 'Lifetime',
            price: '49.99',
            permonths: null,
        }
    ]

    const renderPre = ({ item }) => { 
        return (
            <View>
                <PremiumCard item={item} onPress={() => {
                    setItemPre(item);
                    setShowGateway(true);
                }} />
            </View>
        )
    }


    function onMessage(e) {
        let data = e.nativeEvent.data;
        setShowGateway(false);
        console.log(data);
        
    }    

  return (
    <ImageBackground
        style={theme == 'dark' ? styles.container: styles.containerlight}
        source={require('../../assets/images/imagePremium.jpeg')}>
        <SafeAreaView>
              <ScrollView>
                <View style = {styles.containerHeader}>
                <ButtonBack
                    name='chevron-back'
                    size={28}
                    onPress={() => navigation.goBack()}
                />
                </View>
                <Text style = {styles.textHeader}>Upgrade to PREMIUM!</Text>
                <Text style = {styles.textPremium}>Premium Membership</Text>
                <Text style = {styles.textIntro}>Activation of this premium account will grant access to all locked features on our app!</Text>
                <AnimatedLottieView
                    source={require('../../assets/lottie/premium.json')}
                    style={{width: widthScreen * 1, height: heightScreen * 0.35, alignSelf: 'center'}}
                    autoPlay
                    loop={false}
                  />
                <View style = {styles.sliderPre}>
                <Carousel
                    data={datapre}
                    renderItem={renderPre}
                    sliderWidth={widthScreen}
                    itemWidth={widthScreen * 0.45}
                    loop={true}
                />
                </View>
            </ScrollView>
        {showGateway ? (
        <Modal
          visible={showGateway}
          onDismiss={() => setShowGateway(false)}
          onRequestClose={() => setShowGateway(false)}
          animationType={"fade"}
          transparent>
          <SafeAreaView style={styles.webViewCon}>
            <View style={styles.wbHead}>
              <TouchableOpacity
                style={{padding: 13}}
                onPress={() => setShowGateway(false)}>
                <Feather name={'x'} size={24} />
              </TouchableOpacity>
              <Text
                style={{
                  flex: 1,
                  textAlign: 'center',
                  fontSize: 16,
                  fontWeight: 'bold',
                  color: '#00457C',
                }}>
                PayPal GateWay
              </Text>
                <View style={{padding: 13, opacity: prog ? 1 : 0}}>
                <ActivityIndicator size={24} color={progClr} />
              </View>
            </View>
            <WebView
            //   source={{uri: 'https://capstoneproject-8ab42.firebaseapp.com/lifetime'}}
                source={{uri: 'http://localhost:3000/lifetime'}}
              style={{
                    flex: 1,
                    borderBottomLeftRadius: 20,
                    borderBottomRightRadius: 20,
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
              onLoadStart={() => {
                setProg(true);
                setProgClr('#000');
              }}
              onLoadProgress={() => {
                setProg(true);
                setProgClr('#00457C');
              }}
              onLoadEnd={() => {
                setProg(false);
              }}
              onLoad={() => {
                setProg(false);
              }}
              onMessage={onMessage}
            />
          </SafeAreaView>
        </Modal>
      ) : null}
          </SafeAreaView>
    </ImageBackground>
  )
}

export default PremiumScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerlight: {
        flex:1,
        backgroundColor: colors.WHITE,
    },
    textHeader: {
        color: colors.MAIN,
        marginLeft: widthScreen * 0.05,
        marginTop: heightScreen * 0.03,
        marginBottom: heightScreen * 0.03,
        fontSize: 28,
        fontFamily: 'Poppins',
        fontWeight: 'bold',

    },
    containerHeader: {
        flex: 1,
        marginLeft: widthScreen * 0.05,
    },
    textPremium: {
        color: colors.WHITE,
        alignSelf: 'center',
        fontSize: 20,
        fontFamily: 'Poppins',
        fontWeight: 'bold',
    },
    textIntro: {
        color: colors.WHITE,
        alignSelf: 'center',
        fontSize: 16,
        fontFamily: 'Poppins',
        marginTop: heightScreen * 0.02,
        textAlign: 'center',
        marginHorizontal: widthScreen * 0.1,
    },
    sliderPre: {
        marginTop: heightScreen * 0.02,
        marginBottom: heightScreen * 0.02,
        height: heightScreen * 0.4,
        width: widthScreen * 0.9,
    },
    webViewCon: {
        height: heightScreen * 0.95,
        width: widthScreen,
        marginLeft: -widthScreen * 0.05,
    },
    wbHead: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
})