import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { colors, heightScreen, widthScreen } from '../../utility'
import CalendarStrip from 'react-native-calendar-strip';
import { Calendar } from 'react-native-calendars';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fontisto from 'react-native-vector-icons/Fontisto';
import CircularProgress from 'react-native-circular-progress-indicator';
import { AuthContext } from '../../context/AuthContext';
import { getTotalTracking } from '../../api/Calories';
import Accordion from 'react-native-collapsible/Accordion';
import Lottie from 'lottie-react-native';
import CardInfo from '../../components/CardInfo';
import CardFood from '../../components/CardFood';
import { getDailyTrackingExercise, getDailyTrackingFood } from '../../api/Tracking';
import { FlatList } from 'react-native';
import CardEx from '../../components/CardEx';

const InsigntScreen = () => {
  const [date, setDate] = useState(new Date())
  const authContext = useContext(AuthContext);
  const [showCalendar, setShowCalendar] = useState(false);
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [activeSections, setActiveSections] = useState([]);
  const [trackingFood, setTrackingFood] = useState();
  const [trackingEx, setTrackingEx] = useState(); 



  const onHeaderSelected = (date) => {
    setShowCalendar(true);
  };
  const onDayPress = (day) => {
    setDate((day.dateString))
    setShowCalendar(false);
  };
  const getTotalTrackingStack = async () => { 
    setLoading(true)
    await getTotalTracking(authContext.userID, new Date(date)?.toISOString().split("T").shift())
      .then(res => {
        setData(res.data);
        setLoading(false)
      })
      .catch(err => { 
        console.log('err:', err);
        setLoading(false)
      })
  }
  const getTrackingFood = async () => { 
    setLoading(true)
    await getDailyTrackingFood(authContext.userID, new Date(date)?.toISOString().split("T").shift())
      .then(res => { 
        setTrackingFood(res.data);
        setLoading(false);
      })
      .catch(err => { 
        console.log('err:', err);
        setTrackingFood(null);
        setLoading(false)
      })
  }

    const getTrackingEx = async () => { 
    setLoading(true)
    await getDailyTrackingExercise(authContext.userID, new Date(date)?.toISOString().split("T").shift())
      .then(res => { 
        setTrackingEx(res.data);
        setLoading(false);
      })
      .catch(err => { 
        console.log('err:', err);
        setTrackingEx(null);
        setLoading(false)
      })
  }
  useEffect(() => {
    getTotalTrackingStack();
    getTrackingFood();
    getTrackingEx();
  }, [date]);
  const SECTIONS = [
    {
      title: 'First',
      content: trackingFood,
    },
    {
      title: 'Second',
      content: trackingEx,
    },
  ];
    _renderHeader = (section) => {
      return (
        <CardInfo
          title={section.title == 'First'? "Daily Tracking Meal": "Daily Tracking Exercise"}
          styleContainer={{
            flex: 1,
            borderLeftColor: section.title == 'First' ? "#FF6000" : "#009FBD", 
            borderLeftWidth: 5,
            alignSelf: 'center',
            marginTop: heightScreen * 0.02
          }}
        />
      );
    };

  _renderContent = (section) => {
    if (loading) {
      return (
        <Lottie
          source={require('../../assets/lottie/97930-loading.json')}
          autoPlay
          loop
          style={{ width: 150, height: 150, alignSelf: 'center' }}
        />)
    } else {
      if (section.title === 'First') {
        return (
            <FlatList
              data={section?.content}
              renderItem={({ item, index }) => <CardFood item= {item} index = {index} />}
              keyExtractor={(item) => item.Id}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style = {{alignSelf: 'center', paddingBottom: heightScreen * 0.05}}
            
            />
        )
      }
      else {
        return (
            <FlatList
              data={section?.content}
              renderItem={({ item, index }) => <CardEx item= {item} index = {index} />}
              keyExtractor={(item) => item.TrackingExerciseId}
              scrollEnabled={false}
              showsHorizontalScrollIndicator={false}
              showsVerticalScrollIndicator={false}
              style = {{alignSelf: 'center', paddingBottom: heightScreen * 0.08}}
            
            />
        )    
      }    
    }


    };

  return (
    <View style={styles.container}>
      <CalendarStrip
        scrollable
        style={{ height: heightScreen * 0.22, width: widthScreen, backgroundColor: colors.GRAYDARK}}
        calendarColor={'transparent'}
        onHeaderSelected={onHeaderSelected}
        calendarHeaderStyle={{ color: 'white', fontSize: 17, fontWeight: 'bold', backgroundColor: 'transparent', marginTop: heightScreen * 0.055, marginBottom: heightScreen * 0.04 }}
        calendarHeaderFormat='MMM YYYY'
        dateNumberStyle={{ color: colors.GRAYLIGHT, fontSize: 17 }}
        dateNameStyle={{ color: colors.GRAYLIGHT, fontSize: 13, marginVertical: 5, fontWeight: 'bold' }}
        highlightDateContainerStyle={{ backgroundColor: colors.MAIN }}
        dayContainerStyle={{ backgroundColor: colors.BACK, borderRadius: 20, height: 65, width: 40}}
        onDateSelected={(date) => setDate(date)}
        selectedDate={date}
        // onWeekChanged={(date) => console.log(date)}
        minDate={'2023-01-01'}
        maxDate={'2023-12-31'}
        daySelectionAnimation={{ type: 'background', duration: 30, highlightColor: colors.MAIN }}
        highlightDateNumberStyle={{ color: colors.WHITE, fontSize: 17 }}
        highlightDateNameStyle={{ color: colors.WHITE, fontWeight: 'bold', fontSize: 13 }}
        iconStyle={{ tintColor: 'transparent' }}
      />
      <Modal visible={showCalendar} animationType="slide"
        transparent={true}
      >
        <View style={styles.modalContainer}>
          <Calendar
            onDayPress={onDayPress}
            style={{
              width: widthScreen - 40,
              height: heightScreen * 0.42,
              backgroundColor: colors.BG,
              shadowColor: colors.WHITE,
              shadowOffset: {
                width: 0,
                height: 2,
              },
              shadowOpacity: 0.25,
              shadowRadius: 3.84,
              elevation: 5,

              
            }}
            theme={{
              arrowColor: colors.MAIN,
              calendarBackground: colors.BG,
              selectedDayBackgroundColor: colors.MAIN,
              selectedDayTextColor: colors.WHITE,
              todayTextColor: colors.MAIN,
              dayTextColor: colors.WHITE,
              textDisabledColor: colors.GRAYLIGHT,
              textDayFontWeight: 'bold',
            }}

            
          />
          <TouchableOpacity onPress={() => setShowCalendar(false)} style={styles.containerButton}>
            <Ionicons
              name =  "close-circle-sharp"
              style={styles.modalCloseButton}
              size= {20}
            />
          </TouchableOpacity>
        </View>
      </Modal>
      <ScrollView style={{ flex: 1}}>
      <View style={styles.containerBody}>
          <View style = {{alignItems: 'center', width:widthScreen * 0.25}}>
          <Text style={{ color: colors.GRAYLIGHT, fontSize: 13, fontWeight: 'bold', marginBottom: 10 }}>Eaten</Text>
          {loading ? <Lottie
            source={require('../../assets/lottie/97930-loading.json')}
            autoPlay
            loop
            style={{ width: 80, height: 80 }}
          /> :
            <Text style={{ color: colors.WHITE, fontSize: 36, fontWeight: '300' }}>{data?.SumCalories}</Text>}
          <Ionicons name={'ios-fast-food-outline'} size = {20} color={colors.MAIN} />
          </View>
          <View style = {{   width: widthScreen * 0.4,alignSelf: "center", alignItems: 'center', marginHorizontal:10}}>
            {loading ? <Lottie
              source={require('../../assets/lottie/8707-loading.json')}
              autoPlay
              loop
              style={{width: 150, height: 150}}
              /> :
              <CircularProgress
                value={(data?.DailyCalories / data?.TDEECalories) * 100}
                progressFormatter={(value) => {
                  'worklet';
                  return `${((value * data?.TDEECalories) / 100)?.toFixed(0)}`;
                }}
                radius={80}
                activeStrokeColor={"#A77C06"}
                activeStrokeWidth={10}
                inActiveStrokeColor={colors.GRAYDARK}
                activeStrokeSecondaryColor={colors.MAIN}
                title='Active Calories'
                titleColor={colors.GRAYLIGHT}
                titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
                progressValueColor={colors.WHITE}
                progressValueStyle={{ fontSize: 36, fontWeight: '300' }}
                subtitle={'/' + data?.TDEECalories}
                subtitleStyle={{ fontSize: 15, fontWeight: 'bold' }}
              />}       
          </View>
        <View style = {{alignItems: 'center',  width:widthScreen * 0.25}}>
          <Text style={{ color: colors.GRAYLIGHT, fontSize: 13, fontWeight: 'bold' }}>Burned</Text>
          {loading ? <Lottie
            source={require('../../assets/lottie/97930-loading.json')}
            autoPlay
            loop
            style={{ width: 80, height: 80 }}
          /> :
            <Text style={{ color: colors.WHITE, fontSize: 36, fontWeight: '300' }}>{data?.ExerciseCalories}</Text>}
          <Fontisto name={'fire'} size = {20} color={'#FE1B17'} />
          </View>
      </View>
      <View style={[styles.containerTracking, {right: loading?18:0}]}>
        {loading ? <Lottie
          source={require('../../assets/lottie/8707-loading.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100}}
        /> :
          <CircularProgress
            value={
              ((data?.DailyCarbs / data?.TDEECarbs) * 100) > 100 ? 100 : (data?.DailyCarbs / data?.TDEECarbs) * 100
            }
            progressFormatter={(value) => {
              'worklet';
              return (value * data?.DailyCarbs / value)?.toFixed(0);
            }}
            radius={50}
            activeStrokeColor={'#rgba(150,15,15,1)'}
            activeStrokeWidth={6}
            inActiveStrokeColor={colors.GRAYDARK}
            activeStrokeSecondaryColor={'#rgba(247,0,0,1)'}
            title='Cabs'
            titleColor={colors.GRAYLIGHT}
            titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
            progressValueColor={colors.WHITE}
            progressValueStyle={{ fontSize: 25, fontWeight: '300' }}
            subtitle={'/' + data?.TDEECarbs}
            subtitleColor={'#rgba(247,0,0,1)'}
            subtitleStyle={{ fontSize: 13, fontWeight: 'bold' }}
          />}
        {loading ? <Lottie
          source={require('../../assets/lottie/8707-loading.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100}}
        /> :
          <CircularProgress
            value={
              ((data?.DailyProtein / data?.TDEEProtein) * 100) > 100 ? 100 : (data?.DailyProtein / data?.TDEEProtein) * 100
            }
            progressFormatter={(value) => {
              'worklet';
              return ((value * data?.DailyProtein)/ value)?.toFixed(0);
            }}
            maxValue={100}
            radius={50}
            activeStrokeColor={'#rgba(74,105,187,1)'}
            activeStrokeWidth={6}
            inActiveStrokeColor={colors.GRAYDARK}
            activeStrokeSecondaryColor={'#rgba(89,0,114,1) '}
            title='Protein'
            titleColor={colors.GRAYLIGHT}
            titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
            progressValueColor={colors.WHITE}
            progressValueStyle={{ fontSize: 25, fontWeight: '300' }}
            subtitle={'/' + data?.TDEEProtein}
            subtitleColor={'#rgba(74,105,187,1)'}
            subtitleStyle={{ fontSize: 13, fontWeight: 'bold' }}
          />}
        {loading ? <Lottie
          source={require('../../assets/lottie/8707-loading.json')}
          autoPlay
          loop
          style={{ width: 100, height: 100,  marginRight: 30 }}
        /> :
          <CircularProgress
            value={
              (((data?.DailyFat / data?.TDEEFat) * 100) > 100 )? 100 : ((data?.DailyFat / data?.TDEEFat) * 100)
            }
            progressFormatter={(value) => {
              "worklet"
              return ((value * data?.DailyFat) / value).toFixed(0);
            }}
            radius={50}
            activeStrokeColor={'#rgba(252,195,12,1)'}
            activeStrokeWidth={6}
            inActiveStrokeColor={colors.GRAYDARK}
            activeStrokeSecondaryColor={'#rgba(202,50,50,1)'}
            title='Fats'
            titleColor={colors.GRAYLIGHT}
            titleStyle={{ fontSize: 13, fontWeight: 'bold' }}
            progressValueColor={colors.WHITE}
            progressValueStyle={{ fontSize: 25, fontWeight: '300' }}
            subtitle={'/' + data?.TDEEFat}
            subtitleColor={'#rgba(252,195,12,1)'}
            subtitleStyle={{ fontSize: 13, fontWeight: 'bold' }}
          />}
      </View>
      <View>
      <Accordion
        sections={SECTIONS}
        activeSections={activeSections}
        renderHeader={_renderHeader}
        renderContent={_renderContent}
        onChange={(sections) => setActiveSections(sections)}
        containerStyle={{ marginTop:heightScreen * 0.05, }}
        underlayColor='transparent'
        touchableComponent={TouchableOpacity}
        expandMultiple={true}
        sectionContainerStyle={{paddingBottom:20}}
      />
      </View>
      </ScrollView>
    </View>
  )
}

export default InsigntScreen

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BG,
  },
  modalContainer: {
    position: 'absolute',
    backgroundColor: "transparent",
    paddingTop: 40,
    paddingHorizontal: 20,
  },
  modalCloseButton: {
    fontWeight: 'bold',
    color: colors.MAIN,
  },
  containerButton: {
    alignItems: 'center',
    // marginBottom: 10,
    zIndex: 1,

  },
  containerBody: {
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: heightScreen * 0.04,
    flexDirection: 'row',
  },
  containerTracking: {
    marginTop: heightScreen * 0.04,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: widthScreen * 0.05,
  }
})