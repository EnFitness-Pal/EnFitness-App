import { FlatList, SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import FastImage from 'react-native-fast-image'
import ButtonBack from '../../components/ButtonBack'
import { colors, heightScreen, widthScreen } from '../../utility'
import Carousel from 'react-native-snap-carousel';
import Video from 'react-native-video';
import { ScrollView } from 'react-native-gesture-handler';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Accordion from 'react-native-collapsible/Accordion';
import CardInfo from '../../components/CardInfo';
const WorkoutDetail = ({ route, navigation }) => {
    const [activeSections, setActiveSections] = useState([]);
    const renderVideo = ({ item, index }) => { 
        return (
            <Video
                source={{ uri: item }}
                style={styles.backgroundVideo}
                resizeMode="cover"
                repeat={true}
                muted={true}
                paused={true}
                controls={true}
                ignoreSilentSwitch={"obey"}
                playInBackground={true}
                playWhenInactive={true}
                />
        )
    }
    const [readmore, setReadmore] = React.useState(false)

    const SECTIONS = [
        {
        title: 'First',
        content: route.params.item?.VideoURL,
        },
        {
        title: 'Second',
        content: route.params.item?.Steps,
        },
    ];

    _renderHeader = (section) => {
      return (
        <CardInfo
          title={section.title == 'First' ? `Video : ${section.content?.length}` : "Steps"}
          styleContainer={{
            flex: 1,
            borderLeftColor: section.title == 'First' ? "#FF6000" : "#009FBD", 
            borderLeftWidth: 5,
            alignSelf: 'center',
          }}
        />
      );
    };

    _renderContent = (section) => { 
        if (section.title === 'First') {
        return (
        <View style={styles.containerVideo}>
            <Carousel
                data={section?.content}
                renderItem={renderVideo}
                sliderWidth={widthScreen}
                itemWidth={widthScreen * 0.9}
                loop={true}
                inactiveSlideScale={1}
                inactiveSlideOpacity={1}
                enableMomentum={true}
                activeSlideAlignment={'start'}
                
            />
        </View>)
    } else {
    return (
    <View style={styles.containerContent}>
      <FlatList
        data={section?.content}
        keyExtractor={item => item}
        renderItem={({ item, index }) => { 
          return (
            <View style={{
              width: widthScreen * 0.9,
              height: heightScreen * 0.07,
              flexDirection: 'row',
              alignItems: 'center',
              marginHorizontal: widthScreen * 0.05,
              marginTop: heightScreen * 0.05,
              marginVertical: heightScreen * 0.03,
            }}>
              <View style = {{ width: widthScreen * 0.1, height: heightScreen * 0.08}}>
                <Text style={{alignSelf:'center', color: colors.MAIN, fontSize: 12, fontFamily: "Poppins-Bold", fontWeight: "500"}}>Step</Text>
                      <Text numberOfLines={1} style={{ color: colors.MAIN, fontSize: 30, fontFamily: "Poppins-Bold", fontWeight: "bold", alignSelf: 'center' }}>{index}</Text>
              </View>
              <View style ={{justifyContent:'center', marginLeft:10,width:widthScreen * 0.75, height: heightScreen * 0.2}}>
                <Text style={{lineHeight: 18 ,color: colors.WHITE, fontSize: 14, fontFamily: "Poppins-Bold", fontWeight: "400"}}>{item}</Text>
              </View>
            </View>
          )
        }}
        scrollEnabled={false}
      />
    </View>
        )
    }    
    }

  return (
    <View style = {styles.container}>
        <SafeAreaView style = {styles.containerImg}>    
            <FastImage
            style={styles.containerHeader}
            source={{uri: route.params.item?.Thumbnail}}
            resizeMode={FastImage.resizeMode.cover}
              />
        <View style= {styles.statusbar}>
        <ButtonBack
          onPress={() => navigation.goBack()}
          name = 'chevron-back'
        />
        <ButtonBack
          name='heart-outline'
        />

        </View>
        </SafeAreaView>
        <ScrollView style = {styles.container}>
        <View style={styles.containerBody}>
          <Text numberOfLines={1} style={styles.title}>{route.params.item?.ExerciseName}</Text>
          <Text style={styles.subtitle}>Difficulty: {route.params.item?.Difficulty}</Text>
            <Text 
                numberOfLines={readmore ? null : 5}
                style={styles.content}>
                {route.params.item?.Details}
            
            </Text>
            {route.params.item?.Details ?
             <Text onPress = {() => setReadmore(!readmore)} style = {styles.readmore}>{readmore? 'Read less' : 'Read more'}</Text>
                :   null}
            <View style = {styles.detail}>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.05,
                }}>
                    <FontAwesome5
                        name='dumbbell' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Category: {route.params.item?.Category}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: heightScreen * 0.02,
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.065,
                }}>
                    <Ionicons
                        name='ios-body' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Force: {route.params.item?.Force ? route.params.item?.Force : 'None'}</Text>
                </View>
                <View style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginTop: heightScreen * 0.02,
                    marginHorizontal: widthScreen * 0.05,
                    marginLeft: widthScreen * 0.07,
                }}>
                    <FontAwesome5
                        name='fire-alt' 
                        size={27}
                        color={colors.MAIN}
                          />
                    <Text style={{
                        marginLeft: 10,
                        fontFamily: "Poppins-Bold",
                        color: colors.MAIN,
                          }}>Grips: {route.params.item?.Grips ? route.params.item?.Grips: 'None'}</Text>
                </View>
            </View>
              </View>
            <View style = {{flex: 1}}>
                <Accordion
                sections={SECTIONS}
                activeSections={activeSections}
                renderHeader={_renderHeader}
                renderContent={_renderContent}
                      onChange={(sections) => {
                          setActiveSections(sections);

                      }}
                containerStyle={{ marginTop:heightScreen * 0.05, }}
                underlayColor='transparent'
                touchableComponent={TouchableOpacity}
                sectionContainerStyle={{paddingBottom:20}}
            />
            </View>
        </ScrollView>
    </View>
  )
}

export default WorkoutDetail

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.BG,
    },
    containerImg: {
        height: heightScreen * 0.4,
        width: widthScreen,
        borderRadius: 30,
    },
    statusbar: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginHorizontal: widthScreen * 0.05,
    },
    containerHeader: {
        borderRadius: 30,
        position: 'absolute',
        height: heightScreen * 0.4,
        width: widthScreen,
        backgroundColor: colors.BG,
        top: 0,
    },
    containerVideo: {
        marginVertical: heightScreen * 0.03,
    },
    backgroundVideo: {  
        marginLeft: widthScreen * 0.03,
        height: heightScreen * 0.23,
        width: widthScreen * 0.8,
        backgroundColor: colors.BG,
        borderRadius: 30,
    },
    containerBody: {
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
    },
    title: {
        marginLeft : widthScreen * 0.05,
        marginTop: heightScreen * 0.02,
        fontSize: 20,
        fontFamily: "Poppins-Bold",
        color: colors.WHITE,
    },
    subtitle: {
        marginLeft: widthScreen * 0.05,
        marginTop: heightScreen * 0.01,
        fontSize: 13,
        fontFamily: "Poppins-Bold",
        color: colors.MAIN,
    },
    detail: {
        flex: 1,
        backgroundColor: colors.SILVER,
        borderRadius: 30,
        marginTop: heightScreen * 0.02,
        padding: heightScreen * 0.015,
        marginHorizontal: widthScreen * 0.05,
        
    },
    content: {
        marginHorizontal: widthScreen * 0.05,
        textAlign: 'justify',
        fontFamily: "Poppins-Regular",
        color: colors.WHITE,
    },
    readmore: {
        // marginTop: heightScreen * 0.005,
        marginHorizontal: widthScreen * 0.05,
        textAlign: 'right',
        fontFamily: "Poppins-Regular",
        color: colors.MAIN,
        fontSize: 13,
    },
    containerContent: {
        flex: 1,
        backgroundColor: colors.BG,
    }
})