import { FlatList, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import ButtonBack from '../../components/ButtonBack'
import CardDays from '../../components/CardDays'
import Accordion from 'react-native-collapsible/Accordion';
import WorkoutPlanCard from '../../components/WorkoutPlanCard'
import FastImage from 'react-native-fast-image'
import Button from '../../components/Button'
import { AxiosContext } from '../../context/AxiosContext'
import { AuthContext } from '../../context/AuthContext'

const WorkoutPlanDetail = ({ route, navigation }) => {
    const axiosContext = useContext(AxiosContext)
    const authContext = useContext(AuthContext)
    const [activeSections, setActiveSections] = useState([]);
    const item = route.params.item
    const [loading, setLoading] = useState(false);
    const handleJoinPlan = async () => {
        setLoading(true);
        await axiosContext.createPlan(authContext.userID, item)
        .then((respone) => {
            console.log(respone.data);
            setLoading(false);
        })
        .catch((err) => {
            console.log(err);
        });
    }

    let total = 0;
    let totalMinutes = 0;
    const dayKeys = Object.keys(item).filter(key => key.startsWith('Day'));
    for (const key in item) {
    if (key.startsWith('Day')) {
      const dayObjects = item[key];
      const numberOfObjects = dayObjects.length;
      total += item[key].length;
    }
    }

    _renderHeader = (section) => {
        let totalMinutes = 0;
        for (let i = 0; i < item[section].length; i++) {
            totalMinutes += item[section][i].Minutes;
        }
    return (
        <CardDays 
            day={section.slice(3, 4)}
            numworkout={item[section].length}
            minutes={totalMinutes}
        />
    );
    };
    _renderContent = (section) => {
    return (
        <FlatList
        data={item[section]}
        renderItem={({ item }) => <WorkoutPlanCard item={item} />}
        horizontal
        showsHorizontalScrollIndicator={false}
        style={{marginLeft:widthScreen * 0.05}}
        />
    );
  };

    
  return (
    <SafeAreaView style = {styles.container}>
        <ScrollView style = {{paddingBottom: 10}}>
        <View style = {styles.containerHeader}>
            <ButtonBack
                name='chevron-back'
                size={28}
                onPress={() => navigation.goBack()}
            />
            <Text style = {{fontSize: 20, fontWeight: 'bold', color: colors.WHITE, alignSelf:'center', marginLeft:widthScreen * 0.23}}>Workouts</Text>
        </View>
        <View style = {{flexDirection:'row'}}>
        <FastImage
            source={require('../../assets/typeworkout/exercise.png')}
            style={{width:widthScreen * 0.1, height:heightScreen * 0.05, marginTop:heightScreen * 0.05, marginLeft:widthScreen * 0.05}}
        />
          <Text style={styles.title}>Plan to make your health changing!</Text></View>
          <Text style={styles.subtitle}>Our workout plan designed to help you achieve your fitness goals and transfom your body and mind.</Text>
        <View style = {{flexDirection:'row', marginTop: heightScreen * 0.02, alignSelf:'center'}}>
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600'}}>Woohoo!</Text>
            <FastImage
                source={require('../../assets/typeworkout/rocket.png')}
                style={{width:widthScreen * 0.07, height:heightScreen * 0.03, marginLeft:widthScreen * 0.02}}
            />
            <Text style = {{fontSize:20, color:colors.WHITE, fontWeight:'600', marginLeft:widthScreen * 0.02}}>Are you ready?</Text>
        </View>
        <Button
            title = {"Join a workout plan"}
            stylesContainer = {styles.button}
            stylesTitle={styles.titleButton}
            onPress = {handleJoinPlan}
            />
        <View style = {styles.containerBody}>
          <Text style = {{
            color: colors.WHITE,
            fontFamily:'Poppins-Bold',
            marginLeft: widthScreen * 0.05,
            marginTop: heightScreen * 0.04,
            fontSize:15
        }}>{total} WORKOUT IN {dayKeys.length} DAYS</Text>
        <View>
        <Accordion
            sections={dayKeys}
            activeSections={activeSections}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={(sections) => {setActiveSections(sections)}}
            containerStyle={{ marginTop:heightScreen * 0.01 }}
            underlayColor='transparent'
            touchableComponent={TouchableOpacity}
            sectionContainerStyle={{ marginTop:heightScreen * 0.01}}
        />
        </View>
        </View>
    </ScrollView>
    </SafeAreaView>
  )
}

export default WorkoutPlanDetail

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
    title: {
        fontSize: 23,
        fontFamily: 'Poppins-Bold',
        color: colors.WHITE,
        marginTop: heightScreen * 0.035,
        marginLeft: widthScreen * 0.05,
        width: widthScreen * 0.8
    },
    subtitle: {
        marginLeft: widthScreen * 0.05,
        color: colors.GRAYLIGHT,
        marginTop: heightScreen * 0.02,
        fontSize: 16.5,
        fontFamily: 'Poppins'
    },
    button: {
        width: widthScreen * 0.9,
        height: heightScreen * 0.055,
        marginTop: heightScreen * 0.02,
    },
    titleButton: {
        fontSize: 20,
        fontWeight:'700'
    },
})